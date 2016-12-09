/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */



/**
 * @extends {HTMLElement}
 */
class LGVideoObject {
	constructor() {
		/**
		 * @type {string}
		 */
		this.version;


		/**
		 * MIME type
		 * @type {string}
		 */
		this.type;


		/**
		 * Media URL
		 * @type {string}
		 */
		this.data;


		/**
		 * @type {string}
		 */
		this.width;


		/**
		 * @type {string}
		 */
		this.height;


		/**
		 * Duration of the currently playing media in milliseconds
		 * @type {string}
		 */
		this.playTime;


		/**
		 * Current playback position of currently playing media in milliseconds
		 * @type {string}
		 */
		this.playPosition;


		/**
		 * The play state of the currently playing media as enumerated number.
		 * @type {number}
		 */
		this.playState;


		/**
		 * @type {number}
		 */
		this.error;


		/**
		 * @type {boolean}
		 */
		this.autoStart;


		/**
		 * If the value of this property is true, the current media can be scanned (fast forward or rewind).
		 * If a media file has not been opened, the value of this property will be false.
		 * The media can be scanned only if media is indexed and delivered via the MMS protocol.
		 *
		 * @type {boolean}
		 */
		this.isScannable;


		/**
		 * @type {number}
		 */
		this.readyState;


		/**
		 * @type {number}
		 */
		this.speed;


		/**
		 * @type {number}
		 */
		this.bufferingProgress;


		/**
		 * @type {boolean}
		 */
		this.subtitleOn;


		/**
		 * @type {string}
		 */
		this.subtitle;


		/**
		 * @type {string}
		 */
		this.mode3D;
	}


	/**
	 * @param {number=} opt_speed The range of allowed values of speed is from -30.0 to 30.0
	 */
	play(opt_speed) {}


	/**
	 *
	 */
	stop() {}


	/**
	 *
	 */
	next() {}


	/**
	 *
	 */
	previous() {}


	/**
	 * For HTTP streaming this method only works if the server supports HTTP Range header and MMS.
	 * @param {number} position in milliseconds
	 */
	seek(position) {}


	/**
	 * @return {LGMediaInfo}
	 */
	mediaPlayInfo() {}


	/**
	 * @param {string} DrmServerURL URL for DRM server
	 */
	setWidevineDrmURL(DrmServerURL) {}


	/**
	 * @param {string} DeviceID Unique player device ID
	 */
	setWidevineDeviceID(DeviceID) {}


	/**
	 * @param {string} StreamID Unique stream ID
	 */
	setWidevineStreamID(StreamID) {}


	/**
	 * @param {string} ClientIP IP address of client
	 */
	setWidevineClientIP(ClientIP) {}


	/**
	 * @param {string} UserData Additional optional user data
	 */
	setWidevineUserData(UserData) {}


	/**
	 * @param {string} DrmAckServerURL URL for server that receives entitlement confirmations
	 */
	setWidevineDrmAckURL(DrmAckServerURL) {}


	/**
	 * @param {string} HeartbeatURL URL to receive client heartbeats
	 */
	setWidevineHeartbeatURL(HeartbeatURL) {}


	/**
	 * @param {string} HeartbeatPeriod Duration between consecutive heartbeats in seconds
	 */
	setWidevineHeartbeatPeriod(HeartbeatPeriod) {}


	/**
	 * @param {string} DeviceType Device type (default value : 0)
	 */
	setWidevineDeviceType(DeviceType) {}


	/**
	 * SDK version: 1.5 or higher
	 *
	 * The NetCast Platform provides an onPlayStateChange event in the Media Player plugin object.
	 * Developers can receive play state change event.
	 * Developer can receive a play state change event when the play state of currently playing media item is changed.
	 */
	onPlayStateChange() {}


	/**
	 * SDK version: 1.5 or higher
	 *
	 * The NetCast Platform provides an onBuffering event in the Media Player plugin object.
	 * Developers can receive buffering event.
	 * Developers can receive a buffering event when the media player begins and ends buffering.
	 * A Boolean type parameter specifies whether data buffering has started or finished.
	 * A value of true indicates that the data buffering has started.
	 * Buffering also occurs whenever playback stops and then restarts (either from calls to play() and stop()) methods
	 * or when network congestion occurs during playing streamed media.
	 *
	 * @param {boolean} isStarted
	 */
	onBuffering(isStarted) {}


	/**
	 * SDK version: 1.5 or higher
	 *
	 * The NetCast Platform provides an onError event in the Media Player plugin object.
	 * Developers can receive error event.
	 * Developers can receive an error event when the media player encounters an error while playing.
	 *
	 * @param {string} error
	 */
	onError(error) {}


	/**
	 * SDK version: 2.4 or higher
	 *
	 * The script function that is called when a DRM licensing error occurs during playback, recording,
	 * or timeshifting of DRM-protected AV content inside the embedded object.
	 *
	 * errorState Error code detailing the type of error (0 : no license, 1 : invalid license)
	 * contentID Unique ID of the content in the scope of DRM system that raises the error
	 * DRMSystemID For PlayReady, the value is “urn:dvb:casystemid:19219”.
	 * rightsIssuerURL Optional element indicating the value of the rightsIssuerURL that can be used to
	 * non-silently obtain the rights for the content item currently being played for which * this DRM error is generated,
	 * in cases whereby the rightsIssuerURL is known. If different URLs are retrieved from the stream and the metadata,
	 * then the conflict resolution is implementation-dependent.
	 *
	 * @param {number} errorState
	 * @param {number} contentID
	 * @param {string} DRMSystemID
	 * @param {string} rightsIssuerURL
	 */
	onDRMRightsError(errorState, contentID, DRMSystemID, rightsIssuerURL) {}
}
