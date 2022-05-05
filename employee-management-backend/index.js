const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const req = require("express/lib/request");

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
    console.log(req.headers);
    console.log(req.body);

    const {name,email,password, rePassword} = req.body;

    const emailExists =  await User.findOne({email:email});
    console.log(email);
    res.status(200).json(req.body);
})



// async function createNewUser() {
//     const customer= new User({username: 'new customer',password: 'new address',email: 'customer1@new.com',});
//     const result = await customer.save();
//     console.log(result);
// }
// createNewUser();


app.listen(4600);