const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    // console.log(authHeader); 
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            // console.log('token decoded',decoded)
            req.user = decoded.user;
            next();
        }
    );
}

// const verifyJWTDoctor = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) return res.sendStatus(401);
//     // console.log(authHeader); 
//     const token = authHeader.split(' ')[1];
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             console.log("decc", decoded.id)
//             // if(decoded.role!="doctor") return res.sendStatus(403);
//             if (err) return res.sendStatus(403); //invalid token
//             // console.log('token decoded',decoded)
//             req.user = decoded.id;
//             next();
//         }
//     );
// }

module.exports = verifyJWT
// module.exports = verifyJWTDoctor