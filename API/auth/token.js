const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_EXPIRED = '15m';
const REFRESH_TOKEN_EXPIRED = '7d';
const ACCESS_SECRET_KEY = "thisissecret1"; // should be retrieve from .env (environment)
const REFRESH_TOKEN_SECRET_KEY = "thisissecret2"

function generateToken(user, expiration, secret = ACCESS_SECRET_KEY) {
    return jwt.sign({ userId: user.id }, secret, { expiresIn: expiration });
}

function generateAccessToken(user) {
    return generateToken(user, ACCESS_TOKEN_EXPIRED)
}

function generateRefreshToken(user) {
    return generateToken(user, REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_SECRET_KEY)
}

function claimToken(token) {
    const claim = jwt.decode(token)
    return claim

}

function isTokenValid(token) {
    const claim = jwt.verify(token, ACCESS_SECRET_KEY);
    return claim
}

function isTokenExpired(claim) {
    if(claim.exp < (new Date().getTime() / 1000)) {
        throw new Error('Token expired')
    }
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    claimToken,
    isTokenExpired,
    isTokenValid
}