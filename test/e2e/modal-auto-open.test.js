const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlModalAutoOpenPage = require('./pages/vl-modal-auto-open.page');

describe('vl-modal auto-open', async () => {
  let driver;
  let vlModalPage;

  before(() => {
    driver = getDriver();
    vlModalPage = new VlModalAutoOpenPage(driver);
    return vlModalPage.load();
  });

  it('WCAG', async () => {
    await assert.eventually.isFalse(vlModalPage.hasWcagIssues());
  });

  it('een modal die automatisch opent bij het laden van de pagina valt niet buiten het scherm', async () => {
    const modal = await vlModalPage.getAutoOpenModal();
    await driver.wait(async () => {
      const displayed = await modal.isDisplayed();
      return displayed;
    });
    await assert.eventually.isTrue(modal.isDisplayed());
    await assert.eventually.isTrue(modal.isInViewport());
  });
});
