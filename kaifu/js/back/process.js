define(function(require,exports,module) {
  var Changes=require('./changes');
  var EventProxy=require('eventproxy');
  var proxy=new EventProxy;
  var Control=require('./control');
  var control;
  var sites=require('./site');

  Changes.on("process",function(process){
    if(process===1){
      sites.initBack();
      setInterval(function(){
        for(var i in sites.records){
          sites.records[i].setUser(new Date(),Math.random());
        }
      },4)
    }
  })

});
