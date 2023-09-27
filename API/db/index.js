// In-memory database for storing user data and refresh tokens
const users = [
    { id: 1, username: 'user1', password: 'password1', refreshTokens: [] },
]

function getUserByUsername(username) {
    return users.find((u) => u.username === username);
}

function getUserById(userId) {
    return users.find((u) => u.id === userId)
}

function addUser(user) {
    users.push(user)
}

function addRefreshToken(user, token) {
    const currentUser = getUserByUsername(user.username);
    if (currentUser) {
        currentUser.refreshTokens.push(token)
        return true
    }
    return false
}

function addAccessToken(user, token) {
    const currentUser = getUserById(user.id)
    if(currentUser) {
        currentUser.accessToken = token
        return true
    }
    return false
}

function deleteRefreshToken(user, token) {
    const currentTokenIdx = user.refreshTokens.findIndex((t) => t === token)
    if(currentTokenIdx >= 0) {
        user.refreshTokens.splice(index, 1)
    }
}

module.exports = {
    getUserByUsername,
    addUser,
    getUserById,
    addRefreshToken,
    addAccessToken,
    deleteRefreshToken
}