/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(7);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = vendor_d1e1f440a898564f5017;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(46);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(101);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(100);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export newId */
/* unused harmony export serialize */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formToJson; });
/*
    Copyright 2017 Better Software Solutions, LLC.  All rights reserved.
    http://bssdev.biz
    
    10.5.17 ok
*/
var lastId = 0;
function newId(prefix) {
    if (prefix === void 0) { prefix = 'id'; }
    lastId++;
    return "" + prefix + lastId;
}
//
// https://stackoverflow.com/questions/11661187/form-serialize-javascript-no-framework
function serialize(form) {
    var field, s = [];
    if (typeof form == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;
        var i; //
        for (i = 0; i < len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                if (field.type == 'select-multiple') {
                    var j; //
                    for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                        if (field.options[j].selected)
                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                    }
                }
                else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                }
            }
        }
    }
    return s.join('&').replace(/%20/g, '+');
}
//
/*
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool} true if the element is an input, false if not
 */
var isValidElement = function (element) {
    return element.name && element.value;
};
/*
 * Checks if an element’s value can be saved (e.g. not an unselected checkbox).
 * @param  {Element} element  the element to check
 * @return {Boolean} true if the value should be added, false if not
 */
var isValidValue = function (element) {
    return (['checkbox', 'radio'].indexOf(element.type) == -1 || element.checked);
};
//
/*
 * Checks if an input is a checkbox, because checkboxes allow multiple values.
 * @param  {Element} element  the element to check
 * @return {Boolean} true if the element is a checkbox, false if not
 */
var isCheckbox = function (element) { return element.type === 'checkbox'; };
//
/*
 * Checks if an input is a `select` with the `multiple` attribute.
 * @param  {Element} element  the element to check
 * @return {Boolean} true if the element is a multiselect, false if not
 */
var isMultiSelect = function (element) { return element.options && element.multiple; };
/*
 * Retrieves the selected options from a multi-select as an array.
 * @param  {HTMLOptionsCollection} options  the options for the select
 * @return {Array} an array of selected option values
 */
var getSelectValues = function (options) { return [].reduce.call(options, function (values, option) {
    return option.selected ? values.concat(option.value) : values;
}, []); };
//
/*
 * A more verbose implementation of `formToJSON()` to explain how it works.
 *
 * NOTE: This function is unused, and is only here for the purpose of explaining how
 * reducing form elements works.
 *
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object} form data as an object literal
 */
var formToJson = function (elements) { return [].reduce.call(elements, function (data, element) {
    console.log('formToJson()', element);
    // Make sure the element has the required properties and should be added.
    if (isValidElement(element) && isValidValue(element)) {
        /*
         * Some fields allow for more than one value, so we need to check if this
         * is one of those fields and, if so, store the values as an array.
         */
        if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value); //unt
        }
        else if (isMultiSelect(element)) {
            data[element.name] = getSelectValues(element); //unt
        }
        else {
            data[element.name] = element.value;
        }
    }
    return data;
}, {}); };
/* harmony default export */ __webpack_exports__["b"] = (newId);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.tryForceFallback = tryForceFallback;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
exports.resetForTesting = resetForTesting;
var globalElement = null;

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error('react-modal: No elements were found for selector ' + selector + '.');
  }
}

function setElement(element) {
  var useElement = element;
  if (typeof useElement === 'string') {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = 'length' in el ? el[0] : el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}

function tryForceFallback() {
  if (document && document.body) {
    // force fallback to document.body
    setElement(document.body);
    return true;
  }
  return false;
}

function validateElement(appElement) {
  if (!appElement && !globalElement && !tryForceFallback()) {
    throw new Error(['react-modal: Cannot fallback to `document.body`, because it\'s not ready or available.', 'If you are doing server-side rendering, use this function to defined an element.', '`Modal.setAppElement(el)` to make this accessible']);
  }
}

function hide(appElement) {
  validateElement(appElement);
  (appElement || globalElement).setAttribute('aria-hidden', 'true');
}

function show(appElement) {
  validateElement(appElement);
  (appElement || globalElement).removeAttribute('aria-hidden');
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

function resetForTesting() {
  globalElement = document.body;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.add = add;
exports.remove = remove;
exports.totalCount = totalCount;
var classListMap = {};

function get() {
  return classListMap;
}

function add(bodyClass) {
  // Set variable and default if none
  if (!classListMap[bodyClass]) {
    classListMap[bodyClass] = 0;
  }
  classListMap[bodyClass] += 1;
  return bodyClass;
}

function remove(bodyClass) {
  if (classListMap[bodyClass]) {
    classListMap[bodyClass] -= 1;
  }
  return bodyClass;
}

function totalCount() {
  return Object.keys(classListMap).reduce(function (acc, curr) {
    return acc + classListMap[curr];
  }, 0);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _exenv = __webpack_require__(34);

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EE = _exenv2.default;

var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

exports.default = SafeHTMLElement;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTabbableDescendants;
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

var tabbableNode = /input|select|textarea|button|object/;

function hidden(el) {
  return el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style.display === 'none';
}

function visible(element) {
  var parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) break;
    if (hidden(parentElement)) return false;
    parentElement = parentElement.parentNode;
  }
  return true;
}

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

function tabbable(element) {
  var tabIndex = element.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll('*'), 0).filter(tabbable);
}
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./user.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./user.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./ValidationSummary.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./ValidationSummary.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(31);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(9);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_User_Index__ = __webpack_require__(27);
/* v12.22.17 ok*/
/*
    4/17/2018 4:54:09 PM
    React Scaffolding by Better Software Solutions, LLC (http://bssdev.biz)
*/




//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

//export const routes = <Layout>
//		<Route exact path='/' component={Home} />
//		<Route path='/counter' component={Counter} />
//		<Route path='/fetchdata' component={FetchData} />
//		</Layout>;
var routes = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* Layout */], null,
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__components_Home__["a" /* Home */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: '/user', component: __WEBPACK_IMPORTED_MODULE_4__components_User_Index__["a" /* Users */] }));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./site.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./site.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(96);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_site_css__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_site_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_site_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_hot_loader__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes__ = __webpack_require__(15);







