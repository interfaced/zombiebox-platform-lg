/**
 * Source:
 * http://developer.lgappstv.com/TV_HELP/index.jsp?topic=%2Flge.tvsdk.developing.book%2Fhtml%2FAPI%2FAPI%2FMethods.htm
 */


/**
 * SDK version: 1.5 or higher
 *
 * The NetCast Platform provides a proprietary API, ‘window.NetCastExit()’, to implement the exit function to AV.
 * A JavaScript application can use this API for users to exit or quit the application to AV.
 *
 * Note:
 * Since LG Smart TV’s UX Guideline is changed, we do not recommend to use this API anymore.
 * When an application is closed, you must use the window.NetCastBack() API to go back to the previous menu.
 */
function NetCastExit() {}


/**
 * SDK version: 1.5 or higher
 *
 * The NetCast Platform provides a proprietary API, ‘window.NetCastBack()’,
 * to implement the back function to the previous NetCast menu.
 * A JavaScript application can use this API for users to move back to previous NetCast menu.
 */
function NetCastBack() {}


/**
 * SDK version: 1.5 or higher
 *
 * It is recommended that developers provide a “loading” icon so that users are provided
 * with an indication of the latency of data downloading from a server.
 * Developers can implement this feature using JavaScript, however, it may not be possible do this,
 * as there would not be any JavaScript running while a HTML page is loading.
 * The NetCast Platform supports a proprietary API, ‘window.NetCastPageLoadingIcon()’,
 * to provide the web application’s own page loading animation function.
 * Developers can use this API during HTML page loading.
 *
 * Note:
 * This function will be applied while the next page is loaded.
 * @param {string} control 'enabled' or 'disabled'
 */
function NetCastSetPageLoadingIcon(control) {}


/**
 * SDK version: 1.5 or higher
 * Developers may want to set the default aspect ratio for users
 * to view full screen video with the correct aspect ratio.
 * The NetCast Platform allows developers to set the default aspect ratio
 * by using the ‘window.NetCastSetDefaultAspectRatio()’ API.
 * The setting only applies if the video runs in full screen mode, 1280 x 720. This API takes a string type of argument.
 * The list of arguments and their behaviors are listed in the following table and figure.
 *
 * Note:
 * This API call applies only once for a whole application life cycle.
 * Second and subsequent calls will be ignored by the LG Browser automatically.
 * Therefore, it is recommended to locate the API call at the time of launching the application.
 * If the application is launched again after exiting, the API will be enabled again.
 *
 * Parameters:
 * original: view original video image with original correct aspect ratio
 *      (TV screen may not befilled with video image)
 * zoom: fill the full TV screen with original aspect ratio video
 *      (there may be some cropping of the original video image)
 * full: fill the full TV screen with video
 *      (aspect ratio may be distorted, but with no loss of original video image)
 *
 * @param {string} control 'original' or 'zoom' or 'full'
 */
function NetCastSetDefaultAspectRatio(control) {}


/**
 * SDK version: 1.5 or higher
 *
 * The NetCast Platform provides a ‘QMENU’ (Quick Menu for Audio and Video Adjustment) for users
 * to setup the aspect ratio for full screen video, picture quality adjustment and audio adjustment.
 * The QMENU can be launched by users when playing video in full screen mode
 * by pressing the ‘QMENU’ button on the remote control. This only works in full screen video mode.
 *
 * Note, it is possible for users to operate a LG Smart TV application using the Magic Remote,
 * the pointing device of the NetCast Platform. There is no ‘QMENU’ button on the Magic Remote, Therefore,
 * it is strongly recommended that the LG Smart TV developer implements a graphical user interface
 * to launch the QMENU over a full screen video.
 *
 * The NetCast Platform thus provides a proprietary API, ‘window.NetCastLaunchQMENU()’ to enable this feature.
 * If this API is called then the LG Smart TV will overlay the QMENU on the full screen video.
 * Developers can launch the QMENU over a full screen video using this API.
 */
function NetCastLaunchQMENU() {}


