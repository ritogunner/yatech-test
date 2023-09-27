const {isTokenValid, isTokenExpired} = require('./token')

function verifyAccessToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {

        const claims = isTokenValid(token.replace('Bearer ', ''))
        isTokenExpired(claims)
        req.user = claims;
        next();
    } catch (err) {
        console.log(err)
        return res.status(403).json({ message: 'Invalid access token' });
    }
}

module.exports = verifyAccessToken