import axios from 'axios';
import Noty from 'noty';

import initAdmin from "./admin";
let addToCart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector("#cartCounter");
function updateCart(pizza){
    axios.post('update-cart',pizza).then(res=>{
        cartCounter.innerText=res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(error =>{
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong.',
            progressBar: false,
        }).show();

    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
    let pizza=JSON.parse(btn.dataset.pizza)
    updateCart(pizza);
    })

})

initAdmin();
//update order status
let statuses=document.querySelectorAll('.status_line')
let hiddenInput=document.querySelector("#hiddenInput")
let order =hiddenInput?hiddenInput.value:null;
let time = document.createElement('small')

// covert json string into object
order=JSON.parse(order)
function updateStatus(order){
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })
}
updateStatus(order)