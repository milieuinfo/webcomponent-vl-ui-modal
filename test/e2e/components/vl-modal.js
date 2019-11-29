const { VlElement } = require('vl-ui-core');
const { By } = require('selenium-webdriver');

class VlModal extends VlElement {  
    constructor(driver, selector) {
        super(driver, selector);
    }

    async isDisplayed() {
        const dialog = await this._getDialog();
        return dialog.isDisplayed();
    }

    async cancel() {
        const button = await this._getCancelButton();
        return button.click();
    }

    async _getDialog() {
        return this.shadowRoot.findElement(By.css('dialog'));
    }

    async _getCancelButton() {
        return this.shadowRoot.findElement(By.css('#modal-toggle-cancellable'));
    }
}

module.exports = VlModal;
