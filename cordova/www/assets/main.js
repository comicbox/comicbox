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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var superPropBase = __webpack_require__(/*! ./superPropBase */ "./node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@material/base/component.js":
/*!**************************************************!*\
  !*** ./node_modules/@material/base/component.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/base/foundation.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template F
 */

class MDCComponent {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  static attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new _foundation__WEBPACK_IMPORTED_MODULE_0__["default"]());
  }
  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  constructor(root, foundation = undefined, ...args) {
    /** @protected {!Element} */
    this.root_ = root;
    this.initialize(...args); // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.

    /** @protected {!F} */

    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize()
  /* ...args */
  {} // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.

  /**
   * @return {!F} foundation
   */


  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  }

  initialSyncWithDOM() {// Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  }

  destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  }
  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  }
  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  }
  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  emit(evtType, evtData, shouldBubble = false) {
    let evt;

    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCComponent);

/***/ }),

/***/ "./node_modules/@material/base/foundation.js":
/*!***************************************************!*\
  !*** ./node_modules/@material/base/foundation.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @template A
 */
class MDCFoundation {
  /** @return enum{cssClasses} */
  static get cssClasses() {
    // Classes extending MDCFoundation should implement this method to return an object which exports every
    // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
    return {};
  }
  /** @return enum{strings} */


  static get strings() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
    return {};
  }
  /** @return enum{numbers} */


  static get numbers() {
    // Classes extending MDCFoundation should implement this method to return an object which exports all
    // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
    return {};
  }
  /** @return {!Object} */


  static get defaultAdapter() {
    // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
    // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
    // validation.
    return {};
  }
  /**
   * @param {A=} adapter
   */


  constructor(adapter = {}) {
    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  init() {// Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {// Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCFoundation);

/***/ }),

/***/ "./node_modules/@material/base/index.js":
/*!**********************************************!*\
  !*** ./node_modules/@material/base/index.js ***!
  \**********************************************/
/*! exports provided: MDCFoundation, MDCComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/base/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./node_modules/@material/base/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCComponent", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




/***/ }),

/***/ "./node_modules/@material/drawer/adapter.js":
/*!**************************************************!*\
  !*** ./node_modules/@material/drawer/adapter.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Drawer
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Drawer into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCDrawerAdapter {
  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  addClass(className) {}
  /**
   * Removes a class from the root Element.
   * @param {string} className
   */


  removeClass(className) {}
  /**
   * Returns true if the root Element contains the given class.
   * @param {string} className
   * @return {boolean}
   */


  hasClass(className) {}
  /**
   * @param {!Element} element target element to verify class name
   * @param {string} className class name
   */


  elementHasClass(element, className) {}
  /** @return {!ClientRect} */


  computeBoundingRect() {}
  /**
   * Saves the focus of currently active element.
   */


  saveFocus() {}
  /**
   * Restores focus to element previously saved with 'saveFocus'.
   */


  restoreFocus() {}
  /**
   * Focuses the active / selected navigation item.
   */


  focusActiveNavigationItem() {}
  /**
   * Emits a custom event "MDCDrawer:closed" denoting the drawer has closed.
   */


  notifyClose() {}
  /**
   * Emits a custom event "MDCDrawer:opened" denoting the drawer has opened.
   */


  notifyOpen() {}
  /**
   * Traps focus on root element and focuses the active navigation element.
   */


  trapFocus() {}
  /**
   * Releases focus trap from root element which was set by `trapFocus`
   * and restores focus to where it was prior to calling `trapFocus`.
   */


  releaseFocus() {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCDrawerAdapter);

/***/ }),

/***/ "./node_modules/@material/drawer/constants.js":
/*!****************************************************!*\
  !*** ./node_modules/@material/drawer/constants.js ***!
  \****************************************************/
/*! exports provided: cssClasses, strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses = {
  ROOT: 'mdc-drawer',
  DISMISSIBLE: 'mdc-drawer--dismissible',
  MODAL: 'mdc-drawer--modal',
  OPEN: 'mdc-drawer--open',
  ANIMATE: 'mdc-drawer--animate',
  OPENING: 'mdc-drawer--opening',
  CLOSING: 'mdc-drawer--closing'
};
/** @enum {string} */

const strings = {
  APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
  SCRIM_SELECTOR: '.mdc-drawer-scrim',
  CLOSE_EVENT: 'MDCDrawer:closed',
  OPEN_EVENT: 'MDCDrawer:opened'
};


/***/ }),

/***/ "./node_modules/@material/drawer/dismissible/foundation.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material/drawer/dismissible/foundation.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "./node_modules/@material/drawer/adapter.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/drawer/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCFoundation<!MDCDrawerAdapter>}
 */

class MDCDismissibleDrawerFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /** @return enum {string} */
  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
  }
  /** @return enum {string} */


  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
  }

  static get defaultAdapter() {
    return (
      /** @type {!MDCDrawerAdapter} */
      {
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        hasClass: () =>
        /* className: string */
        {},
        elementHasClass: () =>
        /* element: !Element, className: string */
        {},
        computeBoundingRect: () => {},
        notifyClose: () => {},
        notifyOpen: () => {},
        saveFocus: () => {},
        restoreFocus: () => {},
        focusActiveNavigationItem: () => {},
        trapFocus: () => {},
        releaseFocus: () => {}
      }
    );
  }
  /**
   * Function to open the drawer.
   */


  open() {
    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPEN);
    this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ANIMATE);
    this.adapter_.computeBoundingRect(); // Force reflow.

    this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPENING);
    this.adapter_.saveFocus();
  }
  /**
   * Function to close the drawer.
   */


  close() {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }

    this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].CLOSING);
  }
  /**
   * Extension point for when drawer finishes open animation.
   * @protected
   */


  opened() {}
  /**
   * Extension point for when drawer finishes close animation.
   * @protected
   */


  closed() {}
  /**
   * Returns true if drawer is in open state.
   * @return {boolean}
   */


  isOpen() {
    return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPEN);
  }
  /**
   * Returns true if drawer is animating open.
   * @return {boolean}
   */


  isOpening() {
    return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPENING);
  }
  /**
   * Returns true if drawer is animating closed.
   * @return {boolean}
   */


  isClosing() {
    return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].CLOSING);
  }
  /**
   * Keydown handler to close drawer when key is escape.
   * @param evt
   */


  handleKeydown(evt) {
    const {
      keyCode,
      key
    } = evt;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEscape) {
      this.close();
    }
  }
  /**
   * Handles a transition end event on the root element.
   * @param {!Event} evt
   */


  handleTransitionEnd(evt) {
    const {
      OPENING,
      CLOSING,
      OPEN,
      ANIMATE,
      ROOT
    } = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"]; // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.

    const isElement = evt.target instanceof Element;

    if (!isElement || !this.adapter_.elementHasClass(
    /** @type {!Element} */
    evt.target, ROOT)) {
      return;
    }

    if (this.isClosing()) {
      this.adapter_.removeClass(OPEN);
      this.adapter_.restoreFocus();
      this.closed();
      this.adapter_.notifyClose();
    } else {
      this.adapter_.focusActiveNavigationItem();
      this.opened();
      this.adapter_.notifyOpen();
    }

    this.adapter_.removeClass(ANIMATE);
    this.adapter_.removeClass(OPENING);
    this.adapter_.removeClass(CLOSING);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCDismissibleDrawerFoundation);

/***/ }),

/***/ "./node_modules/@material/drawer/index.js":
/*!************************************************!*\
  !*** ./node_modules/@material/drawer/index.js ***!
  \************************************************/
/*! exports provided: MDCDrawer, MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation, util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCDrawer", function() { return MDCDrawer; });
/* harmony import */ var _material_base_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/index */ "./node_modules/@material/base/index.js");
/* harmony import */ var _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dismissible/foundation */ "./node_modules/@material/drawer/dismissible/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCDismissibleDrawerFoundation", function() { return _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _modal_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal/foundation */ "./node_modules/@material/drawer/modal/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCModalDrawerFoundation", function() { return _modal_foundation__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adapter */ "./node_modules/@material/drawer/adapter.js");
/* harmony import */ var _material_list_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material/list/index */ "./node_modules/@material/list/index.js");
/* harmony import */ var _material_list_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material/list/foundation */ "./node_modules/@material/list/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/drawer/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util */ "./node_modules/@material/drawer/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! focus-trap */ "./node_modules/@material/drawer/node_modules/focus-trap/index.js");
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(focus_trap__WEBPACK_IMPORTED_MODULE_8__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */









/**
 * @extends {MDCComponent<!MDCDismissibleDrawerFoundation>}
 * @final
 */

class MDCDrawer extends _material_base_index__WEBPACK_IMPORTED_MODULE_0__["MDCComponent"] {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {!Element} */

    this.previousFocus_;
    /** @private {!Function} */

    this.handleKeydown_;
    /** @private {!Function} */

    this.handleTransitionEnd_;
    /** @private {!Function} */

    this.focusTrapFactory_;
    /** @private {!FocusTrapInstance} */

    this.focusTrap_;
    /** @private {?Element} */

    this.scrim_;
    /** @private {?Function} */

    this.handleScrimClick_;
    /** @private {?MDCList} */

    this.list_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCDrawer}
   */


  static attachTo(root) {
    return new MDCDrawer(root);
  }
  /**
   * Returns true if drawer is in the open position.
   * @return {boolean}
   */


  get open() {
    return this.foundation_.isOpen();
  }
  /**
   * Toggles the drawer open and closed.
   * @param {boolean} isOpen
   */


  set open(isOpen) {
    if (isOpen) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  initialize(focusTrapFactory = focus_trap__WEBPACK_IMPORTED_MODULE_8___default.a, listFactory = el => new _material_list_index__WEBPACK_IMPORTED_MODULE_4__["MDCList"](el)) {
    const listEl =
    /** @type {!Element} */
    this.root_.querySelector(`.${_material_list_foundation__WEBPACK_IMPORTED_MODULE_5__["default"].cssClasses.ROOT}`);

    if (listEl) {
      this.list_ = listFactory(listEl);
      this.list_.wrapFocus = true;
    }

    this.focusTrapFactory_ = focusTrapFactory;
  }

  initialSyncWithDOM() {
    const {
      MODAL
    } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].cssClasses;

    if (this.root_.classList.contains(MODAL)) {
      const {
        SCRIM_SELECTOR
      } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings;
      this.scrim_ =
      /** @type {!Element} */
      this.root_.parentElement.querySelector(SCRIM_SELECTOR);

      this.handleScrimClick_ = () =>
      /** @type {!MDCModalDrawerFoundation} */
      this.foundation_.handleScrimClick();

      this.scrim_.addEventListener('click', this.handleScrimClick_);
      this.focusTrap_ = _util__WEBPACK_IMPORTED_MODULE_7__["createFocusTrapInstance"](this.root_, this.focusTrapFactory_);
    }

    this.handleKeydown_ = evt => this.foundation_.handleKeydown(evt);

    this.handleTransitionEnd_ = evt => this.foundation_.handleTransitionEnd(evt);

    this.root_.addEventListener('keydown', this.handleKeydown_);
    this.root_.addEventListener('transitionend', this.handleTransitionEnd_);
  }

  destroy() {
    this.root_.removeEventListener('keydown', this.handleKeydown_);
    this.root_.removeEventListener('transitionend', this.handleTransitionEnd_);

    if (this.list_) {
      this.list_.destroy();
    }

    const {
      MODAL
    } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].cssClasses;

    if (this.root_.classList.contains(MODAL)) {
      this.scrim_.removeEventListener('click',
      /** @type {!Function} */
      this.handleScrimClick_); // Ensure drawer is closed to hide scrim and release focus

      this.open = false;
    }
  }

  getDefaultFoundation() {
    /** @type {!MDCDrawerAdapter} */
    const adapter =
    /** @type {!MDCDrawerAdapter} */
    Object.assign({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      hasClass: className => this.root_.classList.contains(className),
      elementHasClass: (element, className) => element.classList.contains(className),
      computeBoundingRect: () => this.root_.getBoundingClientRect(),
      saveFocus: () => {
        this.previousFocus_ = document.activeElement;
      },
      restoreFocus: () => {
        const previousFocus = this.previousFocus_ && this.previousFocus_.focus;

        if (this.root_.contains(document.activeElement) && previousFocus) {
          this.previousFocus_.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemEl = this.root_.querySelector(`.${_material_list_foundation__WEBPACK_IMPORTED_MODULE_5__["default"].cssClasses.LIST_ITEM_ACTIVATED_CLASS}`);

        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: () => this.emit(_constants__WEBPACK_IMPORTED_MODULE_6__["strings"].CLOSE_EVENT, {}, true
      /* shouldBubble */
      ),
      notifyOpen: () => this.emit(_constants__WEBPACK_IMPORTED_MODULE_6__["strings"].OPEN_EVENT, {}, true
      /* shouldBubble */
      ),
      trapFocus: () => this.focusTrap_.activate(),
      releaseFocus: () => this.focusTrap_.deactivate()
    });
    const {
      DISMISSIBLE,
      MODAL
    } = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].cssClasses;

    if (this.root_.classList.contains(DISMISSIBLE)) {
      return new _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"](adapter);
    } else if (this.root_.classList.contains(MODAL)) {
      return new _modal_foundation__WEBPACK_IMPORTED_MODULE_2__["default"](adapter);
    } else {
      throw new Error(`MDCDrawer: Failed to instantiate component. Supported variants are ${DISMISSIBLE} and ${MODAL}.`);
    }
  }

}



/***/ }),

/***/ "./node_modules/@material/drawer/modal/foundation.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material/drawer/modal/foundation.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "./node_modules/@material/drawer/adapter.js");
/* harmony import */ var _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dismissible/foundation */ "./node_modules/@material/drawer/dismissible/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * @extends {MDCDismissibleDrawerFoundation<!MDCDrawerAdapter>}
 */

class MDCModalDrawerFoundation extends _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Called when drawer finishes open animation.
   * @override
   */
  opened() {
    this.adapter_.trapFocus();
  }
  /**
   * Called when drawer finishes close animation.
   * @override
   */


  closed() {
    this.adapter_.releaseFocus();
  }
  /**
   * Handles click event on scrim.
   */


  handleScrimClick() {
    this.close();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCModalDrawerFoundation);

/***/ }),

/***/ "./node_modules/@material/drawer/node_modules/focus-trap/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@material/drawer/node_modules/focus-trap/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tabbable = __webpack_require__(/*! tabbable */ "./node_modules/@material/drawer/node_modules/tabbable/index.js");

var xtend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var doc = document;
  var container = typeof element === 'string' ? doc.querySelector(element) : element;
  var config = xtend({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true
  }, userOptions);
  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };
  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };
  return trap;

  function activate(activateOptions) {
    if (state.active) return;
    updateTabbableNodes();
    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;
    var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;

    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;
    removeListeners();
    state.active = false;
    state.paused = false;
    var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;

    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;

    if (returnFocus) {
      delay(function () {
        tryFocus(state.nodeFocusedBeforeActivation);
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    addListeners();
  }

  function addListeners() {
    if (!state.active) return; // There can be only one listening focus trap at a time

    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }

    listeningFocusTrap = trap;
    updateTabbableNodes(); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    delay(function () {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, true);
    doc.addEventListener('touchstart', checkPointerDown, true);
    doc.addEventListener('click', checkClick, true);
    doc.addEventListener('keydown', checkKey, true);
    return trap;
  }

  function removeListeners() {
    if (!state.active || listeningFocusTrap !== trap) return;
    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    listeningFocusTrap = null;
    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }

    if (typeof optionValue === 'function') {
      node = optionValue();

      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }

    return node;
  }

  function getInitialFocusNode() {
    var node;

    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error("You can't have a focus-trap without at least one focusable element");
    }

    return node;
  } // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  function checkPointerDown(e) {
    if (container.contains(e.target)) return;

    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable.isFocusable(e.target)
      });
    } else {
      e.preventDefault();
    }
  } // In case focus escapes the trap for some strange reason, pull it back in.


  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }

    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  } // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  function checkTab(e) {
    updateTabbableNodes();

    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }

    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

