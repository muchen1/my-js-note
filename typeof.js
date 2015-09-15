/**
 * 判断数据类型最简单方式：typeof,其返回值可能为：
 * 'undefined'---如果这个值没有定义(声明以后没有赋值为未定义)
 * 'boolean'---如果这个值是布尔值
 * 'string'---如果这个值是字符串
 * 'number'---如果这个值是数字
 * 'object'---如果这个值是对象或者null
 * 'function'---如果这个值是函数
 */
var message = 'some thing';
console.log(typeof message);
/**
 * Safari 5及之前版本，Chrome 7及之前版本在对正则表达式
 * 调用typeof时会返回function，而其它浏览器则会返回Object
 */

console.log(typeof dai);
/**
 * 在上述对没有声明的变量进行typeof操作时，也会返回undefined
 * 这样就会有一个问题，运用typeof无法判断出这个变量是不是被声明了
 * 所以在声明变量后要对其进行赋值，这样当返回undefined时，就可以知道该变量未声明
 * 从而避免了混淆
 */

/*数据类型*/
// Undefined类型，只有一个值，为undefined
// 未定义的变量会自动赋值为Undefined

/**
 * Null，只有一个值，为null
 * null实际上是一个空指针对象，所以在声明对象时，可以定义为null
 * 
*/
console.log(null == undefined) //true,因为undefined实际上是派生自null

/**
 * Boolean类型，有两个值：true和false
 * 所有类型都可以调用Boolean()转换为这两个值，转换规则为：
 * String:所有非空字符串转化为true；空字符串为false（有空格的字符串也是非空字符串）
 * Number:任何非零数字值(包括无穷大)转化为true；0和NaN转化为false
 * Object:任何对象（包括空对象）转化为true；null转化为false
 * Undefined：转化为false
 */

/**
 * Number类型
 * js中的浮点数值相当于Java中的双精度浮点数
 * 在存储时采用二进制的方式存储，如同十进制不能精确表示1/3一样，
 * 通过二进制也不能精确表示1/10;并且浮点数值的最高精度是17位
 * 所以在计算 0.1+0.2时，返回的并不是0.3
 */
console.log(0.1 + 0.2 == 0.3); //false,所以不要用浮点数值做判断
// 这个问题并不是只有javascript有，其它编程语言，只要使用了IEEE754标准的编程语言都有这个问题，比如c,c++,java等

/**
 * 数值范围
 */
console.log(Number.MIN_VALUE);  //能够保存的最小数值
console.log(Number.MAX_VALUE);  //能够保存的最大数值
isFinite(result);    //用来判断是不是在最大最小的范围内

// NaN 用来表示一个本来要返回数值的操作数未返回数值的情况（可不抛出错误）
console.log(0/0);   // NaN，任何值于NaN操作都会返回NaN
console.log(2/0);   //Infinity ,无穷大
console.log(-2/0);   //-Infinity,  负无穷大 

console.log(NaN == NaN); // false,NaN与自身并不相等

console.log(isNaN('2'));  // false, isNaN用来判断参数是否可以转换成Number类型
console.log(isNaN('dai'));  // true   ,不能转化返回true,能转化则返回false
console.log(isNaN('2dai'));  // false
console.log(isNaN(obj));  // 当对对象应用此方法时，会调用对象的valueOf()方法，如果不能转化成数值，在调用toString方法

/**
 * 数值转换:Number(),parseInt(),parseFloat()
 */
// Number()函数转化规则：Boolean转化为1和0；Null转化为0；undefined是NaN；字符串时：空字符串为0，包含数字时会忽略前导0，能够返回
// 小数,有16进制也会转化
Number('0000111');  // 111
Number('0001.11');  // 1.11
Number('0xf');    // 15

//一元加操作符与Number得到的结果一致，也就说可以通过 + 来将其他类型转化为数值

// parseInt及parseFloat 差不多，但parseFloat没有第二个参数，只能转化十进制的小数


/**
 * String
 * 字符串类型有一个特点：字符串是不可变的，也就是说，字符串一旦创建，就不能更改
 * 要改变字符串需要先销毁原来字符串，然后再用另一个新的字符串填充该变量
 */

var lang = 'Java';
lang = lang + 'script';
// 上述拼接字符串的过程：首先创建一个新的10个字符的新字符串，然后再这个字符串中填充“Java”和“script”，
// 最后一步销毁原来的字符串“Java”以及字符串“script”，因为这两个字符串已经没有用了


// 两个方法将别的类型转化为string类型：toString()以及String(),但toString()不能用于null及undefined
null.toString();// 会报错
String(null);   // 'null'
String(undefined);  // 'undefined'
// 同Number()方法一样，可以通过+‘’来将其它类型转化为字符串类型，效果和String()方法一样



/**
 * Object类型，Object类型是所有类型的基础
 * Object的每个实例都具有下列属性和方法：
 * 1. constructor:保存着创建当前对象的函数，就是指向构造函数
 * 2. hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中是不是存在(若该属性在原型中，则不算)
 * 3. isPrototypeOf(object):用于检查传入的对象是否是传入对象的原型
 * 4. propertyIsEnumerable(propertyName):用来检查给定的属性是否能够使用for－in语句来枚举
 * 5. toLocalString(): 返回对象的字符串表示，该字符串与执行环境的地区对应
 * 6. toString(): 返回对象的字符串表示
 * 7. valueOf(): 返回对象的字符串、数值或布尔值表示。一般与toString()返回的相同
 */
var o = {};
o.hasOwnProperty('name');














