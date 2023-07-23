const {clearHash} = require('../services/cache');

module.exports = async (req, res, next) => {
    next();
    if([200,201,304].includes(res.statusCode)){
        clearHash(req.user.id);
    }
}