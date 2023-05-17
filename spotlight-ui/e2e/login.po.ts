import { browser, by, element, ElementFinder } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getUserName() {
    return element(by.css('#welcome > span')).getText();
  }

  openUserDropdown() {
    return element(by.id('welcome')).click();
  }

  logoutLink() {
    return element(by.id('GlobalNav_Logout')).click();
  }

}
