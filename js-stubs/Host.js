/* API Version - 1.3.13 */

/**
 * An interface representing the host application to the script. A singleton instance of this interface is available
 * in the global scope of each script. The methods provided by this interface can be divided in different categories:
 * 
 * 1. functions for registering the script in Bitwig Studio, so that it can be listed, detected and configured in
 *    the controller preferences. The methods that belong to this group are {@link #defineController},
 *    {@link #defineMidiPorts}, {@link #defineSysexIdentityReply} and {@link #addControllerNameBasedDiscoveryPair}.
 * 2. functions for creating objects that provide access to the various areas of Bitwig Studio to the script. The
 *    name of those methods typically start with `create...`
 * 3. functions for printing to the Control Surface Console, which can be opened from the `View` menu of Bitwig Studio.
 * 4. functions for determining the name of the host application, API version, the host operating system and such.
 * 
 * The first group of methods should be called on the global scope of the script. The function in the second and third
 * group are typically called from the init method of the script or other handler functions. The last group is probably
 * only required in rare cases and can be called any time.
 *
 * @mainpage Introduction

Welcome to the Bitwig Control Surface API.<br/>

The pages shown here include the reference documentation for the various interfaces and functions provided
by the API.<br/>

The best starting point for becoming familiar with the API within these pages is the documentation of the
{@link Host} interface. A singleton instance of that interface is available in the scope of each script.
In addition it is highly recommended to also walk through the <b>Control Surface Scripting Guide</b> that is
available from the @em Help menu in Bitwig Studio.
 * @include api-changes
 * @since Bitwig Studio 1.0
 */
function Host() {}

/**
 * An interface representing the host application to the script.
 * @global
 * @type {Host}
 */
var host = new Host();

/**
 * Registers a controller script with the given parameters.
 * This function must be called once at the global scope of the script.
 *
 * @param {string} vendor the name of the hardware vendor.
              Must not be <code>null</code>.
 * @param {string} name the name of the controller script as listed in the user interface of Bitwig Studio.
            Must not be <code>null</code>.
 * @param {string} version the version of the controller script. Must not be <code>null</code>.
 * @param {string} uuid a universal unique identifier (UUID) string that is used to distinguish one script from another,
            for example `550e8400-e29b-11d4-a716-446655440000`. Must not be <code>null</code>.
            For generating random UUID strings several free web tools are available.
 * @param {string} author the name of the script author
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.defineController = function(vendor, name, version, uuid, author) {};

/**
 * Defines the number of MIDI ports for input and output that the controller uses. This method should be called once
 * in the global scope if the script is supposed to exchange MIDI messages with the controller, or if the script adds
 * entries to the MIDI input/output choosers in Bitwig Studio. After calling this method the individual port objects
 * can be accessed using {@link #getMidiInPort(int index)} and {@link #getMidiInPort(int index)}.
 *
 * @param {int} numInports the number of input ports
 * @param {int} numOutports the number of output ports
 * @since Bitwig Studio 1.0
 */
Host.prototype.defineMidiPorts = function(numInports, numOutports) {};

/**
 * Returns the MIDI input port with the given index.
 *
 * @param {int} index the index of the MIDI input port, must be valid.
 * @return {MidiIn} the requested MIDI input port
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.getMidiInPort = function(index) {};

/**
 * Returns the MIDI output port with the given index.
 *
 * @param {int} index the index of the MIDI output port, must be valid.
 * @return {MidiOut} the requested MIDI output port
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.getMidiOutPort = function(index) {};

/**
 * Registers patterns which are used to automatically detect hardware controllers that can be used with the
 * script.<br/>
 * 
 * When the user clicks on the `detect` button in the Bitwig Studio controller preferences
 * dialog, Bitwig Studio searches for connected controller hardware by comparing the parameters passed into
 * this function are compared with the port names of the available MIDI drivers. Found controller scripts
 * are automatically added with their input/output ports configured.<br/>
 * 
 * Calling this function is optional, but can also be called multiple times in the global script scope
 * in order to support alternative driver names.
 *
 * @param {String[]} inputs the array of strings used to detect MIDI input ports, must not be `null`.
 * @param {String[]} outputs the array of strings used to detect MIDI output ports, must not be `null`.
 * @since Bitwig Studio 1.0
 */
