/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2014-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import AbstractDevice from 'zb/device/abstract-device';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import LocalStorage from 'zb/device/common/local-storage';
import Info from './info';
import Input from './input';
import {Video} from './video';


/**
 */
export default class Device extends AbstractDevice {
	/**
	 * @param {HTMLElement} pluginContainer
	 * @param {HTMLElement} videoContainer
	 */
	constructor(pluginContainer, videoContainer) {
		super();

		/**
		 * @type {Info}
		 */
		this.info;

		/**
		 * @type {Input}
		 */
		this.input;

		/**
		 * @type {LocalStorage}
		 */
		this.storage;

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
	}

	/**
	 * @override
	 */
	init() {
		this.info = new Info(this._pluginContainer);
		this.input = new Input(this.info.getInfoPlugin());
		this.storage = new LocalStorage();

		// Let's squash a couple of nasty bugs for NetCast 4.0/4.5
		if (this.info.getDeviceYear() >= 2013) {
			// Usage of the native createHTMLDocument crashes an application
			document.implementation.createHTMLDocument = () => {
				const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
				doc.documentElement.appendChild(document.createElementNS('http://www.w3.org/1999/xhtml', 'body'));

				return doc;
			};

			// This workaround prevents freezing on a mouse moving or wheel scrolling while
			// its button is pressed for some time. It's remarkable that time of a freeze
			// depends on a time of pressing or a DOM depth - the more the button is pressed
			// or DOM is deep, the more a freeze time will be.
			document.body.addEventListener('mousedown', (e) => e.preventDefault(), false);
		}

		this._fireEvent(this.EVENT_READY);
	}

	/**
	 * @override
	 * @return {Video}
	 */
	createVideo() {
		return new Video(this._videoContainer);
	}

	/**
	 * @override
	 */
	exit() {
		if (window.NetCastBack) {
			// eslint-disable-next-line new-cap
			window.NetCastBack();
		} else {
			// eslint-disable-next-line new-cap
			window.NetCastExit();
		}
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
	 * @override
	 */
	setOSDOpacity(value) {
		throw new UnsupportedFeature('OSD opacity setting');
	}

	/**
	 * @override
	 */
	getOSDOpacity() {
		throw new UnsupportedFeature('OSD opacity getting');
	}

	/**
	 * @override
	 */
	setOSDChromaKey(chromaKey) {
		throw new UnsupportedFeature('OSD chroma key setting');
	}

	/**
	 * @override
	 */
	getOSDChromaKey() {
		throw new UnsupportedFeature('OSD chroma key getting');
	}

	/**
	 * @override
	 */
	removeOSDChromaKey() {
		throw new UnsupportedFeature('OSD chroma key removing');
	}

	/**
	 * @override
	 */
	getEnvironment() {
		throw new UnsupportedFeature('Environment getting');
	}

	/**
	 * @override
	 */
	getLaunchParams() {
		const query = window.location.search.substring(1);
		const queryTail = query.split('&').pop();

		if (queryTail) {
			try {
				return /** @type {Object} */ (JSON.parse(decodeURIComponent(queryTail)));
			} catch (e) {
				return {};
			}
		}

		return {};
	}

	/**
	 * @override
	 */
	hasOSDOpacityFeature() {
		return false;
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
	hasOSDChromaKeyFeature() {
		return false;
	}

	/**
	 * @override
	 */
	isUHDSupported() {
		return false;
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
			// eslint-disable-next-line new-cap
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
			// eslint-disable-next-line new-cap
			window.NetCastLaunchRATIO();

			return true;
		}

		return false;
	}

	/**
	 * @return {boolean}
	 */
	static isNetCast() {
		return /LG NetCast\.TV/.test(navigator.userAgent);
	}

	/**
	 * LH57 (and its derivatives LH55, LH56, and LH58) is a light-weighed version
	 * of NetCast with a smaller memory size and a smaller features support.
	 * @see http://webostv.developer.lge.com/application/files/6214/7908/7604/Smart_Tv_lh57_vs_NetCast.pdf
	 * @return {boolean}
	 */
	static isLH57() {
		return /LG SimpleSmart\.TV/.test(navigator.userAgent);
	}

	/**
	 * @return {boolean}
	 */
	static detect() {
		return Device.isNetCast() || Device.isLH57();
	}
}
