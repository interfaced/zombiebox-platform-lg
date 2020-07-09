/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2014-2020, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import AbstractViewPort from 'zb/device/abstract-view-port';
import {ResolutionInfoItem} from 'zb/device/resolutions';


/**
 */
export default class ViewPort extends AbstractViewPort {
	/**
	 * @param {ResolutionInfoItem} panelResolution
	 * @param {ResolutionInfoItem} appResolution
	 * @param {LGVideoObject} videoObject
	 */
	constructor(panelResolution, appResolution, videoObject) {
		super(panelResolution, appResolution);

		/**
		 * @type {LGVideoObject}
		 * @protected
		 */
		this._videoObject = /** @type {LGVideoObject} */ (videoObject);
	}

	/**
	 * @override
	 */
	hasAspectRatioFeature() {
		return false;
	}

	/**
	 * @override
	 */
	hasAreaChangeFeature() {
		return true;
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
		const area = this.getCurrentArea();

		this._videoObject.style.marginTop = `${area.y0}px`;
		this._videoObject.style.marginLeft = `${area.x0}px`;
		this._videoObject.width = String(area.getSizeX());
		this._videoObject.height = String(area.getSizeY());
	}

	/**
	 * @param {LGVideoObject} videoObject
	 */
	setVideoObject(videoObject) {
		this._videoObject = videoObject;
	}
}
