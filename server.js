const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
const expressLayout=require("express-ejs-layouts");
 const mongoose=require("mongoose");
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