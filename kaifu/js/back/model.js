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
    create:function(){
      var object=Object.create(this);
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
    find:function(id){
      var record=this.records[id];
      if(!record){
        throw("Unknow record!");
      }
      return record.dup();
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
      return result;
    },
    toJSON:function(){
      return(this.attributes());
    }
  });
  Model.localStorage={
    saveLocal:function(name){
      var obj={};
      obj[name]=JSON.parse(JSON.stringify(this.records));
      chrome.storage.local.set(obj,function(){})
    },
    loadLocal:function(name){
      var _=this;
      chrome.storage.local.get(name,function(result){
        _.populate(result[name]);
      });
    },
    getBytesInUse:function(name,callback){
      chrome.storage.local.getBytesInUse(name,callback);
    }
  };
  Model.extend(Model.localStorage);
  module.exports=Model;

});