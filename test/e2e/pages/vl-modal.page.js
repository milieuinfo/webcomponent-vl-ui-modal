const VlModal = require('../components/vl-modal');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

const { By } = require('selenium-webdriver');

class VlModalPage extends Page {
    async _getModal(selector) {
        return new VlModal(this.driver, selector);
    }

    async getModalZonderButtonEnContent() {
        const modal = await this._getModal('#modal-zb');
        const shadowRoot = await modal.shadowRoot()
        return shadowRoot.findElement(By.css('#modal-zb'));
    }

    async getModalZonderButtonEnContentOpenKnop() {
        return this._getModal('#modal-zb-open');
    }

    async getModalZonderButtonEnContentAnnuleerKnop() {
        const modal = await this.getModalZonderButtonEnContent();
        return modal.findElement(By.css('#modal-toggle-cancellable'));
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-modal.html');
    }
}

module.exports = VlModalPage;
