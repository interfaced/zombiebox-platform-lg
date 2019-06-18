/**
 */
class LGInfoPlugin extends HTMLElement {
	/**
	 */
	constructor() {
		super();

		/**
		 * @type {string}
		 */
		this.version;

		/**
		 * @type {string}
		 */
		this.manufacturer;

		/**
		 * @type {string}
		 */
		this.modelName;

		/**
		 * @type {string}
		 */
		this.serialNumber;

		/**
		 * @type {string}
		 */
		this.swVersion;

		/**
		 * @type {string}
		 */
		this.hwVersion;

		/**
		 * @type {string}
		 */
		this.osdResolution;

		/**
		 * @type {string}
		 */
		this.networkType;

		/**
		 * @type {string}
		 */
		this.net_macAddress;

		/**
		 * @type {string}
		 */
		this.drmClientInfo;

		/**
		 * @type {string}
		 */
		this.net_dhcp;

		/**
		 * @type {string}
		 */
		this.net_isConnected;

		/**
		 * @type {string}
		 */
		this.net_hasIP;

		/**
		 * @type {string}
		 */
		this.net_ipAddress;

		/**
		 * @type {string}
		 */
		this.net_netmask;

		/**
		 * @type {string}
		 */
		this.net_gateway;

		/**
		 * @type {string}
		 */
		this.net_dns1;

		/**
		 * @type {string}
		 */
		this.net_dns2;

		/**
		 * @type {boolean}
		 */
		this.supportMouse;

		/**
		 * @type {string}
		 */
		this.support3D;

		/**
		 * @type {string}
		 */
		this.supportPortalKey;

		/**
		 * Format: ISO 639-1
		 * @type {string}
		 */
		this.tvLanguage2;


		/**
		 * It will return „1‟ if the call is processed without error or „0‟ if there is an error
		 * in processing the call or license setup is not completed. Therefore, applications should
		 * wait until they receive a „1‟ before proceding to the next step
		 * @return {number}
		 */
		this.setDrmLicenseInfo;
	}
}
