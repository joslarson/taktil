# Taktil

[![Build Status](https://travis-ci.org/taktiljs/taktil.svg?branch=master)](https://travis-ci.org/taktiljs/taktil) [![npm version](https://badge.fury.io/js/taktil.svg)](https://badge.fury.io/js/taktil)

Taktil is a lightweight control surface scripting framework for Bitwig Studio that encourages rapid development and community code reuse. At its core, it is designed around the idea of building reusable, extendable components and provides a simple but powerful view abstraction that makes contextually mapping hardware controls to different components a breeze.

Taktil's integrated build tool transpiles and bundles your code to enable ES2015+ language features and npm dependency support in Bitwig's ES5 world (no messy build configurations necessary).

> **Note:** While Taktil is written in and provide first class support for TypeScript, this documentation currently provides only pure JavaScript examples. TypeScript specific docs are in the works.

> **Warning!** While fully usable, Taktil is still pre-1.0 and has no backwards compatibility guarantees until the v1 release occurs! Your input is encouraged. Also, while the CLI is designed to work on Windows, Mac, and Linux, I have only tested it on macOS so far. So please create ticket and/or submit pull request as you find bugs.

## Installation

To get started started, you'll need to first make sure you have the following prerequisites installed and functioning on your system.

* Node.js v6.0 or newer
* Bitwig Studio v2.0 or newer

Once you've got that out of the way, you're ready to install Taktil. If you want to use the integrated CLI, you'll need to install it globally. Doing so will put the `taktil` CLI command in your path which will handle initializing projects and building + bundling them for you.

```bash
npm install -g taktil
```

> **Note:** Don't miss the `-g` flag here as this installs the package globally, adding the the `taktil` command to your path.

If you'd rather use Taktil without the CLI, you can manually install it locally into an existing project like so:

```bash
npm install taktil
```

## Project Setup

With that out of the way, let's start a new project using the CLI tool's `init` command. We'll call our project `getting-started`.

```bash
taktil init getting-started
# run taktil --help for detailed usage
```

This command will ask you some questions then generate a working project skeleton based on your responses. If, after running the command above, we answer the prompts as follows...

```bash
# answers are optional where a default is provided in parentheses
[taktil] begin project initialization...
Display Name: Getting Started
Vendor/Category: Custom
Author: Joseph Larson
Version (1.0.0):
API Version (4):
[taktil] project initialization complete.
```

...your new project will be created within a new `getting-started` directory, relative to your current working directory, and will have the following structure:

```bash
getting-started/
├── dist/ -> ...  # symlinked into default Bitwig control surface scripts directory
├── src
│   ├── components.js
│   ├── controls.js
│   ├── daw.js
│   ├── index.js
│   └── views.js
├── README.md
├── package.json
├── tsconfig.json
└── webpack.config.js
```

`cd` into your new project directory and install the initial dependencies using npm.

```bash
cd getting-started
npm install
```

Now, we'll run the CLI's `build` command, to generate your project's initial build.

```bash
taktil build  # run from the project root
```

At this point your newly built project files should have been picked up by Bitwig and your script should be listed under `Custom > Getting Started` in Bitwig's controller selection menu.

Activate your new controller script by selecting it from the script selection menu and assigning your Midi controller's corresponding MIDI I/O.

> **Note**: The default project template is setup assuming a single midi input/output pair, but if you need more than that, more can be defined in the your project's entry file (`src/index.js` in this case).

Now, before we start editing files, let's put the CLI's build command in watch mode so that our project will rebuild whenever we modify and save a source file.

```bash
taktil watch  # run from the project root
# exit the build command with ctrl/cmd+c
```

With that, everything should be in place to start coding your control surface script. Let's get into it :)


## Defining Controls

The first real task for any new Taktil project is to define an initial set of Midi controls for the script to react to and/or send updates to. This set of controls acts as the template for your control surface and all its knobs, buttons, pads, etc. Taktil's `Control` abstraction exists to help you model your unique hardware-specific controls in way that provides **a common interface on top of which to build reusable components.**

In this tutorial, our hypothetical control surface has three relevant controls: a `PLAY` button, a `SHIFT` button, and a general purpose `KNOB`. Let's take a quick look at Taktil's `Control` MIDI abstraction.

### MIDI Patterns

Each `Control` is composed of a list of MIDI input/output patterns that:

1. Define which MIDI input messages will be routed to the `Control` to be handled.
2. Let Taktil know how to cache midi output messages such that redundant messages—those that would not change your Midi controller's state—are not sent.

This list of patterns must not overlap with any other registered `Control` definition, such that a given Midi input message will always be routed to only one `Control`. This requirement is enforced to enable the above mentioned caching mechanism which provides significant automatic Midi output optimizations.

Patterns can be defined in string or object literal form.

* **String form** patterns are the most expressive and concise, representing the MIDI port and each MIDI byte as consecutive two character hexadecimal values, with question marks used for wildcard matching (e.g. `'00B018??'` where `00`, `B0`, `18`, and `??` represent the port, status, data1, and data2 values). If the port byte is left off (`'B018??'`) the pattern's port defaults to 0.

* **Object literal form** allows you to define MIDI patterns by assuming undefined MIDI byte values to be wild cards (e.g. `{ port: 0, status: 0xb0, data1: 0x18 }` where any MIDI message matching the provided values will be handled). If the port value is left off (`{ status: 0xb0, data1: 0x18 }`) the pattern's port defaults to 0. Though slightly less powerful and more verbose, you may find object literal form to be more readable while still covering the vast majority of use cases.

> **Note**: The values for the status and data1 arguments above (e.g. `0xb0`) are just plain numbers written in JavaScript's hexadecimal (base 16) form. This makes it easier to to see the type of message and which channel the `Control` maps to, but you can use regular base 10 integers 0-127 here if you want to.

### Control Options

Beyond defining the MIDI patterns your `Control` will handle, you may also need to override some of the `Control`'s default options to reflect the type of `Control` you are defining. The most common of those options are as follows:

* **`enableMidiOut`** (default: `true`): Set to `false` to disable Midi output for this control.
* **`enableCache`** (default: `true`): Set to `false` if you'd like to disable the magic that is the cache.
* **`cacheOnMidiIn`** (default: `true`): Set this to `false` for controls whose visual state (e.g. LED) is only updated on MIDI output.

> **Note:** Whenever this documentation mentions MIDI input or output it is speaking from the perspective of the script, not the controller. So "input" is referring to MIDI messages travelling from the controller to the script, and "output" is referencing messages moving from the script to the controller.


### Control State

All `Control` instances have a state object that contains a required value property, optional color, brightness, and flashing properties, and whatever other properties custom `Control` subclasses define. The state is updated by calling the `Controls`'s `setState` method, and is most often called from within a corresponding component (which we'll explore later on).

### The `PLAY` Button

Let's begin by defining the `PLAY` button as MIDI CC 24 (or `0x18` in hex) on port 0, channel 0. That translates, in hex values, to a status of `0xb0`, a data1 of `0x18`, and a wild card match on the data2 value. In **string form** our definition will look as follows:

```js
// src/controls.js

import taktil from 'taktil';

export const controls = {
    PLAY: new taktil.Control({ patterns: ['B018??'] }),
};
```

The same definition in **object literal form** would look like this:

```js
// src/controls.js

import taktil from 'taktil';

export const controls = {
    PLAY: new taktil.Control({ patterns: [{ status: 0xb0, data1: 0x18 }] }),
};
```

### Further Control Abstraction

Taktil provides further abstracted Control subclasses for CC (Control Change), Note, Channel Pressure, and Key Pressure messages. Assuming all three of our controls are MIDI CC controls, we can redefine our `PLAY` button and add to it definitions for our `SHIFT` button and `KNOB` as follows.

```js
// src/controls.js

import taktil from 'taktil';

export const controls = {
    PLAY: new taktil.ControlChange({ channel: 0, control: 24 }),
    SHIFT: new taktil.ControlChange({ channel: 0, control: 25 }),
    KNOB: new taktil.ControlChange({ channel: 0, control: 26 }),
};
```

With that, we've defined our controls.

> **Note:** In the same way that ControlChange extends Control, you can create your own Control subclasses. You might, for example define a Control type that not only keeps track of your hardware control's value, but also handles its color, its brightness, and whether it's pulsing or not. The sky's the limit. All controls must define the MIDI messages they will handle, but what they do with the input and what they render on output and when is up to you.


## Creating Components

Now that we've defined our controls, we'll move on to building some components. Components, in Taktil, are the state and business logic containers for non-hardware-specific functionality. They receive and react to standardized `ControlInput` messages (through the `onControlInput` method) as well as Bitwig API events. They also decide when a connected `Control` should be updated by calling its `setState` method, usually in reaction to one of the above mentioned messages or events.

Components are defined as ES6 classes that must eventually extend the `Component` base class. At instantiation time, a component will be passed an associated control and a params object. The params object is your component configuration object and is where all of the Bitwig API derived objects should be passed in for use in the components different life-cycle methods.

There are only three total component life-cycle methods and only two that are required for a component definition. They are as follows.

* **`onInit` (optional):**  This where you define all of your component's "init" phase logic, which mostly consists of hooking up Bitwig API event callbacks.
* **`onControlInput` (required):** This is where you define what happens when your component's connected control receives input.
* **`getControlOutput` (required):** This returns the full or partial control state object that will be sent to the controls `setState` method whenever our component re-renders.

To get our feet wet, we'll start off by creating a simple play/pause toggle.

```js
// src/components.js

import taktil from 'taktil';

export class PlayToggle extends taktil.Component {
    state = { on: false };

    // onInit is where you should hookup your Bitwig API event callbacks,
    // as all of that work must be done during the "init" phase
    onInit() {
        // we're expecting a Bitwig API derived transport object to be passed in to the params
        // object at instantiation time, then we're hooking up a callback to sync the component
        // state with the transport's isPlaying state.
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    // onControlInput is where we define what happens when our component's connected control
    // receives input
    onControlInput({ value }) {
        // if the input value is greater than the controls min value, toggle play state
        if (value > this.control.minValue) this.params.transport.togglePlay();
    }

    // getControlOutput is where we define the full or partial control state object
    // that will be sent to the controls `setState` method whenever our component re-renders
    getControlOutput() {
        // in this case if our button is "on" we send the control's max value, otherwise
        // we send it's minimum value
        const { state: { on }, control: { minValue, maxValue } } = this;
        return { value: on ? maxValue : minValue };
    }
}
```

Because buttons are such a big and predictable part of every controller script, Taktil provides a general purpose Button component. The button component extends the base Component class, adding five self described optionally implemented life-cycle methods:

* **`onPress`**
* **`onLongPress`**
* **`onDoublePress`**
* **`onRelease`**
* **`onDoubleRelease`**

Let's re-implement our PlayToggle by extending the Button component.

```js
// src/components.js

import taktil from 'taktil';

export class PlayToggle extends taktil.Button {
    onInit() {
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onPress() {
        this.params.transport.togglePlay()
    }
}
```

Now let's implement the rest of the components for our getting started project. First we want to implement a MetronomeToggle and a ModeGate button which will turn shift mode on/off globally such that when the shift ModeGate button is pressed the PLAY control will toggle the metronome on/off, and when the shift ModeGate button is released the PLAY control will go back to being a PlayToggle.

> **Note:** We'll hook up the components to controls and modes in the view section, then you'll have a better understanding of what I'm talking about here.

```js
// src/components.js (continued...)

export class ModeGate extends taktil.Button {
    onPress() {
        this.setState({ on: true });
        taktil.activateMode(this.params.target);
    }

    onRelease() {
        this.setState({ on: false });
        taktil.deactivateMode(this.params.target);
    }
}

export class MetronomeToggle extends taktil.Button {
    onInit() {
        this.params.transport
            .isMetronomeEnabled()
            .addValueObserver(isEnabled => this.setState({ on: isEnabled }));
    }

    onPress() {
        this.params.transport.isMetronomeEnabled().toggle();
    }
}
```

Finally, to get away from buttons, we'll implement a VolumeRange component which takes a Bitwig Track instance as a param and controls it's volume. When the volume changes in Bitwig the component will update its associated control, and when its associated control sends input, the tracks level will be adjust accordingly. In this way the component's job is to keep the control state's value and and the Track object's volume value in sync with one another.

```js
// src/components.js (continued...)

export class VolumeRange extends taktil.Component {
    state = { value: 0 };
    memory = {};

    onInit() {
        this.params.track.getVolume().addValueObserver(value => {
            this.setState({ value: Math.round(value * 127) });
        });
    }

    onControlInput({ value }) {
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => delete this.memory.input, 350);

        this.params.track.getVolume().set(value / 127);
    }

    getControlOutput() {
        return { value: this.state.value };
    }

    render() {
        if (!this.memory.input) super.render();
    }
}
```

## Integrating with the Bitwig API

Bitwig's API requires that all of our API derived object and event subscription needs be defined and setup during the controller scripts 'init' phase. This can be done by following the pattern below.

```js
// src/daw.js

import taktil from 'taktil';

// export our initialized empty daw object
export const daw = {};
// after the init phase our daw object will be populated with all of our needed API objects.
// these object will be ready and can be accessed from within in a component's `onInit`
// method to setup event callbacks related to that component. It's best practice to pass
// these objects into components as params to make them more reusable.
taktil.on('init', () => {
    daw.transport = host.createTransport();
    daw.masterTrack = host.createMasterTrack(0);
    // ...setup all of your "init time only" bitwig api objects here
});
```

> **Note:** Bitwig's API only allows a single function to be defined as your init event callback. Taktil defines this function for us in a way that allows us to register multiple callbacks to the 'init' event via the `taktil.on('init', [callback])` method.


## Assembling the Views

Now that we've defined our controls and and components, it's time to assemble them into views. I their simplest form, views are just a mapping of components to controls. When a view is active, the view's components will receive control input and generate control output. An inactive view's components, on the other hand, will not be sent control input messages, and will not generate any control output, but they will continue to maintain their internal state in preparation for being activated.

View components are also registered to a specific view "mode" and will only be considered active if both the view and the mode are active. Taktil maintains the array of active mode strings globally. These modes are kept in the order they were activated such that a component registered to the same control but a different mode can override the another, with the most recently activated mode taking precedence. This allows a view to configure itself differently based on the global mode list. This is useful, for instance, when implementing a shift button, where having all views know our script is in "shift mode" will allow us to define secondary actions across multiple disconnected views.

Views are defined by extending Taktil's View class or by stacking previously defined views using the ViewStack function. The ViewStack function accepts a list of view classes and returns a new View class definition where, in order, each of the provided views' component/control mappings override any subsequent view's mapping involving the same control (it's just simple inheritance where the the control portion of each mapping is the thing being overridden). This pattern makes it possible to define reusable chunks of view logic which can be combined together in different ways to create more complex views.

In a simple project, a single view making use of view modes may be enough handle your needs. The value of view stacks will become apparent when developing more complex projects.

As shown below, the component/control mappings are defined as instance properties. Valid instance property types consist of a component instance, an array of component instances, or a function that returns either of the previous. Component constructors take a control instance and a params object. The params object consists of an optional mode property—for defining which mode the component should be registered to—as well as whatever else the individual component needs to operate. This is generally where we will pass in objects retrieved or created through Bitwig's API as the view instance code will not be run until after the init phase.

```js
// src/views.js

import { View, ViewStack } from 'taktil';

import { PlayToggle, ModeGate, MetronomeToggle, VolumeRange } from './components';
import { controls } from './controls';
import { daw } from './daw';

// in this view when you press the SHIFT button the PLAY button will toggle the metronome on/off
// but when the SHIFT button is released, the PLAY button will toggle the transport's play state
class BaseView extends View {
    // map PlayToggle component to the PLAY control, registering it to the default base mode
    playToggle = new PlayToggle(controls.PLAY, { transport: daw.transport });
    // map ModeGate component to the SHIFT control, registering it to the default base mode
    shiftModeGate = new ModeGate(controls.SHIFT, { target: 'SHIFT' });
    // map MetronomeToggle component to the PLAY control, registering it to our custom 'SHIFT' mode
    metroToggle = new MetronomeToggle(controls.PLAY, { mode: 'SHIFT', transport: daw.transport });
}

class MixerView extends View {
    // map VolumeRange component to the KNOB control, registering it the default base mode
    masterVolume = new VolumeRange(controls.KNOB, { track: daw.masterTrack });
}

// export the view name to view class mapping so that we can register these views to
// the session to be activated by name
export const views = {
    BASE: BaseView,
    // by stacking these views, all components in MixerView that are connected to an active mode
    // will be active and any components in BaseView that are connected to an active mode will
    // be active as long as their connected controls do not conflict with any active component
    // in the MixerView.
    MIXER: ViewStack(MixerView, BaseView),
};
```


## Initializing the Session

At this point we've defined our control layer, created some components, and assembled those controls and components into views. Now all that's left is to create our controller script's entry point where we will setup and initialize our session.

```js
// src/index.js

import taktil from 'taktil';

import { controls } from './controls';
import { views } from './views';

// 1. set bitwig api version
host.loadAPI(4);

// 2. define controller script
host.defineController(
    'Custom', // vendor
    'Getting Started', // name
    '1.0.0', // version
    'f2b0f9b0-87be-11e7-855f-094b43050ba2', // uuid
    'Joseph Larson' // author
);

// 3. setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
// host.addDeviceNameBasedDiscoveryPair(
//     ['Input Name'],
//     ['Output Name'],
// );

// 4. register controls to the session
taktil.registerControls(controls);

// 5. register views to the session
taktil.registerViews(views);

// 6. on init, activate view to trigger initial render
taktil.on('init', () => taktil.activateView('MIXER'));
```