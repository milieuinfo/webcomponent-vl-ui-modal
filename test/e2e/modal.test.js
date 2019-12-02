
const { assert, driver } = require('vl-ui-core').Test;
const VlModalPage = require('./pages/vl-modal.page');
const { By } = require('selenium-webdriver')

describe('vl-modal', async () => {
    const vlModalPage = new VlModalPage(driver);

    before(() => {
        return vlModalPage.load();
    });

    it('ik kan de modal zonder button en content openen en sluiten', async () => {
        const modal = await vlModalPage.getModalZonderButtonEnContent();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalZonderButtonEnContent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.cancel();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

    it('ik kan de closable modal openen en sluiten', async () => {
        const modal = await vlModalPage.getModalClosable();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosable();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.cancel();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

    it('ik kan de closable niet automatisch closable modal openen en sluiten', async () => {
        const modal = await vlModalPage.getModalClosableNietAutomatisch();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietAutomatisch();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.close();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

    it('ik kan de closable, niet cancellable modal openen en sluiten', async () => {
        const modal = await vlModalPage.getModalClosableNietCancellable();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietCancellable();
        await assert.eventually.isTrue(modal.isDisplayed());
        await assert.eventually.isFalse(modal.isCancellable());
        await modal.close();
        await assert.eventually.isFalse(modal.isDisplayed());
    })

    it('ik kan de closable, niet cancellable, met button en content modal openen en sluiten', async () => {
        const modal = await vlModalPage.getModalClosableNietCancellableMetButtonEnContent();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietCancellableMetButtonEnContent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.close();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietCancellableMetButtonEnContent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.klikButtonInModal();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

    it('ik kan de manuele modal openen en sluiten', async () => {
        const modal = await vlModalPage.getModalManual();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalManual();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.cancel();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalManual();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.klikButtonInModal();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

     it('ik kan de modal met listener openen en sluiten', async () => {
        const modal = await vlModalPage.getModalListener();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalListener();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.cancel();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalListener();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.close();
        await vlModalPage.klikVoegListenerToe();
        await vlModalPage.openModalListener();
        await modal.close();
        await assert.eventually.isFalse(modal.isDisplayed());
        await assert.eventually.equal(vlModalPage.getListenerText(), 'Lach de lach der dwazen');
    });

    it('het input-veld in de modal heeft focus bij het openen van de modal', async () => {
        await vlModalPage.openModalSafari();
        await vlModalPage.hasFocus();
    })

    after(() => driver && driver.quit());
});
