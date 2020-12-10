const {By} = require('vl-ui-core').Test.Setup;
const {VlElement, Config} = require('vl-ui-core').Test;

class VlModal extends VlElement {
  async isDisplayed() {
    const dialog = await this._getDialog();
    return dialog.isDisplayed();
  }

  async isCancellable() {
    return this._exists(() => this._getCancelButton());
  }

  async cancel() {
    const button = await this._getCancelButton();
    return button.click();
  }

  async isClosable() {
    return this._exists(() => this._getCloseButton());
  }

  async close() {
    const button = await this._getCloseButton();
    return button.click();
  }

  async isSubmittable() {
    return this._exists(() => this._getActionButton());
  }

  async submit() {
    const button = await this._getActionButton();
    await button.scrollIntoView();
    await button.click();
  }

  async getContentSlotElements() {
    const slot = await this._getContent();
    return this.getAssignedElements(slot);
  }

  async isInViewport() {
    const dialog = await this._getDialog();
    return dialog.isInViewport();
  }

  async scrollToTop() {
    const dialog = await this._getDialog();
    return dialog.scrollToTop();
  }

  async sendKeys(key) {
    let element;
    if (Config.browserName == 'chrome') {
      element = await this._getDialog();
    } else {
      element = await this.driver.findElement(By.css('body'));
    }
    await element.sendKeys(key);
  }

  async _getDialog() {
    const element = await this.shadowRoot.findElement(By.css('dialog'));
    return new VlElement(this.driver, element);
  }

  async _getCancelButton() {
    return this.shadowRoot.findElement(By.css('#modal-toggle-cancellable'));
  }

  async _getCloseButton() {
    return this.shadowRoot.findElement(By.css('#close'));
  }

  async _getContent() {
    return this.shadowRoot.findElement(By.css('slot[name="content"]'));
  }

  async _getActionButton() {
    return this.findElement(By.css('[slot="button"]'));
  }

  async _exists(getter) {
    try {
      await getter();
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = VlModal;