Host.prototype.addControllerNameBasedDiscoveryPair = function(inputs, outputs) {};

/**
 * Registers the `Identity Reply Universal SysEx` message (if any) that the MIDI controller sends after
 * receiving the `Identity Request Universal SysEx` message (`F0 7E 7F 06 01 F7`), as defined
 * in the MIDI standard.<br/>
 * 
 * This function may be called at the global scope of the script, but is optional.
 * Please note that this function is only applicable to scripts with one MIDI input and one MIDI output.
 * Also note that not all MIDI hardware supports SysEx identity messages.
 *
 * @param {string} reply the `Identity Reply Universal SysEx` message. Must not be <code>null</code>
 * @since Bitwig Studio 1.0
 */
Host.prototype.defineSysexIdentityReply = function(reply) {};

/**
 * Creates a preferences object that can be used to insert settings
 * into the Controller Preferences panel in Bitwig Studio.
 *
 * @return {Preferences} an object that provides access to custom controller preferences
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.getPreferences = function() {};

/**
 * Creates a document state object that can be used to insert settings
 * into the Studio I/O Panel in Bitwig Studio.
 *
 * @return {DocumentState} an object that provides access to custom document settings
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.getDocumentState = function() {};

/**
 * Returns an object that is used to configure automatic notifications.
 * Bitwig Studio supports automatic visual feedback from controllers that shows up as popup notifications.
 * For example when the selected track or the current controller preset was changed on the controller these
 * notifications are shown, depending on your configuration.
 *
 * @return {NotificationSettings} a configuration object used to enable/disable the various automatic notifications
        supported by Bitwig Studio
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.getNotificationSettings = function() {};

/**
 * Returns an object for controlling various aspects of the currently selected project.
 *
 * @return {Project}
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1.5
 */
Host.prototype.getProject = function() {};

