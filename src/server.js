// import Home from "./components/Home";
// import * as express from "express"
// import bodyParser from "body-parser";
// import { Schema, connect, Mongoose as mongoose } from "mongoose";

const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const app = express();
app.use(express.static("public"))
app.use(express.json()); //replaces body-parser
app.use(cors())
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose")
const Schema = mongoose.Schema;

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
mongoose.set("useCreateIndex", true);

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema ({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema) //automatically creates a "users" collection inside your DB

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/secrets", (req, res) => {
    let final = finder(req.body.username, req.body.password, req, res);
    if (final) {
        res.status(200).send({result: "success", username: req.body.username});
    }
})


app.post("/register", (req, res) => {
    /*const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })

    console.log(newUser);

    newUser.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("SUCCESS");
        }
    })*/

    User.register({username: req.body.username},
        req.body.password, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, () => {
                    console.log("SUCCESS, check your DB");
                    res.status(200).send({result: "success", username: req.body.username});
                })
            }
        })
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password);

    finder(username, password, req, res);
})



const finder = (username, password, request, response) => {
    User.findOne({username}, (err, foundUser) => {
        if (foundUser) {
            if (foundUser.password === password) {
                response.status(200).send({result: "success", username});
                return "SUCCESS"
            } else {
                response.status(200).send({result: "success", username});
                return "FAILURE: wrong password"
            }
        } else {
            response.status(200).send({result: "success", username});
            return "FAILURE: no such user"
        }
    })
}

app.listen(4000, (req, res) => {
    console.log("Server running on port 4000");
})