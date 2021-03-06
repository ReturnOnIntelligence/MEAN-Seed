import { browser, element, by } from 'protractor';

describe('Home', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should have an input', () => {
    expect<any>(element(by.css('sd-home form input')).isPresent()).toEqual(true);
  });

  it('should add a name to the list using the form', () => {
    element(by.css('sd-home form input')).sendKeys('Tim Berners-Lee');
    element(by.css('sd-home form button')).click();

    expect<any>(element(by.css('sd-home ul')).getText())
      .toEqual('Tim Berners-Lee');
  });

});
