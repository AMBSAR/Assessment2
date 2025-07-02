import { IEPModuleData } from './common-classes';

describe('CommonClasses', () => {
  it('should create an instance', () => {
    expect(new IEPModuleData('', '', '')).toBeTruthy();
  });
});
