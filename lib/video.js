/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
goog.provide('zb.device.platforms.lg.Video');
goog.require('zb.device.AbstractVideo');
goog.require('zb.device.IVideo');
goog.require('zb.device.platforms.lg.ViewPort');
goog.require('zb.html');



/**
 * @implements {zb.device.IVideo}
 */
zb.device.platforms.lg.Video = class extends zb.device.AbstractVideo {
	/**
	 * @param {HTMLElement} videoContainer
	 */
	constructor(videoContainer) {
		super(videoContainer);

		zb.console.debug('zb.device.platforms.lg.Video: creating');


		/**
		 * @type {HTMLElement}
		 * @protected
		 */
		this._videoContainer = videoContainer;


		/**
		 * @type {number}
		 * @protected
		 */
		this._pollingTime = 1000;


		/**
		 * @type {number} Timeout ID
		 * @protected
		 */
		this._pollingTimeout;


		/**
		 * @type {{
		 *      position: number,
		 *      durationDetected: boolean,
		 *      metadataDetected: boolean
		 * }}
		 * @protected
		 */
		this._pollingData = {
			position: 0,
			durationDetected: false,
			metadataDetected: false
		};


		/**
		 * @type {zb.device.IVideo.State}
		 * @protected
		 */
		this._state = zb.device.IVideo.State.INITED;


		/**
		 * @type {zb.device.platforms.lg.ViewPort}
		 * @protected
		 */
		this._viewport;


		/**
		 * @type {number}
		 * @protected
		 */
		this._startPosition = NaN;


		/**
		 * @type {LGVideoObject}
		 * @protected
		 */
		this._object = this._createVideoObject();

		this._initViewPort();

		this._onStateChange = this._onStateChange.bind(this);
		this._pollingTick = this._pollingTick.bind(this);
		this._initVideoObject('');

		zb.console.debug('zb.device.platforms.lg.Video: done creating');
	}

	/**
	 * @override
	 */
	play(url, opt_startFrom) {
		zb.console.debug(`zb.device.platforms.lg.Video: playing ${url}`);

		this._initVideoObject(url);

		if (opt_startFrom) {
			this._startPosition = opt_startFrom;
			zb.console.debug(`zb.device.platforms.lg.Video: playback started from ${opt_startFrom}ms`);
		} else {
			this._startPosition = NaN;
			zb.console.debug('zb.device.platforms.lg.Video: playback started');
		}

		this._object.play();
	}

	/**
	 * @override
	 */
	pause() {
		if (this._object) {
			this._object.play(0);
		}
	}

	/**
	 * @override
	 */
	resume() {
		if (this._object) {
			this._object.play();
		}
	}

	/**
	 * @override
	 */
	stop() {
		if (this._object) {
			this._object.stop();
		}

		this._state = zb.device.IVideo.State.STOPPED;
		this._fireEvent(this.EVENT_STOP);

		this._pollingStop();
	}

	/**
	 * @override
	 */
	setVolume(value) {
		zb.console.warn('zb.device.platforms.lg.Video: volume changing is not supported');
	}

	/**
	 * @override
	 */
	getVolume() {
		zb.console.warn('zb.device.platforms.lg.Video: volume changing is not supported');
		return 0;
	}

	/**
	 * @override
	 */
	getMuted() {
		zb.console.warn('zb.device.platforms.lg.Video: volume changing is not supported');
		return true;
	}

	/**
	 * @override
	 */
	setMuted(value) {
		zb.console.warn('zb.device.platforms.lg.Video: volume changing is not supported');
	}

	/**
	 * @override
	 */
	destroy() {
		try {
			// Stop position polling interval
			this._pollingStop();
			// Remove from DOM
			this._removeVideoObject();
		} catch (err) {
			zb.console.error('zb.device.platforms.lg.Video::destroy', err);
		}
	}

	/**
	 * @override
	 */
	forward() {
		if (!this._object) {
			return;
		}

		this._object.play(16);
	}

	/**
	 * @override
	 */
	rewind() {
		if (!this._object) {
			return false;
		}

		this._object.play(-16);
		return true;
	}

	/**
	 * @override
	 */
	getPlaybackRate() {
		if (!this._object) {
			return 1;
		}

		return this._object.speed;
	}

	/**
	 * @override
	 */
	setPlaybackRate(rate) {
		if (this._object) {
			this._object.play(rate);
		}
	}

	/**
	 * @override
	 */
	getDuration() {
		if (!this._object) {
			return 0;
		}

		return parseInt(this._object.playTime, 10);
	}

	/**
	 * @override
	 */
	getState() {
		if (!this._object) {
			return this._state;
		}

		switch (this._object.playState) {
			case zb.device.platforms.lg.Video.PlayState.STOPPED:
				this._state = zb.device.IVideo.State.STOPPED;
				break;
			case zb.device.platforms.lg.Video.PlayState.BUFFERING:
				this._state = zb.device.IVideo.State.BUFFERING;
				break;
			case zb.device.platforms.lg.Video.PlayState.PLAYING:
				this._state = zb.device.IVideo.State.PLAYING;
				break;
			case zb.device.platforms.lg.Video.PlayState.PAUSED:
				this._state = zb.device.IVideo.State.PAUSED;
				break;
			case zb.device.platforms.lg.Video.PlayState.CONNECTING:
				this._state = zb.device.IVideo.State.LOADING;
				break;
			case zb.device.platforms.lg.Video.PlayState.FINISHED:
				this._state = zb.device.IVideo.State.STOPPED;
				break;
			case zb.device.platforms.lg.Video.PlayState.ERROR:
				this._state = zb.device.IVideo.State.ERROR;
				break;
		}

		return this._state;
	}

	/**
	 * @override
	 */
	getUrl() {
		if (this._object && this._object.data) {
			return this._object.data;
		} else {
			return '';
		}
	}

	/**
	 * @override
	 */
	getPosition() {
		if (!this._object) {
			return 0;
		}
		return parseInt(this._object.playPosition, 10);
	}

	/**
	 * @override
	 */
	setPosition(value) {
		if (this._object) {
			this._object.seek(value);
		}
	}

	/**
	 * @param {number=} opt_time
	 */
	setPollingTime(opt_time = 1000) {
		this._pollingTime = opt_time;
		this._pollingRestart();
	}

	/**
	 * @param {zb.device.ViewPort.Rect} containerRect
	 * @return {zb.device.platforms.lg.ViewPort}
	 * @override
	 */
	_createViewPort(containerRect) {
		return new zb.device.platforms.lg.ViewPort(containerRect, this._object);
	}

	/**
	 * @return {LGVideoObject}
	 * @protected
	 */
	_createVideoObject() {
		const videoObject = /** @type {LGVideoObject} */(document.createElement('object'));
		videoObject.setAttribute('type', 'application/x-netcast-av');
		videoObject.setAttribute('autoStart', 'true');
		videoObject.setAttribute('downloadable', 'false');
		return videoObject;
	}

	/**
	 * @protected
	 */
	_removeVideoObject() {
		if (this._object && this._object.parentNode) {
			this._object.parentNode.removeChild(this._object);
		}

		this._object = null;
	}

	/**
	 * @param {string} url
	 * @protected
	 */
	_initVideoObject(url) {
		this._removeVideoObject();

		this._object = this._createVideoObject();
		this._object.setAttribute('data', url);
		this._object.onPlayStateChange = this._onStateChange.bind(this);
		zb.console.debug('zb.device.platforms.lg.Video: object created');

		this._videoContainer.appendChild(this._object);
		zb.console.debug('zb.device.platforms.lg.Video: object appended');

		this._viewport.setVideoObject(this._object);
		this._viewport.updateViewPort();

		this._pollingRestart();
	}

	/**
	 * @protected
	 */
	_onStateChange() {
		let oldState = this._state;
		const state = this.getState();

		if (state === oldState) {
			return;
		}

		if (!isNaN(this._startPosition)) {
			if (state === zb.device.IVideo.State.BUFFERING) {
				// Substitution of old event to skip seek events
				oldState = zb.device.IVideo.State.INITED;
				this.setPosition(this._startPosition);
			} else if (state === zb.device.IVideo.State.PLAYING) {
				this._state = zb.device.IVideo.State.BUFFERING;
				this._startPosition = NaN;
				return;
			}
		}

		zb.console.debug(`zb.device.platforms.lg.Video: state changed from ${oldState} to ${state}`);

		this._fireEvent(this.EVENT_STATE_CHANGE, state, oldState);
		let event = this._matchStateToEvent(state);

		if (this._object.playState === zb.device.platforms.lg.Video.PlayState.FINISHED) {
			event = this.EVENT_ENDED;
		}

		if (event) {
			this._fireEvent(event);
		}
	}

	/**
	 * @protected
	 */
	_pollingRestart() {
		this._pollingStop();
		this._pollingData = {
			position: 0,
			durationDetected: false,
			metadataDetected: false
		};
		this._pollingTimeout = setTimeout(this._pollingTick, this._pollingTime);
	}

	/**
	 * @protected
	 */
	_pollingStop() {
		if (!isNaN(this._pollingTimeout)) {
			clearTimeout(this._pollingTimeout);
		}
		this._pollingTimeout = NaN;
	}

	/**
	 * @protected
	 */
	_pollingTick() {
		let duration = NaN;
		if (!this._pollingData.durationDetected) {
			duration = this.getDuration();
			if (duration) {
				this._pollingData.durationDetected = true;
				this._fireEvent(this.EVENT_DURATION_CHANGE, duration);
			}
		}

		const position = this.getPosition();
		if (this._pollingData.position !== position) {
			this._pollingData.position = position;
			this._fireEvent(this.EVENT_TIME_UPDATE, position);
		}

		if (!this._pollingData.metadataDetected) {
			if (duration || position || this.getState() === zb.device.IVideo.State.PLAYING) {
				this._pollingData.metadataDetected = true;
				this._fireEvent(this.EVENT_LOADED_META_DATA);
			}
		}

		// schedule next poll
		this._pollingTimeout = setTimeout(this._pollingTick, this._pollingTime);
	}
};


/**
 * @enum {number}
 */
zb.device.platforms.lg.Video.PlayState = {
	STOPPED: 0,
	PLAYING: 1,
	PAUSED: 2,
	CONNECTING: 3,
	BUFFERING: 4,
	FINISHED: 5,
	ERROR: 6
};
