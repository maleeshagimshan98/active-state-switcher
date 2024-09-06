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
}

export default ElementState
