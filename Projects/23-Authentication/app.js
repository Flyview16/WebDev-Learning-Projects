require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const config = require("../config");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const mongoURI = config.mongodb.localUri;

mongoose.connect(mongoURI)
.then(() => console.log("Successfully connected to mongoDB"))
.catch((err) => console.error(err));


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Setting up encryption
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);


app.get("/", (req, res) =>{
    res.render("home");
})

app.get("/login", (req, res) =>{
    res.render("login");
})

app.get("/register", (req, res) =>{
    res.render("register");
})


app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save()
    .then(() => res.render("secrets"))
    .catch((err) => console.error(err));
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username})
    .then((foundUser) => {
        if(foundUser.password === password){
            res.render("secrets");
        };
    })
    .catch((err) => console.error(err));
})








app.listen(3000, () =>{
    console.log("Server running on port 3000");
})
