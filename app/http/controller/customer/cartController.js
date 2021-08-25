function cartController(){
    return{
        index(reqestObject,responseObject){
            responseObject.render("customers/cart");
        }
    }
}
module.exports=cartController;