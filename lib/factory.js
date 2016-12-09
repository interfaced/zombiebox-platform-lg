goog.provide('zb.device.platforms.lg.factory.createDevice');
goog.require('zb.device.platforms.lg.Device');


/**
 * @return {?zb.device.platforms.lg.Device}
 */
zb.device.platforms.lg.factory.createDevice = () => {
	const isNetCastPlatform = zb.device.platforms.lg.Device.detect();

	if (isNetCastPlatform) {
		const pluginContainer = app.getPluginContainer();
		const videoContainer = app.getVideoContainer();
		return new zb.device.platforms.lg.Device(pluginContainer, videoContainer);
	}

	return null;
};
