
const { assert, driver } = require('vl-ui-core').Test;
const VlModalPage = require('./pages/vl-modal.page');

describe('vl-modal', async () => {
    const vlModalPage = new VlModalPage(driver);

    before(() => {
        return vlModalPage.load();
    });

    it('als gebruiker wil ik dat mijn klik geregistreerd wordt wanneer ik op een knop klik', async () => {
        const button = await vlButtonPage.getPrimaryButton();
        await assert.eventually.equal(button.getText(), 'Gegevens opslaan');
        await button.click();
        await assert.eventually.equal(button.getText(), 'Klik geregistreerd');
    });

    after(() => driver && driver.quit());
});
