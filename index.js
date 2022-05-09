const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const req = require("express/lib/request");
const validatorEmail = require("email-validator");
const path = require("path");
require("dotenv").config();


const app=express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "employee-management", "build")));
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlEncodedParser );

// app.use(cors())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, X-Access-Token');
    next();
});

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./model/user");

app.post('/register', async function(req, res) {

    let {name,email,password, rePassword} = req.body;

    if ( '' === name || '' === email || '' === password || ''===rePassword ){
        res.json({isSaved:false, message:"**Please check inputs and try again"})
    }
    if ( ! validatorEmail.validate(email) ) {
        res.json({isSaved:false, message:"**Invalid Email"})
    }
    
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    if ( ! validPassword.test(password) ){
        res.json({isSaved:false,message:"**Password does not match criteria"})
    }
    if ( password!==rePassword ) {
        res.json({isSaved:false,message:"**Password does not match"})
    }


    const emailExists =  await User.findOne({email:email});
    if ( emailExists ) {
        res.json({isSaved:false, message:"**Email already exist"});
    } else {
        password = await bcrypt.hash(req.body.password, 10);

        const dbUser = new User({
            username: name.toLowerCase(),
            email:email.toLowerCase(),
            password:password
        })
        dbUser.save();
        res.status(200).json({isSaved:true});
    }
    res.json({isSaved:false,message:"**Some error occured"});
})

app.post('/login', async function(req,res) {

    let {email, password } = req.body;

    const dbUser =  await User.findOne({email:email.toLowerCase()});
    if ( dbUser ) {
        
        if ( await bcrypt.compare( password, dbUser.password ) ) {

            const payload_data = {
                id: dbUser._id,
                username:dbUser.username,
                email:dbUser.email
            }

            jwt.sign(payload_data,process.env.JWT_SECRET,{expiresIn:86400*30},(err,token)=> {
                if(err){
                    res.json({message:err})
                }
                res.json({isValid:true, message:"Success",token:"Bearer " + token});
            })
        }  else{
            res.json({isValid:false, message:"Invalid email or password*"})
        }
    } else {
        res.json({isValid:false, message:'Invalid email or password*'})
    }
})


function verifyUser(req,res, next){
    const token = req.headers["x-access-token"]?.split(' ')[1];
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
            
            if(err) {
                return res.json({
                    isLoggedIn:false,
                    message:"Failed to authenticate the user"
                })
            }
            req.user={}
            req.user.id = decoded.id,
            req.user.username = decoded.username,
            req.user.email = decoded.email
            next()
        } )
    } else{
        res.json({message:"No token found", isLoggedIn:false})
    }
}

app.get('/homepage', verifyUser, (req,res) => {
    res.json({isLoggedIn:true,username:req.user.username,id:req.user.id, email:req.user.email})
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port);