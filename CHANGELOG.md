# v0.3.0 (09.12.2016)

## Features
* **#5041** Added factory method `zb.device.platforms.lg.factory.createDevice` for creating Device instances.
  All global dependencies are now located in factory method.
* **#5041** All `*.es6` files renamed to `*.js`.
* **#5447** Added methods for getting status of highlighted element on the page and enabling/disabling it:
  `Device#setTextSelectionEnabled`, `Device#getTextSelectionEnabled`.
* **#5447** Removed method `Device#is2010Model`. **[BREAKING]**
* **#5447** Added method `Info#getDeviceYear`.

## Fixes
* **#5517** Added support of `EVENT_LOADED_META_DATA`.

## Improvements
* **#5447** Added warning alert, when you get current state of volume or changing it.
* **#5517** Updated logic of emitting `EVENT_TIME_UPDATE`. 

# v0.2.0 (27.07.16)

## Features
* **#3994** Added ViewPort class for managing display area size and aspect ratio.
* **#4245** Implemented getting current video url.
* **#3994** LG LH57 (simplified NetCast) support.
* **#4419** Rename abstract Video class (`zb.device.Video`) to AbstractVideo (`zb.device.AbstractVideo`).
* **#4492** Transpiled client-side files to ES6.

## Improvements
* **#4315** Removed `_createViewPort()` call from Video constructor.
* **#4500** Move superclass constructor calls to the beginning of child constructors.
