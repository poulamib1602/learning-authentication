const express = require('express');
const { connectMongoose } = require('./database');
const User = require("./module");
const ejs = require('ejs');
const passport = require('passport');
const { initializingPassport, isAuthenticated } = require('./passportConfig');
const expressSession = require('express-session');
const registerUser = require('./controller');
const app = express();
app.set("view engine", "ejs");
connectMongoose();
initializingPassport(passport);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());
app.get('/',(req,res)=>{
    res.render("ind");
})
app.get("/register", (req,res)=>{
    res.render("register")
});
app.get("/login", (req,res)=>{
    res.render("login")
});
app.post('/register', registerUser)
app.post("/login", passport.authenticate("local",{failureRedirect:'/login'}), async(req,res)=>{
});
app.get("/profile",isAuthenticated, (req,res)=>{
    res.send(req.user)
})
app.listen(5000, (req,res)=>{
    console.log ("app is runing on 5000")
})