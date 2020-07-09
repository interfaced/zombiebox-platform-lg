# 2.1.0 (09.07.2020)
Compatibility update to ZombieBox 2.7

# 2.0.0 (18.06.2019)
Compatibility update to ZombieBox 2.0 

# 2.0.0-alpha.2 (21.03.2019)

## Fixes
* Updated zb-platform-test to 2.0
* Migrated from deleted ZombieBox APIs

# 2.0.0-alpha.1 (13.02.2019)

Platform code migrated to ECMAScript modules.

# 1.0.0 (31.01.2019)

## Fixes
* **#6336** Workaround for `document.implementation.createHTMLDocument` crash on 4.0 and 4.5
* **#6294** Fix application freeze cause by mouse navigation

## Features
* Integrated platform testing suite
* **#6337** Added `Device.isLH57` methog

# v0.5.0 (26.01.2018)

## Features
* **#6167** Throw error `zb.device.errors.UnsupportedFeature` for unsupported platform feature. **[BREAKING]**

# v0.4.0 (23.05.2017)

## Features
* **#6062** Implemented getters for launch params and environment.
* **#6084** Implemented getting locale. See `Info#locale`.
* **#6141** Removed method `Device#setTextSelectionEnabled.` **[BREAKING]**
* Added blacklist to externs.

# v0.3.1 (07.03.2017)

## Fixes
* **#5999** Fix aspect-ratio namespace

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
