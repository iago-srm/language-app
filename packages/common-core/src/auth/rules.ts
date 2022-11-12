export const AuthRules = {
  PERSONID: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 70,
    },
  },
  // PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  PASSWORD_REGEX: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
};
