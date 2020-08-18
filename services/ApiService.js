const utils = require('../utils/index');
const nodeEmailExtractor = require('node-email-extractor').default;

class ApiService {
    
    constructor() {
        //
    }
    
    scrap = (siteString, acceptRootUrlOnly, searchStrength) => {
        return new Promise(
            function (resolve, reject) {
                const processSite = (site, acceptRootUrlOnly, searchStrength) => {
                    return new Promise(
                        function (resolve, reject) {
                            try {
                                //well formed url
                                if (!(site.includes('https://') || site.includes('http://'))) {
                                    site = 'http://'+site;
                                }

                                //acceptRootUrlOnly process
                                if (acceptRootUrlOnly) {
                                    site = (new URL(site)).origin;
                                }
                                //searchStrength process
                                if (searchStrength === 'deep') {
                                    try {
                                        nodeEmailExtractor.url(site)
                                        .then( result => {
                                            var emails = [];
                                            if (typeof result.emails !== 'undefined') {
                                                emails = result.emails;
                                            }
                                            var myObject = {
                                                site: site,
                                                emails: emails,
                                                totalEmail: emails.length
                                            }
                                            resolve(myObject);
                                        }).catch(error => {
                                            console.log(error);
                                            resolve({
                                                site: site,
                                                emails: [],
                                                totalEmail: 0
                                            });
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        resolve({
                                            site: site,
                                            emails: [],
                                            totalEmail: 0
                                        });
                                    }
                                } else {

                                }
                            } catch (error) {
                                console.log(error);
                                resolve(null);
                            }
                            
                        }
                    );
                };

                const processSiteArray = async (siteArray, acceptRootUrlOnly, searchStrength) => {
                    return Promise.all(siteArray.map(site => processSite(site, acceptRootUrlOnly, searchStrength)))
                };

               if (typeof siteString === 'undefined') {
                    throw Error("Site name is required"); 
                }
                if (typeof acceptRootUrlOnly === 'undefined') {
                    const acceptRootUrlOnly = false;
                }
                if (typeof searchStrength === 'undefined') {
                    const searchStrength = 'deep';
                }

                let siteArray = siteString.split("\n").filter(site => site !== '');
                
                processSiteArray(siteArray, acceptRootUrlOnly, searchStrength).then(result => {
                    resolve(result)
                });
            }
        );
        
        
        
    };

    
}

module.exports = ApiService;
