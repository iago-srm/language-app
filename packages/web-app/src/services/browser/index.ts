export const getPageTitle = (pageTitle: string) => `language app - ${pageTitle}`;

export class LocalStorage {
  setLanguage(lang: string) {
    window.localStorage.setItem('language',lang);
  }

  getLanguage() {
    return window.localStorage.getItem('language');
  }

  getRefreshToken() {
    return localStorage.getItem('language-app.token');
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

  setRefreshToken(token: string) {
    localStorage.setItem('language-app.token', token);
  }

  deleteRefreshToken() {
    localStorage.removeItem('language-app.token');
  }
}
