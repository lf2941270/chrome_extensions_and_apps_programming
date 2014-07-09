/**/
define(function(require,exports,module){
  var jQuery=require('jquery');
  Math.guid=function(){
    return 'xxxxxxxx-xxxx-4xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
      var r=Math.random()*16| 0,v=c=='x'?r:(r&0x3|0x8);
      return v.toString(16);
    }).toUpperCase();
  };
  if(typeof Object.create!=="function"){
    Object.create=function(o){
      function F(){};
      F.prototype=o;
      return new F();
    }
  }
  var Model={
    inherited:function(){},
    created:function(){},
    prototype:{
      init:function(){}
    },
    create:function(storageName){
      var object=Object.create(this);
      object.storageName=storageName; //设置在本地存储时的存储空间键名
      object.parent=this;
//      object.prototype=object.fn=Object.create(this.prototype);

      object.created();
      this.inherited(object);
      return object;
    },
    init:function(){
      var instance=Object.create(this.prototype);
      instance.parent=this;
      instance.init.apply(instance,arguments);
      return instance;
    },
    extend:function(o){
      var extended= o.extended;
      jQuery.extend(this,o);
      if(extended){
        extended(this);
      }
    },
    include:function(o){
      var included= o.included;
      jQuery.extend(this.prototype,o);
      if(included){
        included(this);
      }
    }
  }
  Model.include({
    init:function(atts){
      if(atts){
        this.load(atts);
      }
      this.setAtts(atts);
      this.create();
    },
    setAtts:function(atts){
      for(var i in atts){
        if(this.parent.attributes.indexOf(i)<0){
          this.parent.attributes.push(i);
        }
      }
    },
    load:function(atts){
      for(var i in atts){
        this[i]=atts[i];
      }
    }
  });

//持久化记录
  Model.records={};
  Model.include({
    newRecord:true,
    create:function(){
      if(!this.id){
        this.id=Math.guid();
      }
      this.newRecord=false;
      this.parent.records[this.id]=this.dup();
    },
    destroy:function(){
      delete this.parent.records[this.id];
    },
    update:function(){
      this.parent.records[this.id]=this.dup();
    },
    save:function(){
      this.newRecord ? this.create() : this.update();
    },
    dup:function(){
      return jQuery.extend(true,{},this);
    }
  });
  Model.extend({
    /*重构一下find，如果不传入参数，则返回第一项（一般只有一个存储项时才这么调用find）；如果传入null,则将所有项组成一个数组返回*/
    find:function(id){
      var record;
			record=this.records[id];
			if(!record){
				throw("Unknow record!");
			}
			return record.dup();
    }
  });
	Model.extend({
		proxy:function(func){
			var self=this;
			return function(){
				return func.apply(self,arguments);
			}
		}
	});
	Model.include({
		proxy:function(func){
			var self=this;
			return function(){
				return func.apply(self,arguments);
			}
		}
	});
  Model.extend({
    created:function(){
      this.records={};
      this.attributes=[];
    }
  });
  Model.include({
    attributes:function(){
      var result ={};
      for(var i in this.parent.attributes){
        var attr=this.parent.attributes[i];
        result[attr]=this[attr];
      }
      result.id=this.id;
			console.log(result)

			return result;
    },
    toJSON:function(){
      return(this.attributes());
    }
  });

  Model.localStorage={
    saveLocal:function(){
      var obj={};
			console.log(JSON.stringify(this.records))
      obj[this.storageName]=JSON.parse(JSON.stringify(this.records));
			console.log("已存储：");
			console.log(obj)
      chrome.storage.local.set(obj,function(){})
    },
    loadLocal:function(cb){
      var _=this;
      chrome.storage.local.get(this.storageName,function(result){
        _.populate(result[_.storageName],cb);
      });
    },
    getBytesInUse:function(callback){
      chrome.storage.local.getBytesInUse(this.storageName,callback);
    }
  };
  Model.extend({
    /*populate:function(result){
      this.records=result;
      console.log(this.records);
    },*/
    populate: function(values,cb){
      // Reset model & records
      this.records = {};

      for (var i in values) {
        var record = this.init(values[i]);
        record.newRecord = false;
        this.records[record.id] = record.dup();
      }
      cb(this.records);
    }

  })
  Model.extend(Model.localStorage);
  module.exports=Model;

});