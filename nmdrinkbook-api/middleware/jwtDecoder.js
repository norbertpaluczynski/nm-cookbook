import jwt_decode from "jwt-decode";

var jwtDecoder = function (req, res, next) {
    var authHeader = req.headers.authorization
    if (authHeader) {
        var token = authHeader.substring(7, authHeader.length)
        var decoded = jwt_decode(token)
        console.log('Username from JWT token: ', decoded['preferred_username'])
    }
    next()
}

export default jwtDecoder