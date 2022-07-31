import { stepOptions, LogFile } from '../data/types';
import allure from '@wdio/allure-reporter';
import { writeFile } from 'fs';

export default class Logger {
  constructor() {}
  private static stepNumber = 0;
  private static logFile: LogFile = { steps: [] };
  private static screenshot: string;
  private static screenshotName = `./logs/log${Math.floor(new Date().getTime() + Math.random() * 1000)}.json`;

  private static async handleScreenshot() {
    const data = await browser.saveScreenshot(`./screenshots/step_${Logger.stepNumber}_test_name.png`);
    Logger.screenshot = Buffer.from(data).toString('base64');
    return data;
  }

  private static createLogFile() {
    writeFile(
      Logger.screenshotName,
      JSON.stringify(Logger.logFile),
      (error) => console.error(error),
    );
  }

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
              content: await Logger.handleScreenshot(),
              type: 'image/png',
              name: `Step ${Logger.stepNumber} screenshot`,
            },
            'passed',
          );
          Logger.logFile.steps.push({
            stepNumber: Logger.stepNumber,
            description,
            expected,
            actual,
            status: 'passed',
            screenshot: Logger.screenshot,
          });
        } else {
          allure.addStep(allureTestTitle);
          Logger.logFile.steps.push({
            stepNumber: Logger.stepNumber,
            description,
            expected,
            actual,
            status: 'passed',
          });
        }
        console.log(`STEP ${Logger.stepNumber} PASSED. Actual result:\n\n${actual}\n`);
      } catch (error) {
        await Logger.handleScreenshot(),
          console.error(`STEP ${Logger.stepNumber} FAILED. Actual result:\n\n${error}\n`);
        throw error;
      } finally {
        Logger.createLogFile();
      }
    } else {
      try {
        await assertion();
      } catch (error) {
        await Logger.handleScreenshot();
        throw error;
      }
    }
  }
}

export const step = Logger.step;
