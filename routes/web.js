 //require homecontroller here
 const homecontroller=require("../app/http/controller/homecontroller");
 const authcontroller=require("../app/http/controller/authcontroller");
 const cartController=require("../app/http/controller/customer/cartController");


 function initRoutes(app){
     app.get('/',homecontroller().index);
     app.get('/login',authcontroller().login);
     app.get('/register',authcontroller().register);
    app.get('/cart',cartController().index);
    // for getting form data using post method
 }

 module.exports=initRoutes;