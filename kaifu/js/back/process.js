define(function(require,exports,module) {
  var Changes=require('./changes');
  var EventProxy=require('eventproxy');
  var proxy=new EventProxy;
  /*var Control=require('./control');
  var control;*/
  var sites=require('./site');
	var maxTabsNum=8;//同时打开的标签页的最大值

	chrome.extension.onConnect.addListener(function(port) {
		if(!(port.sender.tab)||(port.sender.tab&&port.sender.tab.url==="chrome-extension://edcbnmgbaolhoocpehjjhlnoilnldifj/js/popup/index.html")){
			port.onMessage.addListener(function(msg){
				console.log(msg)
				proxy.emit("selectTab",msg.selectTab);
			})
		}
    else{
      proxy.emit(port.sender.tab.id,port);
    }
	});
  chrome.tabs.onRemoved.addListener(function(tabId,removeInfo) {
    proxy.emit("closed",tabId);
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
          site.status=1
          site.save();
          site.parent.saveLocal();
          function tabHandler(tab){
            proxy.on("closed",function(tabid){
              console.trace()
              if(tabid==tab.id){
                var siteId=temp.pop();
                if(siteId!==undefined){
                  processSite(siteId);
                }
              }
            })
            proxy.on(tab.id,function(port){//接收到tab.id事件，说明该页面已打开，可以通过port发送消息
              var proxyTab=new EventProxy;
              port.onMessage.addListener(function(msg){
                console.log(msg);
                switch (msg){
                  case "loginsuc":
                    site.status=2;
                    break;
                  case "publishsuc":
                    site.status=3;
                    break;
                  case "needVerifyCode":
                    site.status=4;
                    break;
                  case "":
                    proxyTab.emit("tabLoaded");
                    break;
                }
                site.save();
                site.parent.saveLocal()
              });
              proxyTab.on("tabLoaded",function(){
                site.pro(port,proxyTab);
              });
							proxy.on("selectTab",function(title){
								if(title===site.title){
									try{
										chrome.tabs.update(port.sender.tab.id,{
											selected:true
										})
									}catch (e){
										console.error(e);
									}
								}
							})
            });
          }

					if(site.page.status===0){
						chrome.tabs.create({
							url: sites.records[id].page.login,
							active: false,//作为非活动标签页打开
							pinned: false
						}, tabHandler);
					}else{
            chrome.tabs.create({
              url: sites.records[id].page.publish,
              active: false,//作为非活动标签页打开
              pinned: false
            }, tabHandler);
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
