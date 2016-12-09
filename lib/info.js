/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.lg.Info');
goog.require('zb.device.Info');



/**
 * @implements {zb.device.IInfo}
 */
zb.device.platforms.lg.Info = class extends zb.device.Info {
	/**
	 * @param {HTMLElement} pluginContainer
	 */
	constructor(pluginContainer) {
		super();

		/**
		 * @type {LGInfoPlugin}
		 * @protected
		 */
		this._plugin = /** @type {LGInfoPlugin} */(document.createElement('object'));
		this._plugin.setAttribute('type', 'application/x-netcast-info');

		pluginContainer.appendChild(this._plugin);
	}


	/**
	 * @return {number}
	 */
	getDeviceYear() {
		const userAgent = navigator.userAgent;
		const exp = /LG (NetCast|SimpleSmart)\.TV-(\d+)/;

		if (exp.test(userAgent)) {
			return parseInt(exp.exec(userAgent)[2], 10);
		}

		return NaN;
	}


	/**
	 * @override
	 */
	type() {
		return 'lg';
	}


	/**
	 * Returns string like '1.0.0.10'
	 * @override
	 */
	version() {
		return this._plugin.version;
	}


	/**
	 * @override
	 */
	manufacturer() {
		return 'LG Electronics';
	}


	/**
	 * Returns string like '32LM620T-ZE'
	 * @override
	 */
	model() {
		return this._plugin.modelName;
	}


	/**
	 * @override
	 */
	serialNumber() {
		return this._plugin.serialNumber;
	}


	/**
	 * @override
	 */
	softwareVersion() {
		return this._plugin.swVersion;
	}


	/**
	 * Returns string like '0x00000001'
	 * @override
	 */
	hardwareVersion() {
		return this._plugin.hwVersion;
	}


	/**
	 * @override
	 */
	osdResolutionType() {
		let resolution = zb.device.Resolution.HD;

		const resolutionMap = {
			0: [640, 480],
			1: [720, 576],
			2: [1280, 720],
			3: [1920, 1080],
			4: [1366, 768]
		};
		const screenSize = resolutionMap[this._plugin.osdResolution] || [window.outerWidth, window.outerHeight];
		const resolutions = this._getResolutionsByScreenSize(screenSize[0], screenSize[1]);
		if (resolutions.length) {
			resolution = resolutions[0];
		}

		return resolution;
	}


	/**
	 * @return {LGInfoPlugin}
	 */
	getInfoPlugin() {
		return this._plugin;
	}
};
