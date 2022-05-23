export const getPageTitle = (pageTitle: string) => `language app - ${pageTitle}`;

export class LocalStorage {
  setLocale(lang: string) {
    window.localStorage.setItem('locale',lang);
  }

  getLocale() {
    return window.localStorage.getItem('locale');
  }

  getRefreshToken() {
    return localStorage.getItem('auth_token');
  }

  getTheme() {
    return localStorage.getItem('color_theme');
  }
}
