/*
 * This file is part of the ZombieBox package.
 *
 * Copyright (c) 2011-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var path = require('path');


/**
 * @implements {ZBPlatform}
 */
class PlatformLG {
	/**
	 * @override
	 */
	getName() {
		return 'lg';
	}

	/**
	 * @override
	 */
	getPublicDir() {
		return path.join(__dirname, 'lib');
	}

	/**
	 * @override
	 */
	getConfig() {
		return {
			'compilation': {
				'externs': [
					path.join(__dirname, 'externs', 'globals.js'),
					path.join(__dirname, 'externs', 'info-plugin.js'),
					path.join(__dirname, 'externs', 'media-info.js'),
					path.join(__dirname, 'externs', 'video-object.js')
				]
			},
			scripts: []
		};
	}

	/**
	 * @override
	 */
	buildApp(zbApp, distDir) {
		var buildHelper = zbApp.getBuildHelper();

		return buildHelper.writeIndexHtml(path.join(distDir, 'index.html'), this.getName())
			.then((warnings) => {
				buildHelper.copyCustomWebFiles(distDir);

				return warnings;
			});
	}
}


module.exports = PlatformLG;
