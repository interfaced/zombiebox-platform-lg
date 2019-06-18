/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2014-2016, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
const path = require('path');
const {AbstractPlatform} = require('zombiebox');


/**
 */
class PlatformLG extends AbstractPlatform {
	/**
	 * @override
	 */
	getName() {
		return 'lg';
	}

	/**
	 * @override
	 */
	getSourcesDir() {
		return path.join(__dirname, 'lib');
	}

	/**
	 * @override
	 */
	getConfig() {
		return {
			include: [{
				name: 'LG',
				externs: [
					path.join(__dirname, 'externs', 'globals.js'),
					path.join(__dirname, 'externs', 'info-plugin.js'),
					path.join(__dirname, 'externs', 'media-info.js'),
					path.join(__dirname, 'externs', 'video-object.js'),
					path.join(__dirname, 'externs', 'blacklist.js')
				]
			}]
		};
	}

	/**
	 * @override
	 */
	buildCLI(yargs, application) {
		super.buildCLI(yargs, application);
	}

	/**
	 * @override
	 */
	async buildApp(application, distDir) {
		const buildHelper = application.getBuildHelper();

		const warnings = await buildHelper.writeIndexHTML(path.join(distDir, 'index.html'));
		await buildHelper.copyStaticFiles(distDir);

		return warnings;
	}
}


module.exports = PlatformLG;
