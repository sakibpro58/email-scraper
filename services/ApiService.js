const email = require('node-email-extractor').default;

class ApiService {
    
    constructor() {
        //
    }
    
    scrap = (siteString, prcessRootUrlOnly, searchStrength) => {
        return new Promise(
            function (resolve, reject) {
                const processSite = (site, prcessRootUrlOnly, searchStrength) => {
                    return new Promise(
                        function (resolve, reject) {
                            try {
                                //well formed url
                                if (!(site.includes('https://') || site.includes('http://'))) {
                                    site = 'http://'+site;
                                }

                                //prcessRootUrlOnly 
                                if (prcessRootUrlOnly) {
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

                const processSiteArray = async (siteArray, prcessRootUrlOnly, searchStrength) => {
                    return Promise.all(siteArray.map(site => processSite(site, prcessRootUrlOnly, searchStrength)))
                };

                const scrapSite = async (site) => {
                    return new Promise(
                        function (resolve, reject) {
                            email.url(site)
                            .then(result => {
                                resolve(result.emails);
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
                if (typeof prcessRootUrlOnly === 'undefined') {
                    const prcessRootUrlOnly = false;
                }
                if (typeof searchStrength === 'undefined') {
                    const searchStrength = 'deep';
                }

                let siteArray = siteString.split("\n").filter(site => site !== '');
                
                processSiteArray(siteArray, prcessRootUrlOnly, searchStrength).then(result => {
                    resolve(result)
                });
            }
        );
    };
}

module.exports = ApiService;
