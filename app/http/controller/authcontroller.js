function authController(){
    return{
        login(reqestObject,responseObject){
            responseObject.render("auth/login");
        },

        register(reqestObject,responseObject){
             responseObject.render("auth/register");
             }

    }
}
module.exports=authController;