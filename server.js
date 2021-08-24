const express=require("express");
const app=express();
const ejs=require("ejs");
const path=require("path");
const expressLayout=require("express-ejs-layouts");
const port =process.env.port|| 3000;
app.use(express.static('public'));
// set layout 
app.use(expressLayout);
app.set('views',path.join(__dirname,"/resources/views"));
app.set('view engine','ejs');
// set layout end 
require('./routes/web')(app);
app.listen(port,()=>{
    console.log(`listing to port ${port}`);
})