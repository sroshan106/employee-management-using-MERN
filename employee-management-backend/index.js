const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const req = require("express/lib/request");

const app=express();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlEncodedParser );


mongoose.connect("mongodb://localhost:27017/employeeDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("db connected");
})



const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./model/user");


app.post('/register', async(req,res) => {

    const user = req.body;
    console.log(user);
    // const takenUserName = await User.findOne({username:user.username});
    // const takenEmail = await User.findOne({email:user.email})

})

