import Polyglot from 'node-polyglot';

export const startPolyglot = (messages) => { 
    return (req, _, next) => {
        const locale = req.headers["accept-language"] || "en-US";
        req.polyglot = new Polyglot();
        for(let lang in messages) {
            if(locale.split('-')[0] === lang) {
                req.polyglot.extend(messages[lang])
            }
        }
        next();
    }; 
};