/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

class SwitchState {
  /**
   * constructor
   *
   * @param {Object}
   * @returns {Switch}
   */
  constructor({ name, value, isAlwaysOn }) {
    this._name = name
    this._value = value ?? false
    this._isAlwaysOn = isAlwaysOn ?? false
  }

  /**
   * turn on the switch
   *
   * @returns {void}
   */
  on() {
    this._value = true
  }

  /**
   * turn off the switch
   *
   * @returns {void}
   */
  off() {
    if (this._isAlwaysOn) {
      console.warn(`Cannot turn off the an always on switch - ${this._name}`)
      return
    }
    this._value = false
  }

  /**
   * toggle the switch's value
   *
   * @returns {void}
   */
  toggle() {
    if (this._isAlwaysOn) {
      console.warn(
        `Trying to toggle the state of an always on switch - ${this._name}`
      )
      return
    }
    if (this._value === true) {
        this._value = false
    }
    else {
        this._value = true
    }
  }

  /**
   * Check if the switch is always on
   *
   * @returns {Boolean}
   */
  isAlwaysOn() {
    return this._isAlwaysOn
  }
}

export default SwitchState
