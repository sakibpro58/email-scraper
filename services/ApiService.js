const utils = require('../utils/index');


class ApiService {
    
    constructor() {
        //
    }
    
    login = async (username, password) => {
        if (typeof username === 'undefined') {
            throw Error("Username is required"); 
        } else if (typeof password === 'undefined') {
            throw Error("Password is required");
        }

        if (username === process.env.SITE_USERNAME && password === process.env.SITE_PASSWORD) {
            return utils.randomString(32);
        } else {
            throw Error("Invalid Credentials");
        }
    };
}

module.exports = ApiService;
