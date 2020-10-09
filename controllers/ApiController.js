var ApiService = require('../services/ApiService')    

exports.scrap = async function (req, res, next) {
    try {
        const siteString = req.body.site;
        const processRootUrlOnly = req.body.processRootUrlOnly;
        const searchStrength = req.body.searchStrength;
        const apiService = new ApiService();
        var response = await apiService.scrap(siteString, processRootUrlOnly, searchStrength);

        return res.status(200).json({ 
            status: 200,
            result: response
        });
    } catch (e) {
        return res.status(401).json({ 
            status: 401, 
            result: e.message
        });
    }
}