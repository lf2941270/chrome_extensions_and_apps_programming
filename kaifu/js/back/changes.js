/*监听本地存储发生变化的Changes类*/
define(function(require,exports,module){
  var EventProxy=require('eventproxy');
  var Changes=new EventProxy;
  chrome.storage.onChanged.addListener(function(changes){
    for(var i in changes){
      Changes.emit(i,changes);
    }
  });
  Changes.on("control",function(changes){
    if(!changes.control.newValue){//说明执行了清空数据
      Changes.emit("clear");
    }else if(changes.control.newValue&&changes.control.oldValue&&changes.control.newValue.step===2&&changes.control.newValue.process!==changes.control.oldValue.process){
      Changes.emit("process",changes.control.newValue.process);
    }
  })
  module.exports=Changes;
});