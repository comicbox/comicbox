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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

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
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
    this.initialize(...args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  initialize(/* ...args */) {
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.
  }

  /**
   * @return {!F} foundation
   */
  getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
      'foundation class');
  }

  initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
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
        bubbles: shouldBubble,
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
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

  init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  }

  destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
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
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/***/ }),

/***/ "./node_modules/@material/drawer/persistent/constants.js":
/*!***************************************************************!*\
  !*** ./node_modules/@material/drawer/persistent/constants.js ***!
  \***************************************************************/
/*! exports provided: cssClasses, strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony import */ var _slidable_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slidable/index */ "./node_modules/@material/drawer/slidable/index.js");
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



const cssClasses = {
  ROOT: 'mdc-drawer--persistent',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
};

const strings = {
  DRAWER_SELECTOR: '.mdc-drawer--persistent .mdc-drawer__drawer',
  FOCUSABLE_ELEMENTS: _slidable_index__WEBPACK_IMPORTED_MODULE_0__["FOCUSABLE_ELEMENTS"],
  OPEN_EVENT: 'MDCPersistentDrawer:open',
  CLOSE_EVENT: 'MDCPersistentDrawer:close',
};


/***/ }),

/***/ "./node_modules/@material/drawer/persistent/foundation.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material/drawer/persistent/foundation.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MDCPersistentDrawerFoundation; });
/* harmony import */ var _slidable_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slidable/index */ "./node_modules/@material/drawer/slidable/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/drawer/persistent/constants.js");
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




class MDCPersistentDrawerFoundation extends _slidable_index__WEBPACK_IMPORTED_MODULE_0__["MDCSlidableDrawerFoundation"] {
  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"];
  }

  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["strings"];
  }

  static get defaultAdapter() {
    return Object.assign(_slidable_index__WEBPACK_IMPORTED_MODULE_0__["MDCSlidableDrawerFoundation"].defaultAdapter, {
      isDrawer: () => false,
    });
  }

  constructor(adapter) {
    super(
      Object.assign(MDCPersistentDrawerFoundation.defaultAdapter, adapter),
      MDCPersistentDrawerFoundation.cssClasses.ROOT,
      MDCPersistentDrawerFoundation.cssClasses.ANIMATING,
      MDCPersistentDrawerFoundation.cssClasses.OPEN);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }
}


/***/ }),

/***/ "./node_modules/@material/drawer/persistent/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material/drawer/persistent/index.js ***!
  \***********************************************************/
/*! exports provided: MDCPersistentDrawerFoundation, util, MDCPersistentDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCPersistentDrawer", function() { return MDCPersistentDrawer; });
/* harmony import */ var _material_base_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/index */ "./node_modules/@material/base/index.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/drawer/persistent/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCPersistentDrawerFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./node_modules/@material/drawer/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_2__; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








class MDCPersistentDrawer extends _material_base_index__WEBPACK_IMPORTED_MODULE_0__["MDCComponent"] {
  static attachTo(root) {
    return new MDCPersistentDrawer(root);
  }

  get open() {
    return this.foundation_.isOpen();
  }

  set open(value) {
    if (value) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  // Return the drawer element inside the component.
  get drawer() {
    return this.root_.querySelector(_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings.DRAWER_SELECTOR);
  }

  getDefaultFoundation() {
    const {FOCUSABLE_ELEMENTS} = _foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings;

    return new _foundation__WEBPACK_IMPORTED_MODULE_1__["default"]({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.drawer),
      registerInteractionHandler: (evt, handler) =>
        this.root_.addEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler, _util__WEBPACK_IMPORTED_MODULE_2__["applyPassive"]()),
      deregisterInteractionHandler: (evt, handler) =>
        this.root_.removeEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler, _util__WEBPACK_IMPORTED_MODULE_2__["applyPassive"]()),
      registerDrawerInteractionHandler: (evt, handler) =>
        this.drawer.addEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) =>
        this.drawer.removeEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler),
      registerTransitionEndHandler: (handler) =>
        this.root_.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: (handler) =>
        this.root_.removeEventListener('transitionend', handler),
      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),
      getDrawerWidth: () => this.drawer.offsetWidth,
      setTranslateX: (value) => this.drawer.style.setProperty(
        _util__WEBPACK_IMPORTED_MODULE_2__["getTransformPropertyName"](), value === null ? null : `translateX(${value}px)`),
      getFocusableElements: () => this.drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: (el) => _util__WEBPACK_IMPORTED_MODULE_2__["saveElementTabState"](el),
      restoreElementTabState: (el) => _util__WEBPACK_IMPORTED_MODULE_2__["restoreElementTabState"](el),
      makeElementUntabbable: (el) => el.setAttribute('tabindex', -1),
      notifyOpen: () => this.emit(_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings.OPEN_EVENT),
      notifyClose: () => this.emit(_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings.CLOSE_EVENT),
      isRtl: () => getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      isDrawer: (el) => el === this.drawer,
    });
  }
}


/***/ }),

/***/ "./node_modules/@material/drawer/slidable/constants.js":
/*!*************************************************************!*\
  !*** ./node_modules/@material/drawer/slidable/constants.js ***!
  \*************************************************************/
/*! exports provided: FOCUSABLE_ELEMENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FOCUSABLE_ELEMENTS", function() { return FOCUSABLE_ELEMENTS; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const FOCUSABLE_ELEMENTS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
  'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';


/***/ }),

/***/ "./node_modules/@material/drawer/slidable/foundation.js":
/*!**************************************************************!*\
  !*** ./node_modules/@material/drawer/slidable/foundation.js ***!
  \**************************************************************/
/*! exports provided: MDCSlidableDrawerFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCSlidableDrawerFoundation", function() { return MDCSlidableDrawerFoundation; });
/* harmony import */ var _material_base_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/index */ "./node_modules/@material/base/index.js");
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



