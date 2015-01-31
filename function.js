/*用于记录一些函数中比较重要的知识点*/
/*函数调用有四种形式：
	*作为函数
	*作为方法
	*作为构造函数
	*通过他们的call()或apply()方法
*/
/*当作为函数调用时，调用上下文为（this）全局对象window；
	但在严格模式下是undefined*/
//定义一个判断是否为严格模式的函数
var strict=(function(){return !this;}());

/*当作为构造函数调用时，会创建一个新对象，这个对象继承自构造函数的prototype属性。
*初始化这个对象，并将这个对象作为其（该构造函数的上下文）
*也就是说 new o.m()中，调用上下文并不是o，而是新创建的对象
*/
/*构造函数通常不适用return语句，初始化新对象后会显示返回
*当包含return，并返回一个对象时，那么就会显示返回这个对象
*当包含return，没有返回值，或返回一个原始值，那么就会 忽略这个返回值，任然使用新对象为返回值
*/



/*特定场景下返回带补丁的extend()版本*/
//定义一个扩展函数，用来将第二个以及后续参数复制至第一个参数
//这里我们处理一个IEbug，在多数IE版本中，如果o的属性拥有一个不可枚举的同名属性，
//则for in循环不会枚举对象o中的可枚举属性，也就是说，将不会正确处理诸如
//toString的属性，除非我们现实检测它
var extend=(function(){//将这个函数的返回值赋值给extend
	//检测是不是有bug
	for(var p in {toString:null}){
		//如果代码执行到这里，那么for in循环会正确工作并返回
		//一个简单版本的extend（）函数
		return function extend(o){
			for(var i=1;i<arguments.length;i++){
				var source=arguments[i];
				for(var prop in source) o[prop]=source[prop];
			}
		return o;
		};
	}
	//如果代码执行到这里，说明for in循环不会枚举测试对象的toString属性
	//因此返回另一个版本的extend（）函数，这个函数显式测试
	//Object.prototype中的不可枚举属性
	return function patched_extend(o){
		for(var i=1;i<arguments.length;i++){
			var source=arguments[i];
			//赋值所有的可枚举属性
			for(var prop in source) o[prop]=source[prop];
			//现在检查特殊属性
			for(var j=0;j<protoprops.length;j++){
				prop=protoprops[j];
				if(source.hasOwnProperty(prop)) o[prop]=source[prop];
			}
		}
		return o;
	};
	//这个列表列出来需要检查的特殊属性
	var protoprops=["toString","valueOf","constructor","hasOwnProperty",
	               "isPrototypeOf","propertyIsEnumerable","toLocalString"];
}());


//注意下面两个执行结果是不同的；
var scope="global scope";
function checkscope(){
	var scope="local scope";
	function f(){return scope;}
	return f;
}
function checkscope1(){
	var scope="local scope";
	function f(){return this.scope;}
	return f;
}
checkscope()();//这个结果是local scope
checkscope1()();//这个结果是global scope

/*利用闭包实现私有属性存取器方法*/
//这个函数给对象o增加了属性存取器方法，方法名称为get<name>和set<name>
//如果提供了一个判定函数，setter方法就会用它来检测参数的合法性，然后再存储它
//如果判定函数返回false，setter方法抛出一个异常
//
//这个函数有一个非同寻常之处，就是getter和setter函数所操作的属性值并没有存储在
//对象o中，相反，这个值仅仅是保存在函数中的局部变量中
//getter和setter方法同样是局部函数，所以可以访问这个局部变量，也就是说，对于两个
//存储器方法来说这个变量时私有的
//通过办法绕过存取器方法来设置或修改这个值
function addPrivateProperty(o,name,predicate){
	var value;//这是一个属性值
	//getter方法简单的将其返回
	o["get"+name]=function(){return value;}
	//setter方法首先检查是否合法，若不合法抛出异常
	//否则将其存储起来
	o["set"+name]=function(v){
		if(predicate&&!predicate(v)){
			throw Error("set"+name+": invalid value "+v);
		}
		else
			value=v;
	}
}

//使用上面定义的方法
addPrivateProperty(o,"Name",function(x){return typeof x=="string"; });
o.setName("Frank");//设置属性值
console.log(o.getName());//得到属性
o.setName(o)//试图设置一个错误类型的值