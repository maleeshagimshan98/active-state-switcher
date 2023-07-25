# Vue-Switch-Controller

Introducing SwitchController – The Ultimate JavaScript Class for Efficient Switch Management! 🚀

Are you tired of dealing with messy code when managing switches in your application? Say goodbye to complexity and embrace the simplicity of SwitchController!
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

SwitchController and SwitchState are two JavaScript classes that provide a convenient and versatile way to manage switches and their states. The classes allow you to control a group of switches, customize their behavior, and handle user interactions efficiently.

🔧 Seamlessly Control Switch States: With SwitchController, you can effortlessly turn on, turn off, or toggle switches, giving you complete control over their functionality. 💡

🎯 Perfect for Every Use Case: Whether it's managing user settings, controlling UI elements, or implementing dynamic behavior, SwitchController has got you covered! 🧩

💪 Manage Multiple Switches with Ease: Say goodbye to repetitive tasks! SwitchController empowers you to handle multiple switches with a single instance.

🎨 Customize to Your Heart's Content: Tailor each switch's behavior to fit your application's specific requirements with ease.

📦 Simple Installation: Installing SwitchController is a breeze! Just run a single npm command, and you're ready to go.

Join thousands of developers who have already embraced SwitchController to simplify their switch management process. Take control of your switches and elevate your application's performance today!

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