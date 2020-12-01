const {assert, getDriver} = require('vl-ui-core').Test.Setup;
const VlModalAutoOpenPage = require('./pages/vl-modal-auto-open.page');

describe('vl-modal-auto-open', async () => {
  let vlModalAutoOpenPage;

  before(() => {
    vlModalAutoOpenPage = new VlModalAutoOpenPage(getDriver());
    return vlModalAutoOpenPage.load();
  });

  it('een modal die automatisch opent bij het laden van de pagina valt niet buiten het scherm', async () => {
    const modal = await vlModalAutoOpenPage.getAutoOpenModal();
    await driver.wait(async () => {
      const displayed = await modal.isDisplayed();
      return displayed;
    });
    await assert.eventually.isTrue(modal.isDisplayed());
    await assert.eventually.isTrue(modal.isInViewport());
  });
});
