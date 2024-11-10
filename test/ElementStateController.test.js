import ElementStateController from '../src/ElementStateController';
import ElementState from '../src/ElementState';

describe('ElementStateController', () => {
  // Constructor Tests
  test('should throw an error when initialized with invalid data', () => {    
    expect(() => {
      new ElementStateController({}, { activeAll: true, inactiveAll: true });
    }).toThrow('ElementStateController: activeAll and inactiveAll cannot be true at the same time');
  });

  test('should initialize and activate all elements', () => {
    const elements = {
      element1: { name: 'element1' },
      element2: { name: 'element2' }
    };
    const controller = new ElementStateController(elements, {multiple : true, activeAll: true });
    expect(controller.getElement('element1').isActive()).toBe(true);
    expect(controller.getElement('element2').isActive()).toBe(true);
  });
  
  //...
  test('should throw an error when try to activate all elements if multiple is set to false', () => {
    const elements = {
      element1: { name: 'element1' },
      element2: { name: 'element2' }
    };
    expect(new ElementStateController(elements, { activeAll: true })).toThrow(`ElementStateController: Cannot turn on all the elements - ElementStateController.multiple is set to false`);
  });

  test('should initialize and keep all elements inactive', () => {
    const elements = {
      element1: { name: 'element1' },
      element2: { name: 'element2' }
    };
    const controller = new ElementStateController(elements, { inactiveAll: true });
    expect(controller.getElement('element1').isActive()).toBe(false);
    expect(controller.getElement('element2').isActive()).toBe(false);
  });

  // Method: _allowMultipleElements
  test('_allowMultipleElements should return correct boolean based on multiple settings', () => {
    const controller = new ElementStateController({}, { multiple: true });
    expect(controller._allowMultipleElements()).toBe(true);

    controller._multiple = false;
    controller._isAnyActiveStateFound = true;
    expect(controller._allowMultipleElements()).toBe(false);
  });

  // Method: _updateAnyActiveStateFound
  test('_updateAnyActiveStateFound should update the active state flag', () => {
    const elementState = new ElementState({ name: 'test', value: true });
    const controller = new ElementStateController({}, {});
    controller._updateAnyActiveStateFound(elementState);
    expect(controller._isAnyActiveStateFound).toBe(true);
  });

  // Method: _contradictWithMultipleElementRule
  test('_contradictWithMultipleElementRule should detect contradiction', () => {
    const controller = new ElementStateController({}, { multiple: false });
    controller._isAnyActiveStateFound = true;
    expect(controller._contradictWithMultipleElementRule(true)).toBe(true);
  });

  // Method: _setElement
  test('_setElement should set the element correctly', () => {
    const elementState = new ElementState({ name: 'element' });
    const controller = new ElementStateController({}, {});
    controller._setElement('element', elementState);
    expect(controller.getElement('element')).toBe(elementState);
  });

  // Method: _createElement
  test('_createElement should create a new ElementState', () => {
    const elementStateData = { name: 'test' };
    const controller = new ElementStateController({}, {});
    const elementState = controller._createElement(elementStateData);
    expect(elementState instanceof ElementState).toBe(true);
  });

  test('_createElement should throw error for empty object', () => {
    const controller = new ElementStateController({}, {});
    expect(() => {
      controller._createElement({});
    }).toThrow('ElementStateController: Cannot create the state with an empty object');
  });

  // Method: _initElements
  test('_initElements should initialize elements correctly', () => {
    const elements = {
      element1: { name: 'element1' }
    };
    const controller = new ElementStateController(elements, {});
    expect(controller.getElement('element1').name).toBe('element1');
  });

  // Method: _throwErrorIfElementNotDefined
  test('_throwErrorIfElementNotDefined should throw error if element not defined', () => {
    const controller = new ElementStateController({}, {});
    expect(() => {
      controller._throwErrorIfElementNotDefined('nonExistent');
    }).toThrow('ElementStateController: An element with name - nonExistent is not defined');
  });

  // Method: getElement
  test('getElement should retrieve an existing element', () => {
    const elementState = new ElementState({ name: 'test' });
    const controller = new ElementStateController({}, {});
    controller._setElement('test', elementState);
    expect(controller.getElement('test')).toBe(elementState);
  });

  // Method: addElement
  test('addElement should add a new element', () => {
    const controller = new ElementStateController({}, {});
    controller.addElement({ name: 'newElement' });
    expect(controller.getElement('newElement').name).toBe('newElement');
  });

  test('addElement should throw error for invalid element', () => {
    const controller = new ElementStateController({}, {});
    expect(() => {
      controller.addElement({});
    }).toThrow('ElementStateController: parameter elementState must be a valid object having a name property or an instance of ElementState');
  });

  // Method: activeAll
  test('activeAll should activate all elements if multiple is true', () => {
    const elements = {
      element1: new ElementState({ name: 'element1' }),
      element2: new ElementState({ name: 'element2' })
    };
    const controller = new ElementStateController(elements, { multiple: true });
    controller.activeAll();
    expect(controller.getElement('element1').isActive()).toBe(true);
    expect(controller.getElement('element2').isActive()).toBe(true);
  });

  test('activeAll should not activate all elements if multiple is false', () => {
    console.warn = jest.fn();
    const elements = {
      element1: new ElementState({ name: 'element1' }),
      element2: new ElementState({ name: 'element2' })
    };
    const controller = new ElementStateController(elements, { multiple: false });
    controller.activeAll();
    expect(console.warn).toHaveBeenCalled();
  });

  // Method: inactiveAll
  test('inactiveAll should deactivate all elements', () => {
    const elements = {
      element1: new ElementState({ name: 'element1', value: true }),
      element2: new ElementState({ name: 'element2', value: true })
    };
    const controller = new ElementStateController(elements, {multiple: true});
    controller.inactiveAll();
    expect(controller.getElement('element1').isActive()).toBe(false);
    expect(controller.getElement('element2').isActive()).toBe(false);
  });

  // Method: active
  test('active should activate a specific element', () => {
    const elements = {
      element1: new ElementState({ name: 'element1' })
    };
    const controller = new ElementStateController(elements, {});
    controller.active('element1');
    expect(controller.getElement('element1').isActive()).toBe(true);
  });

  test('active should throw error if element does not exist', () => {
    const controller = new ElementStateController({}, {});
    expect(() => {
      controller.active('nonExistent');
    }).toThrow('ElementStateController: An element with name - nonExistent is not defined');
  });

  // Method: inactive
  test('inactive should deactivate a specific element', () => {
    const elements = {
      element1: new ElementState({ name: 'element1', value: true })
    };
    const controller = new ElementStateController(elements, {});
    controller.inactive('element1');
    expect(controller.getElement('element1').isActive()).toBe(false);
  });

  test('inactive should throw error if element does not exist', () => {
    const controller = new ElementStateController({}, {});
    expect(() => {
      controller.inactive('nonExistent');
    }).toThrow('ElementStateController: An element with name - nonExistent is not defined');
  });

  // Method: toggle
  test('toggle should toggle a specific element', () => {
    const elements = {
      element1: new ElementState({ name: 'element1' })
    };
    const controller = new ElementStateController(elements, {});
    controller.toggle('element1');
    expect(controller.getElement('element1').isActive()).toBe(true);
    controller.toggle('element1');
    expect(controller.getElement('element1').isActive()).toBe(false);
  });

  test('toggle should not toggle always active element', () => {
    console.warn = jest.fn();
    const elements = {
      element1: new ElementState({ name: 'element1', isAlwaysActive: true })
    };
    const controller = new ElementStateController(elements, {});
    controller.toggle('element1');
    expect(console.warn).toHaveBeenCalled();
  });

  test('toggle should throw error if element does not exist', () => {
    const controller = new ElementStateController({}, {});
    expect(() => {
      controller.toggle('nonExistent');
    }).toThrow('ElementStateController: An element with name - nonExistent is not defined');
  });
});