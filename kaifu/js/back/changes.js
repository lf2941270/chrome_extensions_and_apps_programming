/*监听本地存储发生变化的Changes类*/
define(function(require,exports,module){
  var EventProxy=require('eventproxy');
  var Changes=new EventProxy;
  chrome.storage.onChanged.addListener(function(changes){
    for(var i in changes){
      console.log("changes on "+i);
      console.log(changes);
      Changes.emit(i,changes);
    }
  });
  module.exports=Changes;
});/**
 * Created by Administrator on 14-7-10.
 */
