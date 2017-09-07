import { browser, element, by } from 'protractor';

describe('About', () => {

  beforeEach(async () => {
    return await browser.get('/about');
  });

  it('should have correct feature heading', () => {
    expect<any>(element(by.css('sd-about h2')).getText()).toEqual('Features');
  });

});
