define(function(require,exports,module){
	var port=chrome.extension.connect();
  module.exports=port;
});