module.exports = focusTrap;

/***/ }),

/***/ "./node_modules/@material/drawer/node_modules/tabbable/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@material/drawer/node_modules/tabbable/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
var candidateSelector = candidateSelectors.join(',');
var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};
  var elementDocument = el.ownerDocument || el;
  var regularTabbables = [];
  var orderedTabbables = [];
  var untouchabilityChecker = new UntouchabilityChecker(elementDocument);
  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;

  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];
    if (!isNodeMatchingSelectorTabbable(candidate, untouchabilityChecker)) continue;
    candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node, untouchabilityChecker) {
  if (!isNodeMatchingSelectorFocusable(node, untouchabilityChecker) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }

  return true;
}

function isTabbable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node, untouchabilityChecker);
}

function isNodeMatchingSelectorFocusable(node, untouchabilityChecker) {
  untouchabilityChecker = untouchabilityChecker || new UntouchabilityChecker(node.ownerDocument || node);

  if (node.disabled || isHiddenInput(node) || untouchabilityChecker.isUntouchable(node)) {
    return false;
  }

  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');

function isFocusable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node, untouchabilityChecker);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr; // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.

  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
} // Array.prototype.find not available in IE.


function find(list, predicate) {
  for (var i = 0, length = list.length; i < length; i++) {
    if (predicate(list[i])) return list[i];
  }
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true; // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.

  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
} // An element is "untouchable" if *it or one of its ancestors* has
// `visibility: hidden` or `display: none`.


function UntouchabilityChecker(elementDocument) {
  this.doc = elementDocument; // Node cache must be refreshed on every check, in case
  // the content of the element has changed. The cache contains tuples
  // mapping nodes to their boolean result.

  this.cache = [];
} // getComputedStyle accurately reflects `visibility: hidden` of ancestors
// but not `display: none`, so we need to recursively check parents.


UntouchabilityChecker.prototype.hasDisplayNone = function hasDisplayNone(node, nodeComputedStyle) {
  if (node === this.doc.documentElement) return false; // Search for a cached result.

  var cached = find(this.cache, function (item) {
    return item === node;
  });
  if (cached) return cached[1];
  nodeComputedStyle = nodeComputedStyle || this.doc.defaultView.getComputedStyle(node);
  var result = false;

  if (nodeComputedStyle.display === 'none') {
    result = true;
  } else if (node.parentNode) {
    result = this.hasDisplayNone(node.parentNode);
  }

  this.cache.push([node, result]);
  return result;
};

UntouchabilityChecker.prototype.isUntouchable = function isUntouchable(node) {
  if (node === this.doc.documentElement) return false;
  var computedStyle = this.doc.defaultView.getComputedStyle(node);
  if (this.hasDisplayNone(node, computedStyle)) return true;
  return computedStyle.visibility === 'hidden';
};

module.exports = tabbable;

/***/ }),

/***/ "./node_modules/@material/drawer/util.js":
/*!***********************************************!*\
  !*** ./node_modules/@material/drawer/util.js ***!
  \***********************************************/
/*! exports provided: createFocusTrapInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFocusTrapInstance", function() { return createFocusTrapInstance; });
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! focus-trap */ "./node_modules/@material/drawer/node_modules/focus-trap/index.js");
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_trap__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @param {!Element} surfaceEl
 * @param {!Function} focusTrapFactory
 * @return {!FocusTrapInstance}
 */

function createFocusTrapInstance(surfaceEl, focusTrapFactory = focus_trap__WEBPACK_IMPORTED_MODULE_0___default.a) {
  return focusTrapFactory(surfaceEl, {
    clickOutsideDeactivates: true,
    initialFocus: false,
    // Navigation drawer handles focusing on active nav item.
    escapeDeactivates: false,
    // Navigation drawer handles ESC.
    returnFocusOnDeactivate: false // Navigation drawer handles restore focus.

  });
}



/***/ }),

/***/ "./node_modules/@material/list/adapter.js":
/*!************************************************!*\
  !*** ./node_modules/@material/list/adapter.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC List. Provides an interface for managing focus.
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
class MDCListAdapter {
  /** @return {number} */
  getListItemCount() {}
  /**
   * @return {number} */


  getFocusedElementIndex() {}
  /**
   * @param {number} index
   * @param {string} attribute
   * @param {string} value
   */


  setAttributeForElementIndex(index, attribute, value) {}
  /**
   * @param {number} index
   * @param {string} attribute
   */


  removeAttributeForElementIndex(index, attribute) {}
  /**
   * @param {number} index
   * @param {string} className
   */


  addClassForElementIndex(index, className) {}
  /**
   * @param {number} index
   * @param {string} className
   */


  removeClassForElementIndex(index, className) {}
  /**
   * Focuses list item at the index specified.
   * @param {number} index
   */


  focusItemAtIndex(index) {}
  /**
   * Sets the tabindex to the value specified for all button/a element children of
   * the list item at the index specified.
   * @param {number} listItemIndex
   * @param {number} tabIndexValue
   */


  setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {}
  /**
   * If the given element has an href, follows the link.
   * @param {!Element} ele
   */


  followHref(ele) {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCListAdapter);

/***/ }),

/***/ "./node_modules/@material/list/constants.js":
/*!**************************************************!*\
  !*** ./node_modules/@material/list/constants.js ***!
  \**************************************************/
/*! exports provided: strings, cssClasses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses = {
  ROOT: 'mdc-list',
  LIST_ITEM_CLASS: 'mdc-list-item',
  LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
  LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated'
};
/** @enum {string} */

const strings = {
  ARIA_ORIENTATION: 'aria-orientation',
  ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
  ARIA_SELECTED: 'aria-selected',
  FOCUSABLE_CHILD_ELEMENTS: `.${cssClasses.LIST_ITEM_CLASS} button:not(:disabled), .${cssClasses.LIST_ITEM_CLASS} a`,
  ENABLED_ITEMS_SELECTOR: '.mdc-list-item:not(.mdc-list-item--disabled)'
};


/***/ }),

/***/ "./node_modules/@material/list/foundation.js":
/*!***************************************************!*\
  !*** ./node_modules/@material/list/foundation.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "./node_modules/@material/list/adapter.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/list/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



const ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];

class MDCListFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** @return enum {string} */
  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
  }
  /** @return enum {string} */


  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
  }
  /**
   * {@see MDCListAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCListAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCListAdapter} */
      {
        getListItemCount: () => {},
        getFocusedElementIndex: () => {},
        setAttributeForElementIndex: () => {},
        removeAttributeForElementIndex: () => {},
        addClassForElementIndex: () => {},
        removeClassForElementIndex: () => {},
        focusItemAtIndex: () => {},
        setTabIndexForListItemChildren: () => {},
        followHref: () => {}
      }
    );
  }
  /**
   * @param {!MDCListAdapter=} adapter
   */


  constructor(adapter) {
    super(Object.assign(MDCListFoundation.defaultAdapter, adapter));
    /** {boolean} */

    this.wrapFocus_ = false;
    /** {boolean} */

    this.isVertical_ = true;
    /** {boolean} */

    this.isSingleSelectionList_ = false;
    /** {number} */

    this.selectedIndex_ = -1;
    /** {boolean} */

    this.useActivatedClass_ = false;
  }
  /**
   * Sets the private wrapFocus_ variable.
   * @param {boolean} value
   */


  setWrapFocus(value) {
    this.wrapFocus_ = value;
  }
  /**
   * Sets the isVertical_ private variable.
   * @param {boolean} value
   */


  setVerticalOrientation(value) {
    this.isVertical_ = value;
  }
  /**
   * Sets the isSingleSelectionList_ private variable.
   * @param {boolean} value
   */


  setSingleSelection(value) {
    this.isSingleSelectionList_ = value;
  }
  /**
   * Sets the useActivatedClass_ private variable.
   * @param {boolean} useActivated
   */


  setUseActivatedClass(useActivated) {
    this.useActivatedClass_ = useActivated;
  }
  /** @param {number} index */


  setSelectedIndex(index) {
    if (index === this.selectedIndex_) {
      return;
    }

    const className = this.useActivatedClass_ ? _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS : _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_SELECTED_CLASS;

    if (this.selectedIndex_ >= 0) {
      this.adapter_.removeAttributeForElementIndex(this.selectedIndex_, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_SELECTED);
      this.adapter_.removeClassForElementIndex(this.selectedIndex_, className);
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', -1);
    }

    if (index >= 0 && this.adapter_.getListItemCount() > index) {
      this.selectedIndex_ = index;
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_SELECTED, true);
      this.adapter_.addClassForElementIndex(this.selectedIndex_, className);
      this.adapter_.setAttributeForElementIndex(this.selectedIndex_, 'tabindex', 0);

      if (this.selectedIndex_ !== 0) {
        this.adapter_.setAttributeForElementIndex(0, 'tabindex', -1);
      }
    }
  }
  /**
   * Focus in handler for the list items.
   * @param evt
   * @param {number} listItemIndex
   */


  handleFocusIn(evt, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, 0);
    }
  }
  /**
   * Focus out handler for the list items.
   * @param {Event} evt
   * @param {number} listItemIndex
   */


  handleFocusOut(evt, listItemIndex) {
    if (listItemIndex >= 0) {
      this.adapter_.setTabIndexForListItemChildren(listItemIndex, -1);
    }
  }
  /**
   * Key handler for the list.
   * @param {Event} evt
   * @param {boolean} isRootListItem
   * @param {number} listItemIndex
   */


  handleKeydown(evt, isRootListItem, listItemIndex) {
    const arrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
    const arrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
    const arrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
    const arrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
    const isHome = evt.key === 'Home' || evt.keyCode === 36;
    const isEnd = evt.key === 'End' || evt.keyCode === 35;
    const isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    const isSpace = evt.key === 'Space' || evt.keyCode === 32;
    let currentIndex = this.adapter_.getFocusedElementIndex();

    if (currentIndex === -1) {
      currentIndex = listItemIndex;

      if (currentIndex < 0) {
        // If this event doesn't have a mdc-list-item ancestor from the
        // current list (not from a sublist), return early.
        return;
      }
    }

    if (this.isVertical_ && arrowDown || !this.isVertical_ && arrowRight) {
      this.preventDefaultEvent_(evt);
      this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && arrowUp || !this.isVertical_ && arrowLeft) {
      this.preventDefaultEvent_(evt);
      this.focusPrevElement(currentIndex);
    } else if (isHome) {
      this.preventDefaultEvent_(evt);
      this.focusFirstElement();
    } else if (isEnd) {
      this.preventDefaultEvent_(evt);
      this.focusLastElement();
    } else if (this.isSingleSelectionList_ && (isEnter || isSpace)) {
      this.preventDefaultEvent_(evt); // Check if the space key was pressed on the list item or a child element.

      if (isRootListItem) {
        this.setSelectedIndex(currentIndex); // Explicitly activate links, since we're preventing default on Enter, and Space doesn't activate them.

        this.adapter_.followHref(currentIndex);
      }
    }
  }
  /**
   * Click handler for the list.
   */


  handleClick() {
    const currentIndex = this.adapter_.getFocusedElementIndex();
    if (currentIndex === -1) return;
    this.setSelectedIndex(currentIndex);
  }
  /**
   * Ensures that preventDefault is only called if the containing element doesn't
   * consume the event, and it will cause an unintended scroll.
   * @param {Event} evt
   * @private
   */


  preventDefaultEvent_(evt) {
    const tagName = `${evt.target.tagName}`.toLowerCase();

    if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
      evt.preventDefault();
    }
  }
  /**
   * Focuses the next element on the list.
   * @param {number} index
   */


  focusNextElement(index) {
    const count = this.adapter_.getListItemCount();
    let nextIndex = index + 1;

    if (nextIndex >= count) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        // Return early because last item is already focused.
        return;
      }
    }

    this.adapter_.focusItemAtIndex(nextIndex);
  }
  /**
   * Focuses the previous element on the list.
   * @param {number} index
   */


  focusPrevElement(index) {
    let prevIndex = index - 1;

    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter_.getListItemCount() - 1;
      } else {
        // Return early because first item is already focused.
        return;
      }
    }

    this.adapter_.focusItemAtIndex(prevIndex);
  }

  focusFirstElement() {
    if (this.adapter_.getListItemCount() > 0) {
      this.adapter_.focusItemAtIndex(0);
    }
  }

  focusLastElement() {
    const lastIndex = this.adapter_.getListItemCount() - 1;

    if (lastIndex >= 0) {
      this.adapter_.focusItemAtIndex(lastIndex);
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCListFoundation);

/***/ }),

/***/ "./node_modules/@material/list/index.js":
/*!**********************************************!*\
  !*** ./node_modules/@material/list/index.js ***!
  \**********************************************/
/*! exports provided: MDCList, MDCListFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCList", function() { return MDCList; });
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/component */ "./node_modules/@material/base/component.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/list/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCListFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adapter */ "./node_modules/@material/list/adapter.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/list/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




/**
 * @extends MDCComponent<!MDCListFoundation>
 */

class MDCList extends _material_base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);
    /** @private {!Function} */

    this.handleKeydown_;
    /** @private {!Function} */

    this.handleClick_;
    /** @private {!Function} */

    this.focusInEventListener_;
    /** @private {!Function} */

    this.focusOutEventListener_;
  }
  /**
   * @param {!Element} root
   * @return {!MDCList}
   */


  static attachTo(root) {
    return new MDCList(root);
  }

  destroy() {
    this.root_.removeEventListener('keydown', this.handleKeydown_);
    this.root_.removeEventListener('click', this.handleClick_);
    this.root_.removeEventListener('focusin', this.focusInEventListener_);
    this.root_.removeEventListener('focusout', this.focusOutEventListener_);
  }

  initialSyncWithDOM() {
    this.handleClick_ = this.foundation_.handleClick.bind(this.foundation_);
    this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
    this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
    this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
    this.root_.addEventListener('keydown', this.handleKeydown_);
    this.root_.addEventListener('focusin', this.focusInEventListener_);
    this.root_.addEventListener('focusout', this.focusOutEventListener_);
    this.layout();
    this.initializeListType();
  }

  layout() {
    const direction = this.root_.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ORIENTATION);
    this.vertical = direction !== _constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ORIENTATION_HORIZONTAL; // List items need to have at least tabindex=-1 to be focusable.

    [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])')).forEach(ele => {
      ele.setAttribute('tabindex', -1);
    }); // Child button/a elements are not tabbable until the list item is focused.

    [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].FOCUSABLE_CHILD_ELEMENTS)).forEach(ele => ele.setAttribute('tabindex', -1));
  }
  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   * @param {Event} evt
   * @private
   */


  getListItemIndex_(evt) {
    let eventTarget =
    /** @type {HTMLElement} */
    evt.target;
    let index = -1; // Find the first ancestor that is a list item or the list.

    while (!eventTarget.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS) && !eventTarget.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].ROOT)) {
      eventTarget = eventTarget.parentElement;
    } // Get the index of the element if it is a list item.


    if (eventTarget.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS)) {
      index = this.listElements.indexOf(eventTarget);
    }

    return index;
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleFocusInEvent_(evt) {
    const index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusIn(evt, index);
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleFocusOutEvent_(evt) {
    const index = this.getListItemIndex_(evt);
    this.foundation_.handleFocusOut(evt, index);
  }
  /**
   * Used to figure out which element was clicked before sending the event to the foundation.
   * @param {Event} evt
   * @private
   */


  handleKeydownEvent_(evt) {
    const index = this.getListItemIndex_(evt);

    if (index >= 0) {
      this.foundation_.handleKeydown(evt, evt.target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS), index);
    }
  }

  initializeListType() {
    // Automatically set single selection if selected/activated classes are present.
    const preselectedElement = this.root_.querySelector(`.${_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS}, .${_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_SELECTED_CLASS}`);

    if (preselectedElement) {
      if (preselectedElement.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS)) {
        this.foundation_.setUseActivatedClass(true);
      }

      this.singleSelection = true;
      this.selectedIndex = this.listElements.indexOf(preselectedElement);
    }
  }
  /** @param {boolean} value */


  set vertical(value) {
    this.foundation_.setVerticalOrientation(value);
  }
  /** @return Array<!Element>*/


  get listElements() {
    return [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ENABLED_ITEMS_SELECTOR));
  }
  /** @param {boolean} value */


  set wrapFocus(value) {
    this.foundation_.setWrapFocus(value);
  }
  /** @param {boolean} isSingleSelectionList */


  set singleSelection(isSingleSelectionList) {
    if (isSingleSelectionList) {
      this.root_.addEventListener('click', this.handleClick_);
    } else {
      this.root_.removeEventListener('click', this.handleClick_);
    }

    this.foundation_.setSingleSelection(isSingleSelectionList);
  }
  /** @param {number} index */


  set selectedIndex(index) {
    this.foundation_.setSelectedIndex(index);
  }
  /** @return {!MDCListFoundation} */


  getDefaultFoundation() {
    return new _foundation__WEBPACK_IMPORTED_MODULE_1__["default"](
    /** @type {!MDCListAdapter} */
    Object.assign({
      getListItemCount: () => this.listElements.length,
      getFocusedElementIndex: () => this.listElements.indexOf(document.activeElement),
      setAttributeForElementIndex: (index, attr, value) => {
        const element = this.listElements[index];

        if (element) {
          element.setAttribute(attr, value);
        }
      },
      removeAttributeForElementIndex: (index, attr) => {
        const element = this.listElements[index];

        if (element) {
          element.removeAttribute(attr);
        }
      },
      addClassForElementIndex: (index, className) => {
        const element = this.listElements[index];

        if (element) {
          element.classList.add(className);
        }
      },
      removeClassForElementIndex: (index, className) => {
        const element = this.listElements[index];

        if (element) {
          element.classList.remove(className);
        }
      },
      focusItemAtIndex: index => {
        const element = this.listElements[index];

        if (element) {
          element.focus();
        }
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const element = this.listElements[listItemIndex];
        const listItemChildren = [].slice.call(element.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].FOCUSABLE_CHILD_ELEMENTS));
        listItemChildren.forEach(ele => ele.setAttribute('tabindex', tabIndexValue));
      },
      followHref: index => {
        const listItem = this.listElements[index];

        if (listItem && listItem.href) {
          listItem.click();
        }
      }
    }));
  }

}



