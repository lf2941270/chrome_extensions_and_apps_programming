define(function(require,exports,module) {
  var Changes=require('./changes');
  var EventProxy=require('eventproxy');
  var proxy=new EventProxy;
  var Control=require('./control');
  var control;
  var sites=require('./site');
	console.log(sites)
	var maxTabsNum=10;//同时打开的标签页的最大值
	var temp=[];//装有sites.records中存储项目的所有id的数组，每处理一个项目数组就删除对应的id
	chrome.extension.onConnect.addListener(function(port) {
		console.log(port);
		port.onMessage.addListener(function(details) {console.log(details)});
	});

  Changes.on("process",function(process){
    if(process===1){
      sites.initBack();
			proxy.on("well",function(){
				for(var id in sites.records){
					temp.push(id);
				}
				function processSite(id){
					var site=sites.find(id);
					if(site.page.status===0){
						chrome.tabs.create({
							url: sites.records[id].page.login,
							active: true,
							pinned: false
						}, function(tab){
							console.log(tab);
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

			sites.prevProcess(proxy);
    }
  })

});
