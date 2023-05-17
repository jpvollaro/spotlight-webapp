import { AppPage } from './app.po';

describe('UITK Welcome Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('OPI UITK Boot');
  });
});
