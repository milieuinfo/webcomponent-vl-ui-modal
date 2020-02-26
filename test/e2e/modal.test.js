const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlModalPage = require('./pages/vl-modal.page');
const VlModalAutoOpenPage = require('./pages/vl-modal-auto-open.page');
const { By } = require('selenium-webdriver');
const { VlDatepicker } = require('vl-ui-datepicker').Test;

describe('vl-modal', async () => {
    const vlModalPage = new VlModalPage(driver);

    before(async() => {
    	return await vlModalPage.load();
    });
    
    it('als gebruiker kan ik de modal zonder button en content openen en sluiten via de annuleer knop', async () => {
        const modal = await vlModalPage.getModalZonderButtonEnContent();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalZonderButtonEnContent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await assert.eventually.isTrue(modal.isCancellable());
        await assert.eventually.isFalse(modal.isClosable());
        await assert.eventually.isFalse(modal.isSubmittable());
        await modal.cancel();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

    it('als gebruiker kan ik de closable modal openen en sluiten via de sluiten knop', async () => {
    	const modal = await vlModalPage.getModalClosable();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosable();
        await assert.eventually.isTrue(modal.isDisplayed());
        await assert.eventually.isTrue(modal.isCancellable());
        await assert.eventually.isTrue(modal.isClosable());
        await assert.eventually.isFalse(modal.isSubmittable());
        await modal.close();
    });

    it('als gebruiker kan ik de niet automatisch closable modal niet sluiten door op de actie knop te klikken', async () => {
        const modal = await vlModalPage.getModalClosableNietAutomatisch();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietAutomatisch();
        await assert.eventually.isTrue(modal.isDisplayed());
        await assert.eventually.isTrue(modal.isCancellable());
        await assert.eventually.isTrue(modal.isClosable());
        await assert.eventually.isTrue(modal.isSubmittable());
        await modal.submit();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.close();
    });

    it('als gebruiker kan ik de closable, niet cancellable modal niet sluiten via de annuleer knop', async () => {
        const modal = await vlModalPage.getModalClosableNietCancellable();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietCancellable();
        await assert.eventually.isTrue(modal.isDisplayed());
        await assert.eventually.isFalse(modal.isCancellable());
        await assert.eventually.isTrue(modal.isClosable());
        await assert.eventually.isFalse(modal.isSubmittable());
        await modal.close();
    })

    it('als gebruiker kan ik de automatisch closable modal sluiten door op de actie knop te klikken', async () => {
        const modal = await vlModalPage.getModalClosableNietCancellableMetButtonEnContent();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietCancellableMetButtonEnContent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await assert.eventually.isFalse(modal.isCancellable());
        await assert.eventually.isTrue(modal.isClosable());
        await assert.eventually.isTrue(modal.isSubmittable());
        await modal.submit();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

    it('als gebruiker kan ik de automatisch closable modal sluiten door op de actie link te klikken', async () => {
        const modal = await vlModalPage.getModalClosableNietCancellableMetLinkEnIcon();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalClosableNietCancellableMetLinkEnIcon();
        await assert.eventually.isTrue(modal.isDisplayed());
        await assert.eventually.isFalse(modal.isCancellable());
        await assert.eventually.isTrue(modal.isClosable());
        await assert.eventually.isTrue(modal.isSubmittable());
        await modal.submit();
        await assert.eventually.isFalse(modal.isDisplayed());
    });

    it('als gebruiker kan ik de manuele modal openen en sluiten', async () => {
        const modal = await vlModalPage.getModalManual();
        await assert.eventually.isFalse(modal.isDisplayed());
        await vlModalPage.openModalManual();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.cancel();
    });

     it('als gebruiker kan ik iets uitvoeren door in de modal op de actie knop te klikken', async () => {
        const modal = await vlModalPage.getModalListener();
        await vlModalPage.klikVoegListenerToe();
        await vlModalPage.openModalListener();
        await modal.close();
        await assert.eventually.isFalse(modal.isDisplayed());
        await assert.eventually.equal(vlModalPage.getListenerText(), 'Lach de lach der dwazen');
    });

    it('als gebruiker kan ik meteen typen in het input-veld in de modal in Safari', async () => {
        const modal = await vlModalPage.getModalSafari();
        await vlModalPage.openModalSafari();
        const content = await modal.getContent();
        await assert.eventually.isTrue(content.hasFocus());
        await modal.close();
    });

    it('als gebruiker zie ik een verticale scrollbar als er te veel tekst in de modal staat', async() => {
        await vlModalPage.openModalMetVeelTekst();
        const modal = await vlModalPage.getModalMetVeelTekst();
        await modal.scrollToTop();
        await modal.cancel();
    });

//    it('als gebruiker kan ik op een element klikken dat groter is dan de content van de modal als het attribuut allow-overflow gezet is', async() => {
//        await vlModalPage.openModalMetDatepicker();
//        const modal = await vlModalPage.getModalMetDatepicker();
//        const flatpickr = await modal.findElement(By.css('vl-datepicker'));
//        const datepicker = new VlDatepicker(driver, flatpickr);
//        await datepicker.selectMonth('mei');
//        await datepicker.selectDay(1);
//        await assert.eventually.equal(datepicker.getInputValue(), '01.05.2020');
//        await modal.cancel();
//    });

});

describe('vl-modal-auto-open', async () => {
    const vlModalAutoOpenPage = new VlModalAutoOpenPage(driver);

    before(async() => {
    	return await vlModalAutoOpenPage.load();
    });
    
    it('een modal die automatisch opent bij het laden van de pagina valt niet buiten het scherm', async () => {
    	const modal = await vlModalAutoOpenPage.getAutoOpenModal();
        await assert.eventually.isTrue(modal.isInViewport());
    });
});
