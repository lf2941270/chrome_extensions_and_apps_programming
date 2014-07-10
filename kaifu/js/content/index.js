/*
chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
	console.log(message);
	sendResponse('reply msg from content!')
});
chrome.extension.sendMessage('content主动发送的消息',function(response){
	console.log(response);
})
console.log(chrome)*/

/*chrome.storage.local.set({
  cookie:document.cookie,
  test:{
    a:1,
    b:2
  }
}, function(){
  //do something
});*/
/*
chrome.storage.local.get("sites",function(result){
  console.log(result);
})
chrome.storage.local.set({
  sites:[{
    id:1,
    src:location.href
  }]
}, function(){
  //do something
});
chrome.storage.local.get("sites",function(result){
  console.log(result);
})
//document.domain=document.location.domain;
console.log(document.domain)
console.log(document.cookie);*/

/*

var script=document.createElement("script");
script.src="chrome-extension://edcbnmgbaolhoocpehjjhlnoilnldifj/js/lib/sea.js";
document.body.appendChild(script);
*/

function loadScript(url){
	var script=document.createElement("script");
	script.type="text/javascript";
	script.src=url;
	document.body.appendChild(script);
}
var seajs=chrome.extension.getURL('/js/lib/sea.js');
loadScript(seajs);

var main=chrome.extension.getURL('/js/content/main.js');
loadScript(main);