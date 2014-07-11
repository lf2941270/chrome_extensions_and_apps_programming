define(function(require,exports,module){
	var Control=require('../back/control');
  /*Control.loadLocal(function(res){
    console.log(Control.find());
  });
*/
	Control.bindChange();
	Control._setup();

});