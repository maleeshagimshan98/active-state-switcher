/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

import ElementState from "./ElementState"

class ElementStateController {
  /**
   * constructor
   *
   * @param {object} elements names of elements
   * @returns {void} ElementStateController
   * @throws {Error}
   */
  constructor(elements, { activeAll, inactiveAll, multiple }) {
    this._elements = {}
    this._multiple = multiple ?? false
    this._initElements(elements)

    if (activeAll && inactiveAll) {
      throw new Error(`ElementStateController: activeAll and inactiveAll cannot be true at the same time`)
    }

    if (activeAll) {
      this.activeAll()
    }
    if (inactiveAll) {
      this.inactiveAll()
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
        this._elements[element] = elements[element]
        continue
      }
      if (Object.keys(elements[element]).length > 0) {
        this._elements[element] = new ElementState(elements[element])
      } else {
        throw new Error(`ElementStateController: Cannot initialise the switches`)
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
   * add a new element
   *
   * @param {string} name
   * @param {ElementState|Object} elementState
   * @returns {void} void
   * @throws {Error}
   */
  addElement(name, elementState = null) {
    if (!name) {
      throw new Error(`ElementStateController: An element must have a name`)
    }
    if (!elementState || Object.keys(elementState).length == 0) {
      throw new Error(
        `ElementStateController: parameter elementState must be a valid object having a name property or an instance of ElementState`
      )
    }
    if (elementState instanceof ElementState) {
      this._elements[name] = elementState
    }
    if (Object.keys(elementState) > 0) {
      this._elements[name] = new ElementState(elementState)
    }
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
   * change the state of all the elements to inactive
   *
   * @returns {void} void
   */
  inactiveAll() {
    for (let element in this._elements) {
      this._elements[element].inactive()
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
    this._elements[name].active()
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
      if (this._elements[element].isAlwaysActive()) {
        //... keep element active
        continue
      }
      this._elements[element].toggle()
    }
  }
}

export default ElementStateController
