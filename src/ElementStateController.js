/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

import ElementState from "./ElementState"

class ElementStateController {
  /**
   * contains the ElementStates
   */
  _elements = {}

  /**
   * Set to true to activate multiple element states simultaniousely
   */
  _multiple = false

  /**
   * Indicates wheher any element state is active or not
   */
  _isAnyActiveStateFound = false

  /**
   * constructor
   *
   * @param {object} elements names of elements
   * @returns {void} ElementStateController
   * @throws {Error}
   */
  constructor(elements, { activeAll, inactiveAll, multiple }) {
    this._multiple = multiple ?? false
    this._initElements(elements)

    if (activeAll && inactiveAll) {
      throw new Error(
        `ElementStateController: activeAll and inactiveAll cannot be true at the same time`
      )
    }

    if (activeAll) {
      this.activeAll()
    }
    if (inactiveAll) {
      this.inactiveAll()
    }
  }

  /**
   * 
   * 
   * @returns {boolean}
   * @throws {Error}
   */
  _allowMultipleElements () {    
    if (this._multiple) {
      return true
    }
    if (!this._multiple && this._isAnyActiveStateFound) {
      return false
    }
    else {
      return true
    }
  }

  /**
   * Set isAnyActiveStateFound to true
   * 
   * @param {ElementState} elementState
   * @returns {void}
   */
  _updateAnyActiveStateFound(elementState) {
    if (elementState.isActive()) {
      this._isAnyActiveStateFound = true
    }
  }

  /**
   * Checks if the state's active status is contradicting with multiple active states rule
   * 
   * @param {boolean} isStateActive element's active status
   * @return {boolean}
   */
  _contradictWithMultipleElementRule (isStateActive) {
    return !this._allowMultipleElements() && isStateActive
  }

  /**
   * Set the element state in the class's internal structure
   *
   * @param {string} name element state name
   * @param {ElementState} elementState element state
   * @returns {void}
   */
  _setElement(name, elementState) {
    if (this._contradictWithMultipleElementRule(elementState.isActive())) {
      throw new Error(``) //..
    }
    this._elements[name] = elementState
    this._updateAnyActiveStateFound(elementState)
  }
  
  /**
   * Create a new instance of ElementState or return the passed argument if it is an instance of ElementState
   *
   * @param {object| ElementState} elementState element state
   * @returns {ElementState}
   * @throws {Error}
   */
  _createElement(elementState) {
    if (elementState instanceof ElementState) {
      return elementState
    }
    if (Object.keys(elementState).length > 0) {
      return new ElementState(elementState)
    }
    else {
      throw new Error(`ElementStateController: Cannot create the state with an empty object`)
    }
  }  

  /**
   * initialise the elements passed into constructor
   *
   * @param {object} elements
   * @returns {void} void
   * @throws {Error}
   */
  _initElements(elements) {
    for (let element in elements) {
      if (elements[element] instanceof ElementState) {
        this._setElement(element, elements[element])
        continue
      }
      if (Object.keys(elements[element]).length > 0) {
        this._setElement(element, new ElementState(elements[element]))
      } else {
        throw new Error(`ElementStateController: Cannot initialise the states`)
      }
    }
  }

  /**
   * check if the given element is available
   *
   * @param {string} name
   * @returns {void} void
   * @throws {Error}
   */
  _throwErrorIfElementNotDefined(name) {
    if (!this._elements.hasOwnProperty(name)) {
      throw new Error(`ElementStateController: An element with name - ${name} is not defined`)
    }
  }


  /**
   * Get an element state
   *
   * @param {string} name elementState name
   * @returns {ElementState}
   */
  getElement(name) {
    this._throwErrorIfElementNotDefined(name)
    return this._elements[name]
  }

  /**
   * add a new element
   *
   * @param {ElementState|Object} elementState
   * @returns {void} void
   * @throws {Error}
   */
  addElement(elementState) {
    if (!elementState || Object.keys(elementState).length == 0) {
      throw new Error(
        `ElementStateController: parameter elementState must be a valid object having a name property or an instance of ElementState`
      )
    }
    let element = this._createElement(elementState)
    this._setElement(element.name, element)
  }

  /**
   * change the state of all the elements to active
   *
   * @returns {void} void
   */
  activeAll() {
    if (!this._multiple) {
      console.warn(
        `ElementStateController: Cannot turn on all the elements - ElementStateController.multiple is set to ${this._multiple}`
      )
      return
    }
    for (let element in this._elements) {
      this._elements[element].active()
    }
  }

  /**
   * change the state of all the elements to inactive - if any one of state is alwaysActive, it will not be inactive by calling this method
   *
   * @returns {void} void
   */
  inactiveAll() {
    for (let element in this._elements) {
      this._elements[element].inactive()
      this._isAnyActiveStateFound = false
      this._updateAnyActiveStateFound(this._elements[element])
    }    
  }

  /**
   * change the given element's state to active
   *
   * @param {string} name
   * @returns {void} void
   */
  active(name) {
    this._throwErrorIfElementNotDefined(name)
    if (this._contradictWithMultipleElementRule(true)) {
      throw new Error(``) //... cannot set the state to active - contradicts with multiple active state rule      
    }
    this._elements[name].active()
    this._isAnyActiveStateFound = true
  }

  /**
   * change the given element's state to inactive
   *
   * @param {string} name
   * @returns {void} void
   */
  inactive(name) {
    this._throwErrorIfElementNotDefined(name)
    this._elements[name].inactive()
  }

  /**
   * toggle the given element active or inactive
   * and set rest of elements to inactive
   *
   * @param {String} name
   * @returns {void} void
   * @throws {Error}
   */
  toggle(name) {
    this._throwErrorIfElementNotDefined(name)
    if (this._elements[name].isAlwaysActive()) {
      //... keep element active
      console.warn(
        `ElementStateController: Trying to toggle the state of an always on element - ${name}`
      )
      return
    }    
    
    for (let element in this._elements) {
      let togglingElementState = this._elements[element]
      if (togglingElementState.isAlwaysActive()) {
        //... keep element active
        continue
      }
      if (this._contradictWithMultipleElementRule(togglingElementState.isActive() ? false : true)) {
        throw new Error(``) //... cannot toggle this state - contradicts with the multiple elements rule  
      }
      togglingElementState.toggle()
    }
  }

  /**
   * Set isAlwaysActive property on a state
   * 
   * @param {string} name element state name
   * @returns {void}
   * @throws {Error}
   */
  setIsAlwaysActive (name, value) {
    this._throwErrorIfElementNotDefined(name)
    if (value === false)    {
      this._elements[name].setIsAlwaysActive(value)
      return
    }
    if (this._contradictWithMultipleElementRule(true)) {
      throw new Error(`ElementStateController: Contradicts with multiple elements rule, cannot set isAlwaysActive on ${name}.`)
    }
  }
}

export default ElementStateController