class MDCSlidableDrawerFoundation extends _material_base_index__WEBPACK_IMPORTED_MODULE_0__["MDCFoundation"] {
  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      hasClass: (/* className: string */) => {},
      hasNecessaryDom: () => /* boolean */ false,
      registerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerDrawerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      deregisterDrawerInteractionHandler: (/* evt: string, handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {},
      registerDocumentKeydownHandler: (/* handler: EventListener */) => {},
      deregisterDocumentKeydownHandler: (/* handler: EventListener */) => {},
      setTranslateX: (/* value: number | null */) => {},
      getFocusableElements: () => /* NodeList */ {},
      saveElementTabState: (/* el: Element */) => {},
      restoreElementTabState: (/* el: Element */) => {},
      makeElementUntabbable: (/* el: Element */) => {},
      notifyOpen: () => {},
      notifyClose: () => {},
      isRtl: () => /* boolean */ false,
      getDrawerWidth: () => /* number */ 0,
    };
  }

  constructor(adapter, rootCssClass, animatingCssClass, openCssClass) {
    super(Object.assign(MDCSlidableDrawerFoundation.defaultAdapter, adapter));

    this.rootCssClass_ = rootCssClass;
    this.animatingCssClass_ = animatingCssClass;
    this.openCssClass_ = openCssClass;

    this.transitionEndHandler_ = (evt) => this.handleTransitionEnd_(evt);

    this.inert_ = false;

    this.componentTouchStartHandler_ = (evt) => this.handleTouchStart_(evt);
    this.componentTouchMoveHandler_ = (evt) => this.handleTouchMove_(evt);
    this.componentTouchEndHandler_ = (evt) => this.handleTouchEnd_(evt);
    this.documentKeydownHandler_ = (evt) => {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        this.close();
      }
    };
  }

  init() {
    const ROOT = this.rootCssClass_;
    const OPEN = this.openCssClass_;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    } else {
      this.detabinate_();
      this.isOpen_ = false;
    }

    this.adapter_.registerDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.registerInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.registerInteractionHandler('touchend', this.componentTouchEndHandler_);
  }

  destroy() {
    this.adapter_.deregisterDrawerInteractionHandler('touchstart', this.componentTouchStartHandler_);
    this.adapter_.deregisterInteractionHandler('touchmove', this.componentTouchMoveHandler_);
    this.adapter_.deregisterInteractionHandler('touchend', this.componentTouchEndHandler_);
    // Deregister the document keydown handler just in case the component is destroyed while the menu is open.
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
  }

  open() {
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.addClass(this.openCssClass_);
    this.retabinate_();
    // Debounce multiple calls
    if (!this.isOpen_) {
      this.adapter_.notifyOpen();
    }
    this.isOpen_ = true;
  }

  close() {
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerTransitionEndHandler(this.transitionEndHandler_);
    this.adapter_.addClass(this.animatingCssClass_);
    this.adapter_.removeClass(this.openCssClass_);
    this.detabinate_();
    // Debounce multiple calls
    if (this.isOpen_) {
      this.adapter_.notifyClose();
    }
    this.isOpen_ = false;
  }

  isOpen() {
    return this.isOpen_;
  }

  /**
   *  Render all children of the drawer inert when it's closed.
   */
  detabinate_() {
    if (this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.saveElementTabState(elements[i]);
        this.adapter_.makeElementUntabbable(elements[i]);
      }
    }

    this.inert_ = true;
  }

  /**
   *  Make all children of the drawer tabbable again when it's open.
   */
  retabinate_() {
    if (!this.inert_) {
      return;
    }

    const elements = this.adapter_.getFocusableElements();
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        this.adapter_.restoreElementTabState(elements[i]);
      }
    }

    this.inert_ = false;
  }

  handleTouchStart_(evt) {
    if (!this.adapter_.hasClass(this.openCssClass_)) {
      return;
    }
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.direction_ = this.adapter_.isRtl() ? -1 : 1;
    this.drawerWidth_ = this.adapter_.getDrawerWidth();
    this.startX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
    this.currentX_ = this.startX_;

    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
  }

  handleTouchMove_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.currentX_ = evt.touches ? evt.touches[0].pageX : evt.pageX;
  }

  handleTouchEnd_(evt) {
    if (evt.pointerType && evt.pointerType !== 'touch') {
      return;
    }

    this.prepareForTouchEnd_();

    // Did the user close the drawer by more than 50%?
    if (Math.abs(this.newPosition_ / this.drawerWidth_) >= 0.5) {
      this.close();
    } else {
      // Triggering an open here means we'll get a nice animation back to the fully open state.
      this.open();
    }
  }

  prepareForTouchEnd_() {
    cancelAnimationFrame(this.updateRaf_);
    this.adapter_.setTranslateX(null);
  }

  updateDrawer_() {
    this.updateRaf_ = requestAnimationFrame(this.updateDrawer_.bind(this));
    this.adapter_.setTranslateX(this.newPosition_);
  }

  get newPosition_() {
    let newPos = null;

    if (this.direction_ === 1) {
      newPos = Math.min(0, this.currentX_ - this.startX_);
    } else {
      newPos = Math.max(0, this.currentX_ - this.startX_);
    }

    return newPos;
  }

  isRootTransitioningEventTarget_() {
    // Classes extending MDCSlidableDrawerFoundation should implement this method to return true or false
    // if the event target is the root event target currently transitioning.
    return false;
  }

  handleTransitionEnd_(evt) {
    if (this.isRootTransitioningEventTarget_(evt.target)) {
      this.adapter_.removeClass(this.animatingCssClass_);
      this.adapter_.deregisterTransitionEndHandler(this.transitionEndHandler_);
    }
  };
}


/***/ }),

/***/ "./node_modules/@material/drawer/slidable/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@material/drawer/slidable/index.js ***!
  \*********************************************************/
/*! exports provided: FOCUSABLE_ELEMENTS, MDCSlidableDrawerFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/drawer/slidable/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FOCUSABLE_ELEMENTS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["FOCUSABLE_ELEMENTS"]; });

/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/drawer/slidable/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCSlidableDrawerFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_1__["MDCSlidableDrawerFoundation"]; });

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/***/ }),

/***/ "./node_modules/@material/drawer/temporary/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/@material/drawer/temporary/constants.js ***!
  \**************************************************************/
/*! exports provided: cssClasses, strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony import */ var _slidable_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slidable/index */ "./node_modules/@material/drawer/slidable/index.js");
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



const cssClasses = {
  ROOT: 'mdc-drawer--temporary',
  OPEN: 'mdc-drawer--open',
  ANIMATING: 'mdc-drawer--animating',
  SCROLL_LOCK: 'mdc-drawer-scroll-lock',
};

const strings = {
  DRAWER_SELECTOR: '.mdc-drawer--temporary .mdc-drawer__drawer',
  OPACITY_VAR_NAME: '--mdc-temporary-drawer-opacity',
  FOCUSABLE_ELEMENTS: _slidable_index__WEBPACK_IMPORTED_MODULE_0__["FOCUSABLE_ELEMENTS"],
  OPEN_EVENT: 'MDCTemporaryDrawer:open',
  CLOSE_EVENT: 'MDCTemporaryDrawer:close',
};


/***/ }),

/***/ "./node_modules/@material/drawer/temporary/foundation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@material/drawer/temporary/foundation.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MDCTemporaryDrawerFoundation; });
/* harmony import */ var _slidable_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slidable/index */ "./node_modules/@material/drawer/slidable/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/drawer/temporary/constants.js");
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




class MDCTemporaryDrawerFoundation extends _slidable_index__WEBPACK_IMPORTED_MODULE_0__["MDCSlidableDrawerFoundation"] {
  static get cssClasses() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"];
  }

  static get strings() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__["strings"];
  }

  static get defaultAdapter() {
    return Object.assign(_slidable_index__WEBPACK_IMPORTED_MODULE_0__["MDCSlidableDrawerFoundation"].defaultAdapter, {
      addBodyClass: (/* className: string */) => {},
      removeBodyClass: (/* className: string */) => {},
      isDrawer: () => false,
      updateCssVariable: (/* value: string */) => {},
      eventTargetHasClass: (/* target: EventTarget, className: string */) => /* boolean */ false,
    });
  }

  constructor(adapter) {
    super(
      Object.assign(MDCTemporaryDrawerFoundation.defaultAdapter, adapter),
      MDCTemporaryDrawerFoundation.cssClasses.ROOT,
      MDCTemporaryDrawerFoundation.cssClasses.ANIMATING,
      MDCTemporaryDrawerFoundation.cssClasses.OPEN);

    this.componentClickHandler_ = (evt) => {
      if (this.adapter_.eventTargetHasClass(evt.target, _constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].ROOT)) {
        this.close(true);
      }
    };
  }

  init() {
    super.init();

    // Make browser aware of custom property being used in this element.
    // Workaround for certain types of hard-to-reproduce heisenbugs.
    this.adapter_.updateCssVariable(0);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
  }

  destroy() {
    super.destroy();

    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.enableScroll_();
  }

  open() {
    this.disableScroll_();
    // Make sure custom property values are cleared before starting.
    this.adapter_.updateCssVariable('');

    super.open();
  }

  close() {
    // Make sure custom property values are cleared before making any changes.
    this.adapter_.updateCssVariable('');

    super.close();
  }

  prepareForTouchEnd_() {
    super.prepareForTouchEnd_();

    this.adapter_.updateCssVariable('');
  }

  updateDrawer_() {
    super.updateDrawer_();

    const newOpacity = Math.max(0, 1 + this.direction_ * (this.newPosition_ / this.drawerWidth_));
    this.adapter_.updateCssVariable(newOpacity);
  }

  isRootTransitioningEventTarget_(el) {
    return this.adapter_.isDrawer(el);
  }

  handleTransitionEnd_(evt) {
    super.handleTransitionEnd_(evt);
    if (!this.isOpen_) {
      this.enableScroll_();
    }
  };

  disableScroll_() {
    this.adapter_.addBodyClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].SCROLL_LOCK);
  }

  enableScroll_() {
    this.adapter_.removeBodyClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].SCROLL_LOCK);
  }
}


