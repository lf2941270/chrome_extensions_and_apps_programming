/**/
define(function(require,exports,module){
  var Model=require('./model');
  var Asset=Model.create();
  Asset.extend({
    populate:function(result){
      this.records=result;
      console.log(JSON.stringify(this.records));
    }
  })
//  Asset.extend(Model.localStorage);

//  Asset.attributes=["name","ext"];
  var asset=Asset.init({
    "name":"document",
    "ext":"txt",
    "newAttr":"123"
  });
  var asset2=Asset.init({
    "name":"test",
    "ext":".test"

  });
  Asset.saveLocal("ces");

  Asset.loadLocal("ces");
  Asset.getBytesInUse("ces",function(res){
    console.log(res);
  })
});