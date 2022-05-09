const mongoose = require("mongoose");
require('dotenv').config();
const connection = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB has been connected"))
.catch((err) => console.log(err));


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
}, {timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = User;