/***/ }),

/***/ "./node_modules/@material/drawer/temporary/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material/drawer/temporary/index.js ***!
  \**********************************************************/
/*! exports provided: MDCTemporaryDrawerFoundation, util, MDCTemporaryDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTemporaryDrawer", function() { return MDCTemporaryDrawer; });
/* harmony import */ var _material_base_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/base/index */ "./node_modules/@material/base/index.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/drawer/temporary/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTemporaryDrawerFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./node_modules/@material/drawer/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_2__; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








class MDCTemporaryDrawer extends _material_base_index__WEBPACK_IMPORTED_MODULE_0__["MDCComponent"] {
  static attachTo(root) {
    return new MDCTemporaryDrawer(root);
  }

  get open() {
    return this.foundation_.isOpen();
  }

  set open(value) {
    if (value) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  /* Return the drawer element inside the component. */
  get drawer() {
    return this.root_.querySelector(_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings.DRAWER_SELECTOR);
  }

  getDefaultFoundation() {
    const {FOCUSABLE_ELEMENTS, OPACITY_VAR_NAME} = _foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings;

    return new _foundation__WEBPACK_IMPORTED_MODULE_1__["default"]({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      hasClass: (className) => this.root_.classList.contains(className),
      addBodyClass: (className) => document.body.classList.add(className),
      removeBodyClass: (className) => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.drawer),
      registerInteractionHandler: (evt, handler) =>
        this.root_.addEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler, _util__WEBPACK_IMPORTED_MODULE_2__["applyPassive"]()),
      deregisterInteractionHandler: (evt, handler) =>
        this.root_.removeEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler, _util__WEBPACK_IMPORTED_MODULE_2__["applyPassive"]()),
      registerDrawerInteractionHandler: (evt, handler) =>
        this.drawer.addEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) =>
        this.drawer.removeEventListener(_util__WEBPACK_IMPORTED_MODULE_2__["remapEvent"](evt), handler),
      registerTransitionEndHandler: (handler) => this.drawer.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: (handler) => this.drawer.removeEventListener('transitionend', handler),
      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),
      getDrawerWidth: () => this.drawer.offsetWidth,
      setTranslateX: (value) => this.drawer.style.setProperty(
        _util__WEBPACK_IMPORTED_MODULE_2__["getTransformPropertyName"](), value === null ? null : `translateX(${value}px)`),
      updateCssVariable: (value) => {
        if (_util__WEBPACK_IMPORTED_MODULE_2__["supportsCssCustomProperties"]()) {
          this.root_.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: () => this.drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: (el) => _util__WEBPACK_IMPORTED_MODULE_2__["saveElementTabState"](el),
      restoreElementTabState: (el) => _util__WEBPACK_IMPORTED_MODULE_2__["restoreElementTabState"](el),
      makeElementUntabbable: (el) => el.setAttribute('tabindex', -1),
      notifyOpen: () => this.emit(_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings.OPEN_EVENT),
      notifyClose: () => this.emit(_foundation__WEBPACK_IMPORTED_MODULE_1__["default"].strings.CLOSE_EVENT),
      isRtl: () => getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      isDrawer: (el) => el === this.drawer,
    });
  }
}


/***/ }),

/***/ "./node_modules/@material/drawer/util.js":
/*!***********************************************!*\
  !*** ./node_modules/@material/drawer/util.js ***!
  \***********************************************/
