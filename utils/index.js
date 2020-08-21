const extractEmails = (str, mailToOnly = false) => {
    if (mailToOnly) {
        return text.match(/(mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    } else {
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    }
};

const Utils = {
    extractEmails: extractEmails
}

module.exports.Utils = Utils;