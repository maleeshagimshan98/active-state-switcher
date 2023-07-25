/**
 * Copyright - 2021 - Maleesha Gimshan (www.github.com/maleeshagimshan98)
 */

import SwitchState from "./SwitchState"

class SwitchController {
  /**
   * constructor
   *
   * @param {Object} elements names of elements
   * @returns {void}
   */
  constructor(switches, { onAll, offAll, multiple }) {
    this._switches = {}
    this._multiple = multiple ?? false
    this._initSwitches(switches)

    if (onAll) {
      this.onAll()
    }
    if (offAll) {
      this.offAll()
    }
  }

  /**
   * initialise the switches passed into constructor
   *
   * @param {Object} switches
   * @returns {void}
   * @throws {Error}
   */
  _initSwitches(switches) {
    for (let element in switches) {
      if (switches[element] instanceof SwitchState) {
        this._switches[element] = switches[element]
        continue
      }
      if (Object.keys(switches[element]).length > 0) {
        this._switches[element] = new SwitchState(switches[element])
      } else {
        throw new Error(`Cannot initialise the switches`)
      }
    }
  }

  /**
   * check if the given switch element is available
   *
   * @param {String} name
   * @returns {void}
   * @throws {Error}
   */
  _checkIfSwitchDefined(name) {
    if (!this._switches.hasOwnProperty(name)) {
      throw new Error(`A switch with name - ${name} is not defined`)
    }
  }

  /**
   * add a new switch
   *
   * @param {String} name
   * @param {SwitchState|Object} switchState
   * @returns {void}
   * @throws {Error}
   */
  addSwitch(name, switchState = null) {
    if (!switchState || Object.keys(switchState).length == 0) {
      throw new Error(
        `parameter switchObj must be a valid object or an instance of Switch`
      )
    }
    if (switchState instanceof SwitchState) {
      this._switches[name] = switchState
    }
    if (Object.keys(switchState) > 0) {
      this._switches[name] = new SwitchState(switchState)
    }
  }

  /**
   * turn on all of the switches
   *
   * @returns {void}
   */
  onAll() {
    if (!this._multiple) {
      console.warn(
        `Cannot turn on all the switches - SwitchController.multiple is set to ${this._multiple}`
      )
      return
    }
    for (let switchState in this._switches) {
      this._switches[switchState].on()
    }
  }

  /**
   * turn off the all switches
   *
   * @returns {void}
   */
  offAll() {
    for (let switchState in this._switches) {
      this._switches[switchState].off()
    }
  }

  /**
   * turn on the given switch
   *
   * @param {String} name
   * @returns {void}
   */
  on(name) {
    this._checkIfSwitchDefined(name)
    this._switches[name].on()
  }

  /**
   * turn on the given switch
   *
   * @param {String} name
   * @returns {void}
   */
  off(name) {
    this._checkIfSwitchDefined(name)
    this._switches[name].off()
  }

  /**
   * toggle given element true or false
   * and set rest of elements to false
   *
   * @param {String} name
   * @returns {void}
   */
  toggle(name) {
    this._checkIfSwitchDefined(name)
    if (this._switches[name].isAlwaysOn()) {
      //... keep switch on
      console.warn(
        `Trying to toggle the state of an always on switch - ${name}`
      )
      return
    }

    for (let element in this._switches) {
        if (this._switches[element].isAlwaysOn()) {
          //... keep switch on
          continue
        }
        this._switches[element].toggle()
    }
  }
}

export default SwitchController
