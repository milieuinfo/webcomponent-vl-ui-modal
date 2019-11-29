
const { assert, driver } = require('vl-ui-core').Test;
const VlModalPage = require('./pages/vl-modal.page');
const { By } = require('selenium-webdriver')

describe('vl-modal', async () => {
    const vlModalPage = new VlModalPage(driver);

    before(() => {
        return vlModalPage.load();
    });

    it('ik kan de modal openen door op open te klikken en sluiten door op annuleer te klikken', async () => {
        const modal = await vlModalPage.getModalZonderButtonEnContent();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalZonderButtonEnContent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.cancel();
        await assert.eventually.isFalse(modal.isDisplayed());
    });
    
    after(() => driver && driver.quit());
});
