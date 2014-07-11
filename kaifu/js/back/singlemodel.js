/*不需要id的单体对象*/
define(function(require,exports,module){
	var Model=require('./model');
	var SingleModel=Model.create();
	SingleModel.extend({
		find:function(){
			return this.records.dup();
		},
		populate: function(values,cb){
			// Reset model & records

			var record = this.init(values);
			record.newRecord = false;
			this.records = record.dup();

			cb(this.records);
		}
	})
	SingleModel.include({
		create:function(){
			this.parent.records=this.dup();
		},
		destroy:function(){
			delete this.parent.records;
		},
		update:function(){
			this.parent.records=this.dup();
		}
	})
	module.exports=SingleModel;
});