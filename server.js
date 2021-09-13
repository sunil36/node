require("dotenv").config();
const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
const expressLayout=require("express-ejs-layouts");
const session =require("express-session");
const flash =require("express-flash");
const mongoose=require("mongoose");
const MongoDbStore = require('connect-mongo')
const port =process.env.port|| 3000;
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());

// Database connection
const URL='mongodb://localhost/pizza'
mongoose.connect(URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});
//config session store

// config session here
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDbStore.create({
    mongoUrl: process.env.MONGO_URI,
    collection: 'sessions'
      
  }),
  saveUninitialized: false,
  cookie: { maxAge:1000*60*60*24  }
}))
app.use(flash());
//global midleware
app.use((req, res, next) => {
    res.locals.session = req.session
   
    next()
})

// set layout 
app.use(expressLayout);
app.set('views',path.join(__dirname,"/resources/views"));
app.set('view engine','ejs');
// set layout end 
//getting route data of web.js file here
require('./routes/web')(app);
//end here

//listen port here
app.listen(port,()=>{
    console.log(`listing to port ${port}`);
})