/**
 * Returns an object for controlling and monitoring the elements of the `Transport` section in Bitwig Studio.
 * This function should be called once during initialization of the script if transport access is desired.
 *
 * @return {Transport} an object that represents the `Transport` section in Bitwig Studio.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createTransport = function() {};

/**
 * Returns an object for controlling and monitoring the `Groove` section in Bitwig Studio.
 * This function should be called once during initialization of the script if groove control is desired.
 *
 * @return {Groove} an object that represents the `Groove` section in Bitwig Studio.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createGroove = function() {};

/**
 * Returns an object that provides access to general application functionality, including global view settings,
 * the list of open projects, and other global settings that are not related to a certain document.
 *
 * @return {Application} an application object.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createApplication = function() {};

/**
 * Returns an object which provides access to the `Arranger` panel of Bitwig Studio. Calling this function
 * is equal to `createArranger(-1)`.
 *
 * @return {Arranger} an arranger object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.createArranger = function() {};

/**
 * Returns an object which provides access to the `Arranger` panel inside the specified window.
 *
 * @param {int} window the index of the window where the arranger panel is shown,
              or -1 in case the first arranger panel found on any window should be taken
 * @return {Arranger} an arranger object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createArranger = function(window) {};

/**
 * Returns an object which provides access to the `Mixer` panel of Bitwig Studio. Calling this function
 * is equal to `createMixer(-1, null)`.
 *
 * @return {Mixer} a `Mixer` object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createMixer = function() {};

/**
 * Returns an object which provides access to the `Mixer` panel that belongs to the specified panel layout.
 * Calling this function is equal to `createMixer(-1, panelLayout)`.
 *
 * @param {string} panelLayout the name of the panel layout that contains the mixer panel, or `null` in case the
                   selected panel layout in Bitwig Studio should be followed. Empty strings or invalid
                   names are treated the same way as `null`. To receive the list of available panel
                   layouts see {@link Application#addPanelLayoutObserver}.
 * @return {Mixer} a `Mixer` object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createMixer = function(panelLayout) {};

/**
 * Returns an object which provides access to the `Mixer` panel inside the specified window. Calling this function
 * is equal to `createMixer(window, null)`.
 *
 * @param {int} window the index of the window where the mixer panel is shown,
              or -1 in case the first mixer panel found on any window should be taken
 * @return {Mixer} a `Mixer` object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createMixer = function(window) {};

/**
 * Returns an object which provides access to the `Mixer` panel that matches the specified parameters.
 *
 * @param {string} panelLayout the name of the panel layout that contains the mixer panel, or `null` in case the
                   selected panel layout in Bitwig Studio should be followed. Empty strings or invalid
                   names are treated the same way as `null`. To receive the list of available panel
                   layouts see {@link Application#addPanelLayoutObserver}.
 * @param {int} window the index of the window where the mixer panel is shown,
              or -1 in case the first mixer panel found on any window should be taken
 * @return {Mixer} a `Mixer` object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createMixer = function(panelLayout, window) {};

/**
 * Returns a track bank with the given number of tracks, sends and scenes.<br/>
 * 
 * A track bank can be seen as a fixed-size window onto the list of tracks in the current document including
 * their sends and scenes, that can be scrolled in order to access different parts of the track list.
 * For example a track bank configured for 8 tracks can show track 1-8, 2-9, 3-10 and so on.<br/>
 * 
 * The idea behind the `bank pattern` is that hardware typically is equipped with a fixed amount of channel
 * strips or controls, for example consider a mixing console with 8 channels, but Bitwig Studio documents contain a
 * dynamic list of tracks, most likely more tracks than the hardware can control simultaneously. The track bank
 * returned by this function provides a convenient interface for controlling which tracks are currently shown on
 * the hardware.<br/>
 * 
 * Creating a track bank using this method will consider all tracks in the document, including effect tracks
 * and the master track. Use {@link #createMainTrackBank} or {@link #createEffectTrackBank} in case you are only
 * interested in tracks of a certain kind.
 *
 * @param {int} numTracks the number of tracks spanned by the track bank
 * @param {int} numSends the number of sends spanned by the track bank
 * @param {int} numScenes the number of scenes spanned by the track bank
 * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createTrackBank = function(numTracks, numSends, numScenes) {};

/**
 * Returns a track bank with the given number of tracks, sends and scenes. Only audio tracks, instrument tracks and
 * hybrid tracks are considered. For more information about track banks and the `bank pattern` in general,
 * see the documentation for {@link #createTrackBank}.
 *
 * @param {int} numTracks the number of tracks spanned by the track bank
 * @param {int} numSends the number of sends spanned by the track bank
 * @param {int} numScenes the number of scenes spanned by the track bank
 * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createMainTrackBank = function(numTracks, numSends, numScenes) {};

/**
 * Returns a track bank with the given number of effect tracks and scenes. Only effect tracks are considered.
 * For more information about track banks and the `bank pattern` in general, see the documentation for
 * {@link #createTrackBank}.
 *
 * @param {int} numTracks the number of tracks spanned by the track bank
 * @param {int} numScenes the number of scenes spanned by the track bank
 * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createEffectTrackBank = function(numTracks, numScenes) {};

/**
 * Returns an object that represents the master track of the document.
 *
 * @param {int} numScenes the number of scenes for bank-wise navigation of the master tracks clip launcher slots.
 * @return {Track} an object representing the master track.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createMasterTrack = function(numScenes) {};

/**
 * Returns an object that represents the cursor item of the arranger track selection.
 *
 * @param {int} numSends the number of sends for bank-wise navigation of the sends that are associated
                with the track selection
 * @param {int} numScenes the number of scenes for bank-wise navigation of the clip launcher slots
                 that are associated with the track selection
 * @return {CursorTrack} an object representing the currently selected arranger track (in the future also multiple tracks)
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.createArrangerCursorTrack = function(numSends, numScenes) {};

/**
 * Returns an object that represents a named cursor track, that is independent from the arranger or mixer
 * track selection in the user interface of Bitwig Studio.
 *
 * @param {string} name the name of the track cursor
 * @param {int} numSends the number of sends for bank-wise navigation of the sends that are associated
                with the track selection
 * @param {int} numScenes the number of scenes for bank-wise navigation of the clip launcher slots
                 that are associated with the track selection
 * @return {CursorTrack} an object representing the currently selected arranger track (in the future also multiple tracks).
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.createCursorTrack = function(name, numSends, numScenes) {};

/**
 * Returns a scene bank with the given number of scenes.<br/>
 * 
 * A scene bank can be seen as a fixed-size window onto the list of scenes in the current document,
 * that can be scrolled in order to access different parts of the scene list.
 * For example a scene bank configured for 8 scenes can show scene 1-8, 2-9, 3-10 and so on.<br/>
 * 
 * The idea behind the `bank pattern` is that hardware typically is equipped with a fixed amount of channel
 * strips or controls, for example consider a mixing console with 8 channels, but Bitwig Studio documents contain a
 * dynamic list of scenes, most likely more scenes than the hardware can control simultaneously. The scene bank
 * returned by this function provides a convenient interface for controlling which scenes are currently shown on
 * the hardware.<br/>
 *
 * @param {int} numScenes the number of scenes spanned by the track bank
 * @return {SceneBank} an object for bank-wise navigation of scenes
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.createSceneBank = function(numScenes) {};

/**
 * Returns an object that represents the cursor controller in controllers selections made by the user in Bitwig Studio.
 * Calling this method is equal to the following code:
 * {@code
 * var cursorTrack = createArrangerCursorTrack(numSends, numScenes);
 * var cursorController = cursorTrack.createCursorController();
 * }
 * To create a custom controller selection that is not connected to the main controller selection in the user interface,
 * call {@link Track#createCursorController(String) cursorTrack.createCursorController(String name)}.
 *
 * @return {CursorController} an object representing the currently selected controller.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Host.prototype.createEditorCursorController = function() {};

/**
 * Returns an object that represents the cursor controller in controllers selections made by the user in Bitwig Studio.
 * Calling this method is equal to the following code:
 * {@code
 * var cursorTrack = createArrangerCursorTrack(numSends, numScenes);
 * var cursorController = cursorTrack.createCursorController();
 * }
 * To create a custom controller selection that is not connected to the main controller selection in the user interface,
 * call {@link Track#createCursorController(String) cursorTrack.createCursorController(String name)}.
 *
 * @param {int} numSends the number of sends that are simultaneously accessible in nested channels.
 * @return {CursorController} an object representing the currently selected controller.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1.6
 */
