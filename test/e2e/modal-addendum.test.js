const {assert, getDriver, By} = require('vl-ui-core').Test.Setup;
const VlModalAddendumPage = require('./pages/vl-modal-addendum.page');
const {VlDatepicker} = require('vl-ui-datepicker').Test;
const {VlInputField} = require('vl-ui-input-field').Test;

describe('vl-modal addendum', async () => {
  let driver;
  let vlModalPage;

  before(() => {
    driver = getDriver();
    vlModalPage = new VlModalAddendumPage(driver);
    return vlModalPage.load();
  });

  it('als gebruiker kan ik verticaal scrollen als er te veel tekst in de modal staat', async () => {
    await vlModalPage.openModalWithLongText();
    const modal = await vlModalPage.getModalWithLongText();
    await modal.scrollToTop();
    await modal.cancel();
  });

  it('als gebruiker kan ik meteen typen in het input-veld in de modal in Safari', async () => {
    const modal = await vlModalPage.getModalSafari();
    await vlModalPage.openModalSafari();
    const slotElements = await modal.getContentSlotElements();
    const input = await new VlInputField(driver, slotElements[0]);
    await assert.eventually.isTrue(input.hasFocus());
    await modal.close();
  });

  it('als gebruiker kan ik op een element klikken dat groter is dan de content van de modal als het attribuut allow-overflow gezet is', async () => {
    await vlModalPage.openModalDatepicker();
    const modal = await vlModalPage.getModalDatepicker();
    const element = await modal.findElement(By.css('vl-datepicker'));
    const datepicker = await new VlDatepicker(driver, element);
    await datepicker.scrollIntoView();
    await datepicker.selectDay(25);
    await assert.eventually.isDefined(datepicker.getInputValue());
    await modal.cancel();
  });
});
