const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const req = require("express/lib/request");
const validatorEmail = require("email-validator");


const app=express();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlEncodedParser );


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./model/user");

app.post('/register', async function(req, res) {

    let {name,email,password, rePassword} = req.body;

    if ( '' === name || '' === email || '' === password || ''===rePassword ){
        res.json({message:"Please check data and try again"})
    }
    if ( ! validatorEmail.validate(email) ) {
        res.json({message:"Invalid Email"})
    }
    
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    if ( ! validPassword.test(password) ){
        res.json({message:"Password does not match criteria"})
    }
    if (password!==rePassword ) {
        res.json({message:"Password does not match"})
    }


    const emailExists =  await User.findOne({email:email});
    if ( emailExists ) {
        res.json({message:"Email already exist"})
    } else {
        password = await bcrypt.hash(req.body.password, 10);

        const dbUser = new User({
            username: name,
            email:email,
            password:password
        })
        dbUser.save();
        res.status(200).json('employee saved');
    }
})

app.post('/login', async function(req,res) {
    console.log(req.body);
})

app.listen(4600);