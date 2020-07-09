/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2014-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import AbstractInfo from 'zb/device/abstract-info';
import {findLargest, Resolution} from 'zb/device/resolutions';
import {div} from 'zb/html';
import Rect from 'zb/geometry/rect';


/**
 */
export default class Info extends AbstractInfo {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {LGInfoPlugin}
		 * @protected
		 */
		this._plugin = /** @type {LGInfoPlugin} */ (document.createElement('object'));
		this._plugin.setAttribute('type', 'application/x-netcast-info');

		const container = div('plugin-container');
		container.style.display = 'none';
		container.style.visibility = 'hidden';
		container.style.position = 'absolute';
		container.style.width = '0';
		container.style.height = '0';
		container.style.top = '100%';
		container.style.left = '100%';

		document.body.insertBefore(container, document.body.firstChild);

		container.appendChild(this._plugin);
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
	getPanelResolution() {
		return this.getOSDResolution();
	}

	/**
	 * @override
	 */
	getOSDResolution() {
		const resolutionMap = {
			0: [640, 480],
			1: [720, 576],
			2: [1280, 720],
			3: [1920, 1080],
			4: [1366, 768]
		};
		const screenSize = resolutionMap[this._plugin.osdResolution] || [window.outerWidth, window.outerHeight];

		return findLargest(new Rect({
			x0: 0,
			y0: 0,
			x1: screenSize[0],
			y1: screenSize[1]
		})) || Resolution.HD;
	}

	/**
	 * @return {LGInfoPlugin}
	 */
	getInfoPlugin() {
		return this._plugin;
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
	_getLocale() {
		return this._plugin.tvLanguage2;
	}
}
