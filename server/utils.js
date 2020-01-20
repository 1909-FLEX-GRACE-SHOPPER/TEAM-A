//utility functions for server

//generate the sessionId
const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

//password hashing should go here too

module.exports = {
    generateSessionId,
}