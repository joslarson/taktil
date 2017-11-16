Taktil
==========================

[![Build Status](https://travis-ci.org/taktiljs/taktil.svg?branch=master)](https://travis-ci.org/taktiljs/taktil) [![npm version](https://badge.fury.io/js/taktil.svg)](https://badge.fury.io/js/taktil)

Taktil is a lightweight control surface scripting framework for Bitwig Studio that encourages rapid development and community code reuse. At its core, it is designed around the idea of building reusable, extendable components and provides a simple but powerful view abstraction that makes contextually mapping hardware controls to different components a breeze.

Taktil's integrated build tool leverages the powers of TypeScript and Webpack to enable ES2015+ language features in Bitwig's ES5 world (no messy build configurations necessary). Whether you want to go all in with TypeScript or stick with pure modern JavaScript, Taktil has got you covered.

> **Warning!** While fully usable, Taktil is still pre-1.0 and has no backwards compatibility guarantees until the v1 release occurs!

## Installation

To get started started, you'll need to first make sure you have the following prerequisites installed and functioning on your system.

* Node.js v6.0 or newer
* Bitwig Studio v2.0 or newer

Once you've got that out of the way, you can install the Taktil CLI. It will handle starting projects and building + bundling them for you.

```bash
$ npm install -g taktil-cli
```

> **Note:** Don't miss the `-g` flag here as this installs the package globally, adding the the `taktil` command to your path.


If you'd rather use Taktil without the CLI, you can install it directly into an existing project like so:

```bash
$ npm install taktil
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
Version (1.0.0):
Author: Joseph Larson
API Version (2): 3
[taktil] project initialization complete.
```

...your new project will be created within a new `getting-started` directory, relative to your current working directory, and will have the following structure:

```
getting-started/
├── dist/ -> (symlinked into default Bitwig control surface scripts directory)
├── src
│   ├── components.ts
│   ├── controls.ts
│   ├── daw.ts
│   ├── index.ts
│   └── views.ts
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
taktil build
```

At this point your newly built project files should have been picked up by Bitwig and your script should be listed under `Custom > Getting Started` in Bitwig's controller selection menu.

Activate your new controller script by selecting it from the script selection menu and assigning your Midi controller's corresponding MIDI I/O.

> **Note**: The default project template is setup assuming a single midi input/output pair, but if you need more than that, more can be defined in the your project's entry file (`src/getting-started.control.ts` in this case).

With that, everything should be in place to start coding your control surface script. Let's get into it :)


## Defining Controls

The first real task for any new Taktil project is to define an initial set of Midi controls for the script to react to and/or send updates to. This set of controls acts as the template for your control surface and all its knobs, buttons, pads, etc. Taktil's `Control` abstraction exists to help you model your unique hardware-specific controls in way that provides **a common interface with which to build reusable components.**

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

* `enableMidiOut` (default: `true`): Set to `false` to disable Midi output for this control.
* `enableCache` (default: `true`): Set to `false` if you'd like to disable the magic that is the cache.
* `cacheOnMidiIn` (default: `true`): Set this to `false` for controls whose visual state (e.g. LED) is only updated on MIDI output.

> **Note:** Whenever this documentation mentions MIDI input or output it is speaking from the perspective of the script, not the controller. So "input" is referring to MIDI messages travelling from the controller to the script, and "output" is referencing messages moving from the script to the controller.


### Control State

All `Control` instances have a state object that contains a required value property, an optional color property, and whatever other properties custom `Control` subclasses define. The state is updated by calling the `Controls`'s `setState` method, and is most often called from within a corresponding component (which we'll explore later on).

### The `PLAY` Button

Let's begin by defining the `PLAY` button as MIDI CC 24 (or `0x18` in hex) on port 0, channel 0. That translates, in hex values, to a status of `0xb0`, a data1 of `0x18`, and a wild card match on the data2 value. In **string form** our definition will look as follows:

```ts
// src/controls.ts

import taktil from 'taktil';

export const controls = {
    PLAY: new taktil.Control({ patterns: ['B018??'] }),
};
```

The same definition in **object literal form** would look like this:

```ts
// src/controls.ts

import taktil from 'taktil';

export const controls = {
    PLAY: new taktil.Control({ patterns: [{ status: 0xb0, data1: 0x18 }] }),
};
```

### Further Control Abstraction

Taktil provides further abstracted Control subclasses for CC (Control Change), Note, Channel Pressure, and Key Pressure messages. Assuming all three of our controls are MIDI CC controls, we can redefine our `PLAY` button and add to it definitions for our `SHIFT` button and `KNOB` as follows.

```ts
// src/controls.ts

import taktil from 'taktil';

export const controls = {
    PLAY: new taktil.ControlChange({ channel: 0, control: 24 }),
    SHIFT: new taktil.ControlChange({ channel: 0, control: 25 }),
    KNOB: new taktil.ControlChange({ channel: 0, control: 26 }),
};
```
With that, we've defined our controls.

> **Note:** In the same way that ControlChange extends Control, you can create your own Control subclasses. You might, for example define a Control type that not only keeps track of your hardware control's value, but also handles its color, its brightness, and whether it's flashing or not. The sky's the limit. All controls must define the MIDI messages they will handle, but what they do with the input and what they render on output is up to you.


## Creating Components

Now that we've defined our controls, we'll move on to building some reusable components. Components, in Taktil, are the state and business logic containers for non-hardware-specific functionality.

Controls convert Midi input messages into standardized `ControlInput` messages. These messages are sent on to the component through the component's `onControlInput` method. In this way, each component definition is able to uniquely define how this input will be handled.

Components are instantiated as members of a `View` definition providing a corresponding control and a params object.

A connected control converts incoming Midi data into a standardized **ControlInput** object which it sends into the component's `onControlInput` method.

The life cycle of a component begins with the `onControlInput` method which receives a standardized `Control` input object which is sent by its corresponding control on MIDI input

They are defined as ES6 classes that must eventually extend the `Component` class. Component instances are initia


To get our feet wet, we'll start off by creating a simple play/pause toggle.

```ts
// src/components.ts

import taktil from 'taktil';

interface PlayToggleParams {
    transport: API.Transport;
}

interface PlayToggleState {
    on: boolean;
}

export class PlayToggle extends taktil.Component<PlayToggleParams, PlayToggleState> {
    state: PlayToggleState = { on: false };

    onInit() {
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onControlInput({ value }: taktil.ControlState) {
        if (value > this.control.minValue) this.params.transport.togglePlay();
    }

    getControlOutput(): Partial<taktil.ControlState> {
        const { state: { on }, control: { minValue, maxValue } } = this;
        return { value: on ? maxValue : minValue };
    }
}
```

```ts
// src/components.ts

import taktil from 'taktil';

// Play Button

interface PlayToggleParams {
    transport: API.Transport;
}

export class PlayToggle extends taktil.Button<PlayToggleParams> {
    onInit() {
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onPress() {
        const { transport } = this.params;
        this.state.on ? transport.stop() : transport.play();
    }
}

// Mode Gate

export interface ModeGateParams {
    target: string;
}

export class ModeGate extends taktil.Button<ModeGateParams> {
    onPress() {
        this.setState({ on: true });
        taktil.activateMode(this.params.target);
    }

    onRelease() {
        this.setState({ on: false });
        taktil.deactivateMode(this.params.target);
    }
}

// Metronome Toggle

export interface MetronomeToggleParams {
    transport: API.Transport;
}

export class MetronomeToggle extends taktil.Button<MetronomeToggleParams> {
    onInit() {
        this.params.transport
            .isMetronomeEnabled()
            .addValueObserver(isEnabled => this.setState({ on: isEnabled }));
    }

    onPress() {
        this.params.transport.isMetronomeEnabled().toggle();
    }
}

// Volume Range

export interface VolumeRangeParams {
    track: API.Track;
}

export interface VolumeRangeState {
    value: number;
}

export class VolumeRange extends taktil.Component<VolumeRangeParams, VolumeRangeState> {
    state: VolumeRangeState = { value: 0 };
    memory: { input?: any } = {};

    onInit() {
        this.params.track.getVolume().addValueObserver(value => {
            this.setState({ value: Math.round(value * 127) });
        });
    }

    onControlInput({ value }: taktil.ControlState) {
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => delete this.memory.input, 350);

        this.params.track.getVolume().set(value / 127);
    }

    getControlOutput(): Partial<taktil.ControlState> {
        return { value: this.state.value };
    }

    render() {
        if (!this.memory.input) super.render();
    }
}
```

## Integrating with the Bitwig API

```ts
// src/daw.ts

import taktil from 'taktil';

export class Daw {
    transport: API.Transport;
    masterTrack: API.MasterTrack;
    // ...define what you are going to keep track of

    constructor() {
        taktil.on('init', this.onInit.bind(this)); // initialize store during script init
    }

    onInit() {
        this.transport = host.createTransport();
        this.masterTrack = host.createMasterTrack(0);
        // ...setup all of your "init time only" bitwig api stuff here
    }
}

export const daw = new Daw();
```


## Constructing Views

```ts
// src/views.ts

import { View, ViewStack } from 'taktil';

import { PlayToggle, ModeGate, MetronomeToggle, VolumeRange } from './components';
import { controls } from './controls';
import { daw } from './daw';

class BaseView extends View {
    playToggle = new PlayToggle(controls.PLAY, { transport: daw.transport });
    shiftModeGate = new ModeGate(controls.SHIFT, { target: 'SHIFT' });
    metroToggle = new MetronomeToggle(controls.PLAY, { mode: 'SHIFT', transport: daw.transport });
}

class MixerView extends View {
    masterVolume = new VolumeRange(controls.KNOB, { track: daw.masterTrack });
}

export const views = {
    BASE: ViewStack(BaseView),
    MIXER: ViewStack(MixerView, BaseView),
};
```


## Assembling the Session

```ts
import taktil from 'taktil';

import { controls } from './controls';
import { views } from './views';

// 1. set bitwig api version
host.loadAPI(3);

// 2. define controller script
host.defineController(
    'Custom', // vendor
    'Simple Transport', // name
    '1.0.0', // version
    'f2b0f9b0-87be-11e7-855f-094b43050ba2', // uuid
    'Michael Jackson' // author
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
taktil.on('init', () => taktil.activateView('BASE'));

```