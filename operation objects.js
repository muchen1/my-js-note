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