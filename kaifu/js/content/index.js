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
console.log(document.cookie);