/*! exports provided: remapEvent, getTransformPropertyName, supportsCssCustomProperties, applyPassive, saveElementTabState, restoreElementTabState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remapEvent", function() { return remapEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTransformPropertyName", function() { return getTransformPropertyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsCssCustomProperties", function() { return supportsCssCustomProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPassive", function() { return applyPassive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveElementTabState", function() { return saveElementTabState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "restoreElementTabState", function() { return restoreElementTabState; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const TAB_DATA = 'data-mdc-tabindex';
const TAB_DATA_HANDLED = 'data-mdc-tabindex-handled';

let storedTransformPropertyName_;
let supportsPassive_;

// Remap touch events to pointer events, if the browser doesn't support touch events.
function remapEvent(eventName, globalObj = window) {
  if (!('ontouchstart' in globalObj.document)) {
    switch (eventName) {
    case 'touchstart':
      return 'pointerdown';
    case 'touchmove':
      return 'pointermove';
    case 'touchend':
      return 'pointerup';
    default:
      return eventName;
    }
  }

  return eventName;
}

// Choose the correct transform property to use on the current browser.
function getTransformPropertyName(globalObj = window, forceRefresh = false) {
  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : '-webkit-transform');
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}

// Determine whether the current browser supports CSS properties.
function supportsCssCustomProperties(globalObj = window) {
  if ('CSS' in globalObj) {
    return globalObj.CSS.supports('(--color: red)');
  }
  return false;
}

// Determine whether the current browser supports passive event listeners, and if so, use them.
function applyPassive(globalObj = window, forceRefresh = false) {
  if (supportsPassive_ === undefined || forceRefresh) {
    let isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}

// Save the tab state for an element.
function saveElementTabState(el) {
  if (el.hasAttribute('tabindex')) {
    el.setAttribute(TAB_DATA, el.getAttribute('tabindex'));
  }
  el.setAttribute(TAB_DATA_HANDLED, true);
}

// Restore the tab state for an element, if it was saved.
function restoreElementTabState(el) {
  // Only modify elements we've already handled, in case anything was dynamically added since we saved state.
  if (el.hasAttribute(TAB_DATA_HANDLED)) {
    if (el.hasAttribute(TAB_DATA)) {
      el.setAttribute('tabindex', el.getAttribute(TAB_DATA));
      el.removeAttribute(TAB_DATA);
    } else {
      el.removeAttribute('tabindex');
    }
    el.removeAttribute(TAB_DATA_HANDLED);
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
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
};

const strings = {
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
};

const numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
  FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
  TAP_DELAY_MS: 300, // Delay between touch and simulated mouse events on touch devices
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
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
let PointType;

// Activation events registered on the root element of each instance for activation
const ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

// Deactivation events registered on documentElement when a pointer-related down event occurs
const POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

// Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
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
      browserSupportsCssVars: () => /* boolean - cached */ {},
      isUnbounded: () => /* boolean */ {},
      isSurfaceActive: () => /* boolean */ {},
      isSurfaceDisabled: () => /* boolean */ {},
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      containsEventTarget: (/* target: !EventTarget */) => {},
      registerInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerDocumentInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      deregisterDocumentInteractionHandler: (/* evtType: string, handler: EventListener */) => {},
      registerResizeHandler: (/* handler: EventListener */) => {},
      deregisterResizeHandler: (/* handler: EventListener */) => {},
      updateCssVariable: (/* varName: string, value: string */) => {},
      computeBoundingRect: () => /* ClientRect */ {},
      getWindowPageOffset: () => /* {x: number, y: number} */ {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCRippleFoundation.defaultAdapter, adapter));

    /** @private {number} */
    this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    this.frame_ = /** @type {!ClientRect} */ ({width: 0, height: 0});

    /** @private {!ActivationStateType} */
    this.activationState_ = this.defaultActivationState_();

    /** @private {number} */
    this.initialSize_ = 0;

    /** @private {number} */
    this.maxRadius_ = 0;

    /** @private {function(!Event)} */
    this.activateHandler_ = (e) => this.activate_(e);

    /** @private {function(!Event)} */
    this.deactivateHandler_ = (e) => this.deactivate_(e);

    /** @private {function(?Event=)} */
    this.focusHandler_ = () => this.handleFocus();

    /** @private {function(?Event=)} */
    this.blurHandler_ = () => this.handleBlur();

    /** @private {!Function} */
    this.resizeHandler_ = () => this.layout();

    /** @private {{left: number, top:number}} */
    this.unboundedCoords_ = {
      left: 0,
      top: 0,
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
      isProgrammatic: false,
    };
  }

  /** @override */
  init() {
    const supportsPressRipple = this.supportsPressRipple_();

    this.registerRootHandlers_(supportsPressRipple);

    if (supportsPressRipple) {
      const {ROOT, UNBOUNDED} = MDCRippleFoundation.cssClasses;
      requestAnimationFrame(() => {
        this.adapter_.addClass(ROOT);
        if (this.adapter_.isUnbounded()) {
          this.adapter_.addClass(UNBOUNDED);
          // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
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
        const {FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
        this.adapter_.removeClass(FG_ACTIVATION);
      }

      const {ROOT, UNBOUNDED} = MDCRippleFoundation.cssClasses;
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
      ACTIVATION_EVENT_TYPES.forEach((type) => {
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
      POINTER_DEACTIVATION_EVENT_TYPES.forEach((type) => {
        this.adapter_.registerDocumentInteractionHandler(type, this.deactivateHandler_);
      });
    }
  }

  /** @private */
  deregisterRootHandlers_() {
    ACTIVATION_EVENT_TYPES.forEach((type) => {
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
    POINTER_DEACTIVATION_EVENT_TYPES.forEach((type) => {
      this.adapter_.deregisterDocumentInteractionHandler(type, this.deactivateHandler_);
    });
  }

  /** @private */
  removeCssVars_() {
    const {strings} = MDCRippleFoundation;
    Object.keys(strings).forEach((k) => {
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
    }

    // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
    const previousActivationEvent = this.previousActivationEvent_;
    const isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
    if (isSameInteraction) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : (
      e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown'
    );

    const hasActivatedChild =
      e && activatedTargets.length > 0 && activatedTargets.some((target) => this.adapter_.containsEventTarget(target));
    if (hasActivatedChild) {
      // Immediately reset activation state, while preserving logic that prevents touch follow-on events
      this.resetActivationState_();
      return;
    }

    if (e) {
      activatedTargets.push(/** @type {!EventTarget} */ (e.target));
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
    return (e && e.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
  }

  /**
   * @param {?Event=} event Optional event containing position information.
   */
  activate(event = null) {
    this.activate_(event);
  }

  /** @private */
  animateActivation_() {
    const {VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END} = MDCRippleFoundation.strings;
    const {FG_DEACTIVATION, FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
    const {DEACTIVATION_TIMEOUT_MS} = MDCRippleFoundation.numbers;

    this.layoutInternal_();

    let translateStart = '';
    let translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      const {startPoint, endPoint} = this.getFgTranslationCoordinates_();
      translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(() => this.activationTimerCallback_(), DEACTIVATION_TIMEOUT_MS);
  }

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */
  getFgTranslationCoordinates_() {
    const {activationEvent, wasActivatedByPointer} = this.activationState_;

    let startPoint;
    if (wasActivatedByPointer) {
      startPoint = Object(_util__WEBPACK_IMPORTED_MODULE_3__["getNormalizedEventCoords"])(
        /** @type {!Event} */ (activationEvent),
        this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect()
      );
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2,
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - (this.initialSize_ / 2),
      y: startPoint.y - (this.initialSize_ / 2),
    };

    const endPoint = {
      x: (this.frame_.width / 2) - (this.initialSize_ / 2),
      y: (this.frame_.height / 2) - (this.initialSize_ / 2),
    };

    return {startPoint, endPoint};
  }

  /** @private */
  runDeactivationUXLogicIfReady_() {
    // This method is called both when a pointing device is released, and when the activation animation ends.
    // The deactivation animation should only run after both of those occur.
    const {FG_DEACTIVATION} = MDCRippleFoundation.cssClasses;
    const {hasDeactivationUXRun, isActivated} = this.activationState_;
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
    const {FG_ACTIVATION} = MDCRippleFoundation.cssClasses;
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  }

  resetActivationState_() {
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    // Touch devices may fire additional events for the same interaction within a short time.
    // Store the previous event until it's safe to assume that subsequent events are for new interactions.
    setTimeout(() => this.previousActivationEvent_ = null, MDCRippleFoundation.numbers.TAP_DELAY_MS);
  }

  /**
   * @param {?Event} e
   * @private
   */
  deactivate_(e) {
    const activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.
    if (!activationState.isActivated) {
      return;
    }

    const state = /** @type {!ActivationStateType} */ (Object.assign({}, activationState));

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
  animateDeactivation_(e, {wasActivatedByPointer, wasElementMadeActive}) {
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
    const maxDim = Math.max(this.frame_.height, this.frame_.width);

    // Surface diameter is treated differently for unbounded vs. bounded ripples.
    // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
    // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
    // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
    // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
    // `overflow: hidden`.
    const getBoundedRadius = () => {
      const hypotenuse = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation.numbers.PADDING;
    };

    this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

    // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;

    this.updateLayoutCssVars_();
  }

  /** @private */
  updateLayoutCssVars_() {
    const {
      VAR_FG_SIZE, VAR_LEFT, VAR_TOP, VAR_FG_SCALE,
    } = MDCRippleFoundation.strings;

    this.adapter_.updateCssVariable(VAR_FG_SIZE, `${this.initialSize_}px`);
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
        top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
      };

      this.adapter_.updateCssVariable(VAR_LEFT, `${this.unboundedCoords_.left}px`);
      this.adapter_.updateCssVariable(VAR_TOP, `${this.unboundedCoords_.top}px`);
    }
  }

  /** @param {boolean} unbounded */
  setUnbounded(unbounded) {
    const {UNBOUNDED} = MDCRippleFoundation.cssClasses;
    if (unbounded) {
      this.adapter_.addClass(UNBOUNDED);
    } else {
      this.adapter_.removeClass(UNBOUNDED);
    }
  }

  handleFocus() {
    requestAnimationFrame(() =>
      this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
  }

  handleBlur() {
    requestAnimationFrame(() =>
      this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED));
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
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
  static attachTo(root, {isUnbounded = undefined} = {}) {
    const ripple = new MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */ (isUnbounded);
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
      addClass: (className) => instance.root_.classList.add(className),
      removeClass: (className) => instance.root_.classList.remove(className),
      containsEventTarget: (target) => instance.root_.contains(target),
      registerInteractionHandler: (evtType, handler) =>
        instance.root_.addEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      deregisterInteractionHandler: (evtType, handler) =>
        instance.root_.removeEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      registerDocumentInteractionHandler: (evtType, handler) =>
        document.documentElement.addEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      deregisterDocumentInteractionHandler: (evtType, handler) =>
        document.documentElement.removeEventListener(evtType, handler, _util__WEBPACK_IMPORTED_MODULE_3__["applyPassive"]()),
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => instance.root_.style.setProperty(varName, value),
      computeBoundingRect: () => instance.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset}),
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
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
  document.body.appendChild(node);

  // The bug exists if ::before style ends up propagating to the parent element.
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

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  const weAreFeatureDetectingSafari10plus = (
    windowObj.CSS.supports('(--css-vars: yes)') &&
    windowObj.CSS.supports('color', '#00000000')
  );

  if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
    supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
  } else {
    supportsCssVariables = false;
  }

  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVariables;
  }
  return supportsCssVariables;
}

//
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
      globalObj.document.addEventListener('test', null, {get passive() {
        isSupported = true;
      }});
    } catch (e) { }

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? {passive: true} : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop();
}

/**
 * @param {!Event} ev
 * @param {{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  const {x, y} = pageOffset;
  const documentX = x + clientRect.left;
  const documentY = y + clientRect.top;

  let normalizedX;
  let normalizedY;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return {x: normalizedX, y: normalizedY};
}




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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
  var keys = void 0;
  // Use Reflect if exists
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
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
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
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

/***/ "./node_modules/preact-material-components/Button/style.css":
/*!******************************************************************!*\
  !*** ./node_modules/preact-material-components/Button/style.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-material-components/Drawer/style.css":
/*!******************************************************************!*\
  !*** ./node_modules/preact-material-components/Drawer/style.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-material-components/List/style.css":
/*!****************************************************************!*\
  !*** ./node_modules/preact-material-components/List/style.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/preact-material-components/ts/Base/MaterialComponent.ts":
/*!******************************************************************************!*\
  !*** ./node_modules/preact-material-components/ts/Base/MaterialComponent.ts ***!
  \******************************************************************************/
/*! exports provided: MaterialComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialComponent", function() { return MaterialComponent; });
/* harmony import */ var _material_ripple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/ripple */ "./node_modules/@material/ripple/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(autobind_decorator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
var _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }




const doNotRemoveProps = ['disabled'];
/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */

let MaterialComponent = (_class = class MaterialComponent extends preact__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  /**
   * Attributes inside this array will be check for boolean value true
   * and will be converted to mdc classes
   */

  /** This will again be used to add apt classname to the component */

  /**
   * Props of which change the MDComponent will be informed.
   * Override to use.
   * When used do not forget to include this.afterComponentDidMount() at the end of your componentDidMount function.
   * Requires this.MDComponent to be defined.
   */

  /** The final class name given to the dom */
  render(props) {
    if (!this.classText) {
      this.classText = this.buildClassName(props);
    } // Fetch a VNode


    const componentProps = props;
    const userDefinedClasses = componentProps.className || componentProps.class || ''; // We delete class props and add them later in the final
    // step so every component does not need to handle user specified classes.

    if (componentProps.class) {
      delete componentProps.class;
    }

    if (componentProps.className) {
      delete componentProps.className;
    }

    const element = this.materialDom(componentProps);
    element.attributes = element.attributes || {};
    element.attributes.className = `${userDefinedClasses} ${this.getClassName(element)}`.split(' ').filter((value, index, self) => self.indexOf(value) === index && value !== '') // Unique + exclude empty class names
    .join(' '); // Clean this shit of proxy attributes

    this.mdcProps.forEach(prop => {
      // TODO: Fix this better
      if (prop in doNotRemoveProps) {
        return;
      }

      delete element.attributes[prop];
    });
    return element;
  }
  /** Attach the ripple effect */


  componentDidMount() {
    if (this.props.ripple && this.control) {
      this.ripple = new _material_ripple__WEBPACK_IMPORTED_MODULE_0__["MDCRipple"](this.control);
    }
  }

  componentWillUpdate(nextProps) {
    if (this.MDComponent && this.mdcNotifyProps) {
      for (const prop of this.mdcNotifyProps) {
        if (this.props[prop] !== nextProps[prop]) {
          this.MDComponent[prop] = nextProps[prop];
        }
      }
    }

    for (const prop of this.mdcProps) {
      if (this.props[prop] !== nextProps[prop]) {
        this.classText = this.buildClassName(nextProps);
        break;
      }
    }
  }

  componentWillUnmount() {
    if (this.ripple) {
      this.ripple.destroy();
    }
  }

  afterComponentDidMount() {
    if (this.MDComponent && this.mdcNotifyProps) {
      for (const prop of this.mdcNotifyProps) {
        this.MDComponent[prop] = this.props[prop];
      }
    }
  } // Shared setter for the root element ref


  setControlRef(control) {
    this.control = control;
  }
  /** Build the className based on component names and mdc props */


  buildClassName(props) {
    // Class name based on component name
    let classText = 'mdc-' + this.componentName; // Loop over mdcProps to turn them into classNames

    for (const propKey in props) {
      if (props.hasOwnProperty(propKey)) {
        const prop = props[propKey];

        if (typeof prop === 'boolean' && prop) {
          if (this.mdcProps.indexOf(propKey) !== -1) {
            classText += ` mdc-${this.componentName}--${propKey}`;
          }
        }
      }
    }

    return classText;
  }
  /** Returns the class name for element */


  getClassName(element) {
    if (!element) {
      return '';
    }

    const attrs = element.attributes = element.attributes || {};
    let classText = this.classText;

    if (attrs.class) {
      classText += ' ' + attrs.class;
    }

    if (attrs.className && attrs.className !== attrs.class) {
      classText += ' ' + attrs.className;
    }

    return classText;
  }
  /** Components must implement this method for their specific DOM structure */


}, (_applyDecoratedDescriptor(_class.prototype, "afterComponentDidMount", [autobind_decorator__WEBPACK_IMPORTED_MODULE_1___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "afterComponentDidMount"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setControlRef", [autobind_decorator__WEBPACK_IMPORTED_MODULE_1___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "setControlRef"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "buildClassName", [autobind_decorator__WEBPACK_IMPORTED_MODULE_1___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "buildClassName"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getClassName", [autobind_decorator__WEBPACK_IMPORTED_MODULE_1___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "getClassName"), _class.prototype)), _class);
/* harmony default export */ __webpack_exports__["default"] = (MaterialComponent);

/***/ }),

/***/ "./node_modules/preact-material-components/ts/Button/index.tsx":
/*!*********************************************************************!*\
  !*** ./node_modules/preact-material-components/ts/Button/index.tsx ***!
  \*********************************************************************/
/*! exports provided: ButtonIcon, Button, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonIcon", function() { return ButtonIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autobind_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/ts/Base/MaterialComponent.ts");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Icon */ "./node_modules/preact-material-components/ts/Icon/index.tsx");
/* harmony import */ var _themeUtils_generateThemeClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../themeUtils/generateThemeClass */ "./node_modules/preact-material-components/ts/themeUtils/generateThemeClass.ts");
var _class, _class2, _temp3;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }






