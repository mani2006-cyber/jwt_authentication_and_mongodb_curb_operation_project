const jwt = require("jsonwebtoken");

const secret = "897yr928ur2jioj";

function gettoken(user) {

    const { username } = user;

    if (!username) {

        throw new Error("username required");

    }

    const token = jwt.sign({ username }, secret, { expiresIn: "1h" });

    return token;
}


function verify(req, res, next) {

    //const auth = req.headers['authorization'];

    const token = req.cookies.token;

    const username = req.cookies.username;

    /*if (!auth) {
        return res.status(403).json({ message: "token is missing" });
    }

    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
*/
    if (!token) {
        return res.status(403).json({ message: " ... token is missing ... " });
    }

    try {
        const decode = jwt.verify(token, secret);

        req.user = decode;

        next();


    } catch (err) {

        res.status(401).json({ message: "authentication failed " });

    }
}


module.exports = { verify, gettoken };