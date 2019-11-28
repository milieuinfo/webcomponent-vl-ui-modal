
const { assert, driver } = require('vl-ui-core').Test;
const VlModalPage = require('./pages/vl-modal.page');

describe('vl-modal', async () => {
    const vlModalPage = new VlModalPage(driver);

    before(() => {
        return vlModalPage.load();
    });
    
    after(() => driver && driver.quit());
});
