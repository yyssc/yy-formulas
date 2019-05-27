/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"examples/formulas": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([3,"common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/formulas.jsx":
/*!*******************************!*\
  !*** ./examples/formulas.jsx ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/index */ "./src/index.jsx");
/* harmony import */ var _assets_index_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/index.less */ "./assets/index.less");
/* harmony import */ var _assets_index_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_index_less__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DocumentTreeData_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DocumentTreeData.json */ "./examples/DocumentTreeData.json");
var _DocumentTreeData_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./DocumentTreeData.json */ "./examples/DocumentTreeData.json", 1);
/* harmony import */ var _SubjectData_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SubjectData.json */ "./examples/SubjectData.json");
var _SubjectData_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./SubjectData.json */ "./examples/SubjectData.json", 1);
/* harmony import */ var _Description_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Description.json */ "./examples/Description.json");
var _Description_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./Description.json */ "./examples/Description.json", 1);
/* harmony import */ var _FunctionData_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FunctionData.json */ "./examples/FunctionData.json");
var _FunctionData_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./FunctionData.json */ "./examples/FunctionData.json", 1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var Demo =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    var _this;

    _classCallCheck(this, Demo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Demo).call(this, props));
    _this.state = {
      extareaValue: '11'
    };
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this)); // console.log(Button)

    return _this;
  }

  _createClass(Demo, [{
    key: "componentDidMount",
    value: function componentDidMount() {} // setInterval(()=>{
    //   this.setState({textareaValue: '十秒钟后value变化：'+Math.random()})
    // },10000)

    /**
      text值变化的时候会调用 onChange方法
      多数不用此方法，只要坚挺 onSubmit 方法返回的值
    */

  }, {
    key: "onChange",
    value: function onChange(value) {
      console.log(value);
      console.log(value);
    }
  }, {
    key: "render",
    value: function render() {
      // console.log(DocumentTreeData)
      // var sg = 'dd'
      // return (<div>222</div>)
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_index__WEBPACK_IMPORTED_MODULE_2__["Formulas"], {
        onChange: this.onChange,
        textareaValue: this.state.textareaValue,
        DocumentTreeData: _DocumentTreeData_json__WEBPACK_IMPORTED_MODULE_4__,
        ReferDataUrl: "http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON",
        fixedData: {
          refCode: 'entity',
          funcode: 'conversion',
          disableshow: false
        },
        SubjectData: _SubjectData_json__WEBPACK_IMPORTED_MODULE_5__,
        Description: _Description_json__WEBPACK_IMPORTED_MODULE_6__,
        FunctionData: _FunctionData_json__WEBPACK_IMPORTED_MODULE_7__,
        tabs: [{
          id: 0,
          name: '单据字段',
          type: 'sys',
          component: 'Document',
          disabled: false,
          placeholder: '请输入...',
          notFoundContent: '暂无数据',
          positionName: '定位:',
          okName: '确定'
        }, {
          id: 1,
          name: '固定值',
          type: 'sys',
          component: 'Fixed',
          disabled: false,
          placeholder: '请输入...',
          notFoundContent: '暂无数据',
          showName1: '档案',
          showName2: '档案值',
          defaultCode: 'personnel'
        }, {
          id: 2,
          name: '科目转换',
          type: 'sys',
          component: 'Subject',
          disabled: false,
          placeholder: '请输入...',
          notFoundContent: '暂无数据',
          positionName: '定位：',
          okName: '确定',
          okName2: '插入'
        }, {
          id: 3,
          name: '辅助核算类型',
          type: 'sys',
          component: 'Auxiliary',
          disabled: false,
          placeholder: '请输入...',
          notFoundContent: '暂无数据',
          showName: '辅助核算类型',
          onChange: function onChange() {}
        }, {
          id: 4,
          name: '辅助核算值',
          type: 'sys',
          component: 'Auxiliary',
          disabled: false,
          placeholder: '请输入...',
          notFoundContent: '暂无数据',
          showName: '辅助核算值'
        }, {
          id: 5,
          name: '函数',
          type: 'sys',
          component: 'Function',
          disabled: false,
          notFoundContent: '暂无数据',
          positionName: '定位:',
          okName: '确定'
        }, {
          id: 6,
          name: '枚举',
          type: 'sys',
          component: 'Enum',
          disabled: false,
          placeholder: '请输入...',
          notFoundContent: '暂无数据',
          showName1: '枚举类型',
          showName2: '枚举值',
          data1: {
            refCode: 'enum',
            funcode: 'conversion',
            disableshow: false
          },
          data2: {
            refCode: 'enumbody',
            funcode: 'conversion',
            disableshow: false
          }
        }],
        activeKey: "0"
      });
    }
  }]);

  return Demo;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 3:
/*!*************************************!*\
  !*** multi ./examples/formulas.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./examples/formulas.jsx */"./examples/formulas.jsx");


/***/ })

/******/ });
//# sourceMappingURL=formulas.js.map