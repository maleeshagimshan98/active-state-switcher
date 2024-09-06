import ElementStateController from "../src/ElementStateController.js"
import ElementState from "../src/ElementState.js"

describe("SwitchController", () => {
  let switchController

  beforeEach(() => {
    const switches = {
      element1: new ElementState({ name: "element1", value: false }),
      element2: { name: "element2", value: true, isAlwaysActive: true },
    }
    switchController = new ElementStateController(switches, { activeAll: true, multiple: true })
  })

  test("should initialize with correct switches", () => {
    const switches = {
      element1: new ElementState({ name: "element1", value: false }),
      element2: { name: "element2", value: true, isAlwaysActive: true },
    }
    switchController = new ElementStateController(switches, { multiple: true })

    expect(Object.keys(switchController._elements)).toHaveLength(2)
    expect(switchController._elements.element1._value).toBe(false)
    expect(switchController._elements.element2._value).toBe(true)
  })

  test("should turn on all switches", () => {
    switchController.activeAll()

    expect(switchController._elements.element1._value).toBe(true)
    expect(switchController._elements.element2._value).toBe(true)
  })

  test("should turn off all switches", () => {
    switchController.inactiveAll()

    expect(switchController._elements.element1._value).toBe(false)
    expect(switchController._elements.element2._value).toBe(true)
  })

  test("should turn on the given switch", () => {
    switchController.inactiveAll()
    switchController.active("element1")

    expect(switchController._elements.element1._value).toBe(true)
    expect(switchController._elements.element2._value).toBe(true)
  })

  test("should turn off the given switch", () => {
    switchController.activeAll()
    switchController.inactive("element1")

    expect(switchController._elements.element1._value).toBe(false)
    expect(switchController._elements.element2._value).toBe(true)
  })

  test("should toggle the given switch", () => {
    switchController.activeAll()
    switchController.toggle("element1")

    expect(switchController._elements.element1._value).toBe(false)
    expect(switchController._elements.element2._value).toBe(true)
  })

  test("should not toggle an always on switch", () => {
    //console.warn = jest.fn()
    switchController.toggle("element2")

    // expect(console.warn).toHaveBeenCalledWith(
    //   "Trying to toggle the state of an always on switch - element2"
    // )
    expect(switchController._elements.element2._value).toBe(true)
  })

  test("should add a new switch", () => {
    const element = new ElementState({ name: "element3", value: false })
    switchController.addElement("element3", element)

    expect(Object.keys(switchController._elements)).toHaveLength(3)
    expect(switchController._elements.element3._value).toBe(false)
  })

  test("should throw an error when adding an invalid switch", () => {
    expect(() => switchController.addElement("switch4", {})).toThrowError(
      `ElementStateController: parameter elementState must be a valid object having a name property or an instance of ElementState`
    )
  })

  test("should throw an error when a switch is not defined", () => {
    expect(() => switchController.active("switch3")).toThrowError(
      `ElementStateController: An element with name - switch3 is not defined`
    )
  })
})