var routes = __WEBPACK_IMPORTED_MODULE_6__routes__["a" /* routes */];
function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    __WEBPACK_IMPORTED_MODULE_3_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_2_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4_react_hot_loader__["AppContainer"], null,
        __WEBPACK_IMPORTED_MODULE_2_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["BrowserRouter"], { children: routes, basename: baseUrl })), document.getElementById('react-app'));
}
renderApp();
// Allow Hot Module Replacement
if (false) {
    module.hot.accept('./routes', function () {
        routes = require('./routes').routes;
        renderApp();
    });
}


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Hello, world!"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "Welcome to your new single-page application, built with:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://get.asp.net/' }, "ASP.NET Core"),
                    " and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' }, "C#"),
                    " for cross-platform server-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://facebook.github.io/react/' }, "React"),
                    " and ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://www.typescriptlang.org/' }, "TypeScript"),
                    " for client-side code"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'https://webpack.github.io/' }, "Webpack"),
                    " for building and bundling client-side resources"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: 'http://getbootstrap.com/' }, "Bootstrap"),
                    " for layout and styling")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "To help you get started, we've also set up:"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Client-side navigation"),
                    ". For example, click ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Counter"),
                    " then ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Back"),
                    " to return here."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Webpack dev middleware"),
                    ". In development mode, there's no need to run the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Hot module replacement"),
                    ". In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state."),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("strong", null, "Efficient production builds"),
                    ". In production mode, development-time features are disabled, and the ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "webpack"),
                    " build tool produces minified static CSS and JavaScript files.")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h4", null, "Going further"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                "For larger applications, or for server-side prerendering (i.e., for ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "isomorphic"),
                " or ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "universal"),
                " applications), you should consider using a Flux/Redux-like architecture. You can generate an ASP.NET Core application with React and Redux using ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "dotnet new reactredux"),
                " instead of using this template."));
    };
    return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NavMenu__ = __webpack_require__(23);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'container-fluid' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-3' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__NavMenu__["a" /* NavMenu */], null)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-9' }, this.props.children)));
    };
    return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
    Copyright 2017 Better Software Solutions,LLC. All rights reserved.
    http://bssdev.biz
    
    10.3.17 ok
    This component returns an <a> wo an href that is intended to be used w script.
    Make sure to call e.preventDefault() first.
*/

var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton(props) {
        var _this = _super.call(this, props) || this;
        _this.buttonClick = _this.buttonClick.bind(_this);
        return _this;
    }
    MyButton.prototype.buttonClick = function (tag) {
        this.props.buttonClick(this.props.tag);
    };
    MyButton.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: this.buttonClick }, this.props.children));
    };
    return MyButton;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(4);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* v10.15.17 unt*/


/*
    4/17/2018 4:54:09 PM
    React Scaffolding by Better Software Solutions, LLC (http://bssdev.biz)
*/
var NavMenu = (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'main-nav' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar navbar-inverse' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-header' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: 'button', className: 'navbar-toggle', "data-toggle": 'collapse', "data-target": '.navbar-collapse' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'sr-only' }, "Toggle navigation"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' }),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'icon-bar' })),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], { className: 'navbar-brand', to: '/' }, "Crud Operation in React js")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'clearfix' }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'navbar-collapse collapse' },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", { className: 'nav navbar-nav' },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/', exact: true, activeClassName: 'active' },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-home' }),
                                " Home")),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null,
                            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["NavLink"], { to: '/user', activeClassName: 'active' },
                                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { className: 'glyphicon glyphicon-th-list' }),
                                " User"))))));
    };
    return NavMenu;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pager; });
/* unused harmony export PagerBtn */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pager_css__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pager_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Pager_css__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
    Copyright 2017 Better Software Solutions,LLC. All rights reserved.
    http://bssdev.biz
    
    10.3.17 ok

    Usage:
        PagerProps.buttonClick({pageIndex: (int), tag: (string?)})
            now returns an obj{pageIndex, tag}; use Tag for returning another value.
*/