class ButtonIcon extends _Icon__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentName = 'button__icon', _temp;
  }

}
let Button = (_class = (_temp3 = _class2 = class Button extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.componentName = 'button', this.mdcProps = ['dense', 'raised', 'unelevated', 'outlined'], this.themeProps = ['primary', 'secondary'], _temp2;
  }

  materialDom(props) {
    const ButtonElement = props.href ? 'a' : 'button';
    let className = '';
    this.themeProps.forEach(themeProp => {
      if (themeProp in props && props[themeProp] !== false) {
        className += Object(_themeUtils_generateThemeClass__WEBPACK_IMPORTED_MODULE_4__["default"])(themeProp) + ' ';
      }
    });
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(ButtonElement, _extends({
      ref: this.setControlRef
    }, props, {
      className: className
    }), this.props.children);
  }

}, _class2.Icon = ButtonIcon, _temp3), (_applyDecoratedDescriptor(_class.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "materialDom"), _class.prototype)), _class);
/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./node_modules/preact-material-components/ts/Drawer/index.tsx":
/*!*********************************************************************!*\
  !*** ./node_modules/preact-material-components/ts/Drawer/index.tsx ***!
  \*********************************************************************/
/*! exports provided: TemporaryDrawer, PermanentDrawer, PersistentDrawer, DrawerHeader, DrawerContent, DrawerItem, Drawer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemporaryDrawer", function() { return TemporaryDrawer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermanentDrawer", function() { return PermanentDrawer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersistentDrawer", function() { return PersistentDrawer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawerHeader", function() { return DrawerHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawerContent", function() { return DrawerContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawerItem", function() { return DrawerItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drawer", function() { return Drawer; });
/* harmony import */ var _material_drawer_persistent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/drawer/persistent */ "./node_modules/@material/drawer/persistent/index.js");
/* harmony import */ var _material_drawer_temporary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/drawer/temporary */ "./node_modules/@material/drawer/temporary/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(autobind_decorator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/ts/Base/MaterialComponent.ts");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../List */ "./node_modules/preact-material-components/ts/List/index.tsx");
var _class, _class3, _class5, _class7, _class9, _class11;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }







let TemporaryDrawer = (_class = class TemporaryDrawer extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentName = 'drawer--temporary', this.mdcProps = [], this.mdcNotifyProps = ['open'], _temp;
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.control) {
      this.MDComponent = new _material_drawer_temporary__WEBPACK_IMPORTED_MODULE_1__["MDCTemporaryDrawer"](this.control);
      this.MDComponent.listen('MDCTemporaryDrawer:open', this.open);
      this.MDComponent.listen('MDCTemporaryDrawer:close', this.close);
    }

    this.afterComponentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    if (this.MDComponent) {
      this.MDComponent.unlisten('MDCTemporaryDrawer:close', this.close);
      this.MDComponent.unlisten('MDCTemporaryDrawer:open', this.open);
      this.MDComponent.destroy();
    }
  }

  open(e) {
    if (this.props.onOpen) {
      this.props.onOpen(e);
    }
  }

  close(e) {
    if (this.props.onClose) {
      this.props.onClose(e);
    }
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("aside", _extends({
      className: "mdc-typography mdc-drawer",
      ref: this.setControlRef
    }, props), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("nav", {
      className: "mdc-drawer__drawer"
    }, props.children));
  }

}, (_applyDecoratedDescriptor(_class.prototype, "open", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "close", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "materialDom"), _class.prototype)), _class);

/**
 * @prop spacer = false
 */
let PermanentDrawer = (_class3 = class PermanentDrawer extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.componentName = 'drawer--permanent', this.mdcProps = [], _temp2;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("nav", _extends({
      className: "mdc-typography mdc-drawer"
    }, props), props.spacer && Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("div", {
      className: "mdc-drawer__toolbar-spacer"
    }), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("div", {
      className: "mdc-drawer__content"
    }, Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("nav", {
      className: "mdc-list"
    }, props.children)));
  }

}, (_applyDecoratedDescriptor(_class3.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class3.prototype, "materialDom"), _class3.prototype)), _class3);
let PersistentDrawer = (_class5 = class PersistentDrawer extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(...args) {
    var _temp3;

    return _temp3 = super(...args), this.componentName = 'drawer--persistent', this.mdcProps = [], this.mdcNotifyProps = ['open'], _temp3;
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.control) {
      this.MDComponent = new _material_drawer_persistent__WEBPACK_IMPORTED_MODULE_0__["MDCPersistentDrawer"](this.control);
      this.MDComponent.listen('MDCPersistentDrawer:open', this.open);
      this.MDComponent.listen('MDCPersistentDrawer:close', this.close);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    if (this.MDComponent) {
      this.MDComponent.unlisten('MDCPersistentDrawer:close', this.close);
      this.MDComponent.unlisten('MDCPersistentDrawer:open', this.open);
      this.MDComponent.destroy();
    }

    this.afterComponentDidMount();
  }

  open(e) {
    if (this.props.onOpen) {
      this.props.onOpen(e);
    }
  }

  close(e) {
    if (this.props.onClose) {
      this.props.onClose(e);
    }
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("aside", _extends({
      className: "mdc-typography mdc-drawer",
      ref: this.setControlRef
    }, props), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("nav", {
      className: "mdc-drawer__drawer"
    }, props.children));
  }

}, (_applyDecoratedDescriptor(_class5.prototype, "open", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class5.prototype, "open"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "close", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class5.prototype, "close"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class5.prototype, "materialDom"), _class5.prototype)), _class5);
let DrawerHeader = (_class7 = class DrawerHeader extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(...args) {
    var _temp4;

    return _temp4 = super(...args), this.componentName = 'drawer__header', this.mdcProps = [], _temp4;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("header", _extends({
      ref: this.setControlRef
    }, props), Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("div", {
      className: "mdc-drawer__header-content"
    }, props.children));
  }

}, (_applyDecoratedDescriptor(_class7.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class7.prototype, "materialDom"), _class7.prototype)), _class7);
let DrawerContent = (_class9 = class DrawerContent extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(...args) {
    var _temp5;

    return _temp5 = super(...args), this.componentName = 'drawer__content', this.mdcProps = [], _temp5;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_3__["h"])("nav", _extends({
      className: "mdc-list",
      ref: this.setControlRef
    }, props), props.children);
  }

}, (_applyDecoratedDescriptor(_class9.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class9.prototype, "materialDom"), _class9.prototype)), _class9);

/**
 * @prop selected = false
 */
let DrawerItem = (_class11 = class DrawerItem extends _List__WEBPACK_IMPORTED_MODULE_5__["ListLinkItem"] {
  materialDom(props) {
    const returnedNode = super.materialDom(props);
    /* Logic to add selected class */

    if (props.selected) {
      returnedNode.attributes.className = 'mdc-list-item--activated';
    }

    return returnedNode;
  }

}, (_applyDecoratedDescriptor(_class11.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_2___default.a], Object.getOwnPropertyDescriptor(_class11.prototype, "materialDom"), _class11.prototype)), _class11);
class Drawer {}
Drawer.DrawerContent = DrawerContent;
Drawer.DrawerHeader = DrawerHeader;
Drawer.DrawerItem = DrawerItem;
Drawer.PermanentDrawer = PermanentDrawer;
Drawer.PersistentDrawer = PersistentDrawer;
Drawer.TemporaryDrawer = TemporaryDrawer;
/* harmony default export */ __webpack_exports__["default"] = (Drawer);

/***/ }),

/***/ "./node_modules/preact-material-components/ts/Icon/index.tsx":
/*!*******************************************************************!*\
  !*** ./node_modules/preact-material-components/ts/Icon/index.tsx ***!
  \*******************************************************************/
/*! exports provided: Icon, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return Icon; });
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autobind_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/ts/Base/MaterialComponent.ts");
var _class;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }




let Icon = (_class = class Icon extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentName = 'icon', this.mdcProps = [], _temp;
  }

  materialDom(props) {
    const classes = ['material-icons']; // CardActionIcon sends className

    if (props.className) {
      classes.push(props.className);
    }

    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("i", _extends({}, props, {
      className: classes.join(' ')
    }), props.children);
  }

}, (_applyDecoratedDescriptor(_class.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "materialDom"), _class.prototype)), _class);
/* harmony default export */ __webpack_exports__["default"] = (Icon);

/***/ }),

/***/ "./node_modules/preact-material-components/ts/List/index.tsx":
/*!*******************************************************************!*\
  !*** ./node_modules/preact-material-components/ts/List/index.tsx ***!
  \*******************************************************************/
/*! exports provided: ListItem, ListLinkItem, ListItemGraphic, ListItemMeta, ListDivider, ListTextContainer, ListPrimaryText, ListSecondaryText, ListGroup, ListGroupHeader, List, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItem", function() { return ListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListLinkItem", function() { return ListLinkItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItemGraphic", function() { return ListItemGraphic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItemMeta", function() { return ListItemMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListDivider", function() { return ListDivider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListTextContainer", function() { return ListTextContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPrimaryText", function() { return ListPrimaryText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListSecondaryText", function() { return ListSecondaryText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListGroup", function() { return ListGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListGroupHeader", function() { return ListGroupHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/index.js");
/* harmony import */ var autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autobind_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Base/MaterialComponent */ "./node_modules/preact-material-components/ts/Base/MaterialComponent.ts");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Icon */ "./node_modules/preact-material-components/ts/Icon/index.tsx");
var _class, _class3, _class5, _class7, _class9, _class11, _class13, _class15, _class16, _temp12;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }





let ListItem = (_class = class ListItem extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.componentName = 'list-item', this.mdcProps = [], _temp;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("li", _extends({
      role: "option"
    }, props, {
      ref: this.setControlRef
    }), props.children);
  }

}, (_applyDecoratedDescriptor(_class.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "materialDom"), _class.prototype)), _class);
let ListLinkItem = (_class3 = class ListLinkItem extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.componentName = 'list-item', this.mdcProps = [], _temp2;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("a", _extends({
      role: "option"
    }, props, {
      ref: this.setControlRef
    }), props.children);
  }

}, (_applyDecoratedDescriptor(_class3.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class3.prototype, "materialDom"), _class3.prototype)), _class3);
let ListItemGraphic = (_class5 = class ListItemGraphic extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp3;

    return _temp3 = super(...args), this.componentName = 'list-item__graphic', this.mdcProps = [], _temp3;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("span", _extends({}, props, {
      ref: this.setControlRef,
      role: "presentation"
    }), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_Icon__WEBPACK_IMPORTED_MODULE_3__["default"], {
      "aria-hidden": "true"
    }, props.children));
  }

}, (_applyDecoratedDescriptor(_class5.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class5.prototype, "materialDom"), _class5.prototype)), _class5);
class ListItemMeta extends ListItemGraphic {
  constructor(...args) {
    var _temp4;

    return _temp4 = super(...args), this.componentName = 'list-item__meta', _temp4;
  }

}
let ListDivider = (_class7 = class ListDivider extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp5;

    return _temp5 = super(...args), this.componentName = 'list-divider', this.mdcProps = ['inset'], _temp5;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("li", _extends({
      role: "separator"
    }, props, {
      ref: this.setControlRef
    }));
  }

}, (_applyDecoratedDescriptor(_class7.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class7.prototype, "materialDom"), _class7.prototype)), _class7);
let ListTextContainer = (_class9 = class ListTextContainer extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp6;

    return _temp6 = super(...args), this.componentName = 'list-item__text', this.mdcProps = [], _temp6;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("span", _extends({}, props, {
      ref: this.setControlRef
    }), props.children);
  }

}, (_applyDecoratedDescriptor(_class9.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class9.prototype, "materialDom"), _class9.prototype)), _class9);
class ListPrimaryText extends ListTextContainer {
  constructor(...args) {
    var _temp7;

    return _temp7 = super(...args), this.componentName = 'list-item__primary-text', _temp7;
  }

}
class ListSecondaryText extends ListTextContainer {
  constructor(...args) {
    var _temp8;

    return _temp8 = super(...args), this.componentName = 'list-item__secondary-text', _temp8;
  }

}
let ListGroup = (_class11 = class ListGroup extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp9;

    return _temp9 = super(...args), this.componentName = 'list-group', this.mdcProps = [], _temp9;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("div", props, this.props.children);
  }

}, (_applyDecoratedDescriptor(_class11.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class11.prototype, "materialDom"), _class11.prototype)), _class11);
let ListGroupHeader = (_class13 = class ListGroupHeader extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp10;

    return _temp10 = super(...args), this.componentName = 'list-group__subheader', this.mdcProps = [], _temp10;
  }

  materialDom(props) {
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("h3", _extends({}, props, {
      ref: this.setControlRef
    }), props.children);
  }

}, (_applyDecoratedDescriptor(_class13.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class13.prototype, "materialDom"), _class13.prototype)), _class13);
let List = (_class15 = (_temp12 = _class16 = class List extends _Base_MaterialComponent__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    var _temp11;

    return _temp11 = super(...args), this.componentName = 'list', this.mdcProps = ['dense', 'two-line', 'avatar-list'], _temp11;
  }

  materialDom(props) {
    if (props.interactive) {
      return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("nav", _extends({
        ref: this.setControlRef
      }, props), props.children);
    }

    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("ul", _extends({}, props, {
      ref: this.setControlRef
    }), props.children);
  }

}, _class16.Item = ListItem, _class16.LinkItem = ListLinkItem, _class16.ItemGraphic = ListItemGraphic, _class16.ItemMeta = ListItemMeta, _class16.Divider = ListDivider, _class16.TextContainer = ListTextContainer, _class16.PrimaryText = ListPrimaryText, _class16.SecondaryText = ListSecondaryText, _class16.Group = ListGroup, _class16.GroupHeader = ListGroupHeader, _temp12), (_applyDecoratedDescriptor(_class15.prototype, "materialDom", [autobind_decorator__WEBPACK_IMPORTED_MODULE_0___default.a], Object.getOwnPropertyDescriptor(_class15.prototype, "materialDom"), _class15.prototype)), _class15);
/* harmony default export */ __webpack_exports__["default"] = (List);

/***/ }),

/***/ "./node_modules/preact-material-components/ts/themeUtils/generateThemeClass.ts":
/*!*************************************************************************************!*\
  !*** ./node_modules/preact-material-components/ts/themeUtils/generateThemeClass.ts ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (prop) {
  return `mdc-theme--${prop}-bg`;
});

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
		for (var i=0; i<p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1=0; i$1<max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0)===':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
				flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
				plus = ~flags.indexOf('+'),
				star = ~flags.indexOf('*'),
				val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?')<0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		}
		else if (route[i$1]!==url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default!==true && ret===false) { return false; }
	return matches;
}

function pathRankSort(a, b) {
	return (
		(a.rank < b.rank) ? 1 :
		(a.rank > b.rank) ? -1 :
		(a.index - b.index)
	);
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0)==':' ? (1 + '*+?'.indexOf(segment.charAt(segment.length-1))) || 4 : 5;
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
	return node.__preactattr_!=null || typeof Symbol!=='undefined' && node[Symbol.for('preactattr')]!=null;
}

function setUrl(url, type) {
	if ( type === void 0 ) type='push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	}
	else if (typeof history!=='undefined' && history[type+'State']) {
		history[type+'State'](null, null, url);
	}
}


function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	}
	else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	}
	else {
		url = typeof location!=='undefined' ? location : EMPTY;
	}
	return ("" + (url.pathname || '') + (url.search || ''));
}



function route(url, replace) {
	if ( replace === void 0 ) replace=false;

	if (typeof url!=='string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}


/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i=ROUTERS.length; i--; ) {
		if (ROUTERS[i].canRoute(url)) { return true; }
	}
	return false;
}


/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i=0; i<ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url)===true) {
			didRoute = true;
		}
	}
	for (var i$1=subscribers.length; i$1--; ) {
		subscribers[i$1](url);
	}
	return didRoute;
}


function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) { return; }

	var href = node.getAttribute('href'),
		target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || (target && !target.match(/^_?self$/i))) { return; }

	// attempt to route, if no match simply cede control to browser
	return route(href);
}


function handleLinkClick(e) {
	if (e.button==0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}


function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) { e.stopImmediatePropagation(); }
		if (e.stopPropagation) { e.stopPropagation(); }
		e.preventDefault();
	}
	return false;
}


function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button!==0) { return; }

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase()==='A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) { return; }
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while ((t=t.parentNode));
}


var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) { return; }

	if (typeof addEventListener==='function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}


var Router = (function (Component$$1) {
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

	if ( Component$$1 ) Router.__proto__ = Component$$1;
	Router.prototype = Object.create( Component$$1 && Component$$1.prototype );
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate (props) {
		if (props.static!==true) { return true; }
		return props.url!==this.props.url || props.onChange!==this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute (url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo (url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) { return this.canRoute(url); }

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount () {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount () {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo(("" + (location.pathname || '') + (location.search || '')));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount () {
		if (typeof this.unlisten==='function') { this.unlisten(); }
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate () {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate () {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren (children, url, invoke) {
		return children
			.filter(prepareVNodeForRanking)
			.sort(pathRankSort)
			.map( function (vnode) {
				var matches = exec(url, vnode.attributes.path, vnode.attributes);
				if (matches) {
					if (invoke !== false) {
						var newProps = { url: url, matches: matches };
						assign(newProps, matches);
						delete newProps.ref;
						delete newProps.key;
						return Object(preact__WEBPACK_IMPORTED_MODULE_0__["cloneElement"])(vnode, newProps);
					}
					return vnode;
				}
			}).filter(Boolean);
	};

	Router.prototype.render = function render (ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url!==previous) {
			this.previousUrl = url;
			if (typeof onChange==='function') {
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
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]));

var Link = function (props) { return (
	Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])('a', assign({ onClick: handleLinkClick }, props))
); };

var Route = function (props) { return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(props.component, props); };

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map


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
module.exports = {"book-list":"book__book-list___2hPsN","bookList":"book__book-list___2hPsN","book":"book__book___2hP0S","cover":"book__cover___GKA02","series":"book__series___2_G96","title":"book__title___3zvvV"};

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
module.exports = {"app":"layout__app___35DR7"};

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
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var js_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/graphql */ "./src/js/graphql.ts");
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! css/book.scss */ "./src/css/book.scss");
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(css_book_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var js_components_book__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js/components/book */ "./src/js/components/book.tsx");




