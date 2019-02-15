"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent2 = _interopRequireDefault(require("coffeekraken-sugar/js/core/SWebComponent"));

var _dispatchEvent = _interopRequireDefault(require("coffeekraken-sugar/js/dom/dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Component =
/*#__PURE__*/
function (_SWebComponent) {
  _inherits(Component, _SWebComponent);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _getPrototypeOf(Component).apply(this, arguments));
  }

  _createClass(Component, [{
    key: "componentWillMount",

    /**
     * Component will mount
     * @definition    SWebComponent.componentWillMount
     * @protected
     */
    value: function componentWillMount() {
      _get(_getPrototypeOf(Component.prototype), "componentWillMount", this).call(this);
    }
    /**
     * Mount component
     * @definition    SWebComponent.componentMount
     * @protected
     */

  }, {
    key: "componentMount",
    value: function componentMount() {
      var _this = this;

      _get(_getPrototypeOf(Component.prototype), "componentMount", this).call(this); // trim the content to avoid having spaces between elements


      var parentHTML = this.innerHTML;
      var newHTML = parentHTML.replace(/>\s+</g, "><");
      this.innerHTML = newHTML; // get all the items references for later use

      this._$arItems = Array.from(this.children); // process the props.basedOn if not set

      if (!this.props.basedOn) {
        this.setProp("basedOn", this._$arItems.length);
      } // build the hover div


      this._$hover = document.createElement("div");
      this._$hover.innerHTML = this.innerHTML;

      this._$hover.classList.add("".concat(this.componentNameDash, "__hover"));

      this._$hover.setAttribute("".concat(this.componentNameDash, "-hover"), true);

      this.appendChild(this._$hover); // add base class on the component itself

      this.classList.add(this.componentNameDash); // add class to each items

      this._$arItems.concat(Array.from(this._$hover.querySelectorAll("*"))).forEach(function ($item) {
        $item.setAttribute("".concat(_this.componentNameDash, "-item"), true);
        $item.classList.add("".concat(_this.componentNameDash, "__item"));
      }); // some internal variables


      this._mouseoverItemHandlerFn = this._mouseoverItemHandler.bind(this);
      this._clickItemHandlerFn = this._clickItemHandler.bind(this);
      this._mouseoutComponentHandlerFn = this._mouseoutComponentHandler.bind(this);
      this._forChangeHandlerFn = this._forChangeHandler.bind(this); // if editable, listen for mouseover on items

      if (this.props.editable) {
        this._listenMouseoverItems();

        this._listenClickItems();

        this._listenMouseoutComponent();
      } // query the for target


      this._queryForTarget(); // listen for change in for element


      this._listenForChange(); // set the for value


      this._setForValue(this.props.value); // set the UI value first time


      this._setUiValue(this.props.value);
    }
    /**
     * Component unmount
     * @definition    SWebComponent.componentUnmount
     * @protected
     */

  }, {
    key: "componentUnmount",
    value: function componentUnmount() {
      _get(_getPrototypeOf(Component.prototype), "componentUnmount", this).call(this);
    }
    /**
     * Component will receive prop
     * @definition    SWebComponent.componentWillReceiveProp
     * @protected
     */

  }, {
    key: "componentWillReceiveProp",
    value: function componentWillReceiveProp(name, newVal, oldVal) {
      _get(_getPrototypeOf(Component.prototype), "componentWillReceiveProp", this).call(this, name, newVal, oldVal);

      switch (name) {
        case "editable":
          if (newVal) {
            this._listenMouseoverItems();

            this._listenClickItems();

            this._listenMouseoutComponent();
          } else {
            this._unlistenMouseoverItems();

            this._unlistenClickItems();

            this._unlistenMouseoutComponent();
          }

          break;

        case "value":
          // set the new value in the UI
          this._setUiValue(newVal); // set the for value


          this._setForValue(newVal);

          break;

        case "for":
          if (!newVal) this._unlistenForChange(); // query the new for target

          this._queryForTarget(); // listen for changes


          this._listenForChange();

          break;

        default:
      }
    }
    /**
     * Query the for target
     * @return    {HTMLElement}    The for target element
     */

  }, {
    key: "_queryForTarget",
    value: function _queryForTarget() {
      this._$for = document.querySelector("input[name=\"".concat(this.props.for, "\"],input#").concat(this.props.for));
      return this._$for;
    }
    /**
     * Listen for mouseout of the component
     */

  }, {
    key: "_listenMouseoutComponent",
    value: function _listenMouseoutComponent() {
      this.addEventListener("mouseout", this._mouseoutComponentHandlerFn);
    }
    /**
     * Unlisten for mouseout of the component
     */

  }, {
    key: "_unlistenMouseoutComponent",
    value: function _unlistenMouseoutComponent() {
      this.removeEventListener("mouseout", this._mouseoutComponentHandlerFn);
    }
    /**
     * When the user has the mouse out of the component
     * @param    {MouseEvent}    e    The mouse out event
     */

  }, {
    key: "_mouseoutComponentHandler",
    value: function _mouseoutComponentHandler() {
      // set the value on ui UI back to the actual value of the component
      this._setUiValue(this.props.value);
    }
    /**
     * Listen for change in the for target element
     */

  }, {
    key: "_listenForChange",
    value: function _listenForChange() {
      if (!this._$for) return;

      this._$for.addEventListener("change", this._forChangeHandlerFn);
    }
    /**
     * Unlisten for change in the for target element
     */

  }, {
    key: "_unlistenForChange",
    value: function _unlistenForChange() {
      if (!this._$for) return;
      this.removeEventListener("change", this._forChangeHandlerFn);
    }
    /**
     * When the user has the mouse out of the component
     * @param    {Event}    e    The mouse out event
     */

  }, {
    key: "_forChangeHandler",
    value: function _forChangeHandler(e) {
      // boundaries the value
      var value = parseFloat(e.target.value);
      value = value < 0 ? 0 : value > this.props.basedOn ? this.props.basedOn : value; // set the new value

      this.setProp("value", value);
    }
    /**
     * Listen for mouseover on the items to adapt the display accordingly
     */

  }, {
    key: "_listenMouseoverItems",
    value: function _listenMouseoverItems() {
      var _this2 = this;

      // listen for mousehover each items in the component
      this._$arItems.forEach(function ($item) {
        $item.addEventListener("mouseover", _this2._mouseoverItemHandlerFn);
      });
    }
    /**
     * Remove mouseover handler on items
     */

  }, {
    key: "_unlistenMouseoverItems",
    value: function _unlistenMouseoverItems() {
      var _this3 = this;

      // remove listener for mousehover each items in the component
      this._$arItems.forEach(function ($item) {
        $item.removeEventListener("mouseover", _this3._mouseoverItemHandlerFn);
      });
    }
    /**
     * Listen for click on the items to adapt the display accordingly
     */

  }, {
    key: "_listenClickItems",
    value: function _listenClickItems() {
      var _this4 = this;

      // listen for click each items in the component
      this._$arItems.forEach(function ($item) {
        $item.addEventListener("click", _this4._clickItemHandlerFn);
      });
    }
    /**
     * Remove click handler on items
     */

  }, {
    key: "_unlistenClickItems",
    value: function _unlistenClickItems() {
      var _this5 = this;

      // remove listener for click each items in the component
      this._$arItems.forEach(function ($item) {
        $item.removeEventListener("click", _this5._clickItemHandlerFn);
      });
    }
    /**
     * When the user click an item in the component
     * @param    {Event}    e    The click event
     */

  }, {
    key: "_clickItemHandler",
    value: function _clickItemHandler(e) {
      // find the index of the element in html
      var idxOfItem = this._$arItems.indexOf(e.currentTarget); // calculate the new value based on the prop basedOn


      var newValue = this.props.basedOn / this._$arItems.length * (idxOfItem + 1); // set the new value

      this.setProp("value", newValue);
    }
    /**
     * When the user mouse over an item in the component
     * @param    {Event}    e    The mouseover event
     */

  }, {
    key: "_mouseoverItemHandler",
    value: function _mouseoverItemHandler(e) {
      // find the index of the element in html
      var idxOfItem = this._$arItems.indexOf(e.currentTarget); // calculate the percentage to apply as width to the hover element


      var widthPercent = 100 / this._$arItems.length * (idxOfItem + 1); // calculate the value

      var value = this.props.basedOn / 100 * widthPercent; // set the ui value

      this._setUiValue(value);
    }
    /**
     * Set the UI mood depending on the value passed
     * @param    {Number}    value    The value on which to set the mood
     */

  }, {
    key: "_setUiMood",
    value: function _setUiMood(value) {
      // calculate the mood idx
      var moodIdx = Math.round(this.props.moods.length / this.props.basedOn * value); // set the mood

      this.setAttribute("mood", this.props.moods[moodIdx - 1 >= 0 ? moodIdx - 1 : 0]);
    }
    /**
     * Set the value of the for target if there's one
     * @param    {Number}    value    The value to set
     */

  }, {
    key: "_setForValue",
    value: function _setForValue(value) {
      if (!this._$for) return;

      this._$for.setAttribute("value", value);

      this._$for.value = value;
      (0, _dispatchEvent.default)(this._$for, "change", value);
    }
    /**
     * Set the UI value
     * @param    {Number}    value    The value to set to the UI
     */

  }, {
    key: "_setUiValue",
    value: function _setUiValue(value) {
      // calculate the percentage to apply to the UI depending on the basedOn value
      var valueToSet = 100 / this.props.basedOn * value; // set the value to the UI

      this._$hover.style.width = "".concat(valueToSet, "%"); // set the UI mood

      this._setUiMood(value);
    }
    /**
     * Set the value
     * @param    {Number}    value    The value to set
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      // set the prop
      this.setProp("value", value);
    }
  }], [{
    key: "defaultCss",

    /**
     * Css
     * @protected
     */
    value: function defaultCss(componentName, componentNameDash) {
      return "\n      ".concat(componentNameDash, " {\n        position: relative;\n        display : inline-block;\n        overflow: hidden; // clearfix\n      }\n      ").concat(componentNameDash, " > *:not(.").concat(componentNameDash, "__hover),\n      ").concat(componentNameDash, " > .").concat(componentNameDash, "__hover > * {\n        display: inline-block;\n      }\n      ").concat(componentNameDash, " > .").concat(componentNameDash, "__hover {\n        position: absolute;\n        top: 0;\n        left: 0;\n        white-space: nowrap;\n        overflow: hidden;\n        pointer-events: none;\n      }\n      ").concat(componentNameDash, "[editable] {\n        cursor: pointer;\n      }\n    ");
    }
  }, {
    key: "defaultProps",

    /**
     * Default props
     * @definition    SWebComponent.defaultProps
     * @protected
     */
    get: function get() {
      return {
        /**
         * Specify the value of the rating component.
         * @prop
         * @type    {Number}
         */
        value: 3,

        /**
         * Bound the rating to an input (text or hidden).
         * This is like the `for` attribute of a label.
         * @prop
         * @type    {String}
         */
        for: null,

        /**
         * Specify the base of calculation for the value.
         * If not set, will take the number of items in the component as base.
         * The value on witch the calculation will be made. 5 stars based on 100 mean 1 active star = 20, etc...
         * @prop
         * @type    {Number}
         */
        basedOn: null,

        /**
         * Specify if the rating is editable or not
         * @prop
         * @type    {Boolean}
         */
        editable: false,

        /**
         * Specify the moods that will be applied on the rating component
         * depending on the his value
         *
         * @prop
         * @type    {Array<String>}
         */
        moods: ["xlow", "low", "medium", "high", "xhigh"]
      };
    }
    /**
     * Physical props
     * @definition    SWebComponent.physicalProps
     * @protected
     */

  }, {
    key: "physicalProps",
    get: function get() {
      return ["value", "for", "editable"];
    }
  }]);

  return Component;
}(_SWebComponent2.default);

exports.default = Component;