/***/ }),

/***/ "./node_modules/@material/ripple/adapter.js":
/*!**************************************************!*\
  !*** ./node_modules/@material/ripple/adapter.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
class MDCRippleAdapter {
  /** @return {boolean} */
  browserSupportsCssVars() {}
  /** @return {boolean} */


  isUnbounded() {}
  /** @return {boolean} */


  isSurfaceActive() {}
  /** @return {boolean} */


  isSurfaceDisabled() {}
  /** @param {string} className */


  addClass(className) {}
  /** @param {string} className */


  removeClass(className) {}
  /** @param {!EventTarget} target */


  containsEventTarget(target) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  registerInteractionHandler(evtType, handler) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  deregisterInteractionHandler(evtType, handler) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  registerDocumentInteractionHandler(evtType, handler) {}
  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  deregisterDocumentInteractionHandler(evtType, handler) {}
  /**
   * @param {!Function} handler
   */


  registerResizeHandler(handler) {}
  /**
   * @param {!Function} handler
   */


  deregisterResizeHandler(handler) {}
  /**
   * @param {string} varName
   * @param {?number|string} value
   */


  updateCssVariable(varName, value) {}
  /** @return {!ClientRect} */


  computeBoundingRect() {}
  /** @return {{x: number, y: number}} */


  getWindowPageOffset() {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCRippleAdapter);

/***/ }),

/***/ "./node_modules/@material/ripple/constants.js":
/*!****************************************************!*\
  !*** ./node_modules/@material/ripple/constants.js ***!
  \****************************************************/
/*! exports provided: cssClasses, strings, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};
const strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};
const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225,
  // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150,
  // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices

};


/***/ }),

/***/ "./node_modules/@material/ripple/foundation.js":
/*!*****************************************************!*\
  !*** ./node_modules/@material/ripple/foundation.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "./node_modules/@material/ripple/adapter.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/ripple/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./node_modules/@material/ripple/util.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




/**
 * @typedef {{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */

let ActivationStateType;
/**
 * @typedef {{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */

let ListenerInfoType;
/**
 * @typedef {{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */

let ListenersType;
/**
 * @typedef {{
 *   x: number,
 *   y: number
 * }}
 */

let PointType; // Activation events registered on the root element of each instance for activation

const ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown']; // Deactivation events registered on documentElement when a pointer-related down event occurs

const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup']; // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations

/** @type {!Array<!EventTarget>} */

let activatedTargets = [];
/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

class MDCRippleFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
  }

  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
  }

  static get numbers() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"];
  }

  static get defaultAdapter() {
    return {
      browserSupportsCssVars: () =>
      /* boolean - cached */
      {},
      isUnbounded: () =>
      /* boolean */
      {},
      isSurfaceActive: () =>
      /* boolean */
      {},
      isSurfaceDisabled: () =>
      /* boolean */
      {},
      addClass: () =>
      /* className: string */
      {},
      removeClass: () =>
      /* className: string */
      {},
      containsEventTarget: () =>
      /* target: !EventTarget */
      {},
      registerInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      deregisterDocumentInteractionHandler: () =>
      /* evtType: string, handler: EventListener */
      {},
      registerResizeHandler: () =>
      /* handler: EventListener */
      {},
      deregisterResizeHandler: () =>
      /* handler: EventListener */
      {},
      updateCssVariable: () =>
      /* varName: string, value: string */
      {},
      computeBoundingRect: () =>
      /* ClientRect */
      {},
      getWindowPageOffset: () =>
      /* {x: number, y: number} */
      {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCRippleFoundation.defaultAdapter, adapter));
    /** @private {number} */

    this.layoutFrame_ = 0;
    /** @private {!ClientRect} */

    this.frame_ =
    /** @type {!ClientRect} */
    {
      width: 0,
      height: 0
    };
    /** @private {!ActivationStateType} */

    this.activationState_ = this.defaultActivationState_();
    /** @private {number} */

    this.initialSize_ = 0;
    /** @private {number} */

    this.maxRadius_ = 0;
    /** @private {function(!Event)} */

    this.activateHandler_ = e => this.activate_(e);
    /** @private {function(!Event)} */


    this.deactivateHandler_ = e => this.deactivate_(e);
    /** @private {function(?Event=)} */


    this.focusHandler_ = () => this.handleFocus();
    /** @private {function(?Event=)} */


    this.blurHandler_ = () => this.handleBlur();
    /** @private {!Function} */


    this.resizeHandler_ = () => this.layout();
    /** @private {{left: number, top:number}} */


    this.unboundedCoords_ = {
      left: 0,
      top: 0
    };
    /** @private {number} */

    this.fgScale_ = 0;
    /** @private {number} */

    this.activationTimer_ = 0;
    /** @private {number} */

    this.fgDeactivationRemovalTimer_ = 0;
    /** @private {boolean} */

    this.activationAnimationHasEnded_ = false;
    /** @private {!Function} */

    this.activationTimerCallback_ = () => {
      this.activationAnimationHasEnded_ = true;
      this.runDeactivationUXLogicIfReady_();
    };
    /** @private {?Event} */


    this.previousActivationEvent_ = null;
  }
  /**
   * We compute this property so that we are not querying information about the client
   * until the point in time where the foundation requests it. This prevents scenarios where
   * client-side feature-detection may happen too early, such as when components are rendered on the server
   * and then initialized at mount time on the client.
   * @return {boolean}
   * @private
   */


  supportsPressRipple_() {
    return this.adapter_.browserSupportsCssVars();
  }
  /**
   * @return {!ActivationStateType}
   */


  defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationEvent: null,
      isProgrammatic: false
    };
  }
  /** @override */


  init() {
    const supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      const {
        ROOT,
        UNBOUNDED
      } = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.addClass(ROOT);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.addClass(UNBOUNDED); // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple

          this.layoutInternal_();
        }
      });
    }
  }
  /** @override */


  destroy() {
    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
      }

      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
      }

      const {
        ROOT,
        UNBOUNDED
      } = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.removeClass(ROOT);
        this.adapter_.removeClass(UNBOUNDED);
        this.removeCssVars_();
      });
    }

    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  }
  /**
   * @param {boolean} supportsPressRipple Passed from init to save a redundant function call
   * @private
   */


  registerRootHandlers_(supportsPressRipple) {
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(type => {
        this.adapter_.registerInteractionHandler(type, this.activateHandler_);
      });

      if (this.adapter_.isUnbounded()) {
        this.adapter_.registerResizeHandler(this.resizeHandler_);
      }
    }

    this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
    this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
  }
  /**
   * @param {!Event} e
   * @private
   */


  registerDeactivationHandlers_(e) {
    if (e.type === 'keydown') {
      this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }
  /** @private */


  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterInteractionHandler(type, this.activateHandler_);
    });
    this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
    this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

    if (this.adapter_.isUnbounded()) {
      this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    }
  }
  /** @private */


  deregisterDeactivationHandlers_() {
    this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(type => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }
  /** @private */


  removeCssVars_() {
    const {
      strings
    } = MDCRippleFoundation;
    Object.keys(strings).forEach(k => {
      if (k.indexOf('VAR_') === 0) {
        this.adapter_.updateCssVariable(strings[k], null);
      }
    });
  }
  /**
   * @param {?Event} e
   * @private
   */


  activate_(e) {
    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    const activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    } // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction


    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;

    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';
    const hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(target => this.adapter_.containsEventTarget(target));

    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push(
      /** @type {!EventTarget} */
      e.target);
      this.registerDeactivationHandlers_(e);
    }

    activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }

    requestAnimationFrame(() => {
      // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
      activatedTargets = [];

      if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
        // If space was pressed, try again within an rAF call to detect :active, because different UAs report
        // active states inconsistently when they're called within event handling code:
        // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
        // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
        // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
        // variable is set within a rAF callback for a submit button interaction (#2241).
        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);

        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }
      }

      if (!activationState.wasElementMadeActive) {
        // Reset activation state immediately if element was not made active.
        this.activationState_ = this.defaultActivationState_();
      }
    });
  }
  /**
   * @param {?Event} e
   * @private
   */


  checkElementMadeActive_(e) {
    return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
  }
  /**
   * @param {?Event=} event Optional event containing position information.
   */


  activate(event = null) {
    this.activate_(event);
  }
  /** @private */


  animateActivation_() {
    const {
      VAR_FG_TRANSLATE_START,
      VAR_FG_TRANSLATE_END
    } = MDCRippleFoundation.strings;
    const {
      FG_DEACTIVATION,
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      DEACTIVATION_TIMEOUT_MS
    } = MDCRippleFoundation.numbers;
    this.layoutInternal_();
    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {
        startPoint,
        endPoint
      } = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd); // Cancel any ongoing activation/deactivation animations

    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION); // Force layout in order to re-trigger the animation.

    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }
  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  getFgTranslationCoordinates_() {
    const {
      activationEvent,
      wasActivatedByPointer
    } = this.activationState_;
    let startPoint;

    if (wasActivatedByPointer) {
      startPoint = Object(_util__WEBPACK_IMPORTED_MODULE_3__["getNormalizedEventCoords"])(
      /** @type {!Event} */
      activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    } // Center the element around the start point.


    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    const endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return {
      startPoint,
      endPoint
    };
  }
  /** @private */


  runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const {
      FG_DEACTIVATION
    } = MDCRippleFoundation.cssClasses;
    const {
      hasDeactivationUXRun,
      isActivated
    } = this.activationState_;
    const activationHasEnded = hasDeactivationUXRun || !isActivated;

    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(() => {
        this.adapter_.removeClass(FG_DEACTIVATION);
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].FG_DEACTIVATION_MS);
    }
  }
  /** @private */


  rmBoundedActivationClasses_() {
    const {
      FG_ACTIVATION
    } = MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_(); // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.

    setTimeout(() => this.previousActivationEvent_ = null, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  }
  /**
   * @param {?Event} e
   * @private
   */


  deactivate_(e) {
    const activationState = this.activationState_; // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }

    const state =
    /** @type {!ActivationStateType} */
    Object.assign({}, activationState);

    if (activationState.isProgrammatic) {
      const evtObject = null;
      requestAnimationFrame(() => this.animateDeactivation_(evtObject, state));
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(() => {
        this.activationState_.hasDeactivationUXRun = true;
        this.animateDeactivation_(e, state);
        this.resetActivationState_();
      });
    }
  }
  /**
   * @param {?Event=} event Optional event containing position information.
   */


  deactivate(event = null) {
    this.deactivate_(event);
  }
  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  animateDeactivation_(e, {
    wasActivatedByPointer,
    wasElementMadeActive
  }) {
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  }

  layout() {
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }

    this.layoutFrame_ = requestAnimationFrame(() => {
      this.layoutInternal_();
      this.layoutFrame_ = 0;
    });
  }
  /** @private */


  layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();
    const maxDim = Math.max(this.frame_.height, this.frame_.width); // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.

    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius(); // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform

    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  }
  /** @private */


  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE,
      VAR_LEFT,
      VAR_TOP,
      VAR_FG_SCALE
    } = MDCRippleFoundation.strings;
    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }
  /** @param {boolean} unbounded */


  setUnbounded(unbounded) {
    const {
      UNBOUNDED
    } = MDCRippleFoundation.cssClasses;

    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }

  handleFocus() {
    requestAnimationFrame(() => this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

  handleBlur() {
    requestAnimationFrame(() => this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCRippleFoundation);

/***/ }),

/***/ "./node_modules/@material/ripple/index.js":
/*!************************************************!*\
  !*** ./node_modules/@material/ripple/index.js ***!
  \************************************************/
/*! exports provided: MDCRipple, MDCRippleFoundation, RippleCapableSurface, util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCRipple", function() { return MDCRipple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RippleCapableSurface", function() { return RippleCapableSurface; });
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/component */ "./node_modules/@material/base/component.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "./node_modules/@material/ripple/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/ripple/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCRippleFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./node_modules/@material/ripple/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_3__; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */

class MDCRipple extends _material_base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** @param {...?} args */
  constructor(...args) {
    super(...args);
    /** @type {boolean} */

    this.disabled = false;
    /** @private {boolean} */

    this.unbounded_;
  }
  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  static attachTo(root, {
    isUnbounded = undefined
  } = {}) {
    const ripple = new MDCRipple(root); // Only override unbounded behavior if option is explicitly specified

    if (isUnbounded !== undefined) {
      ripple.unbounded =
      /** @type {boolean} */
      isUnbounded;
    }

    return ripple;
  }
  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  static createAdapter(instance) {
    const MATCHES = _util__WEBPACK_IMPORTED_MODULE_3__["getMatchesProperty"](HTMLElement.prototype);
    return {
      browserSupportsCssVars: () => _util__WEBPACK_IMPORTED_MODULE_3__["supportsCssVariables"](window),
      isUnbounded: () => instance.unbounded,
      isSurfaceActive: () => instance.root_[MATCHES](':active'),
      isSurfaceDisabled: () => instance.disabled,
      addClass: className => instance.root_.classList.add(className),
      removeClass: className => instance.root_.classList.remove(className),
      containsEventTarget: target => instance.root_.contains(target),
      registerInteractionHandler: (evtType, handler) => instance.root_.addEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      deregisterInteractionHandler: (evtType, handler) => instance.root_.removeEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => instance.root_.style.setProperty(varName, value),
      computeBoundingRect: () => instance.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset
      })
    };
  }
  /** @return {boolean} */


  get unbounded() {
    return this.unbounded_;
  }
  /** @param {boolean} unbounded */


  set unbounded(unbounded) {
    this.unbounded_ = Boolean(unbounded);
    this.setUnbounded_();
  }
  /**
   * Closure Compiler throws an access control error when directly accessing a
   * protected or private property inside a getter/setter, like unbounded above.
   * By accessing the protected property inside a method, we solve that problem.
   * That's why this function exists.
   * @private
   */


  setUnbounded_() {
    this.foundation_.setUnbounded(this.unbounded_);
  }

  activate() {
    this.foundation_.activate();
  }

  deactivate() {
    this.foundation_.deactivate();
  }

  layout() {
    this.foundation_.layout();
  }
  /**
   * @return {!MDCRippleFoundation}
   * @override
   */


  getDefaultFoundation() {
    return new _foundation__WEBPACK_IMPORTED_MODULE_2__["default"](MDCRipple.createAdapter(this));
  }
  /** @override */


  initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  }

}
/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */


