const VlModal = require('../components/vl-modal');
const {Page, Config, VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;

class VlModalAddendumPage extends Page {
  async getModalWithLongText() {
    return this._getModal('#modal-vt');
  }

  async getModalSafari() {
    const container = await new VlElement(this.driver, 'vl-modal-container-test');
    const parent = container.shadowRoot;
    return this._getModal(parent.shadowRoot);
  }

  async getModalDatepicker() {
    return this._getModal('#modal-datepicker');
  }

  async openModalWithLongText() {
    return this._openModal('#button-open-modal-vt');
  }

  async openModalSafari() {
    return this._openModal('#button-open-modal-safari');
  }

  async openModalDatepicker() {
    return this._openModal('#button-open-modal-datepicker');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-modal-addendum.html');
  }

  async _getModal(identifier) {
    return new VlModal(this.driver, identifier);
  }

  async _openModal(selector) {
    const button = await this.driver.findElement(By.css(selector));
    return button.click();
  }
}

module.exports = VlModalAddendumPage;
