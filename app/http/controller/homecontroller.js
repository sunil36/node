const Menu=require("../../models/menu");


function homeController(){
    return{
       async index(reqestObject,responseObject){
            const pizzas=await Menu.find();
            return responseObject.render("home",{pizza:pizzas})
            // Menu.find().then(function(pizza){
            //     console.log(pizza);
            //     responseObject.render("home",{pizza:pizza});
            // });
            
        }
    }
}
module.exports=homeController;