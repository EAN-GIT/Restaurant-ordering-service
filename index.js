import { menuArray } from "./data.js";
console.log(menuArray);

import { render,displayMenu ,renderTotalOrderSection } from "./renderUi.js";

//initializing order array
let itemsOrdersArr = [];

document.addEventListener("click", (event) => {
  //   console.log(event.target.dataset.add);
  if (event.target.dataset.add) {
    handleAddItemClick(event.target.dataset.add);
    orderCalls();
  } else if (event.target.dataset.remove) {
    console.log(event.target.dataset.remove);
    handleDeleteItemClick(event.target.dataset.remove);
    orderCalls();
  }else if(event.target.id === "complete-order-btn"){

    handleCompleteOrderClick()

  }
  
});



////handle form submit event 
document.addEventListener("submit", (e)=>{

  e.preventDefault();


  handlePayBtnClick();

})


///handle pay btn click
function handlePayBtnClick(){

  const nameInput = document.querySelector(`input[type="text"][placeholder= "Enter your name"]`);
  const name = nameInput.value  ;

  // console.log(name)

  if (!name){

    alert("please enter details before payment")
    return
  }

  showOrderCompletemessage(name);
  
  hidePayModal()


}


function showOrderCompletemessage(name){

  const orderCompleteWrapper = document.createElement("div")
  orderCompleteWrapper.classList.add("order-complete-wrapper")


  const paymentComplete = document.createElement("p")
  paymentComplete.classList.add("payment-complete")
  paymentComplete.textContent = `Thanks ${name}! Your order is on its way`

  console.log(paymentComplete.textContent)
  // star rating

  const orderContainer = document.getElementById("order-items-container");
  orderContainer.innerHTML = ""; // Clear existing content

  orderCompleteWrapper.appendChild(paymentComplete);
  //append star rating
  orderContainer.appendChild(orderCompleteWrapper);

  console.log(orderContainer)

}


function hidePayModal() {
  const payModal = document.getElementById('pay-modal-inner');
  payModal.style.display = 'none';
}


/////////

// function to call all the nescessary functions
function orderCalls() {
    updateOrderSection();
    getTotalPrice();
    updateTotalPrice();
  // addCheckOutElement()
}

//to upadte the order section as items are added to it
function updateOrderSection() {
  const orderSection = itemsOrdersArr
    .map((item) => {
      const { name, price, id } = item;

      return `
        <div class="order-details-container">
          <div class="order-details-wrapper">
             <p class="added-item-name">${name}</p>
            <div class="btn-center">
             <button class="btn-remove" data-remove=${id}>remove</button>
            </div>
          </div>
          <div class="price-wrapper">
            <p class="added-item-price">$${price}</p>
          </div>
        </div>
       `;
    })
    .join("");

  document.getElementById("order-container").innerHTML = orderSection;
}

function handleAddItemClick(itemId) {
  const menuItemObj = menuArray.filter((item) => {
    return item.id.toString() === itemId;
  })[0];

  //if single array is found add it to i orders
  if (menuItemObj) {
    itemsOrdersArr.push(menuItemObj);
  }
  console.log(itemsOrdersArr);
}

function handleDeleteItemClick(itemId) {
  ////find the index of the item to bedeleted
  const toBedeletedIndex = itemsOrdersArr.findIndex((items) => {
    return items.id.toString() === itemId;
  });

  console.log(toBedeletedIndex);
  //if found remove it from the items in the order array

  if (toBedeletedIndex !== -1) {
    itemsOrdersArr.splice(toBedeletedIndex, 1); ///delete the item
  }
}

// function to store getting the total price
function getTotalPrice() {
  const totalPrice = itemsOrdersArr.reduce((totalprice, currentitemprice) => {
    return totalprice + currentitemprice.price;
  }, 0);

  // document.getElementById("total-price").textContent = totalPrice
  return totalPrice;

}


function handleCompleteOrderClick(){

    const paymentModal = document.getElementById('pay-modal-inner')

    let  payModalHtml = ""

     payModalHtml += `
    
        <h4 class="card-details-text">Enter Card Details </h4>
     
        <form class="payment-form" id="payment-form">
     
            
            <input type="text" id="cardholder-name" placeholder="Enter your name" required />
            
            <input type="text" id="card-number" placeholder="Enter Card number" required />
            
            
            <input type="text" id="cvv" placeholder="Enter CVV" required />
            
            
            
            <button  type ="Submit" id="pay-btn">Pay</button>
            </form> 

    `

    paymentModal.innerHTML = payModalHtml

    paymentModal.style.display = "flex"


}




// //get data item to show on the page
// function displayMenu() {
//   const menuCard = menuArray
//     .map((menu) => {
//       return `
//                 <div class="menu-container" id="menu-container">
              
//                    <p class="menu-img">${menu.emoji}</p> 
                
//                     <div class="menu-details">
//                         <h2> ${menu.name}</h2>
                        
//                         <p class="grey"> ${menu.ingredients.join(" ")}</p>
                        
//                         <h3> $${menu.price} </h3>
//                     </div>
                    
//                     <button class="add-item-btn" data-add=${
//                       menu.id
//                     }> + </button>
                
//             </div> `;
//     })
//     .join("");

//   return menuCard;
// }

// // document.getElementById("container").innerHTML = displayMenu();
// function render() {
//   document.getElementById("container").innerHTML = displayMenu();
//   document.getElementById("order-items-container").innerHTML =
//     renderTotalOrderSection();
// }

//update total score
function updateTotalPrice() {
  const totalPrice = getTotalPrice();

  const totalPriceElement = document.getElementById("total-price");

  const orderButton = document.getElementById("complete-order-btn");

  if (itemsOrdersArr.length > 0) {
    // enable the order button
    orderButton.disabled = false;

    //update price
    totalPriceElement.textContent = `$${totalPrice}`;
  } else {
    totalPriceElement.textContent = `$0`;

    // Disable the order button
    orderButton.disabled = true;
    orderButton.classList.add("disabledBtn");
  }
}

// function renderTotalOrderSection() {

   
//   return `
//       <h3 class="order-title">Your order</h3>
     
//       <div id ="order-container" class="order-container">
//         <!-- order items render here -->
//       </div>
//       <div id="total-price-container" class="total-price-container">
//         <p>Total Price:</p>
//         <div class="price-wrapper">
//           <p id="total-price">$0</p>
//         </div>
//         </div>
//         <div id="order-btn-wrapper">
//             <button id="complete-order-btn" disabled> Complete your Order</button>
//         </div>
//     `;
// }


render();
