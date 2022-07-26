import AddElementsPageObject from '../pageObjects/addElementsPageObject';

const addElementsPageObject = new AddElementsPageObject();

describe('Add/Remove Elements test', function () {
  before(async function () {
    await addElementsPageObject.open();
  });
  it('Should add elements to the page', async function () {
    await addElementsPageObject.verifyElementIsDisplayed(
      await addElementsPageObject.getAddElementButton(),
      {takeScreenshot: true}
    );
    await addElementsPageObject.clickOnAddElementsButton({takeScreenshot: true});
    await addElementsPageObject.clickOnAddElementsButton({takeScreenshot: true});
    await addElementsPageObject.clickOnAddElementsButton({takeScreenshot: true});
    await addElementsPageObject.verifyLength(
      await addElementsPageObject.getDeleteButtons(),
      3,
      {takeScreenshot: true}
    );
  });

  it('Should delete elements from the page', async function () {
    const buttons = await addElementsPageObject.getDeleteButtons();
    await addElementsPageObject.verifyElementIsDisplayed(buttons[0], {takeScreenshot: true});
    await addElementsPageObject.verifyElementIsDisplayed(buttons[1], {takeScreenshot: true});
    await addElementsPageObject.verifyElementIsDisplayed(buttons[2], {takeScreenshot: true});
    await addElementsPageObject.clickOnDeleteButton(buttons[1], {takeScreenshot: true});
    await addElementsPageObject.clickOnDeleteButton(buttons[2], {takeScreenshot: true});
    await addElementsPageObject.verifyLength(
      await addElementsPageObject.getDeleteButtons(),
      1,
      {takeScreenshot: true}
    );
  });
});