//
var Pager = (function (_super) {
    __extends(Pager, _super);
    //
    function Pager(props) {
        var _this = _super.call(this, props) || this;
        console.log('pager.props', props);
        _this.that = _this;
        _this.state = _this.toState(_this.props);
        return _this;
    } //ctor
    //
    Pager.prototype.toState = function (props) {
        console.log('toState()', props);
        var hasTotalPageSize = (props.TotalCount && props.PageSize);
        var pageCount = Math.ceil(hasTotalPageSize ? props.TotalCount / props.PageSize : 1);
        return {
            PageCount: pageCount,
            PageIndex: 0,
            PageSize: props.PageSize || 8,
            IsPreviousPage: false,
            IsNextPage: (pageCount > 1 ? true : false),
            Tag: props.Tag
        };
    };
    //
    Pager.prototype.componentWillReceiveProps = function (nextProps) {
        console.log('pager.componentWillReceiveProps', nextProps);
        if (nextProps.TotalCount !== this.props.TotalCount) {
            console.log('props have changed');
            this.setState(this.toState(nextProps));
        }
    };
    //
    Pager.prototype.handleFocus = function (e) {
        e.target.select();
    };
    //
    Pager.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "pager" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PagerBtn, { buttonClick: this.buttonClick.bind(this), buttonId: "first" }, "First"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PagerBtn, { buttonClick: this.buttonClick.bind(this), buttonId: "prev" }, "<"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'page-of' },
                "Page ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { key: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* default */])("inpPage"), type: 'text', value: this.state.PageIndex + 1, onChange: this.pageNoChange.bind(this), onFocus: this.handleFocus }),
                " of ",
                this.state.PageCount),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PagerBtn, { buttonClick: this.buttonClick.bind(this), buttonId: "next" }, ">"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](PagerBtn, { buttonClick: this.buttonClick.bind(this), buttonId: "last" }, "Last"));
    };
    //
    /*This is the PagerBtn handler*/
    Pager.prototype.buttonClick = function (btn) {
        switch (btn) {
            case "first":
                console.log('pager.first');
                this.first();
                break;
            case "prev":
                console.log('pager.prev');
                this.decrementPage();
                break;
            case "next":
                console.log('pager.next');
                this.incrementPage();
                break;
            default:
                console.log('pager.last');
                this.last();
                break;
        }
    };
    //
    /* Called when user types a 'go to' page no.*/
    Pager.prototype.pageNoChange = function (e) {
        var _this = this;
        console.log('pager.pageNoChange(' + e.target.value + ')', this.state);
        var idx = parseInt(e.target.value) - 1;
        if (idx >= 0 && idx < this.state.PageCount) {
            if (idx == 0) {
                this.first();
            }
            if (idx == (this.state.PageCount - 1)) {
                this.last();
            }
            this.setState({
                PageIndex: idx,
                IsPreviousPage: true,
                IsNextPage: (idx < (this.state.PageCount - 2) ? true : false)
            }, function () { _this.props.buttonClick({ pageIndex: idx, tag: _this.state.Tag }); });
        }
    };
    //
    Pager.prototype.incrementPage = function () {
        var _this = this;
        console.log('pager.incrementPage()', this.state);
        if (this.state.IsNextPage) {
            this.setState({
                PageIndex: this.state.PageIndex + 1,
                IsPreviousPage: true,
                IsNextPage: (this.state.PageIndex < (this.state.PageCount - 2) ? true : false)
            }, function () { _this.props.buttonClick({ pageIndex: _this.state.PageIndex, tag: _this.state.Tag }); });
        }
    };
    //
    Pager.prototype.decrementPage = function () {
        var _this = this;
        console.log('pager.decrementPage()', this.state);
        if (this.state.IsPreviousPage) {
            this.setState({
                PageIndex: this.state.PageIndex - 1,
                IsNextPage: true,
                IsPreviousPage: (this.state.PageIndex > 1 ? true : false)
            }, function () { _this.props.buttonClick({ pageIndex: _this.state.PageIndex, tag: _this.state.Tag }); });
        }
    };
    //
    Pager.prototype.pageOf = function () {
        return "Page " + (this.state.PageIndex + 1) + " of " + (this.state.PageCount);
    };
    //
    Pager.prototype.first = function () {
        var _this = this;
        console.log('pager.first()', this.state);
        this.setState({
            PageIndex: 0,
            IsNextPage: (this.state.PageCount > 1 ? true : false),
            IsPreviousPage: false
        }, function () { _this.props.buttonClick({ pageIndex: _this.state.PageIndex, tag: _this.state.Tag }); });
    };
    //
    Pager.prototype.last = function () {
        var _this = this;
        console.log('pager.last()', this.state);
        this.setState({
            PageIndex: this.state.PageCount - 1,
            IsNextPage: false,
            IsPreviousPage: (this.state.PageCount > 1 ? true : false)
        }, function () { _this.props.buttonClick({ pageIndex: _this.state.PageIndex, tag: _this.state.Tag }); });
    };
    return Pager;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"])); //cls

var PagerBtn = (function (_super) {
    __extends(PagerBtn, _super);
    function PagerBtn(props) {
        var _this = _super.call(this, props) || this;
        _this.buttonClick = _this.buttonClick.bind(_this);
        return _this;
    }
    PagerBtn.prototype.buttonClick = function (id) {
        this.props.buttonClick(this.props.buttonId);
    };
    PagerBtn.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: this.buttonClick }, this.props.children));
    };
    return PagerBtn;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));

