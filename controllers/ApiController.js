var ApiService = require('../services/ApiService')    

exports.login = async function (req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(process.env.PASSWORD);
        console.log(password);
        
        const apiService = new ApiService();
        var response = await apiService.login(username, password);

        return res.status(200).json({ 
            status: 200,
            token: response
        });
    } catch (e) {
        return res.status(401).json({ 
            status: 401, 
            message: e.message 
        });
    }
}