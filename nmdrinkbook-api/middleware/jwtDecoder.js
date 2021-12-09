import jwt_decode from "jwt-decode";

var jwtDecoder = function (req, res, next) {
    var authHeader = req.headers.authorization
    if (authHeader) {
        var token = authHeader.substring(7, authHeader.length)
        var decoded = jwt_decode(token)
        if (req.method === 'POST') {
            req.createdBy = decoded['preferred_username']
            req.modifiedBy = decoded['preferred_username']
        } else if (req.method === 'PUT') {
            req.modifiedBy = decoded['preferred_username']
        }
    }
    next()
}

export default jwtDecoder