# Vue-Switch-Controller

SwitchController and SwitchState are two JavaScript classes that provide a convenient and versatile way to manage switches and their states. The classes allow you to control a group of switches, customize their behavior, and handle user interactions efficiently.

## Table of Contents

- [SwitchController](#switchcontroller)
  - [Usability](#usability)
  - [Key Features](#key-features)
  - [Constructor](#constructor)
  - [addSwitch(name: string, switchState: Object)](#addswitchname-string-switchobj-object)
  - [onAll()](#onall)
  - [offAll()](#offall)
  - [on(name: string)](#onname-string)
  - [off(name: string)](#offname-string)
  - [toggle(name: string)](#togglename-string)
  - [Example](#example)

- [SwitchState](#switchstate)
  - [Constructor](#constructor-1)
  - [on()](#on)
  - [off()](#off)
  - [toggle()](#toggle)
  - [isAlwaysOn(): boolean](#isalwayson-boolean)
  - [Example](#example-1)

---

## SwitchController

The `SwitchController` class is a powerful tool to manage a collection of switches within your application. It allows you to handle switch states and perform various operations, such as turning on, turning off, or toggling switches. With the `SwitchController`, you have full control over the functionality and content of the switches.

### Usability

The `SwitchController` class is highly useful in various scenarios where you need to manage and interact with a group of switches. Some common use cases include:

- **User Settings:** Use the `SwitchController` to manage user settings in your application, allowing users to enable or disable specific features or preferences.

- **UI Elements:** Utilize switches as UI elements to control various aspects of your application's interface, such as light/dark mode or different display modes.

- **Dynamic Behavior:** Implement dynamic behavior in your application, where the state of switches influences other components or functionalities.

### Key Features

- **Switch Management:** Easily manage multiple switches using a single `SwitchController` instance. The class provides methods to add new switches, turn them on, turn them off, or toggle their states.

- **Customization:** Customize each switch by providing individual properties during initialization. This flexibility enables you to tailor the behavior of switches to fit your application's specific requirements.

- **Full Control:** The `SwitchController` class gives you complete control over the switches. You can manipulate switches individually or collectively, depending on your use case.

### Constructor

```javascript
constructor(switches: Object, options: Object)
```

| Parameter | Type | Description |
| --- | --- | --- |
| switches | Object | A collection of switches to be managed. Each key represents the switch name, and the value can be either an instance of `SwitchState` or a plain object representing the switch state. |
| options | Object | An optional object that can contain the following properties:<br>`onAll`: A boolean value to determine whether all switches should be turned on initially.<br>`offAll`: A boolean value to determine whether all switches should be turned off initially.<br>`multiple`: A boolean value to allow turning on all switches at once. |

### Methods

| Method | Description |
| --- | --- |
| `addSwitch(name: string, switchState: Object): void` | Adds a new switch to the `SwitchController`. |
| `onAll(): void` | Turns on all switches managed by the `SwitchController`. |
| `offAll(): void` | Turns off all switches managed by the `SwitchController`. |
| `on(name: string): void` | Turns on the specified switch by its name. |
| `off(name: string): void` | Turns off the specified switch by its name. |
| `toggle(name: string): void` | Toggles the specified switch by its name. |

### Example

```javascript
// Creating a new SwitchController instance with initial switches
const switches = {
  switch1: new SwitchState({ name: 'switch1', value: false }),
  switch2: { name: 'switch2', value: true, isAlwaysOn: true }
};
const options = {
  onAll: true // Turn on all switches initially
};
const switchController = new SwitchController(switches, options);

// Turning off a specific switch
switchController.off('switch1');

// Toggling the state of a specific switch
switchController.toggle('switch2');

// Adding a new switch
switchController.addSwitch('switch3', new SwitchState({ name: 'switch3', value: true }));
```

---

## SwitchState

The `SwitchState` class represents an individual switch state. It allows you to manage the state and behavior of individual switches.

### Constructor

```javascript
constructor({ name: string, value: boolean, isAlwaysOn?: boolean })
```

| Parameter | Type | Description |
| --- | --- | --- |
| name | String | The name of the switch. |
| value | Boolean | The initial value of the switch (true for on, false for off). |
| isAlwaysOn | Boolean | An optional parameter that determines if the switch should always be on and cannot be turned off. Default is `false`. |

### Methods

| Method | Description |
| --- | --- |
| `on(): void` | Turns on the switch. |
| `off(): void` | Turns off the switch. |
| `toggle(): void` | Toggles the value of the switch between on and off. |
| `isAlwaysOn(): boolean` | Returns a boolean value indicating if the switch is always on. |

### Example

```javascript
// Creating a new SwitchState instance
const switch1 = new SwitchState({ name: 'switch1', value: false, isAlwaysOn: true });

// Turning on the switch
switch1.on();

// Toggling the state of the switch
switch1.toggle();

// Checking if the switch is always on
const alwaysOn = switch1.isAlwaysOn(); // Returns true
```

---

## License

This component is open source and available under the [MIT License](LICENSE).

## Author

Vue Preloader is developed and maintained by [Maleesha Gimshan](https://github.com/maleeshagimshan98). If you have any questions or suggestions, feel free to reach out.

## Contributing

Contributions are highly appreciated and contribute to the thriving open-source community. If you have a suggestion to improve this component, please fork the repository and create a pull request. Alternatively, you can open an issue with the tag "enhancement". Don't forget to show your support by giving the project a star! Thank you for your contributions!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request