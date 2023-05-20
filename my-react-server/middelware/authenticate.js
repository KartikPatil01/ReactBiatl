const jwt = require("jsonwebtoken");
const User = require('../models/userSchema');

const authenticate = async (req, res, next) =>{

    try {
// 
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwZGNmMjU0NDYxY2UzYTUwOGZlNTUiLCJpYXQiOjE2ODE5NzI1NzB9.yFe6x2P0joFCkx1GQbpWat8NT9olQxnI38vONiO_PvQ";
        console.log(token);
        const verifyToken = jwt.verify(token,"Vo7AcPRMvjb3b5SUHx73vinnPp90BBEStC7*******");

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token});
        if(!rootUser){ throw new Error('User not found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send({message : this.token});
        // console.log(error);
    }
}

module.exports = authenticate
