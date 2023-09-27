const express = require('express');
const bodyParser = require('body-parser');
const verifyAccessToken = require('./auth/middleware');
const {generateAccessToken, generateRefreshToken, claimToken, isTokenExpired} = require('./auth/token')
const {addRefreshToken, getUserByUsername, getUserById, deleteRefreshToken} = require('./db')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Endpoint to authenticate and issue an access token and refresh token
app.post('/login', (req, res) => {
    try {
        
        const { username, password } = req.body;
    
        // Check if the provided username and password are valid
        const user = getUserByUsername(username)
    
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if(user.password != password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Generate an access token
        const accessToken = generateAccessToken(user);
    
        // Generate a refresh token
        const refreshToken = generateRefreshToken(user);
        addRefreshToken(user, refreshToken)
    
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.log(error)
        res.status(401).json({message: "something went wrong"})
    }
});

// Endpoint to refresh an access token using a valid refresh token
app.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    try {

        const claims = claimToken(refreshToken)

        if(!claims) {
            return res.status(401).json({message: 'invalid refresh token'})
        }
    
        isTokenExpired(claims)

        // Find the user associated with the refresh token
        const user = getUserById(claims.userId)
    
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    
        // Generate a new access token
        const accessToken = generateAccessToken(user)

        // Generate a refresh token
        const newRefreshToken = generateRefreshToken(user);
        addRefreshToken(newRefreshToken)
    
        res.json({ accessToken });
    } catch(error) {
        if (error.message == "Token expired") {
            deleteRefreshToken(user, refreshToken)
        }
        res.status(401).json({ message: 'invalid refresh token' })
    }
});

//protected route
app.get('/protected', verifyAccessToken, (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`server start at port ${process.env.PORT || 3001}`)
})