import { menuArray } from "./data.js";
console.log(menuArray);

import { render } from "./renderUi.js";
import {
  handleAddItemClick,
  handleDeleteItemClick,
  orderCalls,
} from "./order.js";

import { handlePayBtnClick, handleCompleteOrderClick } from "./payment.js";

document.addEventListener("click", (event) => {
  //   console.log(event.target.dataset.add);
  if (event.target.dataset.add) {
    handleAddItemClick(event.target.dataset.add);
    orderCalls();
  } else if (event.target.dataset.remove) {
    console.log(event.target.dataset.remove);
    handleDeleteItemClick(event.target.dataset.remove);
    orderCalls();
  } else if (event.target.id === "complete-order-btn") {
    handleCompleteOrderClick();
  }
});

////handle form submit event
document.addEventListener("submit", (e) => {
  e.preventDefault();

  handlePayBtnClick();
});

render();
