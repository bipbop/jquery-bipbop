/**
 * Bundle of bipbop
 * Generated: 2018-03-07
 * Version: 1.0.6
 * Dependencies:
 *
 * object-assign -- 4.1.1
 *
 * one-time -- 0.0.4
 *
 * zepto -- 1.2.0
 *
 * style-inject -- 0.3.0
 *
 *
 * @module bipbop
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.bipbop = factory(global.$));
}(this, (function (jquery) { 'use strict';

jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}
	return Object(val);
}
function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}
		var test1 = new String('abc');
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}
		return true;
	} catch (err) {
		return false;
	}
}
var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;
	var from;
	var to = toObject(target);
	var symbols;
	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);
		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}
		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}
	return to;
};

var bipbopFreeKey = '6057b71263c21e4ada266c9d4d4da613';

var BipbopWebSocket = function BipbopWebSocket(apiKey, onMessage, onOpen) {
  this.apiKey = apiKey;
  this.onMessage = onMessage;
  this.onOpen = onOpen;
  this.queue = [];
  this.ws = null;
  this.start();
};
BipbopWebSocket.open = function open (apiKey, onMessage, onConnect) {
    if ( apiKey === void 0 ) apiKey = bipbopFreeKey;
  return function () {
      var ref;
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      return (ref = new BipbopWebSocket(apiKey, onMessage, onConnect)).send.apply(ref, args);
    };
};
BipbopWebSocket.prototype.send = function send (data, onSend) {
  if (typeof data === 'string') { this.apiKey = data; }
  if (this.ws && this.ws.readyState === 1) {
    this.ws.send(JSON.stringify(data));
    if (onSend) { onSend(); }
    return true;
  }
  this.queue.push([data, onSend]);
  return false;
};
BipbopWebSocket.prototype.start = function start () {
    var this$1 = this;
  this.ws = new WebSocket(bipbop.websocketAddress);
  this.ws.onmessage = function (event) {
    if (this$1.onMessage && event.data) { this$1.onMessage(JSON.parse(event.data), event); }
  };
  this.ws.onopen = function () {
      var ref;
    this$1.ws.send(JSON.stringify(this$1.apiKey));
    while (this$1.queue.length) { (ref = this$1).send.apply(ref, this$1.queue.shift()); }
    if (this$1.onOpen) { this$1.onOpen(this$1.ws); }
  };
  this.ws.onerror = function () { return this$1.ws.close(); };
  this.ws.onclose = function () { return setTimeout(function () { return this$1.start(); }, bipbop.reconnectAfter); };
};

var oneTime = function one(fn) {
  var called = 0
    , value;
  function onetime() {
    if (called) { return value; }
    called = 1;
    value = fn.apply(this, arguments);
    fn = null;
    return value;
  }
  onetime.displayName = fn.displayName || fn.name || onetime.displayName || onetime.name;
  return onetime;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

(function(global, factory) {
  if (typeof undefined === 'function' && undefined.amd)
    { undefined(function() { return factory(global) }); }
  else
    { factory(global); }
}(commonjsGlobal, function(window) {
  var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array };
  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) { return false }
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector;
    if (matchesSelector) { return matchesSelector.call(element, selector) }
    var match, parent = element.parentNode, temp = !parent;
    if (temp) { (parent = tempParent).appendChild(element); }
    match = ~zepto.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match
  };
  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }
  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = $.type(obj);
    return 'function' != type && !isWindow(obj) && (
      'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
  }
  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) };
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) };
  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }
  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }
  function defaultDisplay(nodeName) {
    var element, display;
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName);
      document.body.appendChild(element);
      display = getComputedStyle(element, '').getPropertyValue("display");
      element.parentNode.removeChild(element);
      display == "none" && (display = "block");
      elementDisplay[nodeName] = display;
    }
    return elementDisplay[nodeName]
  }
  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) { return node } })
  }
  function Z(dom, selector) {
    var this$1 = this;
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) { this$1[i] = dom[i]; }
    this.length = len;
    this.selector = selector || '';
  }
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container;
    if (singleTagRE.test(html)) { dom = $(document.createElement(RegExp.$1)); }
    if (!dom) {
      if (html.replace) { html = html.replace(tagExpanderRE, "<$1></$2>"); }
      if (name === undefined) { name = fragmentRE.test(html) && RegExp.$1; }
      if (!(name in containers)) { name = '*'; }
      container = containers[name];
      container.innerHTML = '' + html;
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this);
      });
    }
    if (isPlainObject(properties)) {
      nodes = $(dom);
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) { nodes[key](value); }
        else { nodes.attr(key, value); }
      });
    }
    return dom
  };
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  };
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  };
  zepto.init = function(selector, context) {
    var dom;
    if (!selector) { return zepto.Z() }
    else if (typeof selector == 'string') {
      selector = selector.trim();
      if (selector[0] == '<' && fragmentRE.test(selector))
        { dom = zepto.fragment(selector, RegExp.$1, context), selector = null; }
      else if (context !== undefined) { return $(context).find(selector) }
      else { dom = zepto.qsa(document, selector); }
    }
    else if (isFunction(selector)) { return $(document).ready(selector) }
    else if (zepto.isZ(selector)) { return selector }
    else {
      if (isArray(selector)) { dom = compact(selector); }
      else if (isObject(selector))
        { dom = [selector], selector = null; }
      else if (fragmentRE.test(selector))
        { dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null; }
      else if (context !== undefined) { return $(context).find(selector) }
      else { dom = zepto.qsa(document, selector); }
    }
    return zepto.Z(dom, selector)
  };
  $ = function(selector, context){
    return zepto.init(selector, context)
  };
  function extend(target, source, deep) {
    for (key in source)
      { if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          { target[key] = {}; }
        if (isArray(source[key]) && !isArray(target[key]))
          { target[key] = []; }
        extend(target[key], source[key], deep);
      }
      else if (source[key] !== undefined) { target[key] = source[key]; } }
  }
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1);
    if (typeof target == 'boolean') {
      deep = target;
      target = args.shift();
    }
    args.forEach(function(arg){ extend(target, arg, deep); });
    return target
  };
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
        isSimple = simpleSelectorRE.test(nameOnly);
    return (element.getElementById && isSimple && maybeID) ?
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ?
          maybeClass ? element.getElementsByClassName(nameOnly) :
          element.getElementsByTagName(selector) :
          element.querySelectorAll(selector)
      )
  };
  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }
  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        { if (node === parent) { return true } }
      return false
    };
  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }
  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
  }
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined;
    if (value === undefined) { return svg ? klass.baseVal : klass }
    svg ? (klass.baseVal = value) : (node.className = value);
  }
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }
  $.type = type;
  $.isFunction = isFunction;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;
  $.isEmptyObject = function(obj) {
    var name;
    for (name in obj) { return false }
    return true
  };
  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val;
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false
  };
  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  };
  $.camelCase = camelize;
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  };
  $.uuid = 0;
  $.support = { };
  $.expr = { };
  $.noop = function() {};
  $.map = function(elements, callback){
    var value, values = [], i, key;
    if (likeArray(elements))
      { for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i);
        if (value != null) { values.push(value); }
      } }
    else
      { for (key in elements) {
        value = callback(elements[key], key);
        if (value != null) { values.push(value); }
      } }
    return flatten(values)
  };
  $.each = function(elements, callback){
    var i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        { if (callback.call(elements[i], i, elements[i]) === false) { return elements } }
    } else {
      for (key in elements)
        { if (callback.call(elements[key], key, elements[key]) === false) { return elements } }
    }
    return elements
  };
  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  };
  if (window.JSON) { $.parseJSON = JSON.parse; }
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
  });
  $.fn = {
    constructor: zepto.Z,
    length: 0,
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var arguments$1 = arguments;
      var i, value, args = [];
      for (i = 0; i < arguments.length; i++) {
        value = arguments$1[i];
        args[i] = zepto.isZ(value) ? value.toArray() : value;
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },
    ready: function(callback){
      if (readyRE.test(document.readyState) && document.body) { callback($); }
      else { document.addEventListener('DOMContentLoaded', function(){ callback($); }, false); }
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          { this.parentNode.removeChild(this); }
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      });
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) { return this.not(this.not(selector)) }
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[];
      if (isFunction(selector) && selector.call !== undefined)
        { this.each(function(idx){
          if (!selector.call(this,idx)) { nodes.push(this); }
        }); }
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector);
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) { nodes.push(el); }
        });
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0];
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1];
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this;
      if (!selector) { result = $(); }
      else if (typeof selector == 'object')
        { result = $(selector).filter(function(){
          var node = this;
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        }); }
      else if (this.length == 1) { result = $(zepto.qsa(this[0], selector)); }
      else { result = this.map(function(){ return zepto.qsa(this, selector) }); }
      return result
    },
    closest: function(selector, context){
      var nodes = [], collection = typeof selector == 'object' && $(selector);
      this.each(function(_, node){
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          { node = node !== context && !isDocument(node) && node.parentNode; }
        if (node && nodes.indexOf(node) < 0) { nodes.push(node); }
      });
      return $(nodes)
    },
    parents: function(selector){
      var ancestors = [], nodes = this;
      while (nodes.length > 0)
        { nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node
          }
        }); }
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = ''; })
    },
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '');
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          { this.style.display = defaultDisplay(this.nodeName); }
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure);
      if (this[0] && !func)
        { var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1; }
      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        );
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure));
        var children;
        while ((children = structure.children()).length) { structure = children.first(); }
        $(structure).append(this);
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure);
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure;
        contents.length ? contents.wrapAll(dom) : self.append(dom);
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children());
      });
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML;
          $(this).empty().append( funcArg(this, html, idx, originHtml) );
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent);
          this.textContent = newText == null ? '' : ''+newText;
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
    attr: function(name, value){
      var result;
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          var this$1 = this;
          if (this.nodeType !== 1) { return }
          if (isObject(name)) { for (key in name) { setAttribute(this$1, key, name[key]); } }
          else { setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name))); }
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute);
      }, this);})
    },
    prop: function(name, value){
      name = propMap[name] || name;
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name]);
        }) :
        (this[0] && this[0][name])
    },
    removeProp: function(name){
      name = propMap[name] || name;
      return this.each(function(){ delete this[name]; })
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase();
      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName);
      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      if (0 in arguments) {
        if (value == null) { value = ""; }
        return this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value);
        })
      } else {
        return this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
      }
    },
    offset: function(coordinates){
      if (coordinates) { return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            };
        if ($this.css('position') == 'static') { props['position'] = 'relative'; }
        $this.css(props);
      }) }
      if (!this.length) { return null }
      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
        { return {top: 0, left: 0} }
      var obj = this[0].getBoundingClientRect();
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      var this$1 = this;
      if (arguments.length < 2) {
        var element = this[0];
        if (typeof property == 'string') {
          if (!element) { return }
          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
        } else if (isArray(property)) {
          if (!element) { return }
          var props = {};
          var computedStyle = getComputedStyle(element, '');
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop));
          });
          return props
        }
      }
      var css = '';
      if (type(property) == 'string') {
        if (!value && value !== 0)
          { this.each(function(){ this.style.removeProperty(dasherize(property)); }); }
        else
          { css = dasherize(property) + ":" + maybeAddPx(property, value); }
      } else {
        for (key in property)
          { if (!property[key] && property[key] !== 0)
            { this$1.each(function(){ this.style.removeProperty(dasherize(key)); }); }
          else
            { css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'; } }
      }
      return this.each(function(){ this.style.cssText += ';' + css; })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) { return false }
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) { return this }
      return this.each(function(idx){
        if (!('className' in this)) { return }
        classList = [];
        var cls = className(this), newName = funcArg(this, name, idx, cls);
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) { classList.push(klass); }
        }, this);
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) { return }
        if (name === undefined) { return className(this, '') }
        classList = className(this);
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ");
        });
        className(this, classList.trim());
      })
    },
    toggleClass: function(name, when){
      if (!name) { return this }
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this));
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass);
        });
      })
    },
    scrollTop: function(value){
      if (!this.length) { return }
      var hasScrollTop = 'scrollTop' in this[0];
      if (value === undefined) { return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset }
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value; } :
        function(){ this.scrollTo(this.scrollX, value); })
    },
    scrollLeft: function(value){
      if (!this.length) { return }
      var hasScrollLeft = 'scrollLeft' in this[0];
      if (value === undefined) { return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset }
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value; } :
        function(){ this.scrollTo(value, this.scrollY); })
    },
    position: function() {
      if (!this.length) { return }
      var elem = this[0],
        offsetParent = this.offsetParent(),
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0;
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0;
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0;
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0;
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body;
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          { parent = parent.offsetParent; }
        return parent
      })
    }
  };
  $.fn.detach = $.fn.remove
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() });
    $.fn[dimension] = function(value){
      var offset, el = this[0];
      if (value === undefined) { return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension] }
      else { return this.each(function(idx){
        el = $(this);
        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
      }) }
    };
  });
  function traverseNode(node, fun) {
    fun(node);
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      { traverseNode(node.childNodes[i], fun); }
  }
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2;
    $.fn[operator] = function(){
      var argType, nodes = $.map(arguments, function(arg) {
            var arr = [];
            argType = type(arg);
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) { return arr.push(el) }
                else if ($.zepto.isZ(el)) { return arr = arr.concat(el.get()) }
                arr = arr.concat(zepto.fragment(el));
              });
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1;
      if (nodes.length < 1) { return this }
      return this.each(function(_, target){
        parent = inside ? target : target.parentNode;
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null;
        var parentInDocument = $.contains(document.documentElement, parent);
        nodes.forEach(function(node){
          if (copyByClone) { node = node.cloneNode(true); }
          else if (!parent) { return $(node).remove() }
          parent.insertBefore(node, target);
          if (parentInDocument) { traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src){
              var target = el.ownerDocument ? el.ownerDocument.defaultView : window;
              target['eval'].call(target, el.innerHTML);
            }
          }); }
        });
      })
    };
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this);
      return this
    };
  });
  zepto.Z.prototype = Z.prototype = $.fn;
  zepto.uniq = uniq;
  zepto.deserializeValue = deserializeValue;
  $.zepto = zepto;
  return $
})();
window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto)
;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';
  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event);
    if (event.ns) { var matcher = matcherFor(event.ns); }
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.');
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }
  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }
  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }
  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []));
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') { return $(document).ready(fn) }
      var handler   = parse(event);
      handler.fn    = fn;
      handler.sel   = selector;
      if (handler.e in hover) { fn = function(e){
        var related = e.relatedTarget;
        if (!related || (related !== this && !$.contains(this, related)))
          { return handler.fn.apply(this, arguments) }
      }; }
      handler.del   = delegator;
      var callback  = delegator || fn;
      handler.proxy = function(e){
        e = compatible(e);
        if (e.isImmediatePropagationStopped()) { return }
        e.data = data;
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
        if (result === false) { e.preventDefault(), e.stopPropagation(); }
        return result
      };
      handler.i = set.length;
      set.push(handler);
      if ('addEventListener' in element)
        { element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture)); }
    });
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i];
      if ('removeEventListener' in element)
        { element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture)); }
      });
    });
  }
  $.event = { add: add, remove: remove };
  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2);
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) };
      proxyFn._zid = zid(fn);
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn);
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  };
  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  };
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  };
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  };
  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      };
  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event);
      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name];
        event[name] = function(){
          this[predicate] = returnTrue;
          return sourceMethod && sourceMethod.apply(source, arguments)
        };
        event[predicate] = returnFalse;
      });
      event.timeStamp || (event.timeStamp = Date.now());
      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        { event.isDefaultPrevented = returnTrue; }
    }
    return event
  }
  function createProxy(event) {
    var key, proxy = { originalEvent: event };
    for (key in event)
      { if (!ignoreProperties.test(key) && event[key] !== undefined) { proxy[key] = event[key]; } }
    return compatible(proxy, event)
  }
  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  };
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  };
  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback);
    return this
  };
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback);
    return this
  };
  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this;
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one);
      });
      return $this
    }
    if (!isString(selector) && !isFunction(callback) && callback !== false)
      { callback = data, data = selector, selector = undefined; }
    if (callback === undefined || data === false)
      { callback = data, data = undefined; }
    if (callback === false) { callback = returnFalse; }
    return $this.each(function(_, element){
      if (one) { autoRemove = function(e){
        remove(element, e.type, callback);
        return callback.apply(this, arguments)
      }; }
      if (selector) { delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0);
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element});
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }; }
      add(element, event, callback, data, selector, delegator || autoRemove);
    })
  };
  $.fn.off = function(event, selector, callback){
    var $this = this;
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn);
      });
      return $this
    }
    if (!isString(selector) && !isFunction(callback) && callback !== false)
      { callback = selector, selector = undefined; }
    if (callback === false) { callback = returnFalse; }
    return $this.each(function(){
      remove(this, event, callback, selector);
    })
  };
  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event);
    event._args = args;
    return this.each(function(){
      if (event.type in focus && typeof this[event.type] == "function") { this[event.type](); }
      else if ('dispatchEvent' in this) { this.dispatchEvent(event); }
      else { $(this).triggerHandler(event, args); }
    })
  };
  $.fn.triggerHandler = function(event, args){
    var e, result;
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event);
      e._args = args;
      e.target = element;
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e);
        if (e.isImmediatePropagationStopped()) { return false }
      });
    });
    return result
  }
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    };
  });
  $.Event = function(type, props) {
    if (!isString(type)) { props = type, type = props.type; }
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true;
    if (props) { for (var name in props) { (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name]); } }
    event.initEvent(type, bubbles, true);
    return compatible(event)
  };
})(Zepto)
;(function($){
  var jsonpID = +new Date(),
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a');
  originAnchor.href = window.location.href;
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName);
    $(context).trigger(event, data);
    return !event.isDefaultPrevented()
  }
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) { return triggerAndReturn(context || document, eventName, data) }
  }
  $.active = 0;
  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) { triggerGlobal(settings, null, 'ajaxStart'); }
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) { triggerGlobal(settings, null, 'ajaxStop'); }
  }
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      { return false }
    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success';
    settings.success.call(context, data, status, xhr);
    if (deferred) { deferred.resolveWith(context, [data, status, xhr]); }
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
    ajaxComplete(status, xhr, settings);
  }
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context;
    settings.error.call(context, xhr, type, error);
    if (deferred) { deferred.rejectWith(context, [xhr, type, error]); }
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
    ajaxComplete(type, xhr, settings);
  }
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context;
    settings.complete.call(context, xhr, status);
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
    ajaxStop(settings);
  }
  function ajaxDataFilter(data, type, settings) {
    if (settings.dataFilter == empty) { return data }
    var context = settings.context;
    return settings.dataFilter.call(context, data, type)
  }
  function empty() {}
  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) { return $.ajax(options) }
    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort');
      },
      xhr = { abort: abort }, abortTimeout;
    if (deferred) { deferred.promise(xhr); }
    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout);
      $(script).off().remove();
      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred);
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred);
      }
      window[callbackName] = originalCallback;
      if (responseData && $.isFunction(originalCallback))
        { originalCallback(responseData[0]); }
      originalCallback = responseData = undefined;
    });
    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort');
      return xhr
    }
    window[callbackName] = function(){
      responseData = arguments;
    };
    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
    document.head.appendChild(script);
    if (options.timeout > 0) { abortTimeout = setTimeout(function(){
      abort('timeout');
    }, options.timeout); }
    return xhr
  };
  $.ajaxSettings = {
    type: 'GET',
    beforeSend: empty,
    success: empty,
    error: empty,
    complete: empty,
    context: null,
    global: true,
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    crossDomain: false,
    timeout: 0,
    processData: true,
    cache: true,
    dataFilter: empty
  };
  function mimeToDataType(mime) {
    if (mime) { mime = mime.split(';', 2)[0]; }
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }
  function appendQuery(url, query) {
    if (query == '') { return url }
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      { options.data = $.param(options.data, options.traditional); }
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
      { options.url = appendQuery(options.url, options.data), options.data = undefined; }
  }
  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor, hashIndex;
    for (key in $.ajaxSettings) { if (settings[key] === undefined) { settings[key] = $.ajaxSettings[key]; } }
    ajaxStart(settings);
    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a');
      urlAnchor.href = settings.url;
      urlAnchor.href = urlAnchor.href;
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
    }
    if (!settings.url) { settings.url = window.location.toString(); }
    if ((hashIndex = settings.url.indexOf('#')) > -1) { settings.url = settings.url.slice(0, hashIndex); }
    serializeData(settings);
    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
    if (hasPlaceholder) { dataType = 'jsonp'; }
    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      { settings.url = appendQuery(settings.url, '_=' + Date.now()); }
    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        { settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?'); }
      return $.ajaxJSONP(settings, deferred)
    }
    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value]; },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout;
    if (deferred) { deferred.promise(xhr); }
    if (!settings.crossDomain) { setHeader('X-Requested-With', 'XMLHttpRequest'); }
    setHeader('Accept', mime || '*/*');
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) { mime = mime.split(',', 2)[0]; }
      xhr.overrideMimeType && xhr.overrideMimeType(mime);
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      { setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded'); }
    if (settings.headers) { for (name in settings.headers) { setHeader(name, settings.headers[name]); } }
    xhr.setRequestHeader = setHeader;
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty;
        clearTimeout(abortTimeout);
        var result, error = false;
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
          if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
            { result = xhr.response; }
          else {
            result = xhr.responseText;
            try {
              result = ajaxDataFilter(result, dataType, settings);
              if (dataType == 'script')    { (eval)(result); }
              else if (dataType == 'xml')  { result = xhr.responseXML; }
              else if (dataType == 'json') { result = blankRE.test(result) ? null : $.parseJSON(result); }
            } catch (e) { error = e; }
            if (error) { return ajaxError(error, 'parsererror', xhr, settings, deferred) }
          }
          ajaxSuccess(result, xhr, settings, deferred);
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
        }
      }
    };
    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort();
      ajaxError(null, 'abort', xhr, settings, deferred);
      return xhr
    }
    var async = 'async' in settings ? settings.async : true;
    xhr.open(settings.type, settings.url, async, settings.username, settings.password);
    if (settings.xhrFields) { for (name in settings.xhrFields) { xhr[name] = settings.xhrFields[name]; } }
    for (name in headers) { nativeSetHeader.apply(xhr, headers[name]); }
    if (settings.timeout > 0) { abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty;
        xhr.abort();
        ajaxError(null, 'timeout', xhr, settings, deferred);
      }, settings.timeout); }
    xhr.send(settings.data ? settings.data : null);
    return xhr
  };
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) { dataType = success, success = data, data = undefined; }
    if (!$.isFunction(success)) { dataType = success, success = undefined; }
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }
  $.get = function(                                  ){
    return $.ajax(parseArguments.apply(null, arguments))
  };
  $.post = function(                                  ){
    var options = parseArguments.apply(null, arguments);
    options.type = 'POST';
    return $.ajax(options)
  };
  $.getJSON = function(                        ){
    var options = parseArguments.apply(null, arguments);
    options.dataType = 'json';
    return $.ajax(options)
  };
  $.fn.load = function(url, data, success){
    if (!this.length) { return this }
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success;
    if (parts.length > 1) { options.url = parts[0], selector = parts[1]; }
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response);
      callback && callback.apply(self, arguments);
    };
    $.ajax(options);
    return this
  };
  var escape = encodeURIComponent;
  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj);
    $.each(obj, function(key, value) {
      type = $.type(value);
      if (scope) { key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'; }
      if (!scope && array) { params.add(value.name, value.value); }
      else if (type == "array" || (!traditional && type == "object"))
        { serialize(params, value, traditional, key); }
      else { params.add(key, value); }
    });
  }
  $.param = function(obj, traditional){
    var params = [];
    params.add = function(key, value) {
      if ($.isFunction(value)) { value = value(); }
      if (value == null) { value = ""; }
      this.push(escape(key) + '=' + escape(value));
    };
    serialize(params, obj, traditional);
    return params.join('&').replace(/%20/g, '+')
  };
})(Zepto)
;(function($){
  $.fn.serializeArray = function() {
    var name, type, result = [],
      add = function(value) {
        if (value.forEach) { return value.forEach(add) }
        result.push({ name: name, value: value });
      };
    if (this[0]) { $.each(this[0].elements, function(_, field){
      type = field.type, name = field.name;
      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
        ((type != 'radio' && type != 'checkbox') || field.checked))
          { add($(field).val()); }
    }); }
    return result
  };
  $.fn.serialize = function(){
    var result = [];
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
    });
    return result.join('&')
  };
  $.fn.submit = function(callback) {
    if (0 in arguments) { this.bind('submit', callback); }
    else if (this.length) {
      var event = $.Event('submit');
      this.eq(0).trigger(event);
      if (!event.isDefaultPrevented()) { this.get(0).submit(); }
    }
    return this
  };
})(Zepto)
;(function(){
  try {
    getComputedStyle(undefined);
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function(element, pseudoElement){
      try {
        return nativeGetComputedStyle(element, pseudoElement)
      } catch(e) {
        return null
      }
    };
  }
})();
  return Zepto
}));
var zepto = {
};

function styleInject(css, ref) {
  if ( ref === void 0 ) { ref = {}; }
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') { return; }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".bipbop-loader {\n  background-color: rgba(30, 50, 58, 0.8);\n  background-position: center center;\n  background-repeat: no-repeat;\n  height: 100%;\n  left: 0;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  width: 100%; }\n  .bipbop-loader .robo {\n    background-image: url(data:image/png;base64,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);\n    height: 79px;\n    left: 50%;\n    margin-left: -30px;\n    margin-top: -40px;\n    position: relative;\n    top: 50%;\n    width: 60px;\n    z-index: 2; }\n    .bipbop-loader .robo .body {\n      background-image: url(data:image/png;base64,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);\n      height: 24px;\n      left: 13px;\n      position: absolute;\n      top: 40px;\n      width: 34px;\n      z-index: 3;\n      -webkit-animation: slide 1.5s infinite linear;\n         -moz-animation: slide 1.5s infinite linear;\n           -o-animation: slide 1.5s infinite linear;\n              animation: slide 1.5s infinite linear; }\n    .bipbop-loader .robo .left-arm {\n      background-image: url(data:image/png;base64,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);\n      background-position: 60px center;\n      background-repeat: no-repeat;\n      height: 7px;\n      left: -26px;\n      position: absolute;\n      top: 46px;\n      width: 40px;\n      z-index: 2;\n      -webkit-animation: slide-left-arm 1.5s infinite linear;\n         -moz-animation: slide-left-arm 1.5s infinite linear;\n           -o-animation: slide-left-arm 1.5s infinite linear;\n              animation: slide-left-arm 1.5s infinite linear; }\n    .bipbop-loader .robo .right-arm {\n      background-image: url(data:image/png;base64,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);\n      background-position: -15px center;\n      background-repeat: no-repeat;\n      height: 7px;\n      left: 47px;\n      position: absolute;\n      top: 46px;\n      width: 40px;\n      z-index: 2;\n      -webkit-animation: slide-right-arm 1.5s infinite linear;\n         -moz-animation: slide-right-arm 1.5s infinite linear;\n           -o-animation: slide-right-arm 1.5s infinite linear;\n              animation: slide-right-arm 1.5s infinite linear; }\n\n@-webkit-keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@-moz-keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@-o-keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@-webkit-keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@-moz-keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@-o-keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@-webkit-keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n\n@-moz-keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n\n@-o-keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n\n@keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n  .bipbop-loader .itens {\n    background-position: center center;\n    background-repeat: no-repeat;\n    height: 20px;\n    position: absolute;\n    opacity: 0;\n    width: 20px;\n    z-index: 1; }\n  .bipbop-loader .item1 {\n    background-image: url(data:image/png;base64,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);\n    left: -30px;\n    top: 40px;\n    -webkit-animation: item-1 3s infinite linear;\n       -moz-animation: item-1 3s infinite linear;\n         -o-animation: item-1 3s infinite linear;\n            animation: item-1 3s infinite linear; }\n\n@-webkit-keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n  .bipbop-loader .item2 {\n    background-image: url(data:image/png;base64,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);\n    left: 67px;\n    opacity: 1;\n    top: 36px;\n    -webkit-animation: item-2 3s infinite linear;\n       -moz-animation: item-2 3s infinite linear;\n         -o-animation: item-2 3s infinite linear;\n            animation: item-2 3s infinite linear; }\n\n@-webkit-keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n  .bipbop-loader .item3 {\n    background-image: url(data:image/png;base64,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);\n    left: -30px;\n    top: 40px;\n    -webkit-animation: item-3 3s infinite linear;\n       -moz-animation: item-3 3s infinite linear;\n         -o-animation: item-3 3s infinite linear;\n            animation: item-3 3s infinite linear; }\n\n@-webkit-keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n  .bipbop-loader .item4 {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAYAAABroNZJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAitJREFUeNqMlF1ojmEYx397vWtbTCLlZLMiRpnVPmptvnImTfIVTWjLx4l8FOXAOBA52VaklJKjNQw1BygnRD5SHLBkUjTaYiw1tY+fk+vRc/C+5aqn+77u639f9/+5/9d1o5Lnm6VeUp+rV9Q5+bAZ8ls7MAJsBD4DZ4FpOZF5sjeovWpJ+IXqdXVNLnw2cpUDdcAU8BZoBnqBsYiPAzeADcBXYGmwegF8ygI7gRbgHVAY8xVAN/AaGAAqgZXAVqAsEo0DrcA11IdqbYpendqj7lX71ZfqgLpb7VabUtga9UEW+AG8T11TEVAKLAwWj4FGYDFQHGwT+wCMZIBBYH0qUAdUA9+BLaHKNuAX0ADUprDNwCDqcvWeOl9tU0fVE0F3lXpL3R/+4Yi3qhWxb1mBCrAdOAfcidr4BlwFngSrMaAeWBK/VgisA44DPUmxJWM2pCsAJoDhWB+NREmsEPDfPrU6aJUF7VH1ZNCvUE+pq8M/pv5W96nl6n21CrVTbUnJdkgdUtvVmbFWqp5Wh9UjKewutSsTxXM3dePPgKdB+SZwJsZMyP0qhe0DyjLA9JA1sQlgEhgC5gFroy0G4z4mU9h6oDgLdAFHoy+mgLlR9h+BTTFWAnuAJuAPsDlEWAB0JBLPBqripH7gAPAFuJw6dUfI3QksigPfAD/zPQU1ap86I/wi9bbamAufMMll56NXLgBtQAlwMOrjvx6lRNYO9ZF6MZ7LnNi/AwDlswzVbPf3PgAAAABJRU5ErkJggg==);\n    left: 67px;\n    top: 38px;\n    -webkit-animation: item-4 3s infinite linear;\n       -moz-animation: item-4 3s infinite linear;\n         -o-animation: item-4 3s infinite linear;\n            animation: item-4 3s infinite linear; }\n\n@-webkit-keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n  .bipbop-loader .floatingCirclesG {\n    position: absolute;\n    width: 375px;\n    height: 375px;\n    top: 50%;\n    left: 50%;\n    margin-top: -187px;\n    margin-left: -187px;\n    opacity: .8;\n    z-index: 5;\n    -webkit-transform: scale(0.6);\n       -moz-transform: scale(0.6);\n        -ms-transform: scale(0.6);\n         -o-transform: scale(0.6);\n            transform: scale(0.6); }\n  .bipbop-loader .f_circleG {\n    position: absolute;\n    background-color: transparent;\n    height: 52px;\n    width: 52px;\n    -webkit-border-radius: 34px;\n       -moz-border-radius: 34px;\n            border-radius: 34px;\n    -webkit-animation-name: f_fadeG;\n       -moz-animation-name: f_fadeG;\n         -o-animation-name: f_fadeG;\n            animation-name: f_fadeG;\n    -webkit-animation-duration: 1.2s;\n       -moz-animation-duration: 1.2s;\n         -o-animation-duration: 1.2s;\n            animation-duration: 1.2s;\n    -webkit-animation-iteration-count: infinite;\n       -moz-animation-iteration-count: infinite;\n         -o-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-direction: linear;\n       -moz-animation-direction: linear;\n         -o-animation-direction: linear;\n            animation-direction: linear; }\n  .bipbop-loader .frotateG_01 {\n    left: 0;\n    top: 153px;\n    -webkit-animation-delay: 0.45s;\n       -moz-animation-delay: 0.45s;\n         -o-animation-delay: 0.45s;\n            animation-delay: 0.45s; }\n  .bipbop-loader .frotateG_02 {\n    left: 44px;\n    top: 44px;\n    -webkit-animation-delay: 0.6s;\n       -moz-animation-delay: 0.6s;\n         -o-animation-delay: 0.6s;\n            animation-delay: 0.6s; }\n  .bipbop-loader .frotateG_03 {\n    left: 153px;\n    top: 0;\n    -webkit-animation-delay: 0.75s;\n       -moz-animation-delay: 0.75s;\n         -o-animation-delay: 0.75s;\n            animation-delay: 0.75s; }\n  .bipbop-loader .frotateG_04 {\n    right: 44px;\n    top: 44px;\n    -webkit-animation-delay: 0.9s;\n       -moz-animation-delay: 0.9s;\n         -o-animation-delay: 0.9s;\n            animation-delay: 0.9s; }\n  .bipbop-loader .frotateG_05 {\n    right: 0;\n    top: 153px;\n    -webkit-animation-delay: 1.05s;\n       -moz-animation-delay: 1.05s;\n         -o-animation-delay: 1.05s;\n            animation-delay: 1.05s; }\n  .bipbop-loader .frotateG_06 {\n    right: 44px;\n    bottom: 44px;\n    -webkit-animation-delay: 1.2s;\n       -moz-animation-delay: 1.2s;\n         -o-animation-delay: 1.2s;\n            animation-delay: 1.2s; }\n  .bipbop-loader .frotateG_07 {\n    left: 153px;\n    bottom: 0;\n    -webkit-animation-delay: 1.35s;\n       -moz-animation-delay: 1.35s;\n         -o-animation-delay: 1.35s;\n            animation-delay: 1.35s; }\n  .bipbop-loader .frotateG_08 {\n    left: 44px;\n    bottom: 44px;\n    -webkit-animation-delay: 1.5s;\n       -moz-animation-delay: 1.5s;\n         -o-animation-delay: 1.5s;\n            animation-delay: 1.5s; }\n\n@-webkit-keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n\n@-moz-keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n\n@-o-keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n\n@keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n";
styleInject(css);

var library = (jquery || zepto);
function buildLoader() {
  var container = library('<div />').addClass('bipbop-loader');
  var floatingCirclesG = library('<div />').addClass('floatingCirclesG');
  var robot = library('<div />').addClass('robo');
  container.append(floatingCirclesG);
  container.append(robot);
  robot.append(library('<div />').addClass('body'));
  robot.append(library('<div />').addClass('left-arm'));
  robot.append(library('<div />').addClass('right-arm'));
  for (var i = 1; i <= 4; i += 1) {
    robot.append(library('<div />').addClass(("itens item" + (i.toString()))));
  }
  for (var i$1 = 1; i$1 <= 8; i$1 += 1) {
    floatingCirclesG.append(library('<div />').addClass(("f_circleG frotateG_0" + (i$1.toString()))));
  }
  return container;
}
var defaults = {
  loader: buildLoader(),
  automaticLoader: true,
};
var loader = null;
var Loader = function Loader() {
  this.registerCounter = 0;
  this.lastLoader = null;
};
Loader.singleton = function singleton () {
  if (!loader) {
    loader = new Loader();
  }
  return loader;
};
Loader.prototype.register = function register () {
    var this$1 = this;
  this.registerCounter += 1;
  this.lastLoader = defaults.loader;
  library('body').append(this.lastLoader);
  return function () { return oneTime(this$1.unregister()); };
};
Loader.prototype.unregister = function unregister () {
  this.registerCounter -= 1;
  if (this.registerCounter) {
    return false;
  }
  this.lastLoader.remove();
  return true;
};
function loaderRequestWatcher(parameters) {
  if ( parameters === void 0 ) parameters = {};
  var myParameteres = parameters;
  var beforeSend = myParameteres.beforeSend;
  var complete = myParameteres.complete;
  var loaderUnregister = null;
  objectAssign(parameters, {
    complete: function complete$1() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (complete) {
        complete.apply.apply(complete, [ this ].concat( args ));
      }
      if (loaderUnregister) {
        loaderUnregister();
      }
    },
    beforeSend: function beforeSend$1() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      loaderUnregister = Loader.singleton().register();
      if (beforeSend) {
        beforeSend.apply.apply(beforeSend, [ this ].concat( args ));
      }
    },
  });
}
function ajax(query, apiKey, parameters) {
  if ( query === void 0 ) query = "SELECT FROM 'INFO'.'INFO'";
  if ( apiKey === void 0 ) apiKey = bipbopFreeKey;
  if ( parameters === void 0 ) parameters = {};
  var adapter = '';
  if (parameters.dataType && parameters.dataType.match(/(\s|^)jsonp(\s|jquery)/gi)) {
    adapter = "USING 'JSONP' ";
  }
  var requestParameters = objectAssign({
    type: 'GET',
    url: ((bipbop.webserviceAddress) + "?q=" + (encodeURIComponent(adapter + query)) + "&apiKey=" + (encodeURIComponent(apiKey))),
    dataType: 'xml',
  }, defaults, parameters);
  if (defaults.loader) {
    loaderRequestWatcher(requestParameters);
  }
  return library.ajax(requestParameters);
}
function validateResponse(ret, callback) {
  var headerException = library(ret).find('BPQL > header > exception');
  if (headerException.length) {
    callback(headerException.attr('source'), headerException.text(), parseInt(headerException.attr('code'), 10), headerException.attr('push') === 'true', ret);
    return true;
  }
  return false;
}
objectAssign(library, { bipbopAssert: validateResponse, bipbopDefaults: defaults, bipbop: ajax });

var Config = {
  websocketAddress: 'wss://irql.bipbop.com.br/ws',
  webserviceAddress: 'https://irql.bipbop.com.br/',
  reconnectAfter: 3000,
};

objectAssign(Config, {
    WebSocket: function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        return BipbopWebSocket.open.apply(BipbopWebSocket, args);
},
    ajax: library
});

return Config;

})));
