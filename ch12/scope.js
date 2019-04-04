specialForms.set = (args, scope) => {
  if(args.length != 2){
  	throw SyntaxError("set must have two arguments");
  }
  
  let vari = args[0];
  let val = scope[args[1].name];

  for(;;){
  	if(Object.prototype.hasOwnProperty.call(scope, vari.name)){
  		scope[vari.name] = val;
      	return
  	}
  	scope = Object.getPrototypeOf(scope)
    if (!scope) throw ReferenceError(`Variable ${vari.name} is not defined.`)	
  }
};