var ApiService = require('../services/ApiService')    

exports.scrap = async function (req, res, next) {
    try {
        const site = req.body.site;
        const apiService = new ApiService();
        var response = await apiService.scrap(site);

        return res.status(200).json({ 
            status: 200,
            data: response
        });
    } catch (e) {
        return res.status(401).json({ 
            status: 401, 
            data: {
                status: 'error',
                result: e.message
            } 
        });
    }
}