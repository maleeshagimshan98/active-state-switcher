import SwitchController from '../src/SwitchController.js';
import SwitchState from '../src/SwitchState';

describe('SwitchController', () => {
  let switchController;

  beforeEach(() => {
    const switches = {
      switch1: new SwitchState({ name: 'switch1', value: false }),
      switch2: { name: 'switch2', value: true, isAlwaysOn: true }
    };
    switchController = new SwitchController(switches, { onAll: true, multiple : true });
  });

  test('should initialize with correct switches', () => {
    const switches = {
      switch1: new SwitchState({ name: 'switch1', value: false }),
      switch2: { name: 'switch2', value: true, isAlwaysOn: true }
    };
    switchController = new SwitchController(switches, { multiple : true });

    expect(Object.keys(switchController._switches)).toHaveLength(2);
    expect(switchController._switches.switch1._value).toBe(false);
    expect(switchController._switches.switch2._value).toBe(true);
  });

  test('should turn on all switches', () => {
    switchController.offAll();
    switchController.onAll();

    expect(switchController._switches.switch1._value).toBe(true);
    expect(switchController._switches.switch2._value).toBe(true);
  });

  test('should turn off all switches', () => {
    switchController.offAll();

    expect(switchController._switches.switch1._value).toBe(false);
    expect(switchController._switches.switch2._value).toBe(true);
  });

  test('should turn on the given switch', () => {
    switchController.offAll();
    switchController.on('switch1');

    expect(switchController._switches.switch1._value).toBe(true);
    expect(switchController._switches.switch2._value).toBe(true);
  });

  test('should turn off the given switch', () => {
    switchController.onAll();
    switchController.off('switch1');

    expect(switchController._switches.switch1._value).toBe(false);
    expect(switchController._switches.switch2._value).toBe(true);
  });

  test('should toggle the given switch', () => {
    switchController.toggle('switch1');

    expect(switchController._switches.switch1._value).toBe(false);
    expect(switchController._switches.switch2._value).toBe(true);
  });

  test('should not toggle an always on switch', () => {
    console.warn = jest.fn();
    switchController.toggle('switch2');

    expect(console.warn).toHaveBeenCalledWith("Trying to toggle the state of an always on switch - switch2");
    expect(switchController._switches.switch2._value).toBe(true);
  });

  test('should add a new switch', () => {
    const switchObj = new SwitchState({ name: 'switch3', value: false });
    switchController.addSwitch('switch3', switchObj);

    expect(Object.keys(switchController._switches)).toHaveLength(3);
    expect(switchController._switches.switch3._value).toBe(false);
  });

  test('should throw an error when adding an invalid switch', () => {
    expect(() => switchController.addSwitch('switch4', {})).toThrowError(
      `parameter switchObj must be a valid object or an instance of Switch`
    );
  });

  test('should throw an error when a switch is not defined', () => {
    expect(() => switchController.on('switch3')).toThrowError(`A switch with name - switch3 is not defined`);
  });
});
