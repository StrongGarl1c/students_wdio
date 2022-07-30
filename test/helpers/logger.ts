import { stepOptions } from '../data/types';
import allure from '@wdio/allure-reporter';

export default class Logger {
  constructor() {}
  static stepNumber = 0
  static async step(
    options: stepOptions = { createStep: true, takeScreenshot: false },
    description: string,
    expected: string,
    actual: string,
    assertion: Function,
    ): Promise<void> {
    if (options.createStep || options.takeScreenshot) {
      try {
        Logger.stepNumber++;
        const stepStart = `STEP ${Logger.stepNumber} STARTED\n\nDescription: ${description}\nExpected result: ${expected}\n`;
        const allureTestTitle = `Step ${Logger.stepNumber} ${description}\n${expected}\n${actual}`;
        console.log(stepStart);
        await assertion();
        if (options.takeScreenshot) {
          allure.addStep(
            allureTestTitle,
            {
              content: await browser.saveScreenshot(
                `./screenshots/step_${Logger.stepNumber}_test_name.png`,
              ),
              type: 'image/png',
              name: `Step ${Logger.stepNumber} screenshot`,
            },
            'passed',
          );
        } else {
          allure.addStep(allureTestTitle);
        }
        console.log(`STEP ${Logger.stepNumber} PASSED. Actual result:\n\n${actual}\n`);
      } catch (error) {
        await browser.saveScreenshot(
          `./screenshots/step_${Logger.stepNumber}_failed.png`,
        ),
          console.error(
            `STEP ${Logger.stepNumber} FAILED. Actual result:\n\n${actual}\n`,
          );
        throw error;
      }
    } else {
      try {
        await assertion();
      } catch (error) {
        await browser.saveScreenshot(
          `./screenshots/step_${Logger.stepNumber}_failed.png`,
        );
        throw error;
      }
    }
  }
}

export const step = Logger.step;
