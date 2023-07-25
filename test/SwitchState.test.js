// switchState.test.js
import SwitchState from '../src/SwitchState.js';

describe('SwitchState', () => {
  test('should initialize with correct values', () => {
    const switchObj = new SwitchState({ name: 'switch1', value: true, isAlwaysOn: true });

    expect(switchObj._name).toBe('switch1');
    expect(switchObj._value).toBe(true);
    expect(switchObj._isAlwaysOn).toBe(true);
  });

  test('should turn on the switch', () => {
    const switchObj = new SwitchState({ name: 'switch1', value: false });

    switchObj.on();

    expect(switchObj._value).toBe(true);
  });

  test('should turn off the switch if not always on', () => {
    const switchObj = new SwitchState({ name: 'switch1', value: true });

    switchObj.off();

    expect(switchObj._value).toBe(false);
  });

  test('should not turn off the switch if always on', () => {
    const switchObj = new SwitchState({ name: 'switch1', value: true, isAlwaysOn: true });

    console.warn = jest.fn();
    switchObj.off();

    expect(console.warn).toHaveBeenCalledWith("Cannot turn off the an always on switch - switch1");
    expect(switchObj._value).toBe(true);
  });

  test('should toggle the switch value', () => {
    const switchObj = new SwitchState({ name: 'switch1', value: false });

    switchObj.toggle();

    expect(switchObj._value).toBe(true);
  });

  test('should not toggle the switch value if always on', () => {
    const switchObj = new SwitchState({ name: 'switch1', value: false, isAlwaysOn: true });

    console.warn = jest.fn();
    switchObj.toggle();

    expect(console.warn).toHaveBeenCalledWith("Trying to toggle the state of an always on switch - switch1");
    expect(switchObj._value).toBe(false);
  });

  test('should return true if the switch is always on', () => {
    const switchObj = new SwitchState({ name: 'switch1', isAlwaysOn: true });

    const result = switchObj.isAlwaysOn();

    expect(result).toBe(true);
  });

  test('should return false if the switch is not always on', () => {
    const switchObj = new SwitchState({ name: 'switch1' });

    const result = switchObj.isAlwaysOn();

    expect(result).toBe(false);
  });
});