class RippleCapableSurface {}
/** @protected {!Element} */


RippleCapableSurface.prototype.root_;
/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.unbounded;
/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */

RippleCapableSurface.prototype.disabled;


/***/ }),

/***/ "./node_modules/@material/ripple/util.js":
/*!***********************************************!*\
  !*** ./node_modules/@material/ripple/util.js ***!
  \***********************************************/
/*! exports provided: supportsCssVariables, applyPassive, getMatchesProperty, getNormalizedEventCoords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsCssVariables", function() { return supportsCssVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPassive", function() { return applyPassive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatchesProperty", function() { return getMatchesProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizedEventCoords", function() { return getNormalizedEventCoords; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
 * @private {boolean|undefined}
 */
let supportsCssVariables_;
/**
 * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
 * @private {boolean|undefined}
 */

let supportsPassive_;
/**
 * @param {!Window} windowObj
 * @return {boolean}
 */

function detectEdgePseudoVarBug(windowObj) {
  // Detect versions of Edge with buggy var() support
  // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
  const document = windowObj.document;
  const node = document.createElement('div');
  node.className = 'mdc-ripple-surface--test-edge-var-bug';
  document.body.appendChild(node); // The bug exists if ::before style ends up propagating to the parent element.
  // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
  // but Firefox is known to support CSS custom properties correctly.
  // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397

  const computedStyle = windowObj.getComputedStyle(node);
  const hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
  node.remove();
  return hasPseudoVarBug;
}
/**
 * @param {!Window} windowObj
 * @param {boolean=} forceRefresh
 * @return {boolean|undefined}
 */


function supportsCssVariables(windowObj, forceRefresh = false) {
  let supportsCssVariables = supportsCssVariables_;

  if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
    return supportsCssVariables;
  }

  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';

  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes'); // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari

  const weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }

  return supportsCssVariables;
} //

/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */


function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;

    try {
      globalObj.document.addEventListener('test', null, {
        get passive() {
          isSupported = true;
        }

      });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {
    passive: true
  } : false;
}
/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */


function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(p => p in HTMLElementPrototype).pop();
}
/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */


function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {
    x,
    y
  } = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;
  let normalizedX;
  let normalizedY; // Determine touch point relative to the ripple container.

  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {
    x: normalizedX,
    y: normalizedY
  };
}



/***/ }),

/***/ "./node_modules/@material/top-app-bar/adapter.js":
/*!*******************************************************!*\
  !*** ./node_modules/@material/top-app-bar/adapter.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Top App Bar
 *
 * Defines the shape of the adapter expected by the foundation. Implement this
 * adapter to integrate the Top App Bar into your framework. See
 * https://github.com/material-components/material-components-web/blob/master/docs/authoring-components.md
 * for more information.
 *
 * @record
 */
class MDCTopAppBarAdapter {
  /**
   * Adds a class to the root Element.
   * @param {string} className
   */
  addClass(className) {}
  /**
   * Removes a class from the root Element.
   * @param {string} className
   */


  removeClass(className) {}
  /**
   * Returns true if the root Element contains the given class.
   * @param {string} className
   * @return {boolean}
   */


  hasClass(className) {}
  /**
   * Sets the specified inline style property on the root Element to the given value.
   * @param {string} property
   * @param {string} value
   */


  setStyle(property, value) {}
  /**
   * Gets the height of the top app bar.
   * @return {number}
   */


  getTopAppBarHeight() {}
  /**
   * Registers an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  registerNavigationIconInteractionHandler(type, handler) {}
  /**
   * Deregisters an event handler on the navigation icon element for a given event.
   * @param {string} type
   * @param {function(!Event): undefined} handler
   */


  deregisterNavigationIconInteractionHandler(type, handler) {}
  /**
   * Emits an event when the navigation icon is clicked.
   */


  notifyNavigationIconClicked() {}
  /** @param {function(!Event)} handler */


  registerScrollHandler(handler) {}
  /** @param {function(!Event)} handler */


  deregisterScrollHandler(handler) {}
  /** @param {function(!Event)} handler */


  registerResizeHandler(handler) {}
  /** @param {function(!Event)} handler */


  deregisterResizeHandler(handler) {}
  /** @return {number} */


  getViewportScrollY() {}
  /** @return {number} */


  getTotalActionItems() {}

}

/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarAdapter);

/***/ }),

/***/ "./node_modules/@material/top-app-bar/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/@material/top-app-bar/constants.js ***!
  \*********************************************************/
/*! exports provided: strings, cssClasses, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/** @enum {string} */
const cssClasses = {
  FIXED_CLASS: 'mdc-top-app-bar--fixed',
  FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
  SHORT_CLASS: 'mdc-top-app-bar--short',
  SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
  SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed'
};
/** @enum {number} */

const numbers = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
/** @enum {string} */

const strings = {
  ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
  NAVIGATION_EVENT: 'MDCTopAppBar:nav',
  NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
  ROOT_SELECTOR: '.mdc-top-app-bar',
  TITLE_SELECTOR: '.mdc-top-app-bar__title'
};


/***/ }),

/***/ "./node_modules/@material/top-app-bar/fixed/foundation.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material/top-app-bar/fixed/foundation.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../adapter */ "./node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../foundation */ "./node_modules/@material/top-app-bar/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCTopAppBarFoundation<!MDCFixedTopAppBarFoundation>}
 * @final
 */

class MDCFixedTopAppBarFoundation extends _foundation__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /** State variable for the previous scroll iteration top app bar state */

    this.wasScrolled_ = false;

    this.scrollHandler_ = () => this.fixedScrollHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the modifier class
   * on the fixed top app bar.
   */


  fixedScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.wasScrolled_) {
        this.adapter_.removeClass(_constants__WEBPACK_IMPORTED_MODULE_0__["cssClasses"].FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = false;
      }
    } else {
      if (!this.wasScrolled_) {
        this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_0__["cssClasses"].FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = true;
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCFixedTopAppBarFoundation);

/***/ }),

/***/ "./node_modules/@material/top-app-bar/foundation.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material/top-app-bar/foundation.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapter */ "./node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCFoundation<!MDCTopAppBarAdapter>}
 */

class MDCTopAppBarBaseFoundation extends _material_base_foundation__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /** @return enum {string} */
  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_0__["strings"];
  }
  /** @return enum {string} */


  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_0__["cssClasses"];
  }
  /** @return enum {number} */


  static get numbers() {
    return _constants__WEBPACK_IMPORTED_MODULE_0__["numbers"];
  }
  /**
   * {@see MDCTopAppBarAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCTopAppBarAdapter}
   */


  static get defaultAdapter() {
    return (
      /** @type {!MDCTopAppBarAdapter} */
      {
        hasClass: () =>
        /* className: string */
        {},
        addClass: () =>
        /* className: string */
        {},
        removeClass: () =>
        /* className: string */
        {},
        setStyle: () =>
        /* property: string, value: string */
        {},
        getTopAppBarHeight: () => {},
        registerNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        deregisterNavigationIconInteractionHandler: () =>
        /* type: string, handler: EventListener */
        {},
        notifyNavigationIconClicked: () => {},
        registerScrollHandler: () =>
        /* handler: EventListener */
        {},
        deregisterScrollHandler: () =>
        /* handler: EventListener */
        {},
        registerResizeHandler: () =>
        /* handler: EventListener */
        {},
        deregisterResizeHandler: () =>
        /* handler: EventListener */
        {},
        getViewportScrollY: () =>
        /* number */
        0,
        getTotalActionItems: () =>
        /* number */
        0
      }
    );
  }
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */


  constructor(
  /** @type {!MDCTopAppBarAdapter} */
  adapter) {
    super(Object.assign(MDCTopAppBarBaseFoundation.defaultAdapter, adapter));

    this.navClickHandler_ = () => this.adapter_.notifyNavigationIconClicked();

    this.scrollHandler_ = () => {};
  }

  init() {
    this.adapter_.registerNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

  destroy() {
    this.adapter_.deregisterNavigationIconInteractionHandler('click', this.navClickHandler_);
  }

  initScrollHandler() {
    this.adapter_.registerScrollHandler(this.scrollHandler_);
  }

  destroyScrollHandler() {
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarBaseFoundation);

/***/ }),

/***/ "./node_modules/@material/top-app-bar/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@material/top-app-bar/index.js ***!
  \*****************************************************/
/*! exports provided: MDCTopAppBar, MDCTopAppBarBaseFoundation, MDCTopAppBarFoundation, MDCFixedTopAppBarFoundation, MDCShortTopAppBarFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBar", function() { return MDCTopAppBar; });
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapter */ "./node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "./node_modules/@material/base/component.js");
/* harmony import */ var _material_ripple_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/ripple/index */ "./node_modules/@material/ripple/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/top-app-bar/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarBaseFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _fixed_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fixed/foundation */ "./node_modules/@material/top-app-bar/fixed/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCFixedTopAppBarFoundation", function() { return _fixed_foundation__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _short_foundation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./short/foundation */ "./node_modules/@material/top-app-bar/short/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCShortTopAppBarFoundation", function() { return _short_foundation__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _standard_foundation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./standard/foundation */ "./node_modules/@material/top-app-bar/standard/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarFoundation", function() { return _standard_foundation__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */








/**
 * @extends {MDCComponent<!MDCTopAppBarBaseFoundation>}
 * @final
 */

class MDCTopAppBar extends _material_base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {...?} args
   */
  constructor(...args) {
    super(...args);
    /** @private {?Element} */

    this.navIcon_;
    /** @type {?Array<MDCRipple>} */

    this.iconRipples_;
    /** @type {Object} */

    this.scrollTarget_;
  }

  initialize(rippleFactory = el => _material_ripple_index__WEBPACK_IMPORTED_MODULE_2__["MDCRipple"].attachTo(el)) {
    this.navIcon_ = this.root_.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].NAVIGATION_ICON_SELECTOR); // Get all icons in the toolbar and instantiate the ripples

    const icons = [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_ITEM_SELECTOR));

    if (this.navIcon_) {
      icons.push(this.navIcon_);
    }

    this.iconRipples_ = icons.map(icon => {
      const ripple = rippleFactory(icon);
      ripple.unbounded = true;
      return ripple;
    });
  }

  destroy() {
    this.iconRipples_.forEach(iconRipple => iconRipple.destroy());
    super.destroy();
  }

  setScrollTarget(target) {
    this.foundation_.destroyScrollHandler();
    this.scrollTarget_ = target;
    this.foundation_.initScrollHandler();
  }
  /**
   * @param {!Element} root
   * @return {!MDCTopAppBar}
   */


  static attachTo(root) {
    return new MDCTopAppBar(root);
  }
  /**
   * @return {!MDCTopAppBarBaseFoundation}
   */


  getDefaultFoundation() {
    /** @type {!MDCTopAppBarAdapter} */
    const adapter =
    /** @type {!MDCTopAppBarAdapter} */
    Object.assign({
      hasClass: className => this.root_.classList.contains(className),
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      setStyle: (property, value) => this.root_.style.setProperty(property, value),
      getTopAppBarHeight: () => this.root_.clientHeight,
      registerNavigationIconInteractionHandler: (evtType, handler) => {
        if (this.navIcon_) {
          this.navIcon_.addEventListener(evtType, handler);
        }
      },
      deregisterNavigationIconInteractionHandler: (evtType, handler) => {
        if (this.navIcon_) {
          this.navIcon_.removeEventListener(evtType, handler);
        }
      },
      notifyNavigationIconClicked: () => {
        this.emit(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].NAVIGATION_EVENT, {});
      },
      registerScrollHandler: handler => this.scrollTarget_.addEventListener('scroll', handler),
      deregisterScrollHandler: handler => this.scrollTarget_.removeEventListener('scroll', handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportScrollY: () => this.scrollTarget_[this.scrollTarget_ === window ? 'pageYOffset' : 'scrollTop'],
      getTotalActionItems: () => this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_ITEM_SELECTOR).length
    });
    this.scrollTarget_ = window;
    /** @type {!MDCTopAppBarBaseFoundation} */

    let foundation;

    if (this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].SHORT_CLASS)) {
      foundation = new _short_foundation__WEBPACK_IMPORTED_MODULE_6__["default"](adapter);
    } else if (this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].FIXED_CLASS)) {
      foundation = new _fixed_foundation__WEBPACK_IMPORTED_MODULE_5__["default"](adapter);
    } else {
      foundation = new _standard_foundation__WEBPACK_IMPORTED_MODULE_7__["default"](adapter);
    }

    return foundation;
  }

}



/***/ }),

/***/ "./node_modules/@material/top-app-bar/short/foundation.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material/top-app-bar/short/foundation.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "./node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../foundation */ "./node_modules/@material/top-app-bar/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/top-app-bar/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCShortTopAppBarFoundation>}
 * @final
 */

class MDCShortTopAppBarFoundation extends _foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter); // State variable for the current top app bar state

    this.isCollapsed = false;

    this.scrollHandler_ = () => this.shortAppBarScrollHandler_();
  }

  init() {
    super.init();
    const isAlwaysCollapsed = this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_COLLAPSED_CLASS);

    if (this.adapter_.getTotalActionItems() > 0) {
      this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_HAS_ACTION_ITEM_CLASS);
    }

    if (!isAlwaysCollapsed) {
      this.adapter_.registerScrollHandler(this.scrollHandler_);
      this.shortAppBarScrollHandler_();
    }
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
  }
  /**
   * Scroll handler for applying/removing the collapsed modifier class
   * on the short top app bar.
   * @private
   */


  shortAppBarScrollHandler_() {
    const currentScroll = this.adapter_.getViewportScrollY();

    if (currentScroll <= 0) {
      if (this.isCollapsed) {
        this.adapter_.removeClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_COLLAPSED_CLASS);
        this.isCollapsed = false;
      }
    } else {
      if (!this.isCollapsed) {
        this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].SHORT_COLLAPSED_CLASS);
        this.isCollapsed = true;
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCShortTopAppBarFoundation);

/***/ }),

/***/ "./node_modules/@material/top-app-bar/standard/foundation.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@material/top-app-bar/standard/foundation.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adapter */ "./node_modules/@material/top-app-bar/adapter.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../foundation */ "./node_modules/@material/top-app-bar/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/top-app-bar/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



const INITIAL_VALUE = 0;
/**
 * @extends {MDCTopAppBarBaseFoundation<!MDCTopAppBarFoundation>}
 * @final
 */

