const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/userSchema');

//User signin route
module.exports = router.post('/signin', async(req, res)=>{
    
    try {
        let token;
        const { email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({error: "invalid crededntials"})
        }

        const userSignin = await User.findOne({ email: email });

        if (userSignin){
                const isSame = await bcrypt.compare(password, userSignin.password); 

                token = await userSignin.generateAuthToken();

                res.cookie("access", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                // console.log("token is generated",token);

                if(!isSame){
                    res.status(400).json({error: "invalid crededntials"})    
                }else{
                    res.json({message: "User Signin Successfully"})
                
                    // console.log("token is generated",token);
                }
        
        }else{
            res.status(400).json({error: "invalid crededntials"})
        }

        
    } catch (error) {
        console.log(error);
    }
});