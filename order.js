import { menuArray } from "./data.js";

//initializing order array
let itemsOrdersArr = [];

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

export {
  orderCalls,
  handleAddItemClick,
  handleDeleteItemClick,
  updateOrderSection,
};