/* unused harmony default export */ var _unused_webpack_default_export = (Pager);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateEdit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_css__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__user_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Validation_ValidationSummary__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Validation_ValidationSummary_css__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Validation_ValidationSummary_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Validation_ValidationSummary_css__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
    4/17/2018 4:54:08 PM
    React Scaffolding by Better Software Solutions, LLC (http://bssdev.biz)
    
    v10.24.17 ok
    
    Depends:
        models.ts
*/






var CreateEdit = (function (_super) {
    __extends(CreateEdit, _super);
    function CreateEdit(props) {
        var _this = _super.call(this, props) || this;
        if (_this.props.dbaction == "edit") {
            _this.state = { user: null, loading: true, save: false };
            //fetch('api/user/get/' + this.props.id, { method: 'get' })
            fetch('api/user/get' + '/' + _this.props.id, { method: 'get' })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ user: data, loading: false });
            });
        }
        else
            _this.state = { user: null, loading: false, save: false };
        return _this;
    }
    CreateEdit.prototype.handleSave = function (e) {
        var _this = this;
        e.preventDefault();
        console.log('createedit.handleSave()', this.props.dbaction);
        var meth = (this.props.dbaction == "edit" ? "put" : "post");
        var form = document.querySelector('#frmCreateEdit');
        console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* formToJson */])(form));
        //let id = document.getElementById('Id') as HTMLInputElement
        fetch('api/user/' + meth, {
            method: meth,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* formToJson */])(form))
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (data.Success) {
                _this.setState({ save: false, jsonResponse: data });
                _this.props.onSave(true);
            }
            else
                _this.setState({ jsonResponse: data });
        });
    };
    CreateEdit.prototype.render = function () {
        var contents = this.state.loading
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Loading..."))
            : this.renderForm(this.state.user);
        var validation = (this.state.jsonResponse != null) &&
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__Validation_ValidationSummary__["a" /* ValidationSummary */], { message: this.state.jsonResponse.Message, validationErrors: this.state.jsonResponse.ValidationErrors });
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, this.props.dbaction == "edit" ? "Edit User" : "Create User"),
            validation,
            contents);
    };
    CreateEdit.prototype.renderForm = function (item) {
        console.log('CreateEdit.renderForm(' + item + ')');
        if (this.props.dbaction != "edit")
            item = new __WEBPACK_IMPORTED_MODULE_2__models__["a" /* User */]();
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("form", { id: 'frmCreateEdit' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "id"),
            this.props.dbaction == 'edit' ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { id: 'id', name: 'id', type: 'hidden', value: item.id }) : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { id: 'id', name: 'id', type: 'text' }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Name"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { id: 'Name', name: 'Name', type: 'text', defaultValue: item.Name != null ? (item.Name + '') : '' }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Email"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { id: 'Email', name: 'Email', type: 'text', defaultValue: item.Email != null ? (item.Email + '') : '' }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Address"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { id: 'Address', name: 'Address', type: 'text', defaultValue: item.Address != null ? (item.Address + '') : '' }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Phone Number"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { id: 'PhoneNumber', name: 'PhoneNumber', type: 'text', defaultValue: item.PhoneNumber != null ? (item.PhoneNumber + '') : '' }),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: this.handleSave.bind(this) }, "Submit"));
    };
    return CreateEdit;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Details; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_css__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__user_css__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
    4/17/2018 4:54:08 PM
    React Scaffolding by Better Software Solutions, LLC (http://bssdev.biz)
    
    v10.24.17 ok
    
    Depends:
        models.ts
*/


var Details = (function (_super) {
    __extends(Details, _super);
    function Details(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { user: null, loading: true };
        //fetch('api/user/get/' + this.props.id)
        //fetch('api/user/get'  + '/' + id)
        fetch('api/user/get' + '/' + _this.props.id)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ user: data, loading: false });
        });
        return _this;
    }
    Details.prototype.render = function () {
        var contents = this.state.loading
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Loading..."))
            : Details.renderDetails(this.state.user);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "User Details"),
            contents);
    };
    Details.renderDetails = function (item) {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "details" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "id"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, item.id),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Name"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, item.Name),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Email"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, item.Email),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Address"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, item.Address),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null, "Phone Number"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, item.PhoneNumber));
    };
    return Details;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Users; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pager_Pager__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MyButton__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CreateEdit__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Details__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Validation_ValidationSummary_css__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Validation_ValidationSummary_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Validation_ValidationSummary_css__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/*
    4/17/2018 4:54:08 PM
    React Scaffolding by Better Software Solutions, LLC (http://bssdev.biz)
    
    v10.31.17 ok

    Depends:
        components/MyButton.tsx
        components/Pager/*
        models.ts
*/







