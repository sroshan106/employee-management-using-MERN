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
    if ( password!==rePassword ) {
        res.json({message:"Password does not match"})
    }


    const emailExists =  await User.findOne({email:email});
    if ( emailExists ) {
        res.json({message:"Email already exist"})
    } else {
        password = await bcrypt.hash(req.body.password, 10);

        const dbUser = new User({
            username: name.toLowerCase(),
            email:email.toLowerCase(),
            password:password
        })
        dbUser.save();
        res.status(200).json('employee saved');
    }
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

            jwt.sign(payload_data,'I am a secret token',{expiresIn:86400*30},(err,token)=> {
                if(err){
                    res.json({message:err})
                }
                res.json({message:"Success",token:"Bearer " + token});
            })
        }  else{
            res.json({message:"Invalid Password"})
        }
    } else {
        res.json({message:'User does not exist'})
    }
})

function verifyUser(req,res, next){
    const token = req.headers["x-access-token"]?.split(' ')[1];
    // console.log(token);
    if(token) {
        jwt.verify(token, 'I am a secret token', (err,decoded) => {
            
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
    res.json({isLoggedIn:true,username:req.user.username})
})
app.listen(4600);