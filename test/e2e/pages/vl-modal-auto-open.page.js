const VlModal = require('../components/vl-modal');
const { Page, Config } = require('vl-ui-core').Test;

class VlModalAutoOpenPage extends Page {
    async _getModal(identifier) {
        return new VlModal(this.driver, identifier);
    }

    async getAutoOpenModal() {
        return this._getModal('#modal-vt');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-modal-auto-open.html');
    }

}

module.exports = VlModalAutoOpenPage;