var Users = (function (_super) {
    __extends(Users, _super);
    function Users(props) {
        var _this = _super.call(this, props) || this;
        _this.that = _this;
        var pager = {
            TotalCount: 1,
            PageIndex: 0,
            PageSize: 7,
        };
        _this.state = {
            user: [],
            loading: true,
            pager: pager,
            pagerLoading: true,
            showCreate: false,
            showDetails: false,
            showEdit: false,
            activeid: 0
        };
        fetch('api/user/indexinfo')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log("user.pager initing", _this.state.pager);
            _this.setState(function (prevState, props) { return ({
                pager: data,
                pagerLoading: false
            }); });
            console.log("user.pager inited", _this.state.pager);
        });
        _this.pagerClick({ pageIndex: 0, tag: _this.state.sort });
        return _this;
    } //ctor
    //
    //handleDelete(id: number) {
    Users.prototype.handleDelete = function (id) {
        var _this = this;
        if (!confirm('Are you sure you want to delete this?'))
            return;
        fetch('api/user/delete' + '/' + id, { method: 'delete' })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (data.Success)
                _this.setState({
                    user: _this.state.user.filter(function (rec) {
                        return (rec.id != id);
                    })
                });
            else
                alert('Error: ' + data.Message);
        });
    };
    //
    Users.prototype.handleCreate = function () {
        console.log("index.handleCreate()");
        this.setState({ showCreate: true, showDetails: false, showEdit: false });
    };
    //
    Users.prototype.handleEdit = function (id) {
        console.log("index.handleEdit(" + id + ")");
        this.setState({ showEdit: true, showDetails: false, showCreate: false, activeid: id });
    };
    //
    Users.prototype.handleDetails = function (id) {
        console.log("index.handleDetails(" + id + ")");
        this.setState({ showDetails: true, showCreate: false, showEdit: false, activeid: id });
    };
    //
    Users.prototype.closeModal = function () {
        this.setState({ showDetails: false, showCreate: false, showEdit: false });
    };
    //
    Users.prototype.handlePopupSave = function (success) {
        if (success) {
            this.setState({ showCreate: false, showEdit: false });
            //nw
            this.setState({ sort: this.state.lastSort, lastSort: "" });
            this.pagerClick({ pageIndex: this.state.pager.PageIndex });
        }
    };
    //
    Users.prototype.render = function () {
        console.log('user.render', this.state, this.state.pager);
        var contents = this.state.loading
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("em", null, "Loading..."))
            : this.renderTable(this.state.user, true);
        var pager = this.state.pagerLoading
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__Pager_Pager__["a" /* Pager */], null)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__Pager_Pager__["a" /* Pager */], __assign({ buttonClick: this.pagerClick.bind(this) }, this.state.pager));
        var popup = this.renderPopup();
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "User"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "action", onClick: this.handleCreate.bind(this) }, "Create"),
            contents,
            pager,
            popup);
    };
    //
    Users.prototype.pagerClick = function (e) {
        var _this = this;
        console.log('user.pagerClick()', e, this.state);
        var sort = this.state.sort;
        if (sort == this.state.lastSort)
            sort = this.toggleSort(sort);
        fetch('api/user/index?page=' + e.pageIndex + "&sort=" + (sort || ""))
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({
                user: data,
                loading: false,
                lastSort: sort
            });
        });
    };
    //
    Users.prototype.handleSort = function (sort) {
        var _this = this;
        console.log("index.handleSort(" + sort + ")");
        console.log('pager state:', this.state.pager);
        var pagerState = this.state.pager;
        pagerState.Tag = sort;
        this.setState({
            sort: sort, loading: true, pager: pagerState
        }, function () {
            _this.pagerClick({ pageIndex: _this.state.pager.PageIndex, tag: sort });
        });
    };
    //
    Users.prototype.renderTable = function (user, allowSort) {
        var _this = this;
        if (allowSort === void 0) { allowSort = false; }
        var headings = this.renderTableHeadings(allowSort);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("table", { className: 'table' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("thead", null, headings),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tbody", null, user.map(function (item) {
                return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", { key: item.id },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null,
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "action", onClick: function () { return _this.handleDelete(item.id); } }, "x"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "action", onClick: function () { return _this.handleEdit(item.id); } }, "edit"),
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { className: "action", onClick: function () { return _this.handleDetails(item.id); } }, "details")),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, item.id),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, item.Name),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, item.Email),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, item.Address),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("td", null, item.PhoneNumber));
            })));
    };
    //
    Users.prototype.renderTableHeadings = function (allowSort) {
        if (allowSort) {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__MyButton__["a" /* MyButton */], { buttonClick: this.handleSort.bind(this), tag: 'id' }, "id")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__MyButton__["a" /* MyButton */], { buttonClick: this.handleSort.bind(this), tag: 'Name' }, "Name")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__MyButton__["a" /* MyButton */], { buttonClick: this.handleSort.bind(this), tag: 'Email' }, "Email")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__MyButton__["a" /* MyButton */], { buttonClick: this.handleSort.bind(this), tag: 'Address' }, "Address")),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null,
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__MyButton__["a" /* MyButton */], { buttonClick: this.handleSort.bind(this), tag: 'PhoneNumber' }, "Phone Number")));
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("tr", null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "id"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Name"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Email"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Address"),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("th", null, "Phone Number"));
        }
    };
    //
    Users.prototype.renderPopup = function () {
        console.log('index.renderPopup()');
        if (!this.state.showCreate && !this.state.showDetails && !this.state.showEdit)
            return null;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_modal__, { isOpen: true, contentLabel: "Crawl" },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onClick: this.closeModal.bind(this), className: "action", title: "close" }, "X"),
            this.renderPopupContent());
    };
    //
    Users.prototype.renderPopupContent = function () {
        if (this.state.showCreate) {
            console.log('index.renderPopupContent(showCreate)');
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__CreateEdit__["a" /* CreateEdit */], { id: null, dbaction: "create", onSave: this.handlePopupSave.bind(this) });
        }
        if (this.state.showEdit) {
            console.log('index.renderPopupContent(showEdit)');
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__CreateEdit__["a" /* CreateEdit */], { id: this.state.activeid, dbaction: "edit", onSave: this.handlePopupSave.bind(this) });
        }
        if (this.state.showDetails) {
            console.log('index.renderPopupContent(showDetails)');
            return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__Details__["a" /* Details */], { id: this.state.activeid });
        }
    };
    //
    /* Adds/Removes ' DESC' to sort*/
    Users.prototype.toggleSort = function (sort) {
        console.log('index.toggleSort(' + sort + ')');
        if (sort == null || sort.length == 0)
            return sort;
        var i = sort.indexOf(" DESC");
        if (i > 0)
            return sort.substr(0, i);
        return sort + " DESC";
    };
    return Users;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"])); //cls



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidationSummary; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
    Copyright 2017 Better Software Solutions,LLC. All rights reserved.
    http://bssdev.biz
    
    10.6.17 ok
    Note: message is only shown if validationErrors contains items.
*/

var ValidationSummary = (function (_super) {
    __extends(ValidationSummary, _super);
    function ValidationSummary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidationSummary.prototype.render = function () {
        return ((this.props.validationErrors != null) &&
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'validation-summ' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, this.props.message),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", null, this.props.validationErrors.map(function (err) {
                    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null, err.Value);
                }))));
    };
    return ValidationSummary;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* unused harmony export JsonResponse */
/* unused harmony export ValidationError */
/*
* 4/17/2018 4:54:09 PM
* 	React Scaffolding by Better Software Solutions, LLC (http://bssdev.biz)
*/
var User = (function () {
    function User() {
    }
    return User;
}());

var JsonResponse = (function () {
    function JsonResponse() {
    }
    return JsonResponse;
}());

var ValidationError = (function () {
    function ValidationError() {
    }
    return ValidationError;
}());



