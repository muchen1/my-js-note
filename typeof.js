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
