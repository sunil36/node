require("dotenv").config();
const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
const expressLayout=require("express-ejs-layouts");
const session =require("express-session");
const flash =require("express-flash");
const mongoose=require("mongoose");
const MongoDBStore=require("connect-mongo")(session);
const port =process.env.port|| 3000;
app.use(express.static('public'));

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
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})
// config session here
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: new MongoDBStore({
    mongooseConnection: mongoose.connection
}),
  saveUninitialized: false,
  cookie: { maxAge:1000*60*60*24  }
}))
app.use(flash());
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