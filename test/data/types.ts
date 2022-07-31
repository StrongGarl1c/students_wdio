export interface stepOptions {
  createStep?: boolean;
  takeScreenshot?: boolean;
  takeViewPortScreenshot?: boolean;
  customDescription?: string;
  customExpectation?: string;
  customActual?: string;
}

export interface LogFile {
  steps: {
    stepNumber: number;
    description: string;
    expected: string;
    actual: string;
    status: string;
    screenshot?: string;
    attachment?: JSON;
  }[];
}
