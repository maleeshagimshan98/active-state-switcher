// switchState.test.js
import ElementState from '../src/ElementState.js';

describe('ElementState', () => {
  test('should initialize with correct values', () => {
    const elementObj = new ElementState({ name: 'element1', value: true, isAlwaysActive: true });

    expect(elementObj._name).toBe('element1');
    expect(elementObj._value).toBe(true);
    expect(elementObj._isAlwaysActive).toBe(true);
  });

  test('should turn on the switch', () => {
    const elementObj = new ElementState({ name: 'element1', value: false });

    elementObj.active();
    expect(elementObj._value).toBe(true);
  });

  test('should turn off the switch if not always on', () => {
    const elementObj = new ElementState({ name: 'element1', value: true });

    elementObj.inactive();
    expect(elementObj._value).toBe(false);
  });

  test('should not turn off the switch if always on', () => {
    const elementObj = new ElementState({ name: 'element1', value: true, isAlwaysActive: true });

    //console.warn = jest.fn();
    elementObj.inactive();

    //expect(console.warn).toHaveBeenCalledWith("Cannot turn off an always on switch - element1");
    expect(elementObj._value).toBe(true);
  });

  test('should toggle the switch value', () => {
    const elementObj = new ElementState({ name: 'element1', value: false });

    elementObj.toggle();

    expect(elementObj._value).toBe(true);
  });

  test('should not toggle the switch value if always on', () => {
    const elementObj = new ElementState({ name: 'element1', value: false, isAlwaysOn: true });

    //console.warn = jest.fn();
    elementObj.toggle();

    //expect(console.warn).toHaveBeenCalledWith("Trying to toggle the state of an always on switch - element1");
    expect(elementObj._value).toBe(true);
  });

  test('should return true if the switch is always on', () => {
    const elementObj = new ElementState({ name: 'element1', isAlwaysActive: true });

    const result = elementObj.isAlwaysActive();

    expect(result).toBe(true);
  });

  test('should return false if the switch is not always on', () => {
    const elementObj = new ElementState({ name: 'element1' });

    const result = elementObj.isAlwaysActive();

    expect(result).toBe(false);
  });
});
