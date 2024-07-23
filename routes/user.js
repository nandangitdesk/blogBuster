const { Router } = require("express")
const User = require("../models/user")

const router = Router()

router.get("/signup" , (req,res)=>{
    res.render("signup")
})

router.get("/signin" ,(req,res)=>{
    res.render("signin")
})

router.post("/signup" , async (req,res)=>{
    const {fullName , email , password} = req.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

router.post("/signin" , async (req,res)=>{
    const { email , password } = req.body
    try {
        const token = await User.matchPasswordAndGenrateToken(email , password)
    
        return res.cookie("token",token).redirect("/")
    } catch (error) {
        res.render("signin" , {
            error:"Incorrect password or email"
        })
    }
})

router.get("/logout" ,(req,res)=>{
    res.clearCookie("token").redirect("/")
})

module.exports = router