class MDCTopAppBarFoundation extends _foundation__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {!MDCTopAppBarAdapter} adapter
   */
  constructor(adapter) {
    super(adapter);
    /**
     * Used for diffs of current scroll position vs previous scroll position
     * @private {number}
     */

    this.lastScrollPosition_ = this.adapter_.getViewportScrollY();
    /**
     * Used to verify when the top app bar is completely showing or completely hidden
     * @private {number}
     */

    this.topAppBarHeight_ = this.adapter_.getTopAppBarHeight();
    /**
     * wasDocked_ is used to indicate if the top app bar was docked in the previous
     * scroll handler iteration.
     * @private {boolean}
     */

    this.wasDocked_ = true;
    /**
     * isDockedShowing_ is used to indicate if the top app bar is docked in the fully
     * shown position.
     * @private {boolean}
     */

    this.isDockedShowing_ = true;
    /**
     * Variable for current scroll position of the top app bar
     * @private {number}
     */

    this.currentAppBarOffsetTop_ = 0;
    /**
     * Used to prevent the top app bar from being scrolled out of view during resize events
     * @private {boolean} */

    this.isCurrentlyBeingResized_ = false;
    /**
     * The timeout that's used to throttle the resize events
     * @private {number}
     */

    this.resizeThrottleId_ = INITIAL_VALUE;
    /**
     * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
     * @private {number}
     */

    this.resizeDebounceId_ = INITIAL_VALUE;

    this.scrollHandler_ = () => this.topAppBarScrollHandler_();

    this.resizeHandler_ = () => this.topAppBarResizeHandler_();
  }

  init() {
    super.init();
    this.adapter_.registerScrollHandler(this.scrollHandler_);
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  }

  destroy() {
    super.destroy();
    this.adapter_.deregisterScrollHandler(this.scrollHandler_);
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
    this.adapter_.setStyle('top', '');
  }
  /**
   * Function to determine if the DOM needs to update.
   * @return {boolean}
   * @private
   */


  checkForUpdate_() {
    const offscreenBoundaryTop = -this.topAppBarHeight_;
    const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
    const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen; // If it's partially showing, it can't be docked.

    if (partiallyShowing) {
      this.wasDocked_ = false;
    } else {
      // Not previously docked and not partially showing, it's now docked.
      if (!this.wasDocked_) {
        this.wasDocked_ = true;
        return true;
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen;
        return true;
      }
    }

    return partiallyShowing;
  }
  /**
   * Function to move the top app bar if needed.
   * @private
   */


  moveTopAppBar_() {
    if (this.checkForUpdate_()) {
      // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
      // so the top app bar doesn't show if the window resizes and the new height > the old height.
      let offset = this.currentAppBarOffsetTop_;

      if (Math.abs(offset) >= this.topAppBarHeight_) {
        offset = -_constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].MAX_TOP_APP_BAR_HEIGHT;
      }

      this.adapter_.setStyle('top', offset + 'px');
    }
  }
  /**
   * Scroll handler for the default scroll behavior of the top app bar.
   * @private
   */


  topAppBarScrollHandler_() {
    const currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
    const diff = currentScrollPosition - this.lastScrollPosition_;
    this.lastScrollPosition_ = currentScrollPosition; // If the window is being resized the lastScrollPosition_ needs to be updated but the
    // current scroll of the top app bar should stay in the same position.

    if (!this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff;

      if (this.currentAppBarOffsetTop_ > 0) {
        this.currentAppBarOffsetTop_ = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
      }

      this.moveTopAppBar_();
    }
  }
  /**
   * Top app bar resize handler that throttle/debounce functions that execute updates.
   * @private
   */


  topAppBarResizeHandler_() {
    // Throttle resize events 10 p/s
    if (!this.resizeThrottleId_) {
      this.resizeThrottleId_ = setTimeout(() => {
        this.resizeThrottleId_ = INITIAL_VALUE;
        this.throttledResizeHandler_();
      }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }

    this.isCurrentlyBeingResized_ = true;

    if (this.resizeDebounceId_) {
      clearTimeout(this.resizeDebounceId_);
    }

    this.resizeDebounceId_ = setTimeout(() => {
      this.topAppBarScrollHandler_();
      this.isCurrentlyBeingResized_ = false;
      this.resizeDebounceId_ = INITIAL_VALUE;
    }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  }
  /**
   * Throttled function that updates the top app bar scrolled values if the
   * top app bar height changes.
   * @private
   */


  throttledResizeHandler_() {
    const currentHeight = this.adapter_.getTopAppBarHeight();

    if (this.topAppBarHeight_ !== currentHeight) {
      this.wasDocked_ = false; // Since the top app bar has a different height depending on the screen width, this
      // will ensure that the top app bar remains in the correct location if
      // completely hidden and a resize makes the top app bar a different height.

      this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
      this.topAppBarHeight_ = currentHeight;
    }

    this.topAppBarScrollHandler_();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarFoundation);

/***/ }),

/***/ "./node_modules/autobind-decorator/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/autobind-decorator/lib/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

exports.default = autobind;
/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */

function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(undefined, arguments);
  } else {
    return boundMethod.apply(undefined, arguments);
  }
}
/**
 * Use boundMethod to bind all methods on the target.prototype
 */


function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys = void 0; // Use Reflect if exists

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype); // use symbols if support is provided

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key); // Only methods need binding

    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}
/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */


function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error('@autobind decorator can only be applied to methods not: ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
  } // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.


  var definingProperty = false;
  return {
    configurable: true,
    get: function get() {
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}

/***/ }),

/***/ "./node_modules/bind-decorator/index.js":
/*!**********************************************!*\
  !*** ./node_modules/bind-decorator/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var constants;

(function (constants) {
  constants.typeOfFunction = 'function';
  constants.boolTrue = true;
})(constants || (constants = {}));

function bind(target, propertyKey, descriptor) {
  if (!descriptor || typeof descriptor.value !== constants.typeOfFunction) {
    throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
  }

  return {
    configurable: constants.boolTrue,
    get: function () {
      var bound = descriptor.value.bind(this); // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.

      Object.defineProperty(this, propertyKey, {
        value: bound,
        configurable: constants.boolTrue,
        writable: constants.boolTrue
      });
      return bound;
    }
  };
}

exports.bind = bind;
exports.default = bind;

/***/ }),

/***/ "./node_modules/history/DOMUtils.js":
/*!******************************************!*\
  !*** ./node_modules/history/DOMUtils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */


var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
};
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */


var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */


var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */


var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),

/***/ "./node_modules/history/LocationUtils.js":
/*!***********************************************!*\
  !*** ./node_modules/history/LocationUtils.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _resolvePathname = __webpack_require__(/*! resolve-pathname */ "./node_modules/resolve-pathname/index.js");

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__(/*! value-equal */ "./node_modules/value-equal/index.js");

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/PathUtils.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),

/***/ "./node_modules/history/PathUtils.js":
/*!*******************************************!*\
  !*** ./node_modules/history/PathUtils.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;
  return path;
};

/***/ }),

/***/ "./node_modules/history/createHashHistory.js":
/*!***************************************************!*\
  !*** ./node_modules/history/createHashHistory.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _warning = __webpack_require__(/*! warning */ "./node_modules/warning/browser.js");

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(/*! ./LocationUtils */ "./node_modules/history/LocationUtils.js");

var _PathUtils = __webpack_require__(/*! ./PathUtils */ "./node_modules/history/PathUtils.js");

var _createTransitionManager = __webpack_require__(/*! ./createTransitionManager */ "./node_modules/history/createTransitionManager.js");

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(/*! ./DOMUtils */ "./node_modules/history/DOMUtils.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var HashChangeEvent = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');
  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Hash history needs a DOM');
  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();
  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;
  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());
    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');
    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);
    return (0, _LocationUtils.createLocation)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }; // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)]; // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');
    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');
        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');
    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
};

exports.default = createHashHistory;

/***/ }),

/***/ "./node_modules/history/createTransitionManager.js":
/*!*********************************************************!*\
  !*** ./node_modules/history/createTransitionManager.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__(/*! warning */ "./node_modules/warning/browser.js");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ "./node_modules/preact-material-components/Base/MaterialComponent.js":
/*!***************************************************************************!*\
  !*** ./node_modules/preact-material-components/Base/MaterialComponent.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MaterialComponent = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _ripple = __webpack_require__(/*! @material/ripple */ "./node_modules/@material/ripple/index.js");

var _bindDecorator = __webpack_require__(/*! bind-decorator */ "./node_modules/bind-decorator/index.js");

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var doNotRemoveProps = ['disabled'];
/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */

var MaterialComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MaterialComponent, _Component);

  function MaterialComponent() {
    (0, _classCallCheck2.default)(this, MaterialComponent);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MaterialComponent).apply(this, arguments));
  }

  (0, _createClass2.default)(MaterialComponent, [{
    key: "render",
    value: function render(props) {
      if (!this.classText) {
        this.classText = this.buildClassName(props);
      } // Fetch a VNode


      var componentProps = props;
      var userDefinedClasses = componentProps.className || componentProps.class || ''; // We delete class props and add them later in the final
      // step so every component does not need to handle user specified classes.

      if (componentProps.class) {
        delete componentProps.class;
      }

      if (componentProps.className) {
        delete componentProps.className;
      }

      var element = this.materialDom(componentProps);
      element.attributes = element.attributes || {};
      element.attributes.className = "".concat(userDefinedClasses, " ").concat(this.getClassName(element)).split(' ').filter(function (value, index, self) {
        return self.indexOf(value) === index && value !== '';
      }) // Unique + exclude empty class names
      .join(' '); // Clean this shit of proxy attributes

      this.mdcProps.forEach(function (prop) {
        // TODO: Fix this better
        if (prop in doNotRemoveProps) {
          return;
        }

        delete element.attributes[prop];
      });
      return element;
    }
    /** Attach the ripple effect */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.ripple && this.control) {
        this.ripple = new _ripple.MDCRipple(this.control);
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps) {
      if (this.MDComponent && this.mdcNotifyProps) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.mdcNotifyProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;

            if (this.props[prop] !== nextProps[prop]) {
              this.MDComponent[prop] = nextProps[prop];
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.mdcProps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _prop = _step2.value;

          if (this.props[_prop] !== nextProps[_prop]) {
            this.classText = this.buildClassName(nextProps);
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.ripple) {
        this.ripple.destroy();
      }
    }
  }, {
    key: "afterComponentDidMount",
    value: function afterComponentDidMount() {
      if (this.MDComponent && this.mdcNotifyProps) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.mdcNotifyProps[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var prop = _step3.value;
            this.MDComponent[prop] = this.props[prop];
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } // Shared setter for the root element ref

  }, {
    key: "setControlRef",
    value: function setControlRef(control) {
      this.control = control;
    }
    /** Build the className based on component names and mdc props */

  }, {
    key: "buildClassName",
    value: function buildClassName(props) {
      // Class name based on component name
      var classText = 'mdc-' + this.componentName; // Loop over mdcProps to turn them into classNames

      for (var propKey in props) {
        if (props.hasOwnProperty(propKey)) {
          var prop = props[propKey];

          if (typeof prop === 'boolean' && prop) {
            if (this.mdcProps.indexOf(propKey) !== -1) {
              classText += " mdc-".concat(this.componentName, "--").concat(propKey);
            }
          }
        }
      }

      return classText;
    }
    /** Returns the class name for element */

  }, {
    key: "getClassName",
    value: function getClassName(element) {
      if (!element) {
        return '';
      }

      var attrs = element.attributes = element.attributes || {};
      var classText = this.classText;

      if (attrs.class) {
        classText += ' ' + attrs.class;
      }

      if (attrs.className && attrs.className !== attrs.class) {
        classText += ' ' + attrs.className;
      }

      return classText;
    }
  }]);
  return MaterialComponent;
}(_preact.Component);

exports.MaterialComponent = MaterialComponent;

__decorate([_bindDecorator.bind], MaterialComponent.prototype, "setControlRef", null);

var _default = MaterialComponent;
exports.default = _default;

/***/ }),

/***/ "./node_modules/preact-material-components/Button/style.css":
/*!******************************************************************!*\
  !*** ./node_modules/preact-material-components/Button/style.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-material-components/Drawer/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/preact-material-components/Drawer/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Drawer = exports.DrawerItem = exports.DrawerContent = exports.DrawerHeader = void 0;

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _drawer = __webpack_require__(/*! @material/drawer */ "./node_modules/@material/drawer/index.js");

var _bindDecorator = __webpack_require__(/*! bind-decorator */ "./node_modules/bind-decorator/index.js");

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _MaterialComponent4 = _interopRequireDefault(__webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/Base/MaterialComponent.js"));

var _List = __webpack_require__(/*! ../List */ "./node_modules/preact-material-components/List/index.js");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DrawerHeader =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(DrawerHeader, _MaterialComponent);

  function DrawerHeader() {
    var _this;

    (0, _classCallCheck2.default)(this, DrawerHeader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DrawerHeader).apply(this, arguments));
    _this.componentName = 'drawer__header';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(DrawerHeader, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("header", Object.assign({
        ref: this.setControlRef
      }, props), (0, _preact.h)("div", {
        className: "mdc-drawer__header-content"
      }, props.children));
    }
  }]);
  return DrawerHeader;
}(_MaterialComponent4.default);

exports.DrawerHeader = DrawerHeader;

var DrawerContent =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(DrawerContent, _MaterialComponent2);

  function DrawerContent() {
    var _this2;

    (0, _classCallCheck2.default)(this, DrawerContent);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DrawerContent).apply(this, arguments));
    _this2.componentName = 'drawer__content';
    _this2.mdcProps = [];
    return _this2;
  }

  (0, _createClass2.default)(DrawerContent, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", {
        class: "mdc-drawer__content"
      }, (0, _preact.h)("nav", Object.assign({
        className: "mdc-list",
        ref: this.setControlRef
      }, props), props.children));
    }
  }]);
  return DrawerContent;
}(_MaterialComponent4.default);

exports.DrawerContent = DrawerContent;

var DrawerItem =
/*#__PURE__*/
function (_ListLinkItem) {
  (0, _inherits2.default)(DrawerItem, _ListLinkItem);

  function DrawerItem() {
    (0, _classCallCheck2.default)(this, DrawerItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DrawerItem).apply(this, arguments));
  }

  (0, _createClass2.default)(DrawerItem, [{
    key: "materialDom",
    value: function materialDom(props) {
      var returnedNode = (0, _get2.default)((0, _getPrototypeOf2.default)(DrawerItem.prototype), "materialDom", this).call(this, props);
      /* Logic to add selected class */

      if (props.selected) {
        returnedNode.attributes.className = 'mdc-list-item--activated';
      }

      return returnedNode;
    }
  }]);
  return DrawerItem;
}(_List.ListLinkItem);

exports.DrawerItem = DrawerItem;

var Drawer =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(Drawer, _MaterialComponent3);

  function Drawer() {
    var _this3;

    (0, _classCallCheck2.default)(this, Drawer);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Drawer).apply(this, arguments));
    _this3.componentName = 'drawer-container';
    _this3.mdcProps = [];
    _this3.mdcNotifyProps = ['open'];
    return _this3;
  }

  (0, _createClass2.default)(Drawer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Drawer.prototype), "componentDidMount", this).call(this);

      if (this.control && (this.props.modal || this.props.dismissible)) {
        this.MDComponent = new _drawer.MDCDrawer(this.control);
        this.MDComponent.listen('MDCDrawer:opened', this.onOpen);
        this.MDComponent.listen('MDCDrawer:closed', this.onClose);
      }
    }
  }, {
    key: "onOpen",
    value: function onOpen(e) {
      if (this.props.onOpen) {
        this.props.onOpen(e);
      }
    }
  }, {
    key: "onClose",
    value: function onClose(e) {
      if (this.props.onClose) {
        this.props.onClose(e);
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(props) {
      var classes = ['mdc-drawer']; // cant use mdcProps cuz classes need to be on the inner child and not on root level

      if (props.modal) {
        classes.push('mdc-drawer--modal');
      } else if (props.dismissible) {
        classes.push('mdc-drawer--dismissible');
      }

      return (0, _preact.h)("div", null, (0, _preact.h)("aside", Object.assign({
        class: classes.join(' '),
        ref: this.setControlRef
      }, props), props.children), props.modal && (0, _preact.h)("div", {
        class: "mdc-drawer-scrim"
      }));
    }
  }]);
  return Drawer;
}(_MaterialComponent4.default);

