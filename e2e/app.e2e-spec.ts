import { NgFrontend2Page } from './app.po';

describe('ng-frontend2 App', () => {
  let page: NgFrontend2Page;

  beforeEach(() => {
    page = new NgFrontend2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
