const VlModal = require('../components/vl-modal');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlModalPage extends Page {
    async _getModal(selector) {
        return new VlModal(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-modal.html');
    }
}

module.exports = VlModalPage;
