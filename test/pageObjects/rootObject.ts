import { stepOptions } from '../data/types';
import { step } from '../helpers/logger';

export default class RootObject {
  constructor() {}
  async open(path?: string, options?: stepOptions): Promise<void> {
    await step(
      options,
      `Open url "${await browser.getUrl()}${path ? path : ''}"`,
      'The url should be loaded',
      'As expected',
      async () => {
        if (path) {
          return await browser.url(path);
        }
        return await browser.url('');
      },
    );
  }
}
