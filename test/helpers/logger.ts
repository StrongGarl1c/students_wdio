import { stepOptions } from '../data/types';
import allure from '@wdio/allure-reporter';

export default class Logger {
  constructor() {}
  static async step(
    options: stepOptions = { createStep: true, takeScreenshot: false },
    description: string,
    expected: string,
    actual: string,
    assertion: Function,
  ): Promise<void> {
    global.stepNumber ? global.stepNumber++ : (global.stepNumber = 1);
    const stepNumber = global.stepNumber;
    if (options.createStep || options.takeScreenshot) {
      try {
        const stepStart = `STEP ${stepNumber} STARTED\n\nDescription: ${description}\nExpected result: ${expected}\n`;
        console.log(stepStart);
        await assertion();
        if (options.takeScreenshot) {
          allure.addStep(
            `Step ${stepNumber} ${description}\n${expected}`,
            {
              content: await browser.saveScreenshot(
                `./screenshots/step_${stepNumber}_test_name.png`,
              ),
              type: 'image/png',
              name: `Step ${stepNumber} screenshot`,
            },
            'passed',
          );
        }
        console.log(`STEP ${stepNumber} PASSED. Actual result:\n\n${actual}\n`);
      } catch (error) {
        await browser.saveScreenshot(
          `./screenshots/step_${stepNumber}_failed.png`,
        ),
          console.error(
            `STEP ${stepNumber} FAILED. Actual result:\n\n${actual}\n`,
          );
        throw error;
      }
    } else {
      try {
        await assertion();
      } catch (error) {
        await browser.saveScreenshot(
          `./screenshots/step_${stepNumber}_failed.png`,
        );
        throw error;
      }
    }
  }
}

export const step = Logger.step;