exports.Drawer = Drawer;
Drawer.DrawerContent = DrawerContent;
Drawer.DrawerHeader = DrawerHeader;
Drawer.DrawerItem = DrawerItem;

__decorate([_bindDecorator.bind], Drawer.prototype, "onOpen", null);

__decorate([_bindDecorator.bind], Drawer.prototype, "onClose", null);

var default_1 =
/*#__PURE__*/
function (_Drawer) {
  (0, _inherits2.default)(default_1, _Drawer);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(Drawer);

exports.default = default_1;
default_1.DrawerContent = DrawerContent;
default_1.DrawerHeader = DrawerHeader;
default_1.DrawerItem = DrawerItem;

/***/ }),

/***/ "./node_modules/preact-material-components/Drawer/style.css":
/*!******************************************************************!*\
  !*** ./node_modules/preact-material-components/Drawer/style.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-material-components/Elevation/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/preact-material-components/Elevation/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Elevation = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _MaterialComponent2 = _interopRequireDefault(__webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/Base/MaterialComponent.js"));

var generatedProps = [];

for (var elevationIndex = 0; elevationIndex < 25; elevationIndex++) {
  generatedProps.push('z' + elevationIndex);
}

var Elevation =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(Elevation, _MaterialComponent);

  function Elevation() {
    var _this;

    (0, _classCallCheck2.default)(this, Elevation);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Elevation).apply(this, arguments));
    _this.componentName = 'elevation';
    _this.mdcProps = generatedProps;
    return _this;
  }

  (0, _createClass2.default)(Elevation, [{
    key: "materialDom",
    value: function materialDom(props) {
      var className;

      if (props.z) {
        className = 'mdc-elevation--z' + props.z;
      }

      return (0, _preact.h)("p", Object.assign({
        className: className
      }, props, {
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return Elevation;
}(_MaterialComponent2.default);

exports.Elevation = Elevation;
var _default = Elevation;
exports.default = _default;

/***/ }),

/***/ "./node_modules/preact-material-components/Elevation/style.css":
/*!*********************************************************************!*\
  !*** ./node_modules/preact-material-components/Elevation/style.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-material-components/Icon/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/preact-material-components/Icon/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Icon = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _MaterialComponent2 = _interopRequireDefault(__webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/Base/MaterialComponent.js"));

var Icon =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(Icon, _MaterialComponent);

  function Icon() {
    var _this;

    (0, _classCallCheck2.default)(this, Icon);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
    _this.componentName = 'icon';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(Icon, [{
    key: "materialDom",
    value: function materialDom(props) {
      var classes = ['material-icons']; // CardActionIcon sends className

      if (props.className) {
        classes.push(props.className);
      }

      return (0, _preact.h)("i", Object.assign({}, props, {
        className: classes.join(' ')
      }), props.children);
    }
  }]);
  return Icon;
}(_MaterialComponent2.default);

exports.Icon = Icon;
var _default = Icon;
exports.default = _default;

/***/ }),

/***/ "./node_modules/preact-material-components/List/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/preact-material-components/List/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.List = exports.ListGroupHeader = exports.ListGroup = exports.ListSecondaryText = exports.ListPrimaryText = exports.ListTextContainer = exports.ListDivider = exports.ListItemMeta = exports.ListItemGraphic = exports.ListLinkItem = exports.ListItem = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _MaterialComponent9 = _interopRequireDefault(__webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/Base/MaterialComponent.js"));

var _Icon = _interopRequireDefault(__webpack_require__(/*! ../Icon */ "./node_modules/preact-material-components/Icon/index.js"));

var ListItem =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(ListItem, _MaterialComponent);

  function ListItem() {
    var _this;

    (0, _classCallCheck2.default)(this, ListItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItem).apply(this, arguments));
    _this.componentName = 'list-item';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(ListItem, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("li", Object.assign({
        role: "option"
      }, props, {
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return ListItem;
}(_MaterialComponent9.default);

exports.ListItem = ListItem;

var ListLinkItem =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(ListLinkItem, _MaterialComponent2);

  function ListLinkItem() {
    var _this2;

    (0, _classCallCheck2.default)(this, ListLinkItem);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListLinkItem).apply(this, arguments));
    _this2.componentName = 'list-item';
    _this2.mdcProps = [];
    return _this2;
  }

  (0, _createClass2.default)(ListLinkItem, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("a", Object.assign({
        role: "option"
      }, props, {
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return ListLinkItem;
}(_MaterialComponent9.default);

exports.ListLinkItem = ListLinkItem;

var ListItemGraphic =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(ListItemGraphic, _MaterialComponent3);

  function ListItemGraphic() {
    var _this3;

    (0, _classCallCheck2.default)(this, ListItemGraphic);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItemGraphic).apply(this, arguments));
    _this3.componentName = 'list-item__graphic';
    _this3.mdcProps = [];
    return _this3;
  }

  (0, _createClass2.default)(ListItemGraphic, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("span", Object.assign({}, props, {
        ref: this.setControlRef,
        role: "presentation"
      }), (0, _preact.h)(_Icon.default, {
        "aria-hidden": "true"
      }, props.children));
    }
  }]);
  return ListItemGraphic;
}(_MaterialComponent9.default);

exports.ListItemGraphic = ListItemGraphic;

var ListItemMeta =
/*#__PURE__*/
function (_ListItemGraphic) {
  (0, _inherits2.default)(ListItemMeta, _ListItemGraphic);

  function ListItemMeta() {
    var _this4;

    (0, _classCallCheck2.default)(this, ListItemMeta);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListItemMeta).apply(this, arguments));
    _this4.componentName = 'list-item__meta';
    return _this4;
  }

  return ListItemMeta;
}(ListItemGraphic);

exports.ListItemMeta = ListItemMeta;

var ListDivider =
/*#__PURE__*/
function (_MaterialComponent4) {
  (0, _inherits2.default)(ListDivider, _MaterialComponent4);

  function ListDivider() {
    var _this5;

    (0, _classCallCheck2.default)(this, ListDivider);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListDivider).apply(this, arguments));
    _this5.componentName = 'list-divider';
    _this5.mdcProps = ['inset'];
    return _this5;
  }

  (0, _createClass2.default)(ListDivider, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("li", Object.assign({
        role: "separator"
      }, props, {
        ref: this.setControlRef
      }));
    }
  }]);
  return ListDivider;
}(_MaterialComponent9.default);

exports.ListDivider = ListDivider;

var ListTextContainer =
/*#__PURE__*/
function (_MaterialComponent5) {
  (0, _inherits2.default)(ListTextContainer, _MaterialComponent5);

  function ListTextContainer() {
    var _this6;

    (0, _classCallCheck2.default)(this, ListTextContainer);
    _this6 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListTextContainer).apply(this, arguments));
    _this6.componentName = 'list-item__text';
    _this6.mdcProps = [];
    return _this6;
  }

  (0, _createClass2.default)(ListTextContainer, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("span", Object.assign({}, props, {
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return ListTextContainer;
}(_MaterialComponent9.default);

exports.ListTextContainer = ListTextContainer;

var ListPrimaryText =
/*#__PURE__*/
function (_ListTextContainer) {
  (0, _inherits2.default)(ListPrimaryText, _ListTextContainer);

  function ListPrimaryText() {
    var _this7;

    (0, _classCallCheck2.default)(this, ListPrimaryText);
    _this7 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListPrimaryText).apply(this, arguments));
    _this7.componentName = 'list-item__primary-text';
    return _this7;
  }

  return ListPrimaryText;
}(ListTextContainer);

exports.ListPrimaryText = ListPrimaryText;

var ListSecondaryText =
/*#__PURE__*/
function (_ListTextContainer2) {
  (0, _inherits2.default)(ListSecondaryText, _ListTextContainer2);

  function ListSecondaryText() {
    var _this8;

    (0, _classCallCheck2.default)(this, ListSecondaryText);
    _this8 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListSecondaryText).apply(this, arguments));
    _this8.componentName = 'list-item__secondary-text';
    return _this8;
  }

  return ListSecondaryText;
}(ListTextContainer);

exports.ListSecondaryText = ListSecondaryText;

var ListGroup =
/*#__PURE__*/
function (_MaterialComponent6) {
  (0, _inherits2.default)(ListGroup, _MaterialComponent6);

  function ListGroup() {
    var _this9;

    (0, _classCallCheck2.default)(this, ListGroup);
    _this9 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListGroup).apply(this, arguments));
    _this9.componentName = 'list-group';
    _this9.mdcProps = [];
    return _this9;
  }

  (0, _createClass2.default)(ListGroup, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
    }
  }]);
  return ListGroup;
}(_MaterialComponent9.default);

exports.ListGroup = ListGroup;

var ListGroupHeader =
/*#__PURE__*/
function (_MaterialComponent7) {
  (0, _inherits2.default)(ListGroupHeader, _MaterialComponent7);

  function ListGroupHeader() {
    var _this10;

    (0, _classCallCheck2.default)(this, ListGroupHeader);
    _this10 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ListGroupHeader).apply(this, arguments));
    _this10.componentName = 'list-group__subheader';
    _this10.mdcProps = [];
    return _this10;
  }

  (0, _createClass2.default)(ListGroupHeader, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("h3", Object.assign({}, props, {
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return ListGroupHeader;
}(_MaterialComponent9.default);

exports.ListGroupHeader = ListGroupHeader;

var List =
/*#__PURE__*/
function (_MaterialComponent8) {
  (0, _inherits2.default)(List, _MaterialComponent8);

  function List() {
    var _this11;

    (0, _classCallCheck2.default)(this, List);
    _this11 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(List).apply(this, arguments));
    _this11.componentName = 'list';
    _this11.mdcProps = ['dense', 'two-line', 'avatar-list'];
    return _this11;
  }

  (0, _createClass2.default)(List, [{
    key: "materialDom",
    value: function materialDom(props) {
      if (props.interactive) {
        return (0, _preact.h)("nav", Object.assign({
          ref: this.setControlRef
        }, props), props.children);
      }

      return (0, _preact.h)("ul", Object.assign({}, props, {
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return List;
}(_MaterialComponent9.default);

exports.List = List;

var default_1 =
/*#__PURE__*/
function (_List) {
  (0, _inherits2.default)(default_1, _List);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(List);

exports.default = default_1;
default_1.Item = ListItem;
default_1.LinkItem = ListLinkItem;
default_1.ItemGraphic = ListItemGraphic;
default_1.ItemMeta = ListItemMeta;
default_1.Divider = ListDivider;
default_1.TextContainer = ListTextContainer;
default_1.PrimaryText = ListPrimaryText;
default_1.SecondaryText = ListSecondaryText;
default_1.Group = ListGroup;
default_1.GroupHeader = ListGroupHeader;

/***/ }),

/***/ "./node_modules/preact-material-components/List/style.css":
/*!****************************************************************!*\
  !*** ./node_modules/preact-material-components/List/style.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-material-components/TopAppBar/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/preact-material-components/TopAppBar/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TopAppBar = exports.TopAppBarTitle = exports.TopAppBarIcon = exports.TopAppBarSection = exports.TopAppBarRow = void 0;

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _topAppBar = __webpack_require__(/*! @material/top-app-bar */ "./node_modules/@material/top-app-bar/index.js");

var _bindDecorator = __webpack_require__(/*! bind-decorator */ "./node_modules/bind-decorator/index.js");

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _MaterialComponent6 = _interopRequireDefault(__webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/Base/MaterialComponent.js"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TopAppBarRow =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(TopAppBarRow, _MaterialComponent);

  function TopAppBarRow() {
    var _this;

    (0, _classCallCheck2.default)(this, TopAppBarRow);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarRow).apply(this, arguments));
    _this.componentName = 'top-app-bar__row';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(TopAppBarRow, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("div", Object.assign({}, props), this.props.children);
    }
  }]);
  return TopAppBarRow;
}(_MaterialComponent6.default);

exports.TopAppBarRow = TopAppBarRow;

var TopAppBarSection =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(TopAppBarSection, _MaterialComponent2);

  function TopAppBarSection() {
    var _this2;

    (0, _classCallCheck2.default)(this, TopAppBarSection);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarSection).apply(this, arguments));
    _this2.componentName = 'top-app-bar__section';
    _this2.mdcProps = ['align-start', 'align-end'];
    return _this2;
  }

  (0, _createClass2.default)(TopAppBarSection, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("section", Object.assign({}, props), props.children);
    }
  }]);
  return TopAppBarSection;
}(_MaterialComponent6.default);

exports.TopAppBarSection = TopAppBarSection;

var TopAppBarIcon =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(TopAppBarIcon, _MaterialComponent3);

  function TopAppBarIcon() {
    var _this3;

    (0, _classCallCheck2.default)(this, TopAppBarIcon);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarIcon).apply(this, arguments));
    _this3.componentName = 'top-app-bar__icon';
    _this3.mdcProps = [];
    return _this3;
  }

  (0, _createClass2.default)(TopAppBarIcon, [{
    key: "materialDom",
    value: function materialDom(props) {
      var className = props.navigation ? 'material-icons mdc-top-app-bar__navigation-icon' : 'material-icons';
      return (0, _preact.h)("a", Object.assign({
        className: className
      }, props), props.children);
    }
  }]);
  return TopAppBarIcon;
}(_MaterialComponent6.default);

exports.TopAppBarIcon = TopAppBarIcon;

var TopAppBarTitle =
/*#__PURE__*/
function (_MaterialComponent4) {
  (0, _inherits2.default)(TopAppBarTitle, _MaterialComponent4);

  function TopAppBarTitle() {
    var _this4;

    (0, _classCallCheck2.default)(this, TopAppBarTitle);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBarTitle).apply(this, arguments));
    _this4.componentName = 'top-app-bar__title';
    _this4.mdcProps = [];
    return _this4;
  }

  (0, _createClass2.default)(TopAppBarTitle, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("span", Object.assign({}, props), props.children);
    }
  }]);
  return TopAppBarTitle;
}(_MaterialComponent6.default);

exports.TopAppBarTitle = TopAppBarTitle;

var TopAppBar =
/*#__PURE__*/
function (_MaterialComponent5) {
  (0, _inherits2.default)(TopAppBar, _MaterialComponent5);

  function TopAppBar() {
    var _this5;

    (0, _classCallCheck2.default)(this, TopAppBar);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TopAppBar).apply(this, arguments));
    _this5.componentName = 'top-app-bar';
    _this5.mdcProps = ['short', 'short-collapsed', 'fixed', 'prominent'];
    return _this5;
  }

  (0, _createClass2.default)(TopAppBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TopAppBar.prototype), "componentDidMount", this).call(this);

      if (this.control) {
        var comp = new _topAppBar.MDCTopAppBar(this.control);
        comp.listen('MDCTopAppBar:nav', this.onNav);
        this.MDComponent = comp;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(TopAppBar.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.unlisten('MDCTopAppBar:nav', this.onNav);
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "onNav",
    value: function onNav(e) {
      if (this.props.onNav) {
        this.props.onNav(e);
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("header", Object.assign({
        ref: this.setControlRef
      }, props), props.children);
    }
  }]);
  return TopAppBar;
}(_MaterialComponent6.default);

exports.TopAppBar = TopAppBar;

__decorate([_bindDecorator.bind], TopAppBar.prototype, "onNav", null);

var default_1 =
/*#__PURE__*/
function (_TopAppBar) {
  (0, _inherits2.default)(default_1, _TopAppBar);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(TopAppBar);

exports.default = default_1;
default_1.Section = TopAppBarSection;
default_1.Icon = TopAppBarIcon;
default_1.Title = TopAppBarTitle;
default_1.Row = TopAppBarRow;

/***/ }),

