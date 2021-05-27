const VlModal = require('../components/vl-modal');
const {Page, Config} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlModalPage extends Page {
  getModal() {
    return this._getModal('#modal');
  }

  async getModalClosable() {
    return this._getModal('#modal-cl');
  }

  async getModalClosableNietAutomatisch() {
    return this._getModal('#modal-cl-na');
  }

  async getModalClosableNietCancellable() {
    return this._getModal('#modal-cl-nc');
  }

  async getModalClosableNietCancellableMetLinkEnIcon() {
    return this._getModal('#modal-cl-nc-li');
  }

  async getModalManual() {
    return this._getModal('#modal-ma');
  }

  async getModalListener() {
    return this._getModal('#modal-lis');
  }

  async openModal() {
    return this._openModal('#button-open-modal');
  }

  async openModalClosable() {
    return this._openModal('#button-open-modal-cl');
  }

  async openModalClosableNietAutomatisch() {
    return this._openModal('#button-open-modal-cl-na');
  }

  async openModalClosableNietCancellable() {
    return this._openModal('#button-open-modal-cl-nc');
  }

  async openModalClosableNietCancellableMetLinkEnIcon() {
    return this._openModal('#button-open-modal-cl-nc-li');
  }

  async openModalManual() {
    return this._openModal('#button-open-modal-ma');
  }

  async openModalListener() {
    return this._openModal('#button-open-modal-lis');
  }

  async addListener() {
    return this.driver.findElement(By.css('#add-listener')).click();
  }

  async getListenerText() {
    const button = await this.driver.findElement(By.css('#button-open-modal-lis'));
    return button.getText();
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-modal.html');
  }

  async _getModal(identifier) {
    return new VlModal(this.driver, identifier);
  }

  async _openModal(selector) {
    const button = await this.driver.findElement(By.css(selector));
    return button.click();
  }
}

module.exports = VlModalPage;
