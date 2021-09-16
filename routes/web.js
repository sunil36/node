 //require homecontroller here
 const homecontroller=require("../app/http/controller/homecontroller");
 const authcontroller=require("../app/http/controller/authcontroller");
 const cartController=require("../app/http/controller/customer/cartController");
 const orderController=require("../app/http/controller/customer/orderController");

//  const guest =require("../app/http/middleware/guest");
 const guest = require('../app/http/middlewares/guest')


 function initRoutes(app){
     app.get('/',homecontroller().index);
     app.get('/login',guest,authcontroller().login);
     app.post('/login',authcontroller().postLogin);
     app.get('/register',guest,authcontroller().register);
     app.post('/register',authcontroller().postRegister);
     app.post('/logout',authcontroller().logout);
    app.get('/cart',cartController().index);
    app.post('/update-cart',cartController().update);
    app.post('/orders', orderController().store)
    // for getting form data using post method
 }

 module.exports=initRoutes;