/**
 * SDK version: 1.5 or higher
 *
 * The NetCast Platform provides a ‘RATIO’ (Aspect Ratio Control) menu for users to setup the aspect ratio
 * of a full screen video. The RATIO menu can be launched by a user while playing a video in a full screen mode
 * by pressing the ‘RATIO’ button on the remote control. This only works in full screen video mode.
 *
 * Note, it is possible for users to operate a LG Smart TV application using the Magic Remote,
 * the pointing device of NetCast Platform. There is no ‘RATIO’ button on the Magic Remote, therefore,
 * it is strongly recommended that the LG Smart TV developer implements a graphical user interface
 * to launch the RATIO menu over a full screen video.
 *
 * The NetCast Platform thus provides a proprietary API ‘window.NetCastLaunchRATIO()’ to enable this feature.
 * If this API is called then the LG Smart TV will overlay the RATIO menu on the full screen video.
 * Developers can launch the RATIO over a full screen video using this API.
 */
function NetCastLaunchRATIO() {}


/**
 * SDK version: 1.5 or higher
 *
 * This API can be used by an LG Smart TV developer to deactivate the Magic Remote and its pointer.
 * Refer to the section ‘Input Device’ and ‘userAgent String’
 * in Developing > Developing Web App > App Development Guide section in this Library,
 * and supportMouse, mouseon, mouseoff, and window.NetCastGetMouseOnOff() for more information about the Magic Remote
 * and its status related event and API.
 *
 * Developers can deactivate the Magic Remote and its pointer using this API.
 * In the following example, the “time” parameter is the time value after which the deactivation is applied.
 * This parameter is processed to “second” level accuracy. For example,
 * the Magic Remote pointer would disappear 5 seconds after calling “window.NetCastMouseOff(5);”.
 *
 * Note:
 * In NetCast 3.0 or higher, the mouse gets deactivated when the halt of the mouse movement continues for 3 seconds.
 * Therefore, this function is supported only for backward compatibility and it does not do anything.
 * In other words, window.NetCastMouseOff function is ONLY activated in NetCast 2.0 (the model of 2011).
 *
 * @param {number} time .Time value after which the deactivation is applied (in second)
 */
function NetCastMouseOff(time) {}


/**
 * SDK version: 3.0 or higher
 *
 * This API can be used by an LG Smart TV developer to get the on or off status of the Magic Remote.
 * Refer to the section ‘Input Device’ and ‘userAgent String’
 * in Developing > Developing Web App > App Development Guide section in this Library,
 * and supportMouse, mouseon, mouseoff, and window.NetCastGetMouseOff(time) for more information
 * about the Magic Remote and its status related event and API.
 *
 * Returning value: 'on' or 'off'
 * @return {string}
 */
function NetCastGetMouseOnOff() {}


/**
 * SDK version: 3.0 or higher
 *
 * This API can be used by an LG Smart TV developer to set the auto mouse off property.
 * LG Smart TV turns off pointing feature automatically,
 * if a user does not use the pointer of a mouse or Magic Remote for a specific time.
 * However, some apps need to maintain the pointer at the specific place for a specific time.
 * In this case, ‘NetCastSetAutoMouseOff’ API protects the mouse not to be turned off automatically.
 * Even when the mouse is set not to be turned off automatically,
 * the pointing feature becomes off when a user presses the key of a common remote control.
 *
 * @param {string} control .'enable' or 'disable'
 */
function NetCastSetAutoMouseOff(control) {}


/**
 * SDK version: 1.5 or higher
 *
 * This API can be used by an LG Smart TV developer to get the total memory size used by the web application.
 * Returns the memory size used in the application.
 *
 * @return {number}
 */
function NetCastGetUsedMemorySize() {}


/**
 * SDK version: 3.0 or higher
 *
 * The NetCast Platform provides a proprietary API, ‘window.NetCastSystemKeyboardVisible’
 * to use the system keyboard of NetCast Platform.
 * To use a system keyboard at an application, set the input parameter as TRUE.
 * To use the JavaScript keyboard provided by an application, set the input parameter as FALSE.
 * If an application does not call this API, the JavaScript keyboard provided by an application is assumed.
 * The NetCast Platform supports the system keyboard since the NetCast 4.0 (2013)
 *
 * @param {boolean} isVisible
 */
function NetCastSystemKeyboardVisible(isVisible) {}
