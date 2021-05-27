const {Config} = require('vl-ui-core').Test;
const {assert, getDriver, Key} = require('vl-ui-core').Test.Setup;
const VlModalPage = require('./pages/vl-modal.page');

describe('vl-modal', async () => {
  let driver;
  let vlModalPage;

  before(() => {
    driver = getDriver();
    vlModalPage = new VlModalPage(driver);
    return vlModalPage.load();
  });

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlModalPage.hasWcagIssues());
  });

  it('als gebruiker kan ik de modal openen en sluiten via de annuleer knop', async () => {
    const modal = await vlModalPage.getModal();
    await assert.eventually.isFalse(modal.isDisplayed());
    await vlModalPage.openModal();
    await assert.eventually.isTrue(modal.isDisplayed());
    await assert.eventually.isTrue(modal.isCancellable());
    await assert.eventually.isFalse(modal.isClosable());
    await assert.eventually.isTrue(modal.isSubmittable());
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
    await assert.eventually.isTrue(modal.isSubmittable());
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
    await assert.eventually.isFalse(modal.isDisplayed());
  });

  it('als gebruiker kan ik de closable, niet cancellable modal niet sluiten via de annuleer knop', async () => {
    const modal = await vlModalPage.getModalClosableNietCancellable();
    await assert.eventually.isFalse(modal.isDisplayed());
    await vlModalPage.openModalClosableNietCancellable();
    await assert.eventually.isTrue(modal.isDisplayed());
    await assert.eventually.isFalse(modal.isCancellable());
    await assert.eventually.isTrue(modal.isClosable());
    await assert.eventually.isTrue(modal.isSubmittable());
    await modal.close();
  });

  it('als gebruiker kan ik de automatisch closable modal sluiten door op de actie knop te klikken', async () => {
    const modal = await vlModalPage.getModal();
    await assert.eventually.isFalse(modal.isDisplayed());
    await vlModalPage.openModal();
    await assert.eventually.isTrue(modal.isDisplayed());
    await assert.eventually.isTrue(modal.isCancellable());
    await assert.eventually.isFalse(modal.isClosable());
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
    await assert.eventually.isFalse(modal.isDisplayed());
  });

  it('als gebruiker kan ik iets uitvoeren door in de modal op de actie knop te klikken', async () => {
    const modal = await vlModalPage.getModalListener();
    await vlModalPage.addListener();
    await vlModalPage.openModalListener();
    await modal.submit();
    await assert.eventually.isFalse(modal.isDisplayed());
    await assert.eventually.equal(vlModalPage.getListenerText(), 'Lach de lach der dwazen');
  });

  it('als gebruiker kan ik een niet closable modal niet sluiten door op escape te klikken', async () => {
    if (Config.browserName != 'edge') {
      let modal = await vlModalPage.getModal();
      await assert.eventually.isFalse(modal.isDisplayed());
      await vlModalPage.openModal();
      await assert.eventually.isTrue(modal.isDisplayed());
      await modal.sendKeys(Key.ESCAPE);
      await assert.eventually.isTrue(modal.isDisplayed());
      await modal.cancel();

      modal = await vlModalPage.getModalClosable();
      await assert.eventually.isFalse(modal.isDisplayed());
      await vlModalPage.openModalClosable();
      await assert.eventually.isTrue(modal.isDisplayed());
      await modal.sendKeys(Key.ESCAPE);
      await assert.eventually.isFalse(modal.isDisplayed());
    }
  });
});
