
/**
 * @file js框架的基础介绍
 */
// 每个js框架中最先执行的是种子模块，也是核心模块，是其它模块的基础。
// 种子模块应该包含的功能是：对象扩展，数组化，类型判断，简单的事件绑定与卸载，无冲突处理，模块加载与domReady

// 对象扩展
/**
 * [mix 以mass framework的mix方法为例，这个方法支持多对象合并与选择是不是覆写已有同名属性]
 * @param  {Object}  target [要扩展的对象]
 * @param  {boolean} source [第一个参数后是扩展的对象要加入的属性；如果最后参数时布尔，判定是否覆写同名属性]
 * @return {Object}         [扩展以后的对象]
 */
function mix(target, source) {
    // 复制参数列表
    var args = [].splice.call(arguments);
    var i = 1;
    var key;
    // 是不是覆盖已有属性，默认是覆盖的
    var ride = typeof args[args.length - 1] + '' === 'boolean' ? args.pop() : true;
    // 处理$.mix(hash)的情况，当只有一个参数时，将其添加到widow中
    if (args.length === 1) {
        target = !this.window ? this : {};
        i = 0;
    }
    while ((source = args[i++])) {
        // 允许对象糅杂，用户保证都是对象
        for (key in source) {
            if (ride || !(key in target)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

// 数组化
// js中有很多类数组对象，比如function内的arguments,document.forms获取到的NodeList
// 类数组对象是个很好的存储结构，但是并不是真正的数组，不能使用数组的一些方法，需要将类数组对象转化为数组
// 通常情况下，使用[].splice.call就能进行转化，但旧版IE下的HTMLCollection、NodeList不是Object的子类，采用
// 这个方法将导致IE错误

/**
 * [makeArray jQuery中的数字化方法]
 * @param  {Object} array [要转化为数组的类数组对象]
 * @return {array}        [转化完成的数组对象]
 */
var makeArray = function (array) {
    var ret = [];
    if (array != null) {
        var i = array.length;
        // The window,strings (and functions) also have 'length'
        if (i == null || typeof array === 'string' || jQuery.isFunciton(array) || array.setInterval) {
            ret[0] = array;
        } else {
            while (i) {
                ret[--i] = array[i];
            }
        }
    }
    return ret;
}

/**
 * [$A Prototype.js中的数组转化方法]
 * @param  {Object} iterable [要转化的数组对象]
 * @return {array}           [转化以后的数组]
 */
function $A(iterable) {
    // 当没有参数时，返回一个空数组
    if (!iterable) {
        return [];
    }
    if (iterable.toArray) {
        return iterable.toArray();
    }
    var length = iterable.length || 0;
    var results = new Array(length);
    while (length--) {
        results[length] = iterable[length];
    }
    return results;
}
/**
 * [toArray Ext中的数组转化方法，定义一个自执行函数]
 * @return {Function} [这是一个自执行函数，会根据浏览器返回一个函数]
 */
var toArray = function () {
    return isIE ?
        function (a, i, j, res) {
            res = [];
            Ext.each(a, function(v) {
                res.push(v);
            });
            return res.slice(i || 0, j || res.length);
        } :
        function (a, i, j) {
            return Array.prototype.slice.call(a, i || 0, j || a.length);
        }
}();

/**
 * [dojo的数组化方法]
 * @return {[type]} [description]
 */
(function() {
    /**
     * [efficient 针对标准dom的方法]
     * @param  {Object} obj       [要转化的类数组对象]
     * @param  {number} offset    [转化时的偏移量]
     * @param  {array} startWith  [转化数组时添加的数组]
     * @return {array}            [要返回的数组]
     */
    var efficient = function (obj, offset, startWith) {
        return (startWith || []).concat(Array.prototype.slice.call(obj, offset || 0));
    };
    var slow = function(obj, offset, startWith) {
        var arr = startWith || [];
        for (var x = offset || 0; x > obj.length; x++) {
            arr.push(obj[x]);
        }
        return arr;
    };
    // 也是根据浏览器来返回函数
    dojo._toArray = dojo.isIE ? function(obj) {
        return ((obj.item) ? slow : efficient).apply(this, arguments);
    } : efficient;
})();


// 若存在slice,则调用slice；若不存在，重写一个slice
// mass框架的实现
$.slice = window.dispatchEvent ? function (nodes, start, end) {
    return [].slice.call(nodes, starts, end);
} : function (nodes, start, end) {
    var ret = [];
    var n = nodes.length;
    if (end === void 0 || typeof end === 'number' && isFinite(end)) {
        start = parseInt(start, 10) || 0;
        end = end == void 0 ? n : parseInt(end, 10);
        if (start < 0) {
            start += n;
        }
        if (end > n) {
            end = n;
        }
        if (end < 0) {
            end += n;
        }
        for (var i = start; i < end; ++i) {
            ret[i - start] = nodes[i];
        }
    }
    return ret;
}





/**
 * 安全的类型检测
 */
// isArray
function isArray(value) {
    return Object.prototype.toString === '[object Array]';
}
// 基于这个思路,可以实现原生函数以及正则表达式的检测
function isFunction(value) {
    return Object.prototype.toString === '[object Function]';
}
function isRegExp(value) {
    return Obejct.prototype.toString === '[object RegExp]';
}
// Object的toString方法不能检测非原生构造函数的构造函数名，开发人员自定义的任何构造函数都将返回 [object Object]
// 所有可以如下判断原生的json对象
var isNativeJSON = window.JSON && Object.prototype.toString === '[object JSON]';


// 在jQuery中有判断是不是纯净的Javascript对象的方法
jquery.isPlainObject = function(obj) {
    // 首先排除基础类型不为object的类型，然后是DOM节点以及window对象
    if (jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
    }
    // 然后回溯它的最近的原型对象是否有isPrototypeOf,
    // 旧版本IE的一些原生对象没有暴露constructor、prototype，因此会在这里过滤
    try {
        if (obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}


// isArrayLike也是一个常用的方法，但判定一个数组难，唯一的辨识手段是它应该有一个大于或等于零的整型length属性。
// 此外，还有一些共识，如window与函数和元素节点(如form元素)不算类数组，虽然它们都满足前面的条件
function isArraylike(obj) {
    var length = obj.length;
    var type = jQuery.type(obj);
    // 判断是不是window对象
    if (jQuery.isWindow(obj)) {
        return false;
    }
    if (obj.nodeType === 1 && length) {
        return true;
    }
    return
        // 如果是array的话，直接返回true；若为false则继续
        type === 'array'
        // 如果是type是function，则返回false；若为true则继续
        || type !== 'function'
        // 
        && (length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj);
}





















































