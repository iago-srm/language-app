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

  getTheme(defaultTheme) {
    const storedTheme = localStorage.getItem('color_theme');
    if(!storedTheme) {
      localStorage.setItem('color_theme', defaultTheme);
    }
    return storedTheme || defaultTheme;
  }
}