/***/ "./node_modules/preact-material-components/TopAppBar/style.css":
/*!*********************************************************************!*\
  !*** ./node_modules/preact-material-components/TopAppBar/style.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-router/dist/preact-router.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/preact-router/dist/preact-router.es.js ***!
  \*************************************************************/
/*! exports provided: subscribers, getCurrentUrl, route, Router, Route, Link, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var EMPTY$1 = {};

function assign(obj, props) {
  // eslint-disable-next-line guard-for-in
  for (var i in props) {
    obj[i] = props[i];
  }

  return obj;
}

function exec(url, route, opts) {
  var reg = /(?:\?([^#]*))?(#.*)?$/,
      c = url.match(reg),
      matches = {},
      ret;

  if (c && c[1]) {
    var p = c[1].split('&');

    for (var i = 0; i < p.length; i++) {
      var r = p[i].split('=');
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
    }
  }

  url = segmentize(url.replace(reg, ''));
  route = segmentize(route || '');
  var max = Math.max(url.length, route.length);

  for (var i$1 = 0; i$1 < max; i$1++) {
    if (route[i$1] && route[i$1].charAt(0) === ':') {
      var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
          flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
          plus = ~flags.indexOf('+'),
          star = ~flags.indexOf('*'),
          val = url[i$1] || '';

      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false;
        break;
      }

      matches[param] = decodeURIComponent(val);

      if (plus || star) {
        matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
        break;
      }
    } else if (route[i$1] !== url[i$1]) {
      ret = false;
      break;
    }
  }

  if (opts.default !== true && ret === false) {
    return false;
  }

  return matches;
}

function pathRankSort(a, b) {
  return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
} // filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.


function prepareVNodeForRanking(vnode, index) {
  vnode.index = index;
  vnode.rank = rankChild(vnode);
  return vnode.attributes;
}

function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
  return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
  return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
  return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;
var ROUTERS = [];
var subscribers = [];
var EMPTY = {};

function isPreactElement(node) {
  return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
  if (type === void 0) type = 'push';

  if (customHistory && customHistory[type]) {
    customHistory[type](url);
  } else if (typeof history !== 'undefined' && history[type + 'State']) {
    history[type + 'State'](null, null, url);
  }
}

function getCurrentUrl() {
  var url;

  if (customHistory && customHistory.location) {
    url = customHistory.location;
  } else if (customHistory && customHistory.getCurrentLocation) {
    url = customHistory.getCurrentLocation();
  } else {
    url = typeof location !== 'undefined' ? location : EMPTY;
  }

  return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
  if (replace === void 0) replace = false;

  if (typeof url !== 'string' && url.url) {
    replace = url.replace;
    url = url.url;
  } // only push URL into history if we can handle it


  if (canRoute(url)) {
    setUrl(url, replace ? 'replace' : 'push');
  }

  return routeTo(url);
}
/** Check if the given URL can be handled by any router instances. */


function canRoute(url) {
  for (var i = ROUTERS.length; i--;) {
    if (ROUTERS[i].canRoute(url)) {
      return true;
    }
  }

  return false;
}
/** Tell all router instances to handle the given URL.  */


function routeTo(url) {
  var didRoute = false;

  for (var i = 0; i < ROUTERS.length; i++) {
    if (ROUTERS[i].routeTo(url) === true) {
      didRoute = true;
    }
  }

  for (var i$1 = subscribers.length; i$1--;) {
    subscribers[i$1](url);
  }

  return didRoute;
}

function routeFromLink(node) {
  // only valid elements
  if (!node || !node.getAttribute) {
    return;
  }

  var href = node.getAttribute('href'),
      target = node.getAttribute('target'); // ignore links with targets and non-path URLs

  if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
    return;
  } // attempt to route, if no match simply cede control to browser


  return route(href);
}

function handleLinkClick(e) {
  if (e.button == 0) {
    routeFromLink(e.currentTarget || e.target || this);
    return prevent(e);
  }
}

function prevent(e) {
  if (e) {
    if (e.stopImmediatePropagation) {
      e.stopImmediatePropagation();
    }

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    e.preventDefault();
  }

  return false;
}

function delegateLinkHandler(e) {
  // ignore events the browser takes care of already:
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
    return;
  }

  var t = e.target;

  do {
    if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
      if (t.hasAttribute('native')) {
        return;
      } // if link is handled by the router, prevent browser defaults


      if (routeFromLink(t)) {
        return prevent(e);
      }
    }
  } while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
  if (eventListenersInitialized) {
    return;
  }

  if (typeof addEventListener === 'function') {
    if (!customHistory) {
      addEventListener('popstate', function () {
        routeTo(getCurrentUrl());
      });
    }

    addEventListener('click', delegateLinkHandler);
  }

  eventListenersInitialized = true;
}

var Router = function (Component$$1) {
  function Router(props) {
    Component$$1.call(this, props);

    if (props.history) {
      customHistory = props.history;
    }

    this.state = {
      url: props.url || getCurrentUrl()
    };
    initEventListeners();
  }

  if (Component$$1) Router.__proto__ = Component$$1;
  Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
  Router.prototype.constructor = Router;

  Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
    if (props.static !== true) {
      return true;
    }

    return props.url !== this.props.url || props.onChange !== this.props.onChange;
  };
  /** Check if the given URL can be matched against any children */


  Router.prototype.canRoute = function canRoute(url) {
    return this.getMatchingChildren(this.props.children, url, false).length > 0;
  };
  /** Re-render children with a new URL to match against. */


  Router.prototype.routeTo = function routeTo(url) {
    this._didRoute = false;
    this.setState({
      url: url
    }); // if we're in the middle of an update, don't synchronously re-route.

    if (this.updating) {
      return this.canRoute(url);
    }

    this.forceUpdate();
    return this._didRoute;
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    ROUTERS.push(this);
    this.updating = true;
  };

  Router.prototype.componentDidMount = function componentDidMount() {
    var this$1 = this;

    if (customHistory) {
      this.unlisten = customHistory.listen(function (location) {
        this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
      });
    }

    this.updating = false;
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    if (typeof this.unlisten === 'function') {
      this.unlisten();
    }

    ROUTERS.splice(ROUTERS.indexOf(this), 1);
  };

  Router.prototype.componentWillUpdate = function componentWillUpdate() {
    this.updating = true;
  };

  Router.prototype.componentDidUpdate = function componentDidUpdate() {
    this.updating = false;
  };

  Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
    return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
      var matches = exec(url, vnode.attributes.path, vnode.attributes);

      if (matches) {
        if (invoke !== false) {
          var newProps = {
            url: url,
            matches: matches
          };
          assign(newProps, matches);
          delete newProps.ref;
          delete newProps.key;
          return Object(preact__WEBPACK_IMPORTED_MODULE_0__["cloneElement"])(vnode, newProps);
        }

        return vnode;
      }
    }).filter(Boolean);
  };

  Router.prototype.render = function render(ref, ref$1) {
    var children = ref.children;
    var onChange = ref.onChange;
    var url = ref$1.url;
    var active = this.getMatchingChildren(children, url, true);
    var current = active[0] || null;
    this._didRoute = !!current;
    var previous = this.previousUrl;

    if (url !== previous) {
      this.previousUrl = url;

      if (typeof onChange === 'function') {
        onChange({
          router: this,
          url: url,
          previous: previous,
          active: active,
          current: current
        });
      }
    }

    return current;
  };

  return Router;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var Link = function (props) {
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])('a', assign({
    onClick: handleLinkClick
  }, props));
};

var Route = function (props) {
  return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./node_modules/preact/dist/preact.mjs":
/*!*********************************************!*\
  !*** ./node_modules/preact/dist/preact.mjs ***!
  \*********************************************/
/*! exports provided: default, h, createElement, cloneElement, Component, render, rerender, options */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
var VNode = function VNode() {};

var options = {};

var stack = [];

var EMPTY_CHILDREN = [];

function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		try {
			node[name] = value == null ? '' : value;
		} catch (e) {}
		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

var hydrating = false;

function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	if (!diffLevel++) {
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	if (! --diffLevel) {
		hydrating = false;

		if (!componentRoot) flushMounts();
	}

	return ret;
}

function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			}
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	} else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	diffAttributes(out, vnode.attributes, props);

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			} else if (min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		unmountComponent(component);
	} else {
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

function diffAttributes(dom, attrs, old) {
	var name;

	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

var recyclerComponents = [];

function createComponent(Ctor, props, context) {
	var inst,
	    i = recyclerComponents.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	while (i--) {
		if (recyclerComponents[i].constructor === Ctor) {
			inst.nextBase = recyclerComponents[i].nextBase;
			recyclerComponents.splice(i, 1);
			return inst;
		}
	}

	return inst;
}

function doRender(props, state, context) {
	return this.constructor(props, context);
}

function setComponentProps(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode !== 0) {
		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

function renderComponent(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    snapshot = previousContext,
	    rendered,
	    inst,
	    cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	while (component._renderCallbacks.length) {
		component._renderCallbacks.pop().call(component);
	}if (!diffLevel && !isChild) flushMounts();
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;

			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

function Component(props, context) {
	this._dirty = true;

	this.context = context;

	this.props = props;

	this.state = this.state || {};

	this._renderCallbacks = [];
}

extend(Component.prototype, {
	setState: function setState(state, callback) {
		if (!this.prevState) this.prevState = this.state;
		this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	},
	forceUpdate: function forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent(this, 2);
	},
	render: function render() {}
});

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);

//# sourceMappingURL=preact.mjs.map


/***/ }),

/***/ "./node_modules/resolve-pathname/index.js":
/*!************************************************!*\
  !*** ./node_modules/resolve-pathname/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
} // About 1.5x faster than the two-arg version of Array#splice()


function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
} // This implementation is based heavily on node's url.parse


function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];
  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';
  var hasTrailingSlash = void 0;

  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;

  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }
  if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');
  var result = fromParts.join('/');
  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';
  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),

/***/ "./node_modules/value-equal/index.js":
/*!*******************************************!*\
  !*** ./node_modules/value-equal/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function valueEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);
  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();
    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),

/***/ "./node_modules/warning/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function () {};

if (true) {
  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });

      if (typeof console !== 'undefined') {
        console.error(message);
      }

      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "./node_modules/xtend/immutable.js":
/*!*****************************************!*\
  !*** ./node_modules/xtend/immutable.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

/***/ }),

/***/ "./src/css/app.scss":
/*!**************************!*\
  !*** ./src/css/app.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/css/book.scss":
/*!***************************!*\
  !*** ./src/css/book.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"book-list":"book__book-list___2hPsN","bookList":"book__book-list___2hPsN","book":"book__book___2hP0S","cover":"book__cover___GKA02","series":"book__series___2_G96","title":"book__title___3zvvV","unread":"book__unread___1o1X0"};

/***/ }),

/***/ "./src/css/error.scss":
/*!****************************!*\
  !*** ./src/css/error.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"message":"error__message___33p_h"};

/***/ }),

/***/ "./src/css/layout.scss":
/*!*****************************!*\
  !*** ./src/css/layout.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"app":"layout__app___35DR7","main":"layout__main___32xUv"};

/***/ }),

/***/ "./src/js/components/book-list.tsx":
/*!*****************************************!*\
  !*** ./src/js/components/book-list.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BookList; });
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css/book.scss */ "./src/css/book.scss");
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(css_book_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_components_book__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/components/book */ "./src/js/components/book.tsx");
/* harmony import */ var js_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js/graphql */ "./src/js/graphql.ts");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");




const BookListTypes = {
  take: 'Int!',
  skip: 'Int',
  series: 'String'
};
const BookListQuery = `
books(take: $take skip: $skip series: $series) {
  page_info {
    total
    take
    skip
  }
  results {
    id
    title
    volume
    chapter
    series
    cover {
      url
    }
    read
  }
}
`;
class BookList extends preact__WEBPACK_IMPORTED_MODULE_3__["Component"] {
  componentDidMount() {
    if (!this.props.books) {
      Object(js_graphql__WEBPACK_IMPORTED_MODULE_2__["gql"])(BookListQuery, BookListTypes, {
        series: this.props.series,
        take: 15,
        skip: 0
      }).then(books => {
        const skip = books.page_info.skip;
        const take = books.page_info.take;
        const total = books.page_info.total;
        const newBooks = [];

        for (let i = 0; i < total; i++) {
          if (i >= skip && i < skip + take) {
            const book = books.results[i + skip];
            book.link = `/book/${book.id}`;
            newBooks[i] = book;
          } else {
            newBooks[i] = null;
          }
        }

        this.setState({
          books: newBooks
        });
      });
    }
  }

  render() {
    const books = this.props.books || this.state.books || []; // let i: number = 'ten'

    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_0__["bookList"]
    }, books.map((book, i) => // tslint:disable-next-line:jsx-no-lambda
    Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(js_components_book__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: i,
      data: book,
      onIntersection: e => this.bookIntersection(e, i, book)
    })));
  }

  bookIntersection(element, index, book) {
    if (element.intersectionRatio > 0 && book === null) {
      Object(js_graphql__WEBPACK_IMPORTED_MODULE_2__["gql"])(BookListQuery, BookListTypes, {
        series: this.props.series,
        take: 1,
        skip: index
      }).then(books => {
        const newBooks = this.state.books;
        const b = books.results[0];
        b.link = `/book/${b.id}`;
        newBooks[books.page_info.skip] = b;
        this.setState({
          books: newBooks
        });
      });
    }
  }

}

/***/ }),

/***/ "./src/js/components/book.tsx":
/*!************************************!*\
  !*** ./src/js/components/book.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Book; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var preact_material_components_Elevation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact-material-components/Elevation */ "./node_modules/preact-material-components/Elevation/index.js");
/* harmony import */ var preact_material_components_Elevation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_Elevation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! css/book.scss */ "./src/css/book.scss");
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(css_book_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var preact_material_components_Elevation_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! preact-material-components/Elevation/style.css */ "./node_modules/preact-material-components/Elevation/style.css");
/* harmony import */ var preact_material_components_Elevation_style_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_Elevation_style_css__WEBPACK_IMPORTED_MODULE_4__);





class Book extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    this.observer = new IntersectionObserver(elements => {
      for (const element of elements) {
        if (this.props.onIntersection) {
          this.props.onIntersection(element);
        }
      }
    }, options);
    this.observer.observe(this.base);
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    const book = this.props.data;
    let image = '';
    let title = '';

    if (book === null) {
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_Elevation__WEBPACK_IMPORTED_MODULE_1___default.a, {
        z: 2,
        className: css_book_scss__WEBPACK_IMPORTED_MODULE_3__["book"]
      });
    }

    if (book.cover) {
      image = book.cover.url + '?height=200&quality=30';
    } else {
      image = 'https://mangadex.org/images/manga/7139.jpg?1536006542';
    }

    if (book.volume !== null) {
      title += `V${book.volume}`;
    }

    if (book.chapter !== null) {
      if (title !== '') {
        title += ' ';
      }

      title += `#${book.chapter}`;
    }

    if (book.title !== null && book.title !== '') {
      if (title !== '') {
        title += ' - ';
      }

      title += book.title;
    }

    let readMark = null;

    if (book.read === false) {
      readMark = Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        class: css_book_scss__WEBPACK_IMPORTED_MODULE_3__["unread"]
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", {
        viewBox: "0 0 40 40"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("polygon", {
        points: "0 0,40 0,40,40"
      })));
    } else if (typeof book.read === 'number' && book.read !== 0) {
      readMark = Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        class: css_book_scss__WEBPACK_IMPORTED_MODULE_3__["unread"]
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", {
        viewBox: "0 0 40 40"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("rect", {
        width: "300",
        height: "40"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("text", {
        x: "50%",
        y: "50%",
        "alignment-baseline": "middle",
        "text-anchor": "middle"
      }, book.read)));
    }

    return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_Elevation__WEBPACK_IMPORTED_MODULE_1___default.a, {
      z: 2,
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_3__["book"]
    }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_router__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      href: book.link
    }, readMark, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_3__["cover"],
      src: image
    }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_3__["series"],
      title: book.series
    }, book.series || '\u00A0'), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_3__["title"],
      title: title
    }, title)));
  }

}

