import SWebComponent from "coffeekraken-sugar/js/core/SWebComponent"
import dispatchEvent from 'coffeekraken-sugar/js/dom/dispatchEvent'

export default class Component extends SWebComponent {
  /**
   * Default props
   * @definition    SWebComponent.defaultProps
   * @protected
   */
  static get defaultProps() {
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
      moods: ['xlow','low','medium','high','xhigh']

    }
  }

  /**
   * Physical props
   * @definition    SWebComponent.physicalProps
   * @protected
   */
  static get physicalProps() {
    return ['value','for','editable']
  }

  /**
   * Css
   * @protected
   */
  static defaultCss(componentName, componentNameDash) {
    return `
      ${componentNameDash} {
        position: relative;
        display : inline-block;
        overflow: hidden; // clearfix
      }
      ${componentNameDash} > *:not(.${componentNameDash}__hover),
      ${componentNameDash} > .${componentNameDash}__hover > * {
        display: inline-block;
      }
      ${componentNameDash} > .${componentNameDash}__hover {
        position: absolute;
        top: 0;
        left: 0;
        white-space: nowrap;
        overflow: hidden;
        pointer-events: none;
      }
      ${componentNameDash}[editable] {
        cursor: pointer;
      }
    `
  }

  /**
   * Component will mount
   * @definition    SWebComponent.componentWillMount
   * @protected
   */
  componentWillMount() {
    super.componentWillMount()
  }

  /**
   * Mount component
   * @definition    SWebComponent.componentMount
   * @protected
   */
  componentMount() {
    super.componentMount()

    // trim the content to avoid having spaces between elements
    const parentHTML = this.innerHTML
    const newHTML = parentHTML.replace(/>\s+</g,'><')
    this.innerHTML = newHTML

    // get all the items references for later use
    this._$items = this.querySelectorAll('*')

    // process the props.basedOn if not set
    if (!this.props.basedOn) {
      this.setProp('basedOn', this._$items.length)
    }

    // build the hover div
    this._$hover = document.createElement('div')
    this._$hover.innerHTML = this.innerHTML
    this._$hover.classList.add(`${this.componentNameDash}__hover`)
    this._$hover.setAttribute(`${this.componentNameDash}-hover`, true)
    this.appendChild(this._$hover)

    // add base class on the component itself
    this.classList.add(this.componentNameDash)

    // add class to each items
    Array.from(this._$items).concat(Array.from(this._$hover.querySelectorAll('*'))).forEach(($item) => {
      $item.setAttribute(`${this.componentNameDash}-item`, true)
      $item.classList.add(`${this.componentNameDash}__item`)
    })

    // some internal variables
    this._mouseoverItemHandlerFn = this._mouseoverItemHandler.bind(this)
    this._clickItemHandlerFn = this._clickItemHandler.bind(this)
    this._mouseoutComponentHandlerFn = this._mouseoutComponentHandler.bind(this)
    this._forChangeHandlerFn = this._forChangeHandler.bind(this)

    // if editable, listen for mouseover on items
    if (this.props.editable) {
      this._listenMouseoverItems()
      this._listenClickItems()
      this._listenMouseoutComponent()
    }

    // query the for target
    this._queryForTarget()

    // listen for change in for element
    this._listenForChange()

    // set the for value
    this._setForValue(this.props.value)

    // set the UI value first time
    this._setUiValue(this.props.value)
  }

  /**
   * Component unmount
   * @definition    SWebComponent.componentUnmount
   * @protected
   */
  componentUnmount() {
    super.componentUnmount()
  }

  /**
   * Component will receive prop
   * @definition    SWebComponent.componentWillReceiveProp
   * @protected
   */
  componentWillReceiveProp(name, newVal, oldVal) {
    super.componentWillReceiveProp(name, newVal, oldVal)
    switch(name) {
      case 'editable':
        if (newVal) {
          this._listenMouseoverItems()
          this._listenClickItems()
          this._listenMouseoutComponent()
        } else {
          this._unlistenMouseoverItems()
          this._unlistenClickItems()
          this._unlistenMouseoutComponent()
        }
      break
      case 'value':
        // set the new value in the UI
        this._setUiValue(newVal)
        // set the for value
        this._setForValue(newVal)
      break
      case 'for':
        if (!newVal) this._unlistenForChange()
        // query the new for target
        this._queryForTarget()
        // listen for changes
        this._listenForChange()
      break
      default:
    }
  }

  /**
   * Query the for target
   * @return    {HTMLElement}    The for target element
   */
  _queryForTarget() {
    this._$for = document.querySelector(`input[name="${this.props.for}"],input#${this.props.for}`)
    return this._$for
  }

  /**
   * Listen for mouseout of the component
   */
  _listenMouseoutComponent() {
    this.addEventListener('mouseout', this._mouseoutComponentHandlerFn)
  }

  /**
   * Unlisten for mouseout of the component
   */
  _unlistenMouseoutComponent() {
    this.removeEventListener('mouseout', this._mouseoutComponentHandlerFn)
  }

  /**
   * When the user has the mouse out of the component
   * @param    {MouseEvent}    e    The mouse out event
   */
  _mouseoutComponentHandler() {
    // set the value on ui UI back to the actual value of the component
    this._setUiValue(this.props.value)
  }

   /**
   * Listen for change in the for target element
   */
  _listenForChange() {
    if (!this._$for) return
    this._$for.addEventListener('change', this._forChangeHandlerFn)
  }

  /**
   * Unlisten for change in the for target element
   */
  _unlistenForChange() {
    if (!this._$for) return
    this.removeEventListener('change', this._forChangeHandlerFn)
  }

  /**
   * When the user has the mouse out of the component
   * @param    {Event}    e    The mouse out event
   */
  _forChangeHandler(e) {
    // boundaries the value
    let value = parseFloat(e.target.value)
    value = (value < 0) ? 0 : (value > this.props.basedOn) ? this.props.basedOn : value
    // set the new value
    this.setProp('value', value)
  }

  /**
   * Listen for mouseover on the items to adapt the display accordingly
   */
  _listenMouseoverItems() {
    // listen for mousehover each items in the component
    ;[].forEach.call(this._$items, ($item) => {
      $item.addEventListener('mouseover', this._mouseoverItemHandlerFn)
    })
  }

  /**
   * Remove mouseover handler on items
   */
  _unlistenMouseoverItems() {
    // remove listener for mousehover each items in the component
    ;[].forEach.call(this._$items, ($item) => {
      $item.removeEventListener('mouseover', this._mouseoverItemHandlerFn)
    })
  }

  /**
   * Listen for click on the items to adapt the display accordingly
   */
  _listenClickItems() {
    // listen for click each items in the component
    ;[].forEach.call(this._$items, ($item) => {
      $item.addEventListener('click', this._clickItemHandlerFn)
    })
  }

  /**
   * Remove click handler on items
   */
  _unlistenClickItems() {
    // remove listener for click each items in the component
    ;[].forEach.call(this._$items, ($item) => {
      $item.removeEventListener('click', this._clickItemHandlerFn)
    })
  }

  /**
   * When the user click an item in the component
   * @param    {Event}    e    The click event
   */
  _clickItemHandler(e) {
    // find the index of the element in html
    const idxOfItem = Array.from(this._$items).indexOf(e.currentTarget)

    // calculate the new value based on the prop basedOn
    const newValue = this.props.basedOn / this._$items.length * (idxOfItem+1)

    // set the new value
    this.setProp('value', newValue)
  }

  /**
   * When the user mouse over an item in the component
   * @param    {Event}    e    The mouseover event
   */
  _mouseoverItemHandler(e) {
    // find the index of the element in html
    const idxOfItem = Array.from(this._$items).indexOf(e.currentTarget)

    // calculate the percentage to apply as width to the hover element
    const widthPercent = 100 / this._$items.length * (idxOfItem+1)

    // calculate the value
    const value = this.props.basedOn / 100 * widthPercent

    // set the ui value
    this._setUiValue(value)
  }

  /**
   * Set the UI mood depending on the value passed
   * @param    {Number}    value    The value on which to set the mood
   */
  _setUiMood(value) {
    // calculate the mood idx
    const moodIdx = Math.round(this.props.moods.length / this.props.basedOn * value)
    // set the mood
    this.setAttribute('mood', this.props.moods[(moodIdx-1 >= 0) ? moodIdx-1 : 0])
  }

  /**
   * Set the value of the for target if there's one
   * @param    {Number}    value    The value to set
   */
  _setForValue(value) {
    if (!this._$for) return
    this._$for.setAttribute('value', value)
    this._$for.value = value
    dispatchEvent(this._$for, 'change', value)
  }

  /**
   * Set the UI value
   * @param    {Number}    value    The value to set to the UI
   */
  _setUiValue(value) {
    // calculate the percentage to apply to the UI depending on the basedOn value
    const valueToSet = 100 / this.props.basedOn * value
    // set the value to the UI
    this._$hover.style.width = `${valueToSet}%`
    // set the UI mood
    this._setUiMood(value)
  }

  /**
   * Set the value
   * @param    {Number}    value    The value to set
   */
  setValue(value) {
    // set the prop
    this.setProp('value', value)
  }
}
