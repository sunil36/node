const Order=require('../../../models/order');
const moment=require("moment");
function orderController(){
    return{
        store(req,res){
             const {phone,address}=req.body;
             if(!phone || !address){
                 req.flash("error","All fields are reuired.");
                return res.redirect("/cart")
             }

             const order= new Order({
                 customerId:req.user._id,
                 items:req.session.cart.items,
                 phone,
                 address
             })
             order.save().then(result=>{
                 req.flash('success','order placed successfully.');
                delete req.session.cart;
                 return res.redirect("/customers/orders");

             }).catch((err)=>{
                req.flash("error","Some thing went wrong.");
                 return res.redirect("/cart");
             })

        },

      async index(req,res){
            const orders =await Order.find({customerId:req.user._id},null,{sort:{'createAt':-1}});
            res.header('Cache-Control', 'no-store')
            res.render('customers/orders',{orders:orders,moment:moment})
        },

        async show(req,res){
           const order=await Order.findById(req.params.id);
           //both id is object type show we cant compare them so convert first to string type.
           if(req.user._id.toString()===order.customerId.toString()){
               return  res.render('customers/singleOrder',{order:order});
           }
            return res.redirect('/');
           

        }
    }
}

module.exports = orderController;
