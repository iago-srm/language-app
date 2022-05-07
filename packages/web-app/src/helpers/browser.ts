export const getPageTitle = (pageTitle: string) => `language app - ${pageTitle}`;

export class LocalStorage {
  setLanguage(lang: string) {
    window.localStorage.setItem('preferred-language',lang);
  }

  getLanguage() {
    return window.localStorage.getItem('preferred-language');
  }

  getRefreshToken() {
    return window.localStorage.getItem('auth_token');
  }
}
