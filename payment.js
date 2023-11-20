///handle pay btn click
function handlePayBtnClick() {
  const nameInput = document.querySelector(
    `input[type="text"][placeholder= "Enter your name"]`
  );
  const name = nameInput.value;

  // console.log(name)

  if (!name) {
    alert("please enter details before payment");
    return;
  }

  showOrderCompletemessage(name);

  hidePayModal();
}

///payment modal display

function handleCompleteOrderClick() {
  const paymentModal = document.getElementById("pay-modal-inner");

  let payModalHtml = "";

  payModalHtml += `

        <button class="card-modal-close-btn" id="card-modal-close-btn">X</button>
  
        <h4 class="card-details-text">Enter Card Details </h4>
     
        <form class="payment-form" id="payment-form">
     
            
            <input type="text" id="cardholder-name" placeholder="Enter your name" required />
            
            <input type="text" id="card-number" placeholder="Enter Card number" required />
            
            
            <input type="text" id="cvv" placeholder="Enter CVV" required />
            
            
            
            <button  type ="Submit" id="pay-btn">Pay</button>
            </form> 

    `;

  paymentModal.innerHTML = payModalHtml;

  paymentModal.style.display = "flex";


  document.getElementById("card-modal-close-btn").addEventListener("click",()=>{

        paymentModal.style.display = "none"
  })
}

///display message after pya button click

function showOrderCompletemessage(name) {
  const orderCompleteWrapper = document.createElement("div");
  orderCompleteWrapper.classList.add("order-complete-wrapper");

  const paymentComplete = document.createElement("p");
  paymentComplete.classList.add("payment-complete");
  paymentComplete.textContent = `Thanks ${name}! Your order is on its way`;

  console.log(paymentComplete.textContent);
  // star rating

  const orderContainer = document.getElementById("order-items-container");
  orderContainer.innerHTML = ""; // Clear existing content

  orderCompleteWrapper.appendChild(paymentComplete);
  //append star rating
  orderContainer.appendChild(orderCompleteWrapper);

  console.log(orderContainer);
}

function hidePayModal() {
  const payModal = document.getElementById("pay-modal-inner");
  payModal.style.display = "none";
}

export {
  showOrderCompletemessage,
  handleCompleteOrderClick,
  handlePayBtnClick,
};
