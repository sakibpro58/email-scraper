const utils = require('../utils/index');
const nodeEmailExtractor = require('node-email-extractor').default;

class ApiService {
    
    constructor() {
        //
    }
    
    scrap = async (site) => {
        if (typeof site === 'undefined') {
            throw Error("Site name is required"); 
        }

        try {
            const result = await nodeEmailExtractor.url(site);
            if (typeof result.emails !== 'undefined') {
               return {
                    status: 'success',
                    result: result.emails
                };
            } else {
                return {
                    status: 'error',
                    result: 'Invalid request while parsing'
                };
            }
        } catch (error) {
            throw Error(error);
        }
        
    };
}

module.exports = ApiService;
