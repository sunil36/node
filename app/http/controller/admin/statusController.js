const Order =require("../../../models/order")
function statusController(){
    return{
      update(req,res){
          Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
              if(err){
                  return res.redirect('/admin/orders');
              }
                //get all dtat req from server socket emitter filed
                 const eventEmitter=req.app.get('eventEmitter');
                
                 eventEmitter.emit("orderUpdated",{order:req.body.orderId,status:req.body.status})
                return res.redirect('/admin/orders');
          })
      }
    }
}
module.exports=statusController