/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/*  10.2.17c targets div.pager,ok\r\n    10.2.17 + pageNo input,ok\r\n    nw,ok\r\n    9.27.17 ok\r\n*/\r\n/*10.2.17c*/\r\ndiv.pager{\r\n    text-align: left;\r\n}\r\n/*10.2.17c button, input{*/\r\ndiv.pager button, \r\ndiv.pager input {\r\n    display: inline !important;\r\n    text-align: center;\r\n}\r\n/*input{\r\n    text-align: center;\r\n}*/\r\n/*10.2.17*/\r\n/*10.2.17c input[type=text]{*/\r\ndiv.pager input[type=text] {\r\n    width: 75px;\r\n}\r\ndiv.page-of{\r\n    display: inline-block;\r\n    padding:0 5px;\r\n}\r\n/*nw*/\r\n@media (max-width: 420px) {\r\n    /*10.2.17c input {*/\r\n    div.pager input {\r\n        max-width: 100px;\r\n    }\r\n}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/* Enter css for styling your component here \r\n v2.26.18 unt\r\n*/\r\ntable.table{\r\n    display: block; /*inline-block;*/\r\n    max-width: 875px;\r\n    overflow-x: scroll;\r\n}\r\nbutton.action {\r\n    border: none;\r\n    text-decoration: underline;\r\n    background: inherit;\r\n}\r\nform input {\r\n    display: block !important;\r\n    text-align: left;\r\n}\r\n/*div.ReactModal__Content {\r\n    left: 25% !important;\r\n}*/\r\nth button {\r\n    border: none;\r\n    background: inherit;\r\n}\r\nth button:hover {\r\n    text-decoration: underline;\r\n}", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/*10.6.17 ok*/\r\ndiv.validation-summ{\r\n    font-weight:bold;\r\n    color:red;\r\n/*}\r\ndiv.validation-summ ul{*/\r\n    border: 1px solid red;\r\n    background: #fefbca;\r\n    border-radius: 5px;\r\n}\r\ndiv.validation-summ div{\r\n    margin: 3px 10px;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "/*\r\n    v2.26.18a ok\r\n*/\r\n.main-nav li .glyphicon {\r\n    margin-right: 10px;\r\n}\r\n\r\n/* Highlighting rules for nav menu items */\r\n.main-nav li a.active,\r\n.main-nav li a.active:hover,\r\n.main-nav li a.active:focus {\r\n    background-color: #4189C7;\r\n    color: white;\r\n}\r\n\r\n/* Keep the nav menu independent of scrolling and on top of other items */\r\n.main-nav {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 1;\r\n    /* scroll menu*/\r\n    height: auto;/*2.26.18 100%;*/\r\n    overflow-y: hidden;/*2.26.18 scroll;*/\r\n}\r\n/* popup */\r\ndiv.ReactModal__Content {\r\n    left: 25% !important;\r\n}\r\n\r\n@media only screen and (max-width: 837px) {\r\n    /* popup */\r\n    div.ReactModal__Content {\r\n        top: 60px !important;\r\n        left: 4% !important;\r\n        right: 4% !important;\r\n        bottom: 4% !important;\r\n    }\r\n}\r\n\r\n@media (max-width: 767px) {\r\n    /* On small screens, the nav menu spans the full width of the screen. Leave a space for it. */\r\n    body {\r\n        padding-top: 50px;\r\n    }\r\n}\r\n\r\n@media (min-width: 768px) {\r\n    /* On small screens, convert the nav menu to a vertical sidebar */\r\n    .main-nav {\r\n        height: 100%;\r\n        width: calc(25% - 20px);\r\n        /* scroll menu*/\r\n        overflow-y: scroll;\r\n    }\r\n        .main-nav .navbar {\r\n            border-radius: 0px;\r\n            border-width: 0px;\r\n        }\r\n\r\n        .main-nav .navbar-header {\r\n            float: none;\r\n        }\r\n\r\n        .main-nav .navbar-collapse {\r\n            border-top: 1px solid #444;\r\n            padding: 0px;\r\n        }\r\n\r\n        .main-nav .navbar ul {\r\n            float: none;\r\n        }\r\n\r\n        .main-nav .navbar li {\r\n            float: none;\r\n            font-size: 15px;\r\n            margin: 6px;\r\n        }\r\n\r\n            .main-nav .navbar li a {\r\n                padding: 10px 16px;\r\n                border-radius: 4px;\r\n            }\r\n\r\n        .main-nav .navbar a {\r\n            /* If a menu item's text is too long, truncate it */\r\n            width: 100%;\r\n            white-space: nowrap;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n        }\r\n    .navbar-inverse {\r\n        min-height: 100%;/*2.26.18 640px;*/\r\n    }\r\n}", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(36);
} else {
  module.exports = require('./AppContainer.dev');
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable react/prop-types */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var Component = React.Component;

var AppContainer = function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer() {
    _classCallCheck(this, AppContainer);

    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
  }

  _createClass(AppContainer, [{
    key: 'render',
    value: function render() {
      if (this.props.component) {
        return React.createElement(this.props.component, this.props.props);
      }

      return React.Children.only(this.props.children);
    }
  }]);

  return AppContainer;
}(Component);

module.exports = AppContainer;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable global-require */



if (true) {
  module.exports = __webpack_require__(38);
} else {
  module.exports = require('./index.dev');
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.AppContainer = __webpack_require__(35);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyOpenClassName = exports.portalClassName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(14);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalPortal = __webpack_require__(40);

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ariaAppHider = __webpack_require__(7);

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _safeHTMLElement = __webpack_require__(9);

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portalClassName = exports.portalClassName = 'ReactModalPortal';
var bodyOpenClassName = exports.bodyOpenClassName = 'ReactModal__Body--open';

var renderSubtreeIntoContainer = _reactDom2.default.unstable_renderSubtreeIntoContainer;

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
      _reactDom2.default.unmountComponentAtNode(_this.node);
      var parent = getParentElement(_this.props.parentSelector);
      parent.removeChild(_this.node);
    }, _this.renderPortal = function (props) {
      _this.portal = renderSubtreeIntoContainer(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.node = document.createElement('div');
      this.node.className = this.props.portalClassName;

      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);

      this.renderPortal(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var isOpen = newProps.isOpen;
      // Stop unnecessary renders if modal is remaining closed

      if (!this.props.isOpen && !isOpen) return;

      var currentParent = getParentElement(this.props.parentSelector);
      var newParent = getParentElement(newProps.parentSelector);

      if (newParent !== currentParent) {
        currentParent.removeChild(this.node);
        newParent.appendChild(this.node);
      }

      this.renderPortal(newProps);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(newProps) {
      if (newProps.portalClassName !== this.props.portalClassName) {
        this.node.className = newProps.portalClassName;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.node || !this.portal) return;

      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }

        setTimeout(this.removePortal, closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'setAppElement',
    value: function setAppElement(element) {
      ariaAppHider.setElement(element);
    }

    /* eslint-disable no-console */

  }, {
    key: 'injectCSS',
    value: function injectCSS() {
      process.env.NODE_ENV !== "production" && console.warn('React-Modal: injectCSS has been deprecated ' + 'and no longer has any effect. It will be removed in a later version');
    }
    /* eslint-enable no-console */

    /* eslint-disable react/no-unused-prop-types */

    /* eslint-enable react/no-unused-prop-types */

  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  portalClassName: _propTypes2.default.string,
  bodyOpenClassName: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  ariaHideApp: _propTypes2.default.bool,
  shouldFocusAfter: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  parentSelector: _propTypes2.default.func,
  aria: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string
};
Modal.defaultProps = {
  isOpen: false,
  portalClassName: portalClassName,
  bodyOpenClassName: bodyOpenClassName,
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: true,
  shouldCloseOnOverlayClick: true,
  parentSelector: function parentSelector() {
    return document.body;
  }
};
Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};
exports.default = Modal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(14);

var _focusManager = __webpack_require__(42);

var focusManager = _interopRequireWildcard(_focusManager);

var _scopeTab = __webpack_require__(43);

var _scopeTab2 = _interopRequireDefault(_scopeTab);

var _ariaAppHider = __webpack_require__(7);

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _refCount = __webpack_require__(8);

var refCount = _interopRequireWildcard(_refCount);

var _bodyClassList = __webpack_require__(41);

var bodyClassList = _interopRequireWildcard(_bodyClassList);

var _safeHTMLElement = __webpack_require__(9);

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: 'ReactModal__Overlay',
  content: 'ReactModal__Content'
};

