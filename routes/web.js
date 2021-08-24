 function initRoutes(app){
    app.get('/',(reqestObject,responseObject)=>{
        responseObject.render("home");
    });
    app.get('/cart',(reqestObject,responseObject)=>{
        responseObject.render("customers/cart");
    });
    app.get('/login',(reqestObject,responseObject)=>{
         responseObject.render("auth/login");
    });
    app.get('/register',(reqestObject,responseObject)=>{
        responseObject.render("auth/register");
    });
 }

 module.exports=initRoutes;