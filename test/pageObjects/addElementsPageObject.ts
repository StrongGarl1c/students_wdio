import RootObject from './rootObject';
import { expect } from 'chai';
import { stepOptions } from '../data/types';
import { step } from '../helpers/logger';

export default class AddElementsPageObject extends RootObject {
  constructor() {
    super();
  }

  async open(): Promise<void> {
    return await super.open('add_remove_elements/');
  }

  async getAddElementButton(): Promise<WebdriverIO.Element> {
    return await $('button=Add Element');
  }

  async getDeleteButtons(): Promise<WebdriverIO.ElementArray> {
    return await (await $('div#elements')).$$('button=Delete');
  }

  async clickOnAddElementsButton(options?: stepOptions): Promise<void> {
    await step(
      options,
      'Click on "Add Elements Button"',
      'The button should be clickable',
      'As expected',
      async () => {
        const button = await this.getAddElementButton();
        await button.click();
      },
    );
  }

  async clickOnDeleteButton(
    button: WebdriverIO.Element,
    options?: stepOptions,
  ): Promise<void> {
    await step(
      options,
      `Click on "Delete Button" number ${button.index + 1}`,
      'The button should be clickable',
      'As expected',
      async () => {
        await button.click();
        browser.waitUntil(() => !button.isDisplayed());
      },
    );
  }

  async verifyElementIsDisplayed(
    element: WebdriverIO.Element,
    options?: stepOptions,
  ): Promise<void> {
    await step(
      options,
      `Verify that element "${await element.getTagName()} ${await element.getText()}" is displayed`,
      'The element should be displayed',
      'As expected',
      async () => {
        expect(await element.isDisplayed()).to.be.true;
      },
    );
  }

  async verifyLength(
    elements: WebdriverIO.ElementArray,
    expectedLength: number,
    options?: stepOptions,
  ): Promise<void> {
    await step(
      options,
      `Verify that the amount of elements is correct`,
      'The amount of elements should be correct',
      'As expected',
      async () => {
        expect(elements).to.have.length(expectedLength);
      },
    );
  }
}
