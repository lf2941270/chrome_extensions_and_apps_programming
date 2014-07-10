define(function(require,exports,module){
  var Model=require('./model');
  var SingleModel=require('./singlemodel');
  var ReplaceForm=SingleModel.create("replaceform");

  module.exports=ReplaceForm;
})