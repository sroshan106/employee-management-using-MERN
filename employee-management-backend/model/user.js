const mongoose = require("mongoose");

// mongoose.set('bufferCommands', false);
mongoose.connect("mongodb://localhost:27017/employeeDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("db connected");
})


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
}, {timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = User;
