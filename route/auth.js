const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const user = mongoose.model("user")
const bcrypt = require("bcrypt")
const webtocken = require("jsonwebtoken")
const { JWT_SECRET_TOKEN } = require("../keys")
// const tokenvarify =require("../middleware/user")

router.post("/signup", (req, resp) => {
    const { name, email, password } = req.body
   
    if (!name || !email || !password) {
        return resp.json({ error: "pls enter all fields" })
        
    }
    user.findOne({ email: email })
        .then((savedinfo) => {
            if (savedinfo) {
                return resp.json({ error: "email already exist" })
            }
            bcrypt.hash(password, 8)
                .then(hashedp => {
                    const data = new user({
                        name,
                        email,
                        password: hashedp
                    })
                    data.save().then(() => {
                        resp.json({
                            massage: "data saved successfully"
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                })


        })
        .catch((err) => {
            console.log(err)
        })

})

router.post("/signin", (req, resp) => {
    const { email, password } = req.body
    if (!email || !password) {
        return resp.json({ error: "plzz enter both email and password" })
    }
    user.findOne({ email: email })
        .then(savedinfo => {
            if (!savedinfo) {
                return resp.json({ error: "invalid email orr passord" })
            }
            bcrypt.compare(password, savedinfo.password)
                .then(validpassword => {
                    if (validpassword) {
                        // return resp.json({massage:"user matched successfully"})
                        const usertocken = webtocken.sign({ _id: savedinfo._id }, JWT_SECRET_TOKEN)
                        resp.json({ Token: usertocken })
                    }
                    else {
                        resp.json({ error: "invalid email orr password" })

                    }
                })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(err => {
            console.log(err)
        })


})

module.exports = router