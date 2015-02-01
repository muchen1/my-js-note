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



//不完成函数
/*不完全函数是一种函数变换技巧，即把一次完整的函数调用拆成多次函数调用，每次传入的实参都是
完整实参的一部分，每个拆开的函数叫不完全函数，每次函数调用称作不完全调用，这种函数变换的特点
是每次调用都返回一个函数，直到最终运行结果为止，如f(1,2,3,4,5,6)等价于f(1,2)(3,4)(5,6)*/
//实现一个工具函数将类数组对象（或对象）转换为真正的数组
//在后面的示例代码种用到了这个方法将arguments对象转换成真正的数组
function array(a,n){
	return Array.prototype.slice.call(a,n||0);
}
//这个函数的实参传递至左侧
function partialLeft(f /*,...*/){
	var args=arguments; //保存外部的实参数组
	return function(){  //并返回这个函数
		var a=array(args,1); //开始处理外部的第一个args
		a=a.concat(array(arguments));//然后增加所有的内部实参
		return f.apply(this,a);
	}
}
//这个函数的实参传递至右侧
function partialRight(f/*,...*/){
	var args=arguments;   //保存外部的实参数组
	return function(){ //返回这个数组
		var a=array(arguments);  //从内部函数开始
		a=a.concat(array(args,1)); //然后从外部第一个args开始添加
		return f.apply(this,a);  //最后基于这个实参列表调用f()
	}
}

//这个函数的实参被用作模板
//实参列表中的undefined值被填充
function partial(f /*,...*/){
	var args=arguments;//保存外部实参数组
	return function(){
		var a=array(args,1);//从外部args开始
		var i=0,j=0;
		//遍历args，从内部实参填充undefined值
		for(;i<a.length;i++)
			if(a[i]===undefined) a[i]=arguments[j++];
		//现在将剩下的内部实参都追加进去
		a=a.concat(array(arguments,j));
		return f.apply(this,a);
	}
}
/*使用上述的函数*/
//这个函数带有三个实参
var f=function(x,y,z){return x*(y-z);};
//注意着三个不完全调用之间的区别
partialLeft(f,2)(3,4);
partialRight(f,2)(3,4);
partial(f,undefined,2)(3,4);


//函数记忆
/*记忆是一种编程技巧，本质上是牺牲算法的空间复杂度以换取更优的时间复杂度，在客户端js种代码的
执行时间复杂度往往成为瓶颈，因此在大多数场景下，这种牺牲空间获取时间的做法以提升程序执行效率
的做法是可取的*/
//返回f()的带有记忆功能的版本
//只有当f()的实参的字符串表示都不相同时它才会工作
function memorize(f){
	var cache={};//将值保存在闭包中
    return function(){
    	//将实参转换为字符串形式，并将其用作缓存的键
    	var key=arguments.length+Array.prototype.join.call(arguments,",");
    	if(key in cache) return cache[key];
    	else return cache[key]=f.apply(this,arguments);
    }
}
//当实现一个递归函数时，往往需要实现记忆功能
var factorial=memorize(function(n){
	return (n<=1)?1:n*factorial(n-1);
});
factorial(5); //对于1-4也有缓存

