"use strict";
exports.__esModule = true;
exports.AuthRules = void 0;
exports.AuthRules = {
    PERSONID: {
        NAME: {
            MIN_LENGTH: 2,
            MAX_LENGTH: 70
        }
    },
    PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
};