var TAB_KEY = 9;
var ESC_KEY = 27;

var ModalPortal = function (_Component) {
  _inherits(ModalPortal, _Component);

  function ModalPortal(props) {
    _classCallCheck(this, ModalPortal);

    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

    _this.setFocusAfterRender = function (focus) {
      _this.focusAfterRender = _this.props.shouldFocusAfterRender && focus;
    };

    _this.setOverlayRef = function (overlay) {
      _this.overlay = overlay;
    };

    _this.setContentRef = function (content) {
      _this.content = content;
    };

    _this.afterClose = function () {
      focusManager.returnFocus();
      focusManager.teardownScopedFocus();
    };

    _this.open = function () {
      _this.beforeOpen();
      if (_this.state.afterOpen && _this.state.beforeClose) {
        clearTimeout(_this.closeTimer);
        _this.setState({ beforeClose: false });
      } else {
        focusManager.setupScopedFocus(_this.node);
        focusManager.markForFocusLater();
        _this.setState({ isOpen: true }, function () {
          _this.setState({ afterOpen: true });

          if (_this.props.isOpen && _this.props.onAfterOpen) {
            _this.props.onAfterOpen();
          }
        });
      }
    };

    _this.close = function () {
      _this.beforeClose();
      if (_this.props.closeTimeoutMS > 0) {
        _this.closeWithTimeout();
      } else {
        _this.closeWithoutTimeout();
      }
    };

    _this.focusContent = function () {
      return _this.content && !_this.contentHasFocus() && _this.content.focus();
    };

    _this.closeWithTimeout = function () {
      var closesAt = Date.now() + _this.props.closeTimeoutMS;
      _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
        _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
      });
    };

    _this.closeWithoutTimeout = function () {
      _this.setState({
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      }, _this.afterClose);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === TAB_KEY) {
        (0, _scopeTab2.default)(_this.content, event);
      }
      if (event.keyCode === ESC_KEY) {
        event.preventDefault();
        _this.requestClose(event);
      }
    };

    _this.handleOverlayOnClick = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }

      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
        if (_this.ownerHandlesClose()) {
          _this.requestClose(event);
        } else {
          _this.focusContent();
        }
      }
      _this.shouldClose = null;
      _this.moveFromContentToOverlay = null;
    };

    _this.handleOverlayOnMouseUp = function () {
      if (_this.moveFromContentToOverlay === null) {
        _this.shouldClose = false;
      }
    };

    _this.handleContentOnMouseUp = function () {
      _this.shouldClose = false;
    };

    _this.handleOverlayOnMouseDown = function () {
      _this.moveFromContentToOverlay = false;
    };

    _this.handleContentOnClick = function () {
      _this.shouldClose = false;
    };

    _this.handleContentOnMouseDown = function () {
      _this.shouldClose = false;
      _this.moveFromContentToOverlay = false;
    };

    _this.requestClose = function (event) {
      return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
    };

    _this.ownerHandlesClose = function () {
      return _this.props.onRequestClose;
    };

    _this.shouldBeClosed = function () {
      return !_this.state.isOpen && !_this.state.beforeClose;
    };

    _this.contentHasFocus = function () {
      return document.activeElement === _this.content || _this.content.contains(document.activeElement);
    };

    _this.buildClassName = function (which, additional) {
      var classNames = (typeof additional === 'undefined' ? 'undefined' : _typeof(additional)) === 'object' ? additional : {
        base: CLASS_NAMES[which],
        afterOpen: CLASS_NAMES[which] + '--after-open',
        beforeClose: CLASS_NAMES[which] + '--before-close'
      };
      var className = classNames.base;
      if (_this.state.afterOpen) {
        className = className + ' ' + classNames.afterOpen;
      }
      if (_this.state.beforeClose) {
        className = className + ' ' + classNames.beforeClose;
      }
      return typeof additional === 'string' && additional ? className + ' ' + additional : className;
    };

    _this.ariaAttributes = function (items) {
      return Object.keys(items).reduce(function (acc, name) {
        acc['aria-' + name] = items[name];
        return acc;
      }, {});
    };

    _this.state = {
      afterOpen: false,
      beforeClose: false
    };

    _this.shouldClose = null;
    _this.moveFromContentToOverlay = null;
    return _this;
  }

  _createClass(ModalPortal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Focus needs to be set when mounting and already open
      if (this.props.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (process.env.NODE_ENV !== "production") {
        if (newProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "bodyOpenClassName" prop has been modified. ' + 'This may cause unexpected behavior when multiple modals are open.');
        }
      }
      // Focus only needs to be set once when the modal is being opened
      if (!this.props.isOpen && newProps.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      } else if (this.props.isOpen && !newProps.isOpen) {
        this.close();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.focusAfterRender) {
        this.focusContent();
        this.setFocusAfterRender(false);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.beforeClose();
      clearTimeout(this.closeTimer);
    }
  }, {
    key: 'beforeOpen',
    value: function beforeOpen() {
      var _props = this.props,
          appElement = _props.appElement,
          ariaHideApp = _props.ariaHideApp,
          bodyOpenClassName = _props.bodyOpenClassName;
      // Add body class

      bodyClassList.add(bodyOpenClassName);
      // Add aria-hidden to appElement
      if (ariaHideApp) {
        ariaAppHider.hide(appElement);
      }
    }
  }, {
    key: 'beforeClose',
    value: function beforeClose() {
      var _props2 = this.props,
          appElement = _props2.appElement,
          ariaHideApp = _props2.ariaHideApp,
          bodyOpenClassName = _props2.bodyOpenClassName;
      // Remove class if no more modals are open

      bodyClassList.remove(bodyOpenClassName);
      // Reset aria-hidden attribute if all modals have been removed
      if (ariaHideApp && refCount.totalCount() < 1) {
        ariaAppHider.show(appElement);
      }
    }

    // Don't steal focus from inner elements

  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          overlayClassName = _props3.overlayClassName,
          defaultStyles = _props3.defaultStyles;

      var contentStyles = className ? {} : defaultStyles.content;
      var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

      return this.shouldBeClosed() ? null : _react2.default.createElement(
        'div',
        {
          ref: this.setOverlayRef,
          className: this.buildClassName('overlay', overlayClassName),
          style: _extends({}, overlayStyles, this.props.style.overlay),
          onClick: this.handleOverlayOnClick,
          onMouseDown: this.handleOverlayOnMouseDown,
          onMouseUp: this.handleOverlayOnMouseUp },
        _react2.default.createElement(
          'div',
          _extends({
            ref: this.setContentRef,
            style: _extends({}, contentStyles, this.props.style.content),
            className: this.buildClassName('content', className),
            tabIndex: '-1',
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleContentOnMouseDown,
            onMouseUp: this.handleContentOnMouseUp,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            'aria-label': this.props.contentLabel
          }, this.ariaAttributes(this.props.aria || {})),
          this.props.children
        )
      );
    }
  }]);

  return ModalPortal;
}(_react.Component);

