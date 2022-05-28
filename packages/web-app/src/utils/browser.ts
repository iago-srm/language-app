export const getPageTitle = (pageTitle: string) => `language app - ${pageTitle}`;

export class LocalStorage {
  setLanguage(lang: string) {
    window.localStorage.setItem('language',lang);
  }

  getLanguage() {
    return window.localStorage.getItem('language');
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

  setTheme(theme: string) {
    localStorage.setItem('color_theme', theme);
  }
}
