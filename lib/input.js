/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.lg.Input');
goog.require('zb.device.Input');



zb.device.platforms.lg.Input = class extends zb.device.Input {
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

		const keys = zb.device.input.Keys;
		this._map[19] = keys.PAUSE;
		this._map[415] = keys.PLAY;
		this._map[413] = keys.STOP;
		this._map[412] = keys.REW;
		this._map[417] = keys.FWD;

		this._map[461] = keys.BACK;
		this._map[13] = keys.ENTER;

		this._map[457] = keys.INFO;

		this._map[33] = keys.PAGE_UP; //Page Up on attached remote keyboard.
		this._map[34] = keys.PAGE_DOWN; //Page Down on attached remote keyboard.

		this._map[403] = keys.RED;
		this._map[404] = keys.GREEN;
		this._map[405] = keys.YELLOW;
		this._map[406] = keys.BLUE;

		this._map[37] = keys.LEFT;
		this._map[39] = keys.RIGHT;
		this._map[38] = keys.UP;
		this._map[40] = keys.DOWN;

		this._map[48] = keys.DIGIT_0;
		this._map[49] = keys.DIGIT_1;
		this._map[50] = keys.DIGIT_2;
		this._map[51] = keys.DIGIT_3;
		this._map[52] = keys.DIGIT_4;
		this._map[53] = keys.DIGIT_5;
		this._map[54] = keys.DIGIT_6;
		this._map[55] = keys.DIGIT_7;
		this._map[56] = keys.DIGIT_8;
		this._map[57] = keys.DIGIT_9;
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
	pointingDeviceDisable(timeoutInSeconds = 0) {
		return !!window.NetCastMouseOff && window.NetCastMouseOff(timeoutInSeconds);
	}


	/**
	 * @override
	 */
	_listenForPointingState() {
		super._listenForPointingState();

		this._isPointingDeviceActive = !!window.NetCastGetMouseOnOff && window.NetCastGetMouseOnOff() === 'on';
		window.addEventListener('mouseon', this._setPointingStateActive);
		window.addEventListener('mouseoff', this._setPointingStateInactive);
	}
};
