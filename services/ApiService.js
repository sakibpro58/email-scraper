var request = require("request");
var afterLoad = require("after-load")
var text=afterLoad('https://www.alexander-fischer-online.net/weblinks/tools-fuer-webmaster.html');


function extractEmails ( text ){
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    }
     
    console.log(extractEmails(text));
class ApiService {
    
    constructor() {
        //
    }
    
    scrap = (siteString, acceptRootUrlOnly, searchStrength, fetchMailToOnly) => {
        return new Promise(
            function (resolve, reject) {
                const processSite = (site, acceptRootUrlOnly, searchStrength, fetchMailToOnly) => {
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
                                        scrapSite(site, fetchMailToOnly)
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
                                        scrapSite(site, fetchMailToOnly)
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

                const processSiteArray = async (siteArray, acceptRootUrlOnly, searchStrength, fetchMailToOnly) => {
                    return Promise.all(siteArray.map(site => processSite(site, acceptRootUrlOnly, searchStrength, fetchMailToOnly)))
                };

                const scrapSite = async (site, fetchMailToOnly = false) => {
                    return new Promise(
                        function (resolve, reject) {
                            request({uri: site}, 
                                function(error, response, body) {
                                    if (fetchMailToOnly) {
                                        resolve(body.match(/(mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi));
                                    } else {
                                        resolve(body.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi));
                                    }
                                });
                        }
                    );
                }

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
                
                processSiteArray(siteArray, acceptRootUrlOnly, searchStrength, fetchMailToOnly).then(result => {
                    resolve(result)
                });
            }
        );
    };
}

module.exports = ApiService;
