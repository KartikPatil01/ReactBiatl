const jwt = require("jsonwebtoken");
const Admin = require('../models/adminSchema');

const adminAuthentication = async (req, res, next) =>{

    try {

        const token = req.cookies.jwtAdmin;
        const verifyToken = jwt.verify(token, "Vo7AcPRMvjb3b5SUHx73vinnPp90BBEStC7*******");
        const rootAdmin = await Admin.findOne({_id: verifyToken._id, "tokens.token":token});

        if(!rootAdmin){ throw new Error('Admin not found')}

        req.token = token;
        req.rootAdmin = rootAdmin;
        req.adminID = rootAdmin._id;

        next();

    } catch (error) {
        res.status(401).send('Unautorized: No token provided ')
        console.log(error);
    }
}

module.exports = adminAuthentication