class BookList extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {
    js_graphql__WEBPACK_IMPORTED_MODULE_1__["Exec"](`query {
            books(take: 100) {
              page_info {
                total
              }
              results {
                id
                title
                volume
                chapter
                series
                pages(type: COVER) {
                  url
                }
              }
            }
          }`).then(response => this.setState({
      books: response.data.books.results
    }));
  }

  render() {
    console.log(this.state.books);
    let image = "https://comicbox.ca/book/01e91cb5-e8be-4463-bd5d-42a2e6271a59/page/0";
    let books = this.state.books || [];
    return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_2__["bookList"]
    }, books.map(book => Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_components_book__WEBPACK_IMPORTED_MODULE_3__["default"], {
      data: book
    })), books.map(book => Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_components_book__WEBPACK_IMPORTED_MODULE_3__["default"], {
      data: book
    })), books.map(book => Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_components_book__WEBPACK_IMPORTED_MODULE_3__["default"], {
      data: book
    })));
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
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! css/book.scss */ "./src/css/book.scss");
/* harmony import */ var css_book_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(css_book_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");



class Book extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {}

  render() {
    let book = this.props.data;
    let image = "";

    if (book.pages[0]) {
      image = "https://comicbox.ca/" + book.pages[0].url;
    }

    return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_1__["book"],
      "data-id": book.id
    }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_router__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      href: `/book/${book.id}`
    }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_1__["cover"],
      style: {
        backgroundImage: `url(${image})`
      }
    }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_1__["series"],
      title: book.series
    }, book.series), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_book_scss__WEBPACK_IMPORTED_MODULE_1__["title"],
      title: book.title
    }, book.title)));
  }

}

/***/ }),

/***/ "./src/js/graphql.ts":
/*!***************************!*\
  !*** ./src/js/graphql.ts ***!
  \***************************/
/*! exports provided: Exec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Exec", function() { return Exec; });
async function Exec(query, variables) {
  let response = await fetch('/graphql', {
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
  return await response.json();
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
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var preact_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact-router */ "./node_modules/preact-router/dist/preact-router.es.js");
/* harmony import */ var js_views_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js/views/home */ "./src/js/views/home.tsx");
/* harmony import */ var js_views_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js/views/error */ "./src/js/views/error.tsx");
/* harmony import */ var css_app_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! css/app.scss */ "./src/css/app.scss");
/* harmony import */ var css_app_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(css_app_scss__WEBPACK_IMPORTED_MODULE_4__);





Object(preact__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_router__WEBPACK_IMPORTED_MODULE_1__["default"], null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_views_home__WEBPACK_IMPORTED_MODULE_2__["default"], {
  path: "/"
}), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_views_error__WEBPACK_IMPORTED_MODULE_3__["default"], {
  default: true
})), document.getElementById("app"));

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
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var js_views_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/views/layout */ "./src/js/views/layout.tsx");
/* harmony import */ var css_error_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! css/error.scss */ "./src/css/error.scss");
/* harmony import */ var css_error_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(css_error_scss__WEBPACK_IMPORTED_MODULE_2__);



class Error extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    console.log(this.props);
    return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_views_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_error_scss__WEBPACK_IMPORTED_MODULE_2__["message"]
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
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var js_views_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js/views/layout */ "./src/js/views/layout.tsx");
/* harmony import */ var js_components_book_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js/components/book-list */ "./src/js/components/book-list.tsx");



class Home extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {}

  render() {
    console.log(this.props);
    return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_views_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(js_components_book_list__WEBPACK_IMPORTED_MODULE_2__["default"], null));
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
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var preact_material_components_ts_Drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact-material-components/ts/Drawer */ "./node_modules/preact-material-components/ts/Drawer/index.tsx");
/* harmony import */ var preact_material_components_ts_List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preact-material-components/ts/List */ "./node_modules/preact-material-components/ts/List/index.tsx");
/* harmony import */ var preact_material_components_ts_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! preact-material-components/ts/Button */ "./node_modules/preact-material-components/ts/Button/index.tsx");
/* harmony import */ var css_layout_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! css/layout.scss */ "./src/css/layout.scss");
/* harmony import */ var css_layout_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(css_layout_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var preact_material_components_Drawer_style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! preact-material-components/Drawer/style.css */ "./node_modules/preact-material-components/Drawer/style.css");
/* harmony import */ var preact_material_components_Drawer_style_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_Drawer_style_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var preact_material_components_List_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! preact-material-components/List/style.css */ "./node_modules/preact-material-components/List/style.css");
/* harmony import */ var preact_material_components_List_style_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_List_style_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var preact_material_components_Button_style_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! preact-material-components/Button/style.css */ "./node_modules/preact-material-components/Button/style.css");
/* harmony import */ var preact_material_components_Button_style_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(preact_material_components_Button_style_css__WEBPACK_IMPORTED_MODULE_7__);








class Layout extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super();
    this.state = {
      drawerOpened: false
    };
  }

  componentDidMount() {}

  openDrawer() {
    console.log("open");
    this.setState({
      drawerOpened: !this.state.drawerOpened
    });
  }

  render() {
    return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      className: css_layout_scss__WEBPACK_IMPORTED_MODULE_4__["app"]
    }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_ts_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClick: this.openDrawer.bind(this)
    }, "Open Drawer"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_ts_Drawer__WEBPACK_IMPORTED_MODULE_1__["default"].TemporaryDrawer, {
      open: this.state.drawerOpened,
      onClose: () => {
        this.setState({
          drawerOpened: false
        });
      }
    }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_ts_Drawer__WEBPACK_IMPORTED_MODULE_1__["default"].DrawerHeader, {
      className: "mdc-theme--primary-bg"
    }, "Components"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_ts_Drawer__WEBPACK_IMPORTED_MODULE_1__["default"].DrawerContent, null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_ts_List__WEBPACK_IMPORTED_MODULE_2__["default"], null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(preact_material_components_ts_List__WEBPACK_IMPORTED_MODULE_2__["default"].LinkItem, null, "Home")))), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("main", null, this.props.children));
  }

}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map