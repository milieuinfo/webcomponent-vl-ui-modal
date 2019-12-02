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

    async isCancellable() {
        return this.shadowRoot.findElements(By.css('#modal-toggle-cancellable')).size > 0;   
    }

    async cancel() {
        const button = await this._getCancelButton();
        return button.click();
    }

    async close() {
        const button = await this._getCloseButton();
        return button.click();
    }

    async klikButtonInModal() {
        const button = await this._getActionButton();
        return button.click();
    }

    async _getDialog() {
        return this.shadowRoot.findElement(By.css('dialog'));
    }

    async _getCancelButton() {
        return this.shadowRoot.findElement(By.css('#modal-toggle-cancellable'));
    }

    async _getCloseButton() {
        return this.shadowRoot.findElement(By.css('#close'));
    }

    async _getActionButton() {
        return this.findElement(By.css('#actie'));
    }
}

module.exports = VlModal;
