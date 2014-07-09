define(function(require,exports,module) {
  var EventProxy=require('eventproxy');
  var proxy=new EventProxy;
  var Control=require('./control');
  Control.setup();

	/*var EventProxy=require('eventproxy');
	var proxy=new EventProxy;
	chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
		console.log(message);
		sendResponse('reply msg from back!')
	});
	chrome.tabs.create({url: 'http://www.baidu.com',
		active: true,
		pinned: false
	}, function(tab){
			console.log(tab);
			proxy.emit('tab',tab.id);
	});
	proxy.on('tab',function(id){
		chrome.tabs.sendMessage(id,'msg from back',function(response){
			console.log(response);
		})
	});


  chrome.storage.onChanged.addListener(function(changes, areaName){
    chrome.storage.local.get(null,function(items){
      console.log(items)
    })
  });*/

});
