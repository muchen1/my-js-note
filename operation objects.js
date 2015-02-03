/*将p中的可枚举属性赋值到o中，并返回o，
如果o和p中有同名的属性，o中的属性将不受影响
这个函数并不处理getter和setter以及复制属性*/
function merge(o,p){
	for(prop in p){
		if(o.hasOwnProperty[prop]) continue;
		o[prop]=p[prop];
	}
	return o;
}
/*如果o中的属性在p中没有同名属性，则从o中删除这个属性，返回o*/
function restrict(o,p){
	for(prop in o){//遍历o中的所有属性
		if(!(prop in p)) delete o[prop];//如果在p中不存在，则删除
	}
}
/*如果o中的属性在p中存在同名属性，则从o中删除这个属性，返回o*/
function substract(){
	for(prop in p){//遍历p中的所有属性
		delete o[prop];
	}
	return o;
}
/*返回一个新对象，这个对象同时拥有o的属性和p的属性，
	如果o和p中有重名属性，使用p中的属性值
*/
function union(o,p){
	return extend(extend({},o),p);
}
/*返回一个新对象，这个对象拥有同时在o和p中出现的属性，
  很像求o和p的交集，但p中属性的值被忽略
*/
function intersection(o,p){
	return restrict(extend({},o),p)
}
/*
 返回一个数组，这个数组包含的是o中可枚举的自由属性的名字
*/
function keys(o){
	if(typeof o!=="object") throw TypeError();
	var result=[];
	for(var prop in o){
		if(o.hasOwnProperty(prop)){
			result.push(prop);
		}
	}
	return result;
}

/*
*classof()函数，用于判断传入对象的class属性
*或得对象类属性要调用它的toString()方法，就会返回一个[object class]字符串，
*但是很多对象重写了这个方法，所以要使用call来调用Object.protetype.toString()方法
*/
function classof(o){
	if(o===null) return "Null";
	if(o===undefined) return "Undefined";
	return object.prototype.toString.call(o).slice(8,-1);
}


//一个用于定义简单类的函数
function defineClass(
	constructor,//用以设置实例的属性的函数（实例属性）
	methods,//实例的方法，复制至原型中（实例方法）
	statics)//类属性，复制至构造函数中(类)
	{
		if(methods) extend(constructor.prototype,methods);
		if(statics) extend(constructor,statics);
		return constructor;
	}
//这是Range类的另一个实现
var SimpleRange=defineClass(function(f,t){this.f=f;this.t=t;},
	{
		includes:function(X){return this.f<=x&&x<=this.t;},
		toString:function(){return this.f+"..."+this.t;}
	},
	{upto:function(t){return new SimpleRange(0,t);}});



//可以判断值的类型的type()函数
//不同上下文中同一类型的对象可能不相等，所以构建这个函数
/*
*以字符串形式返回o的类型
* -如果o的null，返回“null”；如果o是NaN，返回“nan”
* -如果typeof所返回的值不是“object”，则返回这个值
* (注意，有一些JavaScript的实现将正则表达式识别为函数)
* -如果o的类不是“object”，则返回这个值
* -如果o包含构造函数并且这个构造函数具有名称，则返回这个名称
* -否则，一律返回“object”
*/
function type(o){
	var t,c,n;//type,class,name
	//处理null值的特殊情形
	if(o===null) return "null";
	//另一种特殊情形：NaN和它自身不相等
	if(o!==o) return "nan";
	//如果typeof的值不是 object，则使用这个值
	//这可以识别出原始值得类型和函数
	if((t=typeof o)!=="object") return t;
	//返回对象的类型，除非值为“object”
	//这种方式可以识别大多数的内置对象
	if((c=classof(o))!=="Object") return c;
	//如果对象构造函数的名字存在的话，则返回它
	if(o.constructor&&typeof o.constructor==="function"&&(n=o.constructor.getName())) return n;
	//其他的类型无法判别，一律返回“object”
	return "object";
}
//返回对象的类
function classof(o){
	return Object.prototype.toString.call(o).slice(8,-1);
}
//返回函数的名字（没有名字为空字符串），不是函数的话返回null
Function.prototype.getName=function(){
	if("name" in this) return this.name;
	return this.name=this.toString().match(/function\s*([^(]*)\(/)[1];
}