/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2014-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {State} from 'zb/device/interfaces/i-video';
import {error, debug} from 'zb/console/console';
import AbstractVideo from 'zb/device/abstract-video';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import ViewPort from './view-port';


/**
 */
export class Video extends AbstractVideo {
	/**
	 * @param {HTMLElement} videoContainer
	 */
	constructor(videoContainer) {
		super(videoContainer);

		debug('Video: creating');

		/**
		 * @type {ViewPort}
		 * @protected
		 */
		this._viewport;

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
		 *     position: number,
		 *     durationDetected: boolean,
		 *     metadataDetected: boolean
		 * }}
		 * @protected
		 */
		this._pollingData = {
			position: 0,
			durationDetected: false,
			metadataDetected: false
		};

		/**
		 * @type {State}
		 * @protected
		 */
		this._state = State.INITED;

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

		debug('Video: done creating');
	}

	/**
	 * @override
	 */
	play(url, opt_startFrom) {
		debug(`Video: playing ${url}`);

		this._initVideoObject(url);

		if (opt_startFrom) {
			this._startPosition = opt_startFrom;
			debug(`Video: playback started from ${opt_startFrom}ms`);
		} else {
			this._startPosition = NaN;
			debug('Video: playback started');
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

		this._state = State.STOPPED;
		this._fireEvent(this.EVENT_STOP);

		this._pollingStop();
	}

	/**
	 * @override
	 */
	setVolume(value) {
		throw new UnsupportedFeature('Volume setting');
	}

	/**
	 * @override
	 */
	getVolume() {
		throw new UnsupportedFeature('Volume getting');
	}

	/**
	 * @override
	 */
	getMuted() {
		throw new UnsupportedFeature('Mute state getting');
	}

	/**
	 * @override
	 */
	setMuted(value) {
		throw new UnsupportedFeature('Mute state setting');
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
			error('Video::destroy', err);
		}
	}

	/**
	 * @override
	 */
	forward() {
		if (!this._object) {
			return false;
		}

		this._object.play(16);

		return true;
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
			case PlayState.STOPPED:
				this._state = State.STOPPED;
				break;
			case PlayState.BUFFERING:
				this._state = State.BUFFERING;
				break;
			case PlayState.PLAYING:
				this._state = State.PLAYING;
				break;
			case PlayState.PAUSED:
				this._state = State.PAUSED;
				break;
			case PlayState.CONNECTING:
				this._state = State.LOADING;
				break;
			case PlayState.FINISHED:
				this._state = State.STOPPED;
				break;
			case PlayState.ERROR:
				this._state = State.ERROR;
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
		}

		return '';
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
	 * @override
	 * @return {ViewPort}
	 */
	_createViewPort(containerRect) {
		return new ViewPort(containerRect, this._object);
	}

	/**
	 * @return {LGVideoObject}
	 * @protected
	 */
	_createVideoObject() {
		const videoObject = /** @type {LGVideoObject} */ (document.createElement('object'));
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
		debug('Video: object created');

		this._videoContainer.appendChild(this._object);
		debug('Video: object appended');

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
			if (state === State.BUFFERING) {
				// Substitution of old event to skip seek events
				oldState = State.INITED;
				this.setPosition(this._startPosition);
			} else if (state === State.PLAYING) {
				this._state = State.BUFFERING;
				this._startPosition = NaN;

				return;
			}
		}

		debug(`Video: state changed from ${oldState} to ${state}`);

		this._fireEvent(this.EVENT_STATE_CHANGE, state, oldState);
		let event = this._matchStateToEvent(state);

		if (this._object.playState === PlayState.FINISHED) {
			event = this.EVENT_ENDED;
		}

		if (event) {
			this._fireEvent(event);
		}
	}

	/**
	 * Get event name that should be fired when video changes it's state to *state*
	 * @param {State} state
	 * @return {string|undefined}
	 * @protected
	 */
	_matchStateToEvent(state) {
		const matchedStates = {
			[State.PLAYING]: this.EVENT_PLAY,
			[State.PAUSED]: this.EVENT_PAUSE,
			[State.STOPPED]: this.EVENT_STOP,
			[State.BUFFERING]: this.EVENT_BUFFERING,
			[State.ERROR]: this.EVENT_ERROR
		};

		return matchedStates[state];
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
			if (duration || position || this.getState() === State.PLAYING) {
				this._pollingData.metadataDetected = true;
				this._fireEvent(this.EVENT_LOADED_META_DATA);
			}
		}

		// Schedule next poll
		this._pollingTimeout = setTimeout(this._pollingTick, this._pollingTime);
	}
}


/**
 * @enum {number}
 */
export const PlayState = {
	STOPPED: 0,
	PLAYING: 1,
	PAUSED: 2,
	CONNECTING: 3,
	BUFFERING: 4,
	FINISHED: 5,
	ERROR: 6
};
