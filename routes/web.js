 //require homecontroller here
 const homecontroller=require("../app/http/controller/homecontroller");
 const authcontroller=require("../app/http/controller/authcontroller");
 const cartController=require("../app/http/controller/customer/cartController");
 const orderController=require("../app/http/controller/customer/orderController");
 const AdminOrderController=require("../app/http/controller/admin/orderController");


//  const guest =require("../app/http/middleware/guest");
 const guest = require('../app/http/middlewares/guest');
 const auth = require('../app/http/middlewares/auth');
 const admin = require('../app/http/middlewares/admin');




 function initRoutes(app){
     app.get('/',homecontroller().index);
     app.get('/login',guest,authcontroller().login);
     app.post('/login',authcontroller().postLogin);
     app.get('/register',guest,authcontroller().register);
     app.post('/register',authcontroller().postRegister);
     app.post('/logout',authcontroller().logout);
    app.get('/cart',cartController().index);
    app.post('/update-cart',cartController().update);
    
    // for getting form data using post method
    // custmer routes  for orders
    app.post('/orders',auth, orderController().store);
    app.get('/customers/orders',auth,orderController().index);

    //admin order initRoutes

    app.get('/admin/orders',admin,AdminOrderController().index);

 }

 module.exports=initRoutes;