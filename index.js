'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jquery = _interopDefault(require('jquery'));

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

var toString = Object.prototype.toString;
var fn_name = function name(fn) {
  if ('string' === typeof fn.displayName && fn.constructor.name) {
    return fn.displayName;
  } else if ('string' === typeof fn.name && fn.name) {
    return fn.name;
  }
  if (
       'object' === typeof fn
    && fn.constructor
    && 'string' === typeof fn.constructor.name
  ) { return fn.constructor.name; }
  var named = fn.toString()
    , type = toString.call(fn).slice(8, -1);
  if ('Function' === type) {
    named = named.substring(named.indexOf('(') + 1, named.indexOf(')'));
  } else {
    named = type;
  }
  return named || 'anonymous';
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
  onetime.displayName = fn_name(fn);
  return onetime;
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

var css_248z = ".bipbop-loader {\n  background-color: rgba(30, 50, 58, 0.8);\n  background-position: center center;\n  background-repeat: no-repeat;\n  height: 100%;\n  left: 0;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  width: 100%; }\n  .bipbop-loader .robo {\n    background-image: url(data:image/png;base64,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);\n    height: 79px;\n    left: 50%;\n    margin-left: -30px;\n    margin-top: -40px;\n    position: relative;\n    top: 50%;\n    width: 60px;\n    z-index: 2; }\n    .bipbop-loader .robo .body {\n      background-image: url(data:image/png;base64,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);\n      height: 24px;\n      left: 13px;\n      position: absolute;\n      top: 40px;\n      width: 34px;\n      z-index: 3;\n      -webkit-animation: slide 1.5s infinite linear;\n         -moz-animation: slide 1.5s infinite linear;\n           -o-animation: slide 1.5s infinite linear;\n              animation: slide 1.5s infinite linear; }\n    .bipbop-loader .robo .left-arm {\n      background-image: url(data:image/png;base64,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);\n      background-position: 60px center;\n      background-repeat: no-repeat;\n      height: 7px;\n      left: -26px;\n      position: absolute;\n      top: 46px;\n      width: 40px;\n      z-index: 2;\n      -webkit-animation: slide-left-arm 1.5s infinite linear;\n         -moz-animation: slide-left-arm 1.5s infinite linear;\n           -o-animation: slide-left-arm 1.5s infinite linear;\n              animation: slide-left-arm 1.5s infinite linear; }\n    .bipbop-loader .robo .right-arm {\n      background-image: url(data:image/png;base64,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);\n      background-position: -15px center;\n      background-repeat: no-repeat;\n      height: 7px;\n      left: 47px;\n      position: absolute;\n      top: 46px;\n      width: 40px;\n      z-index: 2;\n      -webkit-animation: slide-right-arm 1.5s infinite linear;\n         -moz-animation: slide-right-arm 1.5s infinite linear;\n           -o-animation: slide-right-arm 1.5s infinite linear;\n              animation: slide-right-arm 1.5s infinite linear; }\n\n@-webkit-keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@-moz-keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@-o-keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@keyframes slide {\n  0% {\n    top: 40px; }\n  50% {\n    top: 36px; }\n  100% {\n    top: 40px; } }\n\n@-webkit-keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@-moz-keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@-o-keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@keyframes slide-left-arm {\n  0% {\n    background-position: 40px; }\n  25% {\n    background-position: 40px; }\n  50% {\n    background-position: 15px; }\n  100% {\n    background-position: 40px; } }\n\n@-webkit-keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n\n@-moz-keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n\n@-o-keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n\n@keyframes slide-right-arm {\n  0% {\n    background-position: -15px; }\n  50% {\n    background-position: -60px; }\n  75% {\n    background-position: -15px; }\n  100% {\n    background-position: -15px; } }\n  .bipbop-loader .itens {\n    background-position: center center;\n    background-repeat: no-repeat;\n    height: 20px;\n    position: absolute;\n    opacity: 0;\n    width: 20px;\n    z-index: 1; }\n  .bipbop-loader .item1 {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAeFJREFUeNqUlEuIjWEYgJ/z989MgxSrI6ZcykIWsmWjbBQbTRlZjFvKTm5lM2EhmlxqyEooNmyUoogyaZZksjARI51GWEiYYTrnsfBOff3+c+Z46+3rey/P936X90OlifarY+oZdYV6LWy00maOXepP/0pdHVY3qVfV3lbAjH9lD3AZ6I55BlwAXgNfgBe0khaVpXJfHVev/8+Wd6tTBdA3tVawXVS7ZgPuVCcLic/V9epK9VHBN6RWmgH7k8pq6jN1Wt2SBF4pOYZLamcZ8E0ENNS9anc8kcOxtT71q+UypObqfnWfSkU9BRyLO3oJ9AJdwADQA6wBOsP/HZhXuNdh4DEwHxjLgOPA+XCuBu4BjQC/TWC/gZuhqbwCTgBTQJZH4MGAHAKWA3eAzcBEJH0G7gLjwI+w7YhxIXAj8jZU1JmVOoDTAQf4CMwBJoGHwCgwN+ImgHVAX1JpAziZdsp0VHgu5tU4lxrwBFgA/Iq4KvAUuJ3kZ8DSstY7mkAB1gLbgHexQD3AVWBZEjcCDOQlwHpUaowAG4EKcAtYFLatwKoEth340Kovc/Vs4d09UA+oo4ltRF0y2/eVahH6qQDraec/TLWjBFoKaxdYVmkpbKb1aFNy4AiwGBgE3pcF/RkAgDknjbkZc/EAAAAASUVORK5CYII=);\n    left: -30px;\n    top: 40px;\n    -webkit-animation: item-1 3s infinite linear;\n       -moz-animation: item-1 3s infinite linear;\n         -o-animation: item-1 3s infinite linear;\n            animation: item-1 3s infinite linear; }\n\n@-webkit-keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@keyframes item-1 {\n  0% {\n    opacity: 1; }\n  25% {\n    left: -30px;\n    opacity: 1; }\n  50% {\n    left: 15px;\n    opacity: 1; }\n  51% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n  .bipbop-loader .item2 {\n    background-image: url(data:image/png;base64,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);\n    left: 67px;\n    opacity: 1;\n    top: 36px;\n    -webkit-animation: item-2 3s infinite linear;\n       -moz-animation: item-2 3s infinite linear;\n         -o-animation: item-2 3s infinite linear;\n            animation: item-2 3s infinite linear; }\n\n@-webkit-keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes item-2 {\n  0% {\n    left: 67px;\n    opacity: 1; }\n  25% {\n    left: 24px;\n    opacity: 1; }\n  26% {\n    left: 24px;\n    opacity: 0; }\n  75% {\n    left: 67px;\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n  .bipbop-loader .item3 {\n    background-image: url(data:image/png;base64,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);\n    left: -30px;\n    top: 40px;\n    -webkit-animation: item-3 3s infinite linear;\n       -moz-animation: item-3 3s infinite linear;\n         -o-animation: item-3 3s infinite linear;\n            animation: item-3 3s infinite linear; }\n\n@-webkit-keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes item-3 {\n  0% {\n    left: -30px;\n    opacity: 0; }\n  50% {\n    opacity: 0; }\n  75% {\n    left: -30px;\n    opacity: 1; }\n  99% {\n    left: 15px;\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n  .bipbop-loader .item4 {\n    background-image: url(data:image/png;base64,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);\n    left: 67px;\n    top: 38px;\n    -webkit-animation: item-4 3s infinite linear;\n       -moz-animation: item-4 3s infinite linear;\n         -o-animation: item-4 3s infinite linear;\n            animation: item-4 3s infinite linear; }\n\n@-webkit-keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-moz-keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@-o-keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n\n@keyframes item-4 {\n  0% {\n    opacity: 0; }\n  25% {\n    opacity: 0; }\n  37% {\n    opacity: 1; }\n  50% {\n    left: 67px;\n    opacity: 1; }\n  75% {\n    left: 25px;\n    opacity: 1; }\n  76% {\n    opacity: 0; }\n  100% {\n    opacity: 0; } }\n  .bipbop-loader .floatingCirclesG {\n    position: absolute;\n    width: 375px;\n    height: 375px;\n    top: 50%;\n    left: 50%;\n    margin-top: -187px;\n    margin-left: -187px;\n    opacity: .8;\n    z-index: 5;\n    -webkit-transform: scale(0.6);\n       -moz-transform: scale(0.6);\n        -ms-transform: scale(0.6);\n         -o-transform: scale(0.6);\n            transform: scale(0.6); }\n  .bipbop-loader .f_circleG {\n    position: absolute;\n    background-color: transparent;\n    height: 52px;\n    width: 52px;\n    -webkit-border-radius: 34px;\n       -moz-border-radius: 34px;\n            border-radius: 34px;\n    -webkit-animation-name: f_fadeG;\n       -moz-animation-name: f_fadeG;\n         -o-animation-name: f_fadeG;\n            animation-name: f_fadeG;\n    -webkit-animation-duration: 1.2s;\n       -moz-animation-duration: 1.2s;\n         -o-animation-duration: 1.2s;\n            animation-duration: 1.2s;\n    -webkit-animation-iteration-count: infinite;\n       -moz-animation-iteration-count: infinite;\n         -o-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-direction: linear;\n       -moz-animation-direction: linear;\n         -o-animation-direction: linear;\n            animation-direction: linear; }\n  .bipbop-loader .frotateG_01 {\n    left: 0;\n    top: 153px;\n    -webkit-animation-delay: 0.45s;\n       -moz-animation-delay: 0.45s;\n         -o-animation-delay: 0.45s;\n            animation-delay: 0.45s; }\n  .bipbop-loader .frotateG_02 {\n    left: 44px;\n    top: 44px;\n    -webkit-animation-delay: 0.6s;\n       -moz-animation-delay: 0.6s;\n         -o-animation-delay: 0.6s;\n            animation-delay: 0.6s; }\n  .bipbop-loader .frotateG_03 {\n    left: 153px;\n    top: 0;\n    -webkit-animation-delay: 0.75s;\n       -moz-animation-delay: 0.75s;\n         -o-animation-delay: 0.75s;\n            animation-delay: 0.75s; }\n  .bipbop-loader .frotateG_04 {\n    right: 44px;\n    top: 44px;\n    -webkit-animation-delay: 0.9s;\n       -moz-animation-delay: 0.9s;\n         -o-animation-delay: 0.9s;\n            animation-delay: 0.9s; }\n  .bipbop-loader .frotateG_05 {\n    right: 0;\n    top: 153px;\n    -webkit-animation-delay: 1.05s;\n       -moz-animation-delay: 1.05s;\n         -o-animation-delay: 1.05s;\n            animation-delay: 1.05s; }\n  .bipbop-loader .frotateG_06 {\n    right: 44px;\n    bottom: 44px;\n    -webkit-animation-delay: 1.2s;\n       -moz-animation-delay: 1.2s;\n         -o-animation-delay: 1.2s;\n            animation-delay: 1.2s; }\n  .bipbop-loader .frotateG_07 {\n    left: 153px;\n    bottom: 0;\n    -webkit-animation-delay: 1.35s;\n       -moz-animation-delay: 1.35s;\n         -o-animation-delay: 1.35s;\n            animation-delay: 1.35s; }\n  .bipbop-loader .frotateG_08 {\n    left: 44px;\n    bottom: 44px;\n    -webkit-animation-delay: 1.5s;\n       -moz-animation-delay: 1.5s;\n         -o-animation-delay: 1.5s;\n            animation-delay: 1.5s; }\n\n@-webkit-keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n\n@-moz-keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n\n@-o-keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n\n@keyframes f_fadeG {\n  0% {\n    background-color: #f3742b; }\n  100% {\n    background-color: transparent; } }\n";
styleInject(css_248z);

var Config = {
  websocketAddress: 'wss://irql.bipbop.com.br/ws',
  webserviceAddress: 'https://irql.bipbop.com.br/',
  reconnectAfter: 3000,
};

function buildLoader() {
  var container = jquery('<div />').addClass('bipbop-loader');
  var floatingCirclesG = jquery('<div />').addClass('floatingCirclesG');
  var robot = jquery('<div />').addClass('robo');
  container.append(floatingCirclesG);
  container.append(robot);
  robot.append(jquery('<div />').addClass('body'));
  robot.append(jquery('<div />').addClass('left-arm'));
  robot.append(jquery('<div />').addClass('right-arm'));
  for (var i = 1; i <= 4; i += 1) {
    robot.append(jquery('<div />').addClass(("itens item" + (i.toString()))));
  }
  for (var i$1 = 1; i$1 <= 8; i$1 += 1) {
    floatingCirclesG.append(jquery('<div />').addClass(("f_circleG frotateG_0" + (i$1.toString()))));
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
  jquery('body').append(this.lastLoader);
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
    url: ((Config.webserviceAddress) + "?q=" + (encodeURIComponent(adapter + query)) + "&apiKey=" + (encodeURIComponent(apiKey))),
    dataType: 'xml',
  }, defaults, parameters);
  if (defaults.loader) {
    loaderRequestWatcher(requestParameters);
  }
  return jquery.ajax(requestParameters);
}
function validateResponse(ret, callback) {
  var headerException = jquery(ret).find('BPQL > header > exception');
  if (headerException.length) {
    callback(headerException.attr('source'), headerException.text(), parseInt(headerException.attr('code'), 10), headerException.attr('push') === 'true', ret);
    return true;
  }
  return false;
}
objectAssign(jquery, { bipbopAssert: validateResponse, bipbopDefaults: defaults, bipbop: ajax });

objectAssign(Config, {
    WebSocket: function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        return BipbopWebSocket.open.apply(BipbopWebSocket, args);
},
    ajax: jquery
});

module.exports = Config;
