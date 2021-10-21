require("dotenv").config();
const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
const expressLayout=require("express-ejs-layouts");
const session =require("express-session");
const flash =require("express-flash");
const mongoose=require("mongoose");
const passport=require("passport");
const Emitter=require("events")
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
//event emitter
 const eventEmitter=new Emitter()
 //bind eventEmitter to use all over project
 app.set("eventEmitter",eventEmitter)
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
//passport
const passportInit=require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
//global midleware
app.use((req, res, next) => {
    res.locals.session = req.session
    // set login user inside session 
    res.locals.user= req.user
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
const server=app.listen(port,()=>{
    console.log(`listing to port ${port}`);
})


//make the server connection with socket 
const io  = require("socket.io")(server);
io.on('connection', (socket) => {
  //get join from server side which has  orderid and on the socket to join 
  socket.on('join',(orderId)=>{
   
    socket.join(orderId)

  })
});
//get orderupdate from statuscontroller emitter
eventEmitter.on('orderUpdate',(data)=>{
  io.to(`order_${data.id}`).emit('orderUpdate',data)
})
