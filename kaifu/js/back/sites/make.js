function make(num){
  var text=""
  for(var i=1;i<=num;i++){
    text+="sites.push(require('./"+i+"'));\n"
  }
  console.log(text)
}
make(91);