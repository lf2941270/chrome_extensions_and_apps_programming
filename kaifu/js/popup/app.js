define(function(require,exports,module){
	var $=require('jquery');
  var Site=require('../back/site');
  Site.loadLocal("sites",function(res){
    console.log(res)
  })

});