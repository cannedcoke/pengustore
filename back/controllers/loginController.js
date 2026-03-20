const User = require("../models/userModel")
const Product = require("../models/productModel")
const bcrypt = require("bcrypt")
const crypto = require("crypto");
const Session = require("../models/sessionModel")


exports.login = async (req,res) => {
    const {email,password} = req.body
    
    const findUser = await User.findOne({email})

    if(!findUser){
        return res.send("user not found")
    }
    
    const match = await bcrypt.compare(password, findUser.password)

    if (!match) {
        return res.send("wrong password")
    }

        const sessionId = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await Session.create({
            sessionId,
            userId:findUser._id,
            expiresAt
        })

        res.cookie("session_id",sessionId, {
            httpOnly:true,
            secure: true, 
            sameSite: "strict",
            maxAge:60 * 60 * 1000
        })
             

    return res.redirect("dashboard");
    


}
