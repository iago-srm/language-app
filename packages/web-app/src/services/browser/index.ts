export const getPageTitle = (pageTitle: string) =>
  `language app - ${pageTitle}`;

export class LocalStorage {
  setLanguage(lang: string) {
    window.localStorage.setItem("language", lang);
  }

  getLanguage() {
    return window.localStorage.getItem("language");
  }

  getRefreshToken() {
    return localStorage.getItem("language-app.token");
  }

  getMode(defaultMode) {
    const storedMode = localStorage.getItem("color_mode");
    if (!storedMode) {
      localStorage.setItem("color_mode", defaultMode);
    }
    return storedMode || defaultMode;
  }

  setMode(mode: string) {
    localStorage.setItem("color_mode", mode);
  }

  setRefreshToken(token: string) {
    localStorage.setItem("language-app.token", token);
  }

  deleteRefreshToken() {
    localStorage.removeItem("language-app.token");
  }
}
