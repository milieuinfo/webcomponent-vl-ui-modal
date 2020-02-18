const VlModal = require('../components/vl-modal');
const { Page, Config, VlElement } = require('vl-ui-core').Test;
const { By } = require('selenium-webdriver');

class VlModalAutoOpenPage extends Page {
    async _getModal(identifier) {
        return new VlModal(this.driver, identifier);
    }

    async getAutoOpenModal() {
        return await this._getModal('#modal-vt');
    }

	async load() {
        await super.load(Config.baseUrl + '/demo/vl-modal-auto-open.html');
    }

}

module.exports = VlModalAutoOpenPage;
