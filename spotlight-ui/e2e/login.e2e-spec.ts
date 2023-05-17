import { LoginPage  } from './login.po';

describe('Login/Logout', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  describe('login', () => {
    it('should login as test user', () => {
      page.navigateTo();
      expect(page.getUserName()).toEqual('Test User');
    });
  });
  describe('Logout', () => {
    it('should logout test user', () => {
      page.openUserDropdown().then(() => {
        page.logoutLink().then(() => {
          expect(page).toBeTruthy();
        });
      });
    });
  });
});

