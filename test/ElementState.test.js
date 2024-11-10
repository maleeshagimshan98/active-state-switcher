import ElementState from "../src/ElementState";

describe('ElementState', () => {
  // Constructor Tests
  test('should initialize with valid values', () => {
    const element = new ElementState({ name: 'test', value: true, isAlwaysActive: false });
    expect(element.name).toBe('test');
    expect(element.isActive()).toBe(true);
    expect(element.isAlwaysActive()).toBe(false);
  });

  test('should initialize with default values', () => {
    const element = new ElementState({ name: 'defaultTest' });
    expect(element.isActive()).toBe(false);
    expect(element.isAlwaysActive()).toBe(false);
  });

  test('should set value to true if always active', () => {
    const element = new ElementState({ name: 'alwaysActiveTest', isAlwaysActive: true });
    expect(element.isActive()).toBe(true);
  });

  test('should throw error if name is missing', () => {
    expect(() => new ElementState({})).toThrow('ElementState: An ElementState must have a name');
  });

  // Method: active
  test('should activate the state', () => {
    const element = new ElementState({ name: 'activateTest' });
    element.active();
    expect(element.isActive()).toBe(true);
  });

  // Method: inactive
  test('should deactivate the state', () => {
    const element = new ElementState({ name: 'deactivateTest', value: true });
    element.inactive();
    expect(element.isActive()).toBe(false);
  });

  test('should not deactivate an always active state', () => {
    console.warn = jest.fn();
    const element = new ElementState({ name: 'alwaysActiveTest', isAlwaysActive: true });
    element.inactive();
    expect(console.warn).toHaveBeenCalledWith('Cannot turn off the an always active state - alwaysActiveTest');
    expect(element.isActive()).toBe(true);
  });

  // Method: toggle
  test('should toggle the state', () => {
    const element = new ElementState({ name: 'toggleTest', value: true });
    element.toggle();
    expect(element.isActive()).toBe(false);
    element.toggle();
    expect(element.isActive()).toBe(true);
  });

  test('should not toggle an always active state', () => {
    console.warn = jest.fn();
    const element = new ElementState({ name: 'alwaysActiveToggleTest', isAlwaysActive: true });
    element.toggle();
    expect(console.warn).toHaveBeenCalledWith('Trying to toggle the state of an always active state - alwaysActiveToggleTest');
    expect(element.isActive()).toBe(true);
  });

  // Method: isActive
  test('should return true if active', () => {
    const element = new ElementState({ name: 'isActiveTest', value: true });
    expect(element.isActive()).toBe(true);
  });

  test('should return false if inactive', () => {
    const element = new ElementState({ name: 'isInactiveTest', value: false });
    expect(element.isActive()).toBe(false);
  });

  // Method: isAlwaysActive
  test('should return true if always active', () => {
    const element = new ElementState({ name: 'isAlwaysActiveTest', isAlwaysActive: true });
    expect(element.isAlwaysActive()).toBe(true);
  });

  test('should return false if not always active', () => {
    const element = new ElementState({ name: 'isNotAlwaysActiveTest', isAlwaysActive: false });
    expect(element.isAlwaysActive()).toBe(false);
  });

  // Method: setIsAlwaysActive
  test('should set isAlwaysActive to true', () => {
    const element = new ElementState({ name: 'setAlwaysActiveTest' });
    element.setIsAlwaysActive(true);
    expect(element.isAlwaysActive()).toBe(true);
  });

  test('should set isAlwaysActive to false', () => {
    const element = new ElementState({ name: 'setNotAlwaysActiveTest', isAlwaysActive: true });
    element.setIsAlwaysActive(false);
    expect(element.isAlwaysActive()).toBe(false);
  });

  test('should throw error on invalid isAlwaysActive value', () => {
    const element = new ElementState({ name: 'invalidActiveTest' });
    expect(() => element.setIsAlwaysActive('notBoolean')).toThrow(
      'Trying to set the isAlwaysActive in invalidActiveTest. The value must be a boolean, but found string'
    );
  });
});