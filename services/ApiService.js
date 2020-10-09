const email = require('node-email-extractor').default;

class ApiService {
    
    constructor() {
        //
    }
    
    scrap = (siteString, processRootUrlOnly, searchStrength) => {
        return new Promise(
            function (resolve, reject) {
                const processSite = (site, processRootUrlOnly, searchStrength) => {
                    return new Promise(
                        function (resolve, reject) {
                            try {
                                //well formed url
                                if (!(site.includes('https://') || site.includes('http://'))) {
                                    site = 'http://'+site;
                                }

                                //processRootUrlOnly 
                                if (processRootUrlOnly) {
                                    site = (new URL(site)).origin;
                                }
                                //searchStrength process
                                if (searchStrength === 'deep') {
                                    try {
                                        scrapSite(site)
                                        .then(emails => {
                                            if (emails === null) {
                                                emails = [];
                                            } else {
                                                emails = [...new Set(emails)]; //unique array
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
                                } else if (searchStrength === 'quick') {
                                    try {
                                        scrapSite(site)
                                        .then(emails => {
                                            if (emails === null) {
                                                emails = [];
                                            } else {
                                                emails = emails.length ? [emails[0]] : [];
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
                                }
                            } catch (error) {
                                console.log(error);
                                resolve(null);
                            }
                            
                        }
                    );
                };

                const processSiteArray = async (siteArray, processRootUrlOnly, searchStrength) => {
                    return Promise.all(siteArray.map(site => processSite(site, processRootUrlOnly, searchStrength)))
                };

                const scrapSite = async (site) => {
                    return new Promise(
                        function (resolve, reject) {
                            email.url(site)
                            .then(result => {
                                if (result && typeof result.emails !== 'undefined' && result.emails !== null) {
                                    resolve(result.emails);
                                } else {
                                    resolve([]);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                    );
                }

               if (typeof siteString === 'undefined') {
                    throw Error("Site name is required"); 
                }

                let siteArray = siteString.split("\n").filter(site => site !== '');
                
                processSiteArray(siteArray, processRootUrlOnly, searchStrength).then(result => {
                    resolve(result)
                });
            }
        );
    };
}

module.exports = ApiService;
