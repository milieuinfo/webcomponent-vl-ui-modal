const VlModal = require('../components/vl-modal');
const { Page, Config } = require('vl-ui-core');
const { By } = require('selenium-webdriver');

class VlModalPage extends Page {
    async _getModal(selector) {
        return new VlModal(this.driver, selector);
    }

    async openModal(selector) {
        const button = await this.driver.findElement(By.css(selector));
        return button.click();
    }

    async getModalZonderButtonEnContent() {
        return await this._getModal('#modal-zb');
    }

    async openModalZonderButtonEnContent() {
        return this.openModal('#button-open-modal-zb');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-modal.html');
    }
}

module.exports = VlModalPage;
