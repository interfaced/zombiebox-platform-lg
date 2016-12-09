/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.lg.ViewPort');
goog.require('zb.device.AspectRatio');
goog.require('zb.device.ViewPort');



/**
 * @implements {zb.device.IViewPort}
 */
zb.device.platforms.lg.ViewPort = class extends zb.device.ViewPort {
	/**
	 * @param {zb.device.ViewPort.Rect} containerRect
	 * @param {LGVideoObject} videoObject
	 */
	constructor(containerRect, videoObject) {
		super(containerRect);

		/**
		 * @type {LGVideoObject}
		 * @protected
		 */
		this._videoObject = /** @type {LGVideoObject} */(videoObject);
	}

	/**
	 * @override
	 */
	hasFeatureAspectRatio() {
		return false;
	}

	/**
	 * @override
	 */
	isAspectRatioSupported(ratio) {
		return false;
	}

	/**
	 * @override
	 */
	updateViewPort() {
		this._setViewPort(this.getCurrentArea());
	}

	/**
	 * @param {LGVideoObject} videoObject
	 */
	setVideoObject(videoObject) {
		this._videoObject = videoObject;
	}

	/**
	 * @override
	 */
	_setViewPort(screenArea) {
		this._videoObject.style.marginTop = `${screenArea.y}px`;
		this._videoObject.style.marginLeft = `${screenArea.x}px`;
		this._videoObject.width = screenArea.width.toString();
		this._videoObject.height = screenArea.height.toString();
	}
};
