chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
	console.log(message);
	sendResponse('reply msg from content!')
});
chrome.extension.sendMessage('content主动发送的消息',function(response){
	console.log(response);
})
console.log(chrome)