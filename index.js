const express = require('express');
const { connectMongoose, User } = require('./database');
const ejs = require('ejs');
const passport = require('passport');
const { initializingPassport, isAuthenticated } = require('./passportConfig');
const expressSession = require('express-session');
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

app.post('/register', async(req,res)=>{

    const user = await User.findOne({username: req.body.username});
    if (user) return res.status(400).send("user already exists");

    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
    
})

app.post("/login", passport.authenticate("local",{failureRedirect:'/login'}), async(req,res)=>{

});

app.get("/profile",isAuthenticated, (req,res)=>{
    res.send(req.user)
})


app.listen(5000, (req,res)=>{
    console.log ("app is runing on 5000")
})