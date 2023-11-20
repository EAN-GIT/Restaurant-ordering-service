import { menuArray } from "./data.js";



//get data item to show on the page
function displayMenu() {
  const menuCard = menuArray
    .map((menu) => {
      return `
                <div class="menu-container" id="menu-container">
              
                   <p class="menu-img">${menu.emoji}</p> 
                
                    <div class="menu-details">
                        <h2> ${menu.name}</h2>
                        
                        <p class="grey"> ${menu.ingredients.join(" ")}</p>
                        
                        <h3> $${menu.price} </h3>
                    </div>
                    
                    <button class="add-item-btn" data-add=${
                      menu.id
                    }> + </button>
                
            </div> `;
    })
    .join("");

  return menuCard;
}


function renderTotalOrderSection() {

   
    return `
        <h3 class="order-title">Your order</h3>
       
        <div id ="order-container" class="order-container">
          <!-- order items render here -->
        </div>
        <div id="total-price-container" class="total-price-container">
          <p>Total Price:</p>
          <div class="price-wrapper">
            <p id="total-price">$0</p>
          </div>
          </div>
          <div id="order-btn-wrapper">
              <button id="complete-order-btn" disabled> Complete your Order</button>
          </div>
      `;
  }


// document.getElementById("container").innerHTML = displayMenu();
function render() {
    document.getElementById("container").innerHTML = displayMenu();
    document.getElementById("order-items-container").innerHTML =
      renderTotalOrderSection();
  }




  export { render, displayMenu, renderTotalOrderSection}