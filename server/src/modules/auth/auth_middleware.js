const jwt = require("jsonwebtoken");

//middleware that checks if user sends correct JWT token
function authMiddleware(req, res, next) {


    //http request
    //Authorization: Bearer TOKAN
    const authHeader = req.headers.authorization;

    //checks if user sent the correct request in correct form
    // (Bearer prefix is a JWT standard)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    //splits Bearer TOKEN into ['Bearer']['TOKEN']
    const token = authHeader.split(" ")[1];

    //verify the token with jwt_secret stored in .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        //req.userId = decoded.id;
        //changing it so req can now store user.id and user.role
        req.user = decoded 

        next();
    });
}

module.exports = authMiddleware;