ModalPortal.defaultProps = {
  style: {
    overlay: {},
    content: {}
  }
};
ModalPortal.propTypes = {
  isOpen: _propTypes.PropTypes.bool.isRequired,
  defaultStyles: _propTypes.PropTypes.shape({
    content: _propTypes.PropTypes.object,
    overlay: _propTypes.PropTypes.object
  }),
  style: _propTypes.PropTypes.shape({
    content: _propTypes.PropTypes.object,
    overlay: _propTypes.PropTypes.object
  }),
  className: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.object]),
  overlayClassName: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.object]),
  bodyOpenClassName: _propTypes.PropTypes.string,
  ariaHideApp: _propTypes.PropTypes.bool,
  appElement: _propTypes.PropTypes.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes.PropTypes.func,
  onRequestClose: _propTypes.PropTypes.func,
  closeTimeoutMS: _propTypes.PropTypes.number,
  shouldFocusAfterRender: _propTypes.PropTypes.bool,
  shouldCloseOnOverlayClick: _propTypes.PropTypes.bool,
  role: _propTypes.PropTypes.string,
  contentLabel: _propTypes.PropTypes.string,
  aria: _propTypes.PropTypes.object,
  children: _propTypes.PropTypes.node
};
exports.default = ModalPortal;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.remove = remove;

var _refCount = __webpack_require__(8);

var refCount = _interopRequireWildcard(_refCount);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function add(bodyClass) {
  // Increment class(es) on refCount tracker and add class(es) to body
  bodyClass.split(' ').map(refCount.add).forEach(function (className) {
    return document.body.classList.add(className);
  });
}

function remove(bodyClass) {
  var classListMap = refCount.get();
  // Decrement class(es) from the refCount tracker
  // and remove unused class(es) from body
  bodyClass.split(' ').map(refCount.remove).filter(function (className) {
    return classListMap[className] === 0;
  }).forEach(function (className) {
    return document.body.classList.remove(className);
  });
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlur = handleBlur;
exports.handleFocus = handleFocus;
exports.markForFocusLater = markForFocusLater;
exports.returnFocus = returnFocus;
exports.setupScopedFocus = setupScopedFocus;
exports.teardownScopedFocus = teardownScopedFocus;

var _tabbable = __webpack_require__(10);

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focusLaterElements = [];
var modalElement = null;
var needToFocus = false;

function handleBlur() {
  needToFocus = true;
}

function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(function () {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

function markForFocusLater() {
  focusLaterElements.push(document.activeElement);
}

/* eslint-disable no-console */
function returnFocus() {
  var toFocus = null;
  try {
    toFocus = focusLaterElements.pop();
    toFocus.focus();
    return;
  } catch (e) {
    console.warn(['You tried to return focus to', toFocus, 'but it is not in the DOM anymore'].join(" "));
  }
}
/* eslint-enable no-console */

function setupScopedFocus(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener('blur', handleBlur, false);
    document.addEventListener('focus', handleFocus, true);
  } else {
    window.attachEvent('onBlur', handleBlur);
    document.attachEvent('onFocus', handleFocus);
  }
}

function teardownScopedFocus() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener('blur', handleBlur);
    document.removeEventListener('focus', handleFocus);
  } else {
    window.detachEvent('onBlur', handleBlur);
    document.detachEvent('onFocus', handleFocus);
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scopeTab;

var _tabbable = __webpack_require__(10);

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopeTab(node, event) {
  var tabbable = (0, _tabbable2.default)(node);
  if (!tabbable.length) {
    event.preventDefault();
    return;
  }
  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  var leavingFinalTabbable = finalTabbable === document.activeElement ||
  // handle immediate shift+tab after opening with mouse
  node === document.activeElement;
  if (!leavingFinalTabbable) return;
  event.preventDefault();
  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  target.focus();
}
module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(39);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Modal2.default;
module.exports = exports['default'];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./Pager.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./Pager.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map