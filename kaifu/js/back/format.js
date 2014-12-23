define(function(require,exports,module){
  var $=require('jquery');
  if(!String.prototype.fill){
    String.prototype.fill=function(num){//给数字前面补0的方法
      var arr=this.split("");
      for(var l=arr.length;l<num;l++){
        arr.unshift("0");
      }
      return arr.join("");
    }
  }
  function FormatMap(input,replaceform){
		this.leixing = replaceform.leixing;
    this.year=new Date(replaceform.time).getFullYear().toString();
    this.month=(new Date(replaceform.time).getMonth()+1).toString();
    this.date=new Date(replaceform.time).getDate().toString();
    this.hour=new Date(replaceform.time).getHours().toString();
    this.minute=new Date(replaceform.time).getMinutes().toString();
    this.second=new Date(replaceform.time).getSeconds().toString();
    this.fullServerName="双线"+replaceform.server+"服";
    this.url=replaceform.main_url;
  }
  FormatMap.prototype= $.extend(FormatMap.prototype,{
    0:function(){
      return this.year;
    },1:function(){
      return this.month;
    },2:function(){
      return this.date;
    },3:function(){
      return this.hour;
    },4:function(){
      return this.minute.fill(2);
    },5:function(){
      return this.year+"-"+this.month.fill(2)+"-"+this.date.fill(2)+" "+this.hour.fill(2)+":"+this.minute.fill(2)+":"+this.second.fill(2);
    },6:function(){
      return this.fullServerName;//返回服务器全名：双线？服
    },7:function(){
			return this.year+"-"+this.month.fill(2)+"-"+this.date.fill(2);
		},8:function(){
			return this.hour.fill(2);
		},9:function(){
      return this.year+"-"+this.month.fill(2)+"-"+this.date.fill(2)+" "+this.hour.fill(2)+":"+this.minute.fill(2);
    },10:function(){
      return this.year+this.month.fill(2)+this.date.fill(2);
    },11:function(){
      return this.year+"-"+this.month+"-"+this.date;
    },12:function(){
      return this.year+"年"+this.month.fill(2)+"月"+this.date.fill(2)+"日 "+this.hour.fill(2)+"时"+this.minute.fill(2)+"分"+this.second.fill(2)+"秒";
    },13:function(){
			return this.month.fill(2);
    },14:function(){
      return this.minute;
    },15:function(){
			return this.date.fill(2);
		},16:function(){
			return this.hour.fill(2)+":"+this.minute.fill(2);
		},17:function(){
      return this.year+"-"+this.month.fill(2)+"-"+this.date.fill(2)+" "+this.hour.fill(2);
    },18:function(){
      return this.url.replace("http://","");
    },19:function(){
      return this.fullServerName.replace("双线","");//返回服务器全名：双线？服
    },20:function(){
			return this.year+"/"+this.month.fill(2)+"/"+this.date.fill(2);
		},21:function(){
			return ["", "角色扮演", "战争策略", "休闲竞技", "模拟经营", "社区养成"].indexOf(this.leixing).toString();
		}
  },true);

  var formatMap;
  module.exports=function(input,replaceform){
    formatMap=new FormatMap(input,replaceform);


    if(input.format===undefined){//如果没有format函数，则直接将value值设为对应的replaceform中的值
      if(!input.replace){//如果没有replace，则无需提前处理，直接返回
        return input;
      }
      input.value=replaceform[input.replace]
    }else{//否则用formatMap中对应format键的函数来对input进行处理
      input.value=formatMap[input.format]();
    }
    return input;
  }
});