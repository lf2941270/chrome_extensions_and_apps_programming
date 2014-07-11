/*与back中的Changes基本相同*//*
function Changes(){
  var Changes=new EventProxy;
  chrome.storage.onChanged.addListener(function(changes){
    for(var i in changes){
      console.log("changes on "+i);
      console.log(changes);
      Changes.emit(i,changes);
    }
  });
  return Changes;
}
var Changes=new Changes();
Changes.on("control",function(changes){
  console.log(changes);
});*/

