define(function(require,exports,module){
	var Control=require('../back/control');

  Control.loadLocal(function(){
    Control.bindChange();
    Control._setup();
  });

});