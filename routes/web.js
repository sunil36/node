 //require homecontroller here
 const homecontroller=require("../app/http/controller/homecontroller");
 const authcontroller=require("../app/http/controller/authcontroller");
 const cartController=require("../app/http/controller/customer/cartController");


 function initRoutes(app){
     app.get('/',homecontroller().index);
     app.get('/login',authcontroller().login);
     app.post('/login',authcontroller().postLogin);
     app.get('/register',authcontroller().register);
     app.post('/register',authcontroller().postRegister);
    app.get('/cart',cartController().index);
    app.post('/update-cart',cartController().update)
    // for getting form data using post method
 }

 module.exports=initRoutes;