Host.prototype.createEditorCursorController = function(numSends) {};

/**
 * Returns a clip object that represents the cursor of the launcher clip selection. The gridWidth and gridHeight
 * parameters specify the grid dimensions used to access the note content of the clip.
 *
 * @param {int} gridWidth the number of steps spanned by one page of the note content grid.
 * @param {int} gridHeight the number of keys spanned by one page of the note content grid.
 * @return {Clip} an object representing the currently selected cursor clip
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createCursorClip = function(gridWidth, gridHeight) {};

/**
 * Returns an object that is used to define a bank of custom user controls. These controls are available to the user
 * for free controller assignments and are typically used when bank-wise navigation is inconvenient.
 *
 * @param {int} numControllers the number of controls that are available for free assignments
 * @return {UserControlBank} An object that represents a set of custom user controls.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createUserControls = function(numControllers) {};

/**
 * Schedules the given callback function for execution after the given delay.
 * For timer applications call this method once initially and then from within the callback function.
 *
 * @param {function} callback the callback function that will be called
 * @param {Object[]} args that array of arguments that gets passed into the callback function, may be `null`
 * @param {long} delay the duration after which the callback function will be called in milliseconds
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.scheduleTask = function(callback, args, delay) {};

/**
 * Returns the latest supported API version of the host application.
 *
 * @return {int} the latest supported API version of the host application
 * @since Bitwig Studio 1.0
 */
Host.prototype.getHostApiVersion = function() {};

/**
 * Returns the vendor of the host application.
 *
 * @return {string} the vendor of the host application
 * @since Bitwig Studio 1.0
 */
Host.prototype.getHostVendor = function() {};

/**
 * Returns the product name of the host application.
 *
 * @return {string} the product name of the host application
 * @since Bitwig Studio 1.0
 */
Host.prototype.getHostProduct = function() {};

/**
 * Returns the version number of the host application.
 *
 * @return {string} the version number of the host application
 * @since Bitwig Studio 1.0
 */
Host.prototype.getHostVersion = function() {};

/**
 * Indicates if the host platform is Windows.
 *
 * @return {boolean} `true` if the host platform is Windows, `false` otherwise.
 * @since Bitwig Studio 1.0
 */
Host.prototype.platformIsWindows = function() {};

/**
 * Indicates if the host platform is Apple Mac OS X.
 *
 * @return {boolean} `true` if the host platform is Mac, `false` otherwise.
 * @since Bitwig Studio 1.0
 */
Host.prototype.platformIsMac = function() {};

/**
 * Indicates if the host platform is Linux.
 *
 * @return {boolean} `true` if the host platform is Linux, `false` otherwise.
 * @since Bitwig Studio 1.0
 */
Host.prototype.platformIsLinux = function() {};

/**
 * Prints the given string in the control surface console window.
 * The console window can be opened in the view menu of Bitwig Studio.
 *
 * @param {string} s the string to be printed
 * @since Bitwig Studio 1.0
 */
Host.prototype.println = function(s) {};

/**
 * Prints the given string in the control surface console window using a text style that highlights the string
 * as error. The console window can be opened in the view menu of Bitwig Studio.
 *
 * @param {string} s the error string to be printed
 * @since Bitwig Studio 1.0
 */
Host.prototype.errorln = function(s) {};

/**
 * Shows a temporary text overlay on top of the application GUI, that will fade-out after a short interval.
 * If the overlay is already shown, it will get updated with the given text.
 *
 * @param {string} text the text to be shown
 * @since Bitwig Studio 1.0
 */
Host.prototype.showPopupNotification = function(text) {};

/**
 * Opens a TCP (Transmission Control Protocol) host socket for allowing network connections
 * from other hardware and software.
 *
 * @param {string} name a meaningful name that describes the purpose of this connection.
 * @param {int} defaultPort the port that should be used for the connection. If the port is already in use, then another
                   port will be used. Check {@link RemoteSocket#getPort()} on the returned object to be sure.
 * @return {RemoteSocket} the object that represents the socket
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.createRemoteConnection = function(name, defaultPort) {};

/**
 * Connects to a remote TCP (Transmission Control Protocol) socket.
 *
 * @param {string} host the host name or IP address to connect to.
 * @param {int} port the port to connect to
 * @param {function} callback the callback function that gets called when the connection gets established. A single
                {@link RemoteConnection} parameter is passed into the callback function.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Host.prototype.connectToRemoteHost = function(host, port, callback) {};

/**
 * Sends a UDP (User Datagram Protocol) packet with the given data to the specified host.
 *
 * @param {string} host the destination host name or IP address
 * @param {int} port the destination port
 * @param {byte[]} data the data to be send. When creating a numeric byte array in JavaScript, the byte values must be
            signed (in the range -128..127).
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0.11
 */
Host.prototype.sendDatagramPacket = function(host, port, data) {};

/**
 * Adds an observer for incoming UDP (User Datagram Protocol) packets on the selected port.
 *
 * @param {string} name a meaningful name that describes the purpose of this observer.
 * @param {int} port the port that should be used
 * @param {function} callback the callback function that gets called when data arrives. The function receives a single
                parameter that contains the data byte array.
 * @return {boolean} {@true} if was possible to bind the port, false otherwise
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0.11
 */
Host.prototype.addDatagramPacketObserver = function(name, port, callback) {};
