//check if api is enabled from env
exports.api = function (req, res, next) {
    if (true) {
      next();
    } else {
      return res.status(404).json({ 
          status: 404, 
          message: 'Not Found.' 
      });
    }
}