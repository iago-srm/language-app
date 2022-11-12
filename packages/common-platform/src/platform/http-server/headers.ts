const getLanguage = (language: string) => {
  if (!["en", "pt"].includes(language)) return "en";
  return language;
};
export const HeaderParser = {
  getPreferredLanguage: (req) => {
    const proposals = req.headers["x-accept-language"] || "en;q=1";
    const [lang] = proposals.split(";");
    return getLanguage(lang);
  },
};