/***/ }),

/***/ "./src/js/components/series-list.tsx":
/*!*******************************************!*\
  !*** ./src/js/components/series-list.tsx ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SeriesList; });
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css/book.scss */ "./src/css/book.scss");
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(css_book_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_components_book__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/components/book */ "./src/js/components/book.tsx");
/* harmony import */ var js_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js/graphql */ "./src/js/graphql.ts");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");




const SeriesListTypes = {
  list: 'List'
};
const SeriesListQuery = `
series(take: 100 list: $list name_ne: "") {
  page_info {
    total
  }
  results {
    name
    read
    total
    books(take: 1) {
      cover {
        url
      }
    }
  }
}
`;
class SeriesList extends preact__WEBPACK_IMPORTED_MODULE_3__["Component"] {
  componentDidMount() {
    Object(js_graphql__WEBPACK_IMPORTED_MODULE_2__["gql"])(SeriesListQuery, SeriesListTypes, this.props).then(series => this.setState({
      series: series.results.map(serie => {
        return {
          id: series.name,
          series: serie.name,
          cover: serie.books[0].cover,
          link: `/series/${serie.name}`,
          volume: null,
          chapter: null,
          title: null,
          read: serie.total - serie.read
        };
      })
    }));
  }

  render() {
    const series = this.state.series || [];
    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_0__["bookList"]
    }, series.map(book => Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(js_components_book__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: book.id,
      data: book
    })));
  }

}

/***/ }),

/***/ "./src/js/graphql.ts":
/*!***************************!*\
  !*** ./src/js/graphql.ts ***!
  \***************************/
/*! exports provided: gql, QueryError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gql", function() { return gql; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryError", function() { return QueryError; });
/* harmony import */ var js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js/util */ "./src/js/util.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


const url = 'http://localhost:8080/graphql';
let queries = [];
function gql(query, types, variables) {
  return new Promise((resolve, reject) => {
    const name = query.trim().split(/[ :(]/, 2)[0];
    queries.push({
      name: name,
      query: query,
      variables: variables || {},
      types: types,
      success: data => {
        resolve(data);
      },
      fail: err => {
        reject(err);
      }
    });

    if (queries.length === 1) {
      setTimeout(runQueries, 50);
    }
  });
}

function runQueries() {
  return __awaiter(this, void 0, void 0, function* () {
    const localQueries = queries;
    queries = [];
    const types = [];
    const variables = {};

    for (const q of localQueries) {
      q.name = `${q.name}_${Object(js_util__WEBPACK_IMPORTED_MODULE_0__["str_random"])()}`;
      q.query = `${q.name}: ${q.query}`;

      for (const name in q.types) {
        if (q.types.hasOwnProperty(name)) {
          const type = q.types[name];
          const newName = `${name}_${Object(js_util__WEBPACK_IMPORTED_MODULE_0__["str_random"])()}`;
          q.query = q.query.replace(new RegExp('\\$' + name, 'g'), '$' + newName);
          variables[newName] = q.variables[name];
          types.push({
            name: newName,
            type: type
          });
        }
      }
    }

    let typesStr = types.reduce((acc, val) => acc += ` $${val.name}: ${val.type}`, '');

    if (typesStr !== '') {
      typesStr = `(${typesStr})`;
    }

    const query = `query ${typesStr} {
        ${localQueries.map(q => q.query).join('\n')}
    }`;
    const response = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });

    if (response.status < 200 || response.status > 299) {
      for (const q of localQueries) {
        q.fail(new QueryError(response, response.statusText));
      }

      return;
    }

    const data = yield response.json();

    if (data.errors !== undefined) {
      for (const q of localQueries) {
        q.fail(new QueryError(response, data.errors.map(err => err.message).join(', ')));
      }

      return;
    }

    for (const q of localQueries) {
      q.success(data.data[q.name]);
    }
  });
}

class QueryError extends Error {
  constructor(response, message) {
    super(message);
    this.status = response.status;
  }

}

/***/ }),

/***/ "./src/js/history.ts":
/*!***************************!*\
  !*** ./src/js/history.ts ***!
  \***************************/
/*! exports provided: historyPush, historyPop, historyPrevious */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "historyPush", function() { return historyPush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "historyPop", function() { return historyPop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "historyPrevious", function() { return historyPrevious; });
const historyStack = [];
function historyPush(e) {
  historyStack.push(e.url);
}
function historyPop() {
  return historyStack.pop();
}
function historyPrevious() {
  if (historyStack.length < 2) {
    return null;
  }

  return historyStack[historyStack.length - 2];
}

/***/ }),

/***/ "./src/js/index.tsx":
/*!**************************!*\
  !*** ./src/js/index.tsx ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var history_createHashHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! history/createHashHistory */ "./node_modules/history/createHashHistory.js");
/* harmony import */ var history_createHashHistory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history_createHashHistory__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/graphql */ "./src/js/graphql.ts");
/* harmony import */ var js_views_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js/views/error */ "./src/js/views/error.tsx");
/* harmony import */ var js_views_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js/views/home */ "./src/js/views/home.tsx");
/* harmony import */ var js_views_series_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! js/views/series-index */ "./src/js/views/series-index.tsx");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");
/* harmony import */ var css_app_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! css/app.scss */ "./src/css/app.scss");
/* harmony import */ var css_app_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(css_app_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var js_views_series_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! js/views/series-view */ "./src/js/views/series-view.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};










const jsx = Object(preact__WEBPACK_IMPORTED_MODULE_5__["h"])(preact_router__WEBPACK_IMPORTED_MODULE_6__["default"]
/*onChange={historyPush}*/
, {
  history: history_createHashHistory__WEBPACK_IMPORTED_MODULE_0___default()()
}, Object(preact__WEBPACK_IMPORTED_MODULE_5__["h"])(js_views_home__WEBPACK_IMPORTED_MODULE_3__["default"], {
  path: "/"
}), Object(preact__WEBPACK_IMPORTED_MODULE_5__["h"])(js_views_series_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
  path: "/series"
}), Object(preact__WEBPACK_IMPORTED_MODULE_5__["h"])(js_views_series_view__WEBPACK_IMPORTED_MODULE_8__["default"], {
  path: "/series/:name/:page?"
}), Object(preact__WEBPACK_IMPORTED_MODULE_5__["h"])(js_views_error__WEBPACK_IMPORTED_MODULE_2__["default"], {
  default: true
}));
Object(js_graphql__WEBPACK_IMPORTED_MODULE_1__["gql"])(`me { id }`).catch(err => __awaiter(undefined, void 0, void 0, function* () {
  const data = yield fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      username: 'adam',
      password: 'test'
    })
  }).then(r => r.json());
  Object(preact__WEBPACK_IMPORTED_MODULE_5__["render"])(jsx, document.getElementById('app'));
}));
Object(preact__WEBPACK_IMPORTED_MODULE_5__["render"])(jsx, document.getElementById('app'));

/***/ }),

/***/ "./src/js/util.ts":
/*!************************!*\
  !*** ./src/js/util.ts ***!
  \************************/
/*! exports provided: str_random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str_random", function() { return str_random; });
function str_random(len = 10) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

/***/ }),

/***/ "./src/js/views/error.tsx":
/*!********************************!*\
  !*** ./src/js/views/error.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Error; });
/* harmony import */ var css_error_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css/error.scss */ "./src/css/error.scss");
/* harmony import */ var css_error_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(css_error_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_views_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/views/layout */ "./src/js/views/layout.tsx");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");



class Error extends preact__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  render() {
    return Object(preact__WEBPACK_IMPORTED_MODULE_2__["h"])(js_views_layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
      backLink: "/"
    }, Object(preact__WEBPACK_IMPORTED_MODULE_2__["h"])("div", {
      className: css_error_scss__WEBPACK_IMPORTED_MODULE_0__["message"]
    }, "404 Page Not Found"));
  }

}

/***/ }),

/***/ "./src/js/views/home.tsx":
/*!*******************************!*\
  !*** ./src/js/views/home.tsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var js_components_series_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js/components/series-list */ "./src/js/components/series-list.tsx");
/* harmony import */ var js_views_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/views/layout */ "./src/js/views/layout.tsx");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");



class Home extends preact__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  render() {
    return Object(preact__WEBPACK_IMPORTED_MODULE_2__["h"])(js_views_layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
      backLink: "/"
    }, Object(preact__WEBPACK_IMPORTED_MODULE_2__["h"])(js_components_series_list__WEBPACK_IMPORTED_MODULE_0__["default"], {
      list: "READING"
    }));
  }

}

/***/ }),

/***/ "./src/js/views/layout.tsx":
/*!*********************************!*\
  !*** ./src/js/views/layout.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layout; });
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autobind_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var css_layout_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! css/layout.scss */ "./src/css/layout.scss");
/* harmony import */ var css_layout_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(css_layout_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js/history */ "./src/js/history.ts");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var preact_material_components_Button_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! preact-material-components/Button/style.css */ "./node_modules/preact-material-components/Button/style.css");
/* harmony import */ var preact_material_components_Button_style_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_Button_style_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var preact_material_components_Drawer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! preact-material-components/Drawer */ "./node_modules/preact-material-components/Drawer/index.js");
/* harmony import */ var preact_material_components_Drawer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_Drawer__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var preact_material_components_Drawer_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! preact-material-components/Drawer/style.css */ "./node_modules/preact-material-components/Drawer/style.css");
/* harmony import */ var preact_material_components_Drawer_style_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_Drawer_style_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var preact_material_components_List__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! preact-material-components/List */ "./node_modules/preact-material-components/List/index.js");
/* harmony import */ var preact_material_components_List__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_List__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var preact_material_components_List_style_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! preact-material-components/List/style.css */ "./node_modules/preact-material-components/List/style.css");
/* harmony import */ var preact_material_components_List_style_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_List_style_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! preact-material-components/TopAppBar */ "./node_modules/preact-material-components/TopAppBar/index.js");
/* harmony import */ var preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var preact_material_components_TopAppBar_style_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! preact-material-components/TopAppBar/style.css */ "./node_modules/preact-material-components/TopAppBar/style.css");
/* harmony import */ var preact_material_components_TopAppBar_style_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_TopAppBar_style_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};













class Layout extends preact__WEBPACK_IMPORTED_MODULE_3__["Component"] {
  constructor() {
    super();
    this.state = {
      drawerOpened: false
    };
  }

  get menu() {
    return [{
      name: 'Home',
      icon: 'home',
      href: '/'
    }, {
      name: 'Series',
      icon: 'collections_bookmark',
      href: '/series'
    }];
  }

  render() {
    const backButton = Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default.a.Icon, {
      onClick: this.toggleDrawer,
      navigation: true
    }, "menu"); // if (location.pathname !== '/') {
    //     backButton = <TopAppBar.Icon onClick={this.btnBack} href='#' navigation={true}>
    //         arrow_back
    //     </TopAppBar.Icon>
    // }

    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("div", {
      className: css_layout_scss__WEBPACK_IMPORTED_MODULE_1__["app"]
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default.a, {
      onNav: null
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default.a.Row, null, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default.a.Section, {
      "align-start": true
    }, backButton, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default.a.Title, null, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_router__WEBPACK_IMPORTED_MODULE_11__["Link"], {
      href: "/"
    }, "ComicBox"))), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default.a.Section, {
      "align-end": true
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_TopAppBar__WEBPACK_IMPORTED_MODULE_9___default.a.Icon, null, "more_vert")))), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_Drawer__WEBPACK_IMPORTED_MODULE_5___default.a, {
      modal: true,
      open: this.state.drawerOpened,
      onClose: this.drawerClosed
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_Drawer__WEBPACK_IMPORTED_MODULE_5___default.a.DrawerHeader, {
      className: "mdc-theme--primary-bg"
    }, "Drawer Header"), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_Drawer__WEBPACK_IMPORTED_MODULE_5___default.a.DrawerContent, null, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_List__WEBPACK_IMPORTED_MODULE_7___default.a, null, this.menu.map((item, i) => Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_router__WEBPACK_IMPORTED_MODULE_11__["Link"], {
      key: i,
      href: item.href,
      onClick: this.toggleDrawer
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_List__WEBPACK_IMPORTED_MODULE_7___default.a.LinkItem, {
      className: location.pathname === item.href ? 'mdc-list-item--activated' : ''
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(preact_material_components_List__WEBPACK_IMPORTED_MODULE_7___default.a.ItemGraphic, null, item.icon), item.name)))))), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("main", {
      class: css_layout_scss__WEBPACK_IMPORTED_MODULE_1__["main"]
    }, this.props.children));
  }

  toggleDrawer() {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    });
  }

  drawerClosed() {
    this.setState({
      drawerOpened: false
    });
  }

  btnBack() {
    if (Object(js_history__WEBPACK_IMPORTED_MODULE_2__["historyPrevious"])() !== null) {
      Object(js_history__WEBPACK_IMPORTED_MODULE_2__["historyPop"])();
      history.back();
      return;
    }

    Object(preact_router__WEBPACK_IMPORTED_MODULE_11__["route"])(this.props.backLink);
  }

}

__decorate([autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Layout.prototype, "toggleDrawer", null);

__decorate([autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Layout.prototype, "drawerClosed", null);

__decorate([autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Layout.prototype, "btnBack", null);

/***/ }),

/***/ "./src/js/views/series-index.tsx":
/*!***************************************!*\
  !*** ./src/js/views/series-index.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SeriesIndex; });
/* harmony import */ var js_components_series_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js/components/series-list */ "./src/js/components/series-list.tsx");
/* harmony import */ var js_views_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/views/layout */ "./src/js/views/layout.tsx");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");



class SeriesIndex extends preact__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  render() {
    return Object(preact__WEBPACK_IMPORTED_MODULE_2__["h"])(js_views_layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
      backLink: "/"
    }, Object(preact__WEBPACK_IMPORTED_MODULE_2__["h"])(js_components_series_list__WEBPACK_IMPORTED_MODULE_0__["default"], null));
  }

}

/***/ }),

/***/ "./src/js/views/series-view.tsx":
/*!**************************************!*\
  !*** ./src/js/views/series-view.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SeriesView; });
/* harmony import */ var js_components_book_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js/components/book-list */ "./src/js/components/book-list.tsx");
/* harmony import */ var js_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/graphql */ "./src/js/graphql.ts");
/* harmony import */ var js_views_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js/views/layout */ "./src/js/views/layout.tsx");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");




const ListTypes = {
  series: 'String'
};
const ListQuery = `
books(take: 1 series: $series read: false) {
  results {
    id
    title
    volume
    chapter
    series
    cover {
      url
    }
    read
  }
}
`;
class SeriesView extends preact__WEBPACK_IMPORTED_MODULE_3__["Component"] {
  componentDidMount() {
    Object(js_graphql__WEBPACK_IMPORTED_MODULE_1__["gql"])(ListQuery, ListTypes, {
      series: this.props.matches.name
    }).then(books => {
      const book = books.results[0];

      if (book !== undefined) {
        this.setState({
          current: book
        });
      }
    });
  }

  render() {
    let currentBook = null;

    if (this.state.current !== undefined) {
      currentBook = Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(js_components_book_list__WEBPACK_IMPORTED_MODULE_0__["default"], {
        books: [this.state.current]
      });
    }

    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(js_views_layout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      backLink: "/series"
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("h1", null, this.props.matches.name), currentBook, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])(js_components_book_list__WEBPACK_IMPORTED_MODULE_0__["default"], {
      series: this.props.matches.name
    }));
  }

}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map