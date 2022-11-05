const { generateJWT } = require("../helpers/generate.jwt");
const User = require("../models/user");
//const bcryptjs= require("bcryptjs")

const login = async (req, res) => {

const {email, password} = req.body;

try {
    const user = await User.findOne({email});

    if (!user) {
        return res.status(400).json({msg:"Email/Password incorrect"})        
    }
    if (!user.status) {
        return res.status(400).json({msg:"Email/Password incorrect-status"})        
    }

/*     const validatePassword = bcryptjs.compareSync(password, user.password);
    if(!validatePassword){
        return res.status(400).json({msg:"Email/Password incorrect-password"})        
    } */

    const token = await generateJWT(user.id)

    res.json({user, token})
} catch (error) {
    console.log(error)
    res.status(500).json({msg:"speak to the admin"})
}
}

module.exports = {login}