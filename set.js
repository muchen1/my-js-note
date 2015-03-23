function Set(){ //这是一个构造函数
	this.values={};//集合数据保存在对象的属性里
	this.n=0; //集合中的值的个数
	this.add.apply(this,arguments);//把所有参数都添加进这个集合
}
//将每个参数添加至集合中
Set.prototype.add=function(){
	for(var i=0;i<arguments.length;i++){//遍历每个参数
		var val=arguments[i];//待添加到集合中的值
		var str=Set._v2s(val);//把它转化为字符串
		if(!this.values.hasOwnProperty(str)){//如果不在集合中
			this.values[str]=val;//将字符串和值对应起来
			this.n++;//集合中值得计数加一
		}
	}
	return this;//支持链式方法调用
}
//从集合删除元素，这些元素由参数指定
Set.prototype.remove=function(){
	for(var i=0;i<arguments.length;i++){ //遍历每个参数
		var str=Set._v2s(arguments[i]);//将字符串和值对应起来
		if(this.values.hasOwnProperty(str)){ //如果它在集合中
			delete this.values[str];//删除它
			this.n--；
		}
	}
	return this;//支持链式方法调用
}
//如果集合包含这个值，则返回true；否则，返回false
Set.prototype.contains=function(value){
	return this.values.hasOwnProperty(Set._v2s(value));
}
//返回集合的大小
Set.prototype.size=function(){
	return this.n;
}
//遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach=function(f,context){
	for(var s in this.values)  //遍历集合中的所有字符串
		if(this.values.hasOwnProperty(s)) //忽略继承的属性
			f.call(context,this.values[s]);  //调用f，传入value
}
//这是一个内部函数，用以将任意JavaScript值和唯一的字符串对应起来
Set._v2s=function(val){
	switch(val){
		case undefined: return 'u';//特殊的原始值
		case null:      return 'n';//值只有一个字母
		case true:      return 't';//代码
		case false:     return 'f';
		default:switch(typeof val){
			case 'number':return '#'+val;    //数字都带有#前缀
			case 'string':return '"'+val;    //字符串都有“前缀
			default: return '@'+objectId(val);//objs and funcs get @
		}
	}
	//对任意对象来说，都会返回一个字符串
	//针对不同的对象，这个函数会返回不同的字符串
	//对于用一个对象的多次调用，总是返回相同的字符串
	//为了做到这一点，给o创建一个属性，在Es5中，这个属性是不可枚举且是只读的
	function objectId(o){
		var prop="|**objectid**|";   //私有属性，用以存放id
		if(!o.hasOwnProperty(prop))  //如果对象没有id
			o[prop]=Set._v2s.next++;//将下一个值赋给它
		return o[prop];             //返回这个id
	}
}
Set._v2s.next=100;//设置初始id的值
//将集合转化为字符串的方法，toString方法
Set.prototype.toString=function(){
	var s="{",
	i=0;
	this.foreach(function(v){s+=((i++>0)?", ":"")+v;});
	return s+="}";
}
//类似toString，但是对于所有的值都将调用toLocalString()
Set.prototype.toLocalString=function(){
	var s="{",i=0;
	this.foreach(function(v){
		if(i++>0) s+=", ";
		if(v==null) s+=v;//null和undefined
		else s+=v.toLocalString();//其他情况
	});
	return s+="}";
}
//将集合转换为值数组
Set.prototype.toArray=function(){
	var a=[];
	this.foreach(function(v){a.push(v);});
	return a;
}
//对于要从JSON转化为字符串的集合都被当做数组来对待
Set.prototype.toJSON=Set.prototype.toArray;

//比较Set类实例对象的方法
Set.prototype.equals=function(that){
	//一些次要情况的快捷处理
	if(this===that) return true;
	//如果that对象不是一个集合，它和this不相等
	//我们用到了instanceof，使得这个方法可以用于Set的任何子类
	//如果希望采用鸭式辩型的方法，可以降低检查的严格程度
	//或者可以通过this.constructor==that.constructor来加强检查的严格程度
	//注意，null和undeifined两个值是无法用于instantceof运算的
	if(!(that instanceof Set)) return false;
	//如果两个集合的大小不一样，则他们不相等
	if(this.size()!=that.size()) return false;
	//现在检查集合中元素是否完全相同
	//如果两个集合不相等，则通过抛出异常来终止foreach循环
	try{
		this.foreach(function(v){if(!that.contains(v)) throw false;});
		return true;   //所有的元素都匹配：两个集合相等
	}catch(x){
		if(x===false)return false;//如果集合中有元素在另外一个中不存在
		throw x;                  //如果抛出异常
	}
}