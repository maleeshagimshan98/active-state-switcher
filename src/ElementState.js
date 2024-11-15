/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

class ElementState {
  /**
   * constructor
   *
   * @param {object}
   * @returns {ElementState}
   */
  constructor({ name, value, isAlwaysActive }) {
    if (!name) {
      throw new Error(`ElementState: An ElementState must have a name`)
    }
    this._name = name
    this._value = value ?? false
    this._isAlwaysActive = isAlwaysActive ?? false

    //... if always active, keep the _value true always
    if (isAlwaysActive) {
      this._value = true
    }
  }

  /**
   * Getter for ElementState's name
   * 
   * @returns {string}
   */
  get name () {
    return this._name
  }

  /**
   * change the state to active
   *
   * @returns {void} void
   */
  active() {
    this._value = true
  }

  /**
   * change the state to inactive
   *
   * @returns {void} void
   */
  inactive() {
    if (this._isAlwaysActive) {
      console.warn(`Cannot turn off the an always active state - ${this._name}`)
      return
    }
    this._value = false
  }

  /**
   * toggle the elements status
   *
   * @returns {void} void
   */
  toggle() {
    if (this._isAlwaysActive) {
      console.warn(`Trying to toggle the state of an always active state - ${this._name}`)
      return
    }
    if (this._value === true) {
      this._value = false
    } else {
      this._value = true
    }
  }

  /**
   * Check if the element state is active
   * 
   * @returns {boolean}
   */
  isActive () {
    return this._value === true
  }

  /**
   * Check if the element state is always active
   *
   * @returns {boolean}
   */
  isAlwaysActive() {
    return this._isAlwaysActive
  }

  /**
   * Set the isAlwaysActive property
   * 
   * @param {boolean} value
   * @returns {void}
   * @throws {Error}
   */
  setIsAlwaysActive (value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Trying to set the isAlwaysActive in ${this._name}. The value must be a boolean, but found ${typeof value}`)
    }
    this._isAlwaysActive = value
    value ? this.active() : this.inactive()
  }
}

export default ElementState
