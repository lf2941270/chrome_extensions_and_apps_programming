define(function(require,exports,module) {
  var Changes=require('./changes');
  var EventProxy=require('eventproxy');
  var proxy=new EventProxy;
  var Control=require('./control');
  var control;
  var sites=require('./site');
	console.log(sites)
	var maxTabsNum=10;//同时打开的标签页的最大值

	chrome.extension.onConnect.addListener(function(port) {
		proxy.emit(port.sender.tab.id,port);
	});
  Changes.on("process",function(process){
    if(process===1){
      sites.initBack(function(){
        sites.prevProcess(proxy);//预处理完毕后会在proxy上触发"well"事件
      });
			proxy.once("well",function(){

        var temp=[];//装有sites.records中存储项目的所有id的数组，每处理一个项目数组就删除对应的id
				for(var id in sites.records){
					temp.push(id);
				}
				function processSite(id){
//          var port;
					var site=sites.find(id);
					if(site.page.status===0){
						chrome.tabs.create({
							url: sites.records[id].page.login,
							active: false,//作为非活动标签页打开
							pinned: false
						}, function(tab){
							proxy.once(tab.id,function(port){//接收到tab.id事件，说明该页面已打开，可以通过port发送消息
                site.pro(port);
              });
						});
					}
				}
				for(var i= 0;i<maxTabsNum;i++){
					var siteId=temp.pop();
					if(siteId!==undefined){
						processSite(siteId);
					}
				}
			});
    }
  })
});
