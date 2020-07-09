/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2014-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import AbstractInput from 'zb/device/abstract-input';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import Key from 'zb/device/input/key';


/**
 */
export default class Input extends AbstractInput {
	/**
	 * @param {LGInfoPlugin} infoPlugin
	 */
	constructor(infoPlugin) {
		super();

		/**
		 * @type {LGInfoPlugin}
		 * @protected
		 */
		this._infoPlugin = infoPlugin;
	}

	/**
	 * @override
	 */
	isPointingDeviceSupported() {
		return this._infoPlugin.supportMouse;
	}

	/**
	 * @override
	 */
	enablePointingDevice() {
		throw new UnsupportedFeature('Pointing device enabling');
	}

	/**
	 * @override
	 */
	disablePointingDevice(timeoutInSeconds = 0) {
		// eslint-disable-next-line new-cap
		return !!window.NetCastMouseOff && window.NetCastMouseOff(timeoutInSeconds);
	}

	/**
	 * @override
	 */
	_createKeysMap() {
		const keys = Key;
		const map = {};

		map[19] = keys.PAUSE;
		map[415] = keys.PLAY;
		map[413] = keys.STOP;
		map[412] = keys.REW;
		map[417] = keys.FWD;

		map[461] = keys.BACK;
		map[13] = keys.ENTER;

		map[457] = keys.INFO;

		map[33] = keys.PAGE_UP; // Page Up on attached remote keyboard.
		map[34] = keys.PAGE_DOWN; // Page Down on attached remote keyboard.

		map[403] = keys.RED;
		map[404] = keys.GREEN;
		map[405] = keys.YELLOW;
		map[406] = keys.BLUE;

		map[37] = keys.LEFT;
		map[39] = keys.RIGHT;
		map[38] = keys.UP;
		map[40] = keys.DOWN;

		map[48] = keys.DIGIT_0;
		map[49] = keys.DIGIT_1;
		map[50] = keys.DIGIT_2;
		map[51] = keys.DIGIT_3;
		map[52] = keys.DIGIT_4;
		map[53] = keys.DIGIT_5;
		map[54] = keys.DIGIT_6;
		map[55] = keys.DIGIT_7;
		map[56] = keys.DIGIT_8;
		map[57] = keys.DIGIT_9;

		return map;
	}

	/**
	 * @override
	 */
	_listenForPointingState() {
		super._listenForPointingState();

		// eslint-disable-next-line new-cap
		this._isPointingDeviceActive = !!window.NetCastGetMouseOnOff && window.NetCastGetMouseOnOff() === 'on';
		window.addEventListener('mouseon', this._setPointingStateActive);
		window.addEventListener('mouseoff', this._setPointingStateInactive);
	}
}
