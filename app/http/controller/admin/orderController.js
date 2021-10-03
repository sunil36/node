const order = require("../../../models/order")

function orderController(){
    return{
        index(req,res){
            order.find({status:{$ne:"completed"}},null,{sort:{'createAt':-1}}).populate('customerId', '-password').exec((err,orders)=>{
            //  check request is ajax call or not
            if(req.xhr){
                return res.json(orders)
            }else{
                return res.render("admin/orders")
            }

         })
        }
    }
}

module.exports=orderController;