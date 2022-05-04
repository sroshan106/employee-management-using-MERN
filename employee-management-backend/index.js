const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const req = require("express/lib/request");

const app=express();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlEncodedParser );

app.post('/register', function(req, res) {
    console.log(req)
    res.status(200).json(req.body);
})


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./model/user");

// async function createNewUser() {
//     const customer= new User({username: 'new customer',password: 'new address',email: 'customer1@new.com',});
//     const result = await customer.save();
//     console.log(result);
// }
// createNewUser();


app.listen(4600);