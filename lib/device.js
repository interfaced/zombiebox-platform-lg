/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.lg.Device');
goog.require('zb.device.Device');
goog.require('zb.device.IDevice');
goog.require('zb.device.platforms.common.LocalStorage');
goog.require('zb.device.platforms.lg.Info');
goog.require('zb.device.platforms.lg.Input');
goog.require('zb.device.platforms.lg.Video');



/**
 * @implements {zb.device.IDevice}
 */
zb.device.platforms.lg.Device = class extends zb.device.Device {
	/**
	 * @param {HTMLElement} pluginContainer
	 * @param {HTMLElement} videoContainer
	 */
	constructor(pluginContainer, videoContainer) {
		super();


		/**
		 * @type {HTMLElement}
		 * @protected
		 */
		this._pluginContainer = pluginContainer;


		/**
		 * @type {HTMLElement}
		 * @protected
		 */
		this._videoContainer = videoContainer;


		/**
		 * @type {boolean}
		 * @protected
		 */
		this._isSelectionEnabled = true;


		/**
		 * @type {zb.device.platforms.lg.Info}
		 */
		this.info;


		/**
		 * @type {zb.device.platforms.lg.Input}
		 */
		this.input;


		/**
		 * @type {zb.device.platforms.common.LocalStorage}
		 */
		this.storage;

		this._bindMethods();

		// Certification requirement
		this.setTextSelectionEnabled(false);
	}


	/**
	 * @override
	 */
	init() {
		this.info = new zb.device.platforms.lg.Info(this._pluginContainer);
		this.input = new zb.device.platforms.lg.Input(this.info.getInfoPlugin());
		this.storage = new zb.device.platforms.common.LocalStorage();
		this._fireEvent(this.EVENT_READY);
	}


	/**
	 * @override
	 * @return {zb.device.platforms.lg.Video}
	 */
	createVideo() {
		return new zb.device.platforms.lg.Video(this._videoContainer);
	}


	/**
	 * @override
	 */
	exit() {
		if (window.NetCastBack) {
			window.NetCastBack();
		} else {
			window.NetCastExit();
		}
	}


	/**
	 * @override
	 */
	hasOSDAlphaBlendingFeature() {
		return true;
	}


	/**
	 * @override
	 */
	getIP() {
		return this.info.getInfoPlugin().net_ipAddress;
	}


	/**
	 * @override
	 */
	getMAC() {
		return this.info.getInfoPlugin().net_macAddress;
	}


	/**
	 * @return {boolean}
	 */
	getTextSelectionEnabled() {
		return this._isSelectionEnabled;
	}


	/**
	 * @param {boolean} value
	 */
	setTextSelectionEnabled(value) {
		if (this._isSelectionEnabled === value) {
			return;
		}

		this._isSelectionEnabled = value;
		var eventName = 'selectstart';
		if (value) {
			document.removeEventListener(eventName, this._onSelectStart, false);
		} else {
			document.addEventListener(eventName, this._onSelectStart, false);
		}
	}


	/**
	 * @return {boolean}
	 */
	isQMENUSupported() {
		return !!window.NetCastLaunchQMENU;
	}


	/**
	 * @return {boolean}
	 */
	launchQMENU() {
		if (this.isQMENUSupported()) {
			window.NetCastLaunchQMENU();
			return true;
		}
		return false;
	}


	/**
	 * @return {boolean}
	 */
	isAspectMenuSupported() {
		return !!window.NetCastLaunchRATIO;
	}


	/**
	 * @return {boolean}
	 */
	launchAspectMenu() {
		if (this.isAspectMenuSupported()) {
			window.NetCastLaunchRATIO();
			return true;
		}
		return false;
	}


	/**
	 * @protected
	 */
	_bindMethods() {
		this._onSelectStart = this._onSelectStart.bind(this);
	}


	/**
	 * @param {Event} e
	 * @return {boolean}
	 * @protected
	 */
	_onSelectStart(e) {
		e.preventDefault();
		return false;
	}

	/**
	 * @return {boolean}
	 */
	static detect() {
		const isNetCast = /LG NetCast\.TV/.test(navigator.userAgent);
		const isLH57 = /LG SimpleSmart\.TV/.test(navigator.userAgent);

		return isNetCast || isLH57;
	}
};
