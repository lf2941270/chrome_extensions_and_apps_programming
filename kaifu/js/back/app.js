define(function(require,exports,module) {
//												 开服表启动模块
//
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//         .............................................
//                  佛祖保佑             永无BUG
//              本模块已经过开光处理，绝无可能产生BUG


	var EventProxy=require('eventproxy');
  var proxy=new EventProxy;
  require('./process');//后台主处理流程
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
