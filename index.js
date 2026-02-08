import { menuArray } from "./data.js"
const menu = document.querySelector(".menu")
const order = document.querySelector(".order")
const main = document.querySelector(".main")
const modal = document.querySelector(".modal")
const message = document.querySelector(".message")
const form = document.querySelector(".form-input");



const orderHtml = [];

function getHtml() {
    return menuArray.map(item => {
        const {emoji, name, ingredients, price, id} = item;
       return `
        <div class="item">
            <p class="img">${emoji}</p>
            <h2 class="name">${name}</h2>
            <p class="ingredients">${ingredients.join(", ")}</p>
            <p class="price">$${price.toFixed(2)}</p>
            <button class="add-button" id="${id}">+</button>
        </div>
    `}).join("");
    }


function render() {
    menu.innerHTML = getHtml()
}
render()

main.addEventListener("click", (e) => {
  const id = Number(e.target.id);

// ADD ITEM
  if (e.target.classList.contains("add-button")) {
    const existingItem = orderHtml.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const menuItem = menuArray.find(item => item.id === id);
      orderHtml.push({ ...menuItem, quantity: 1 });
    }
     
    renderOrder();
    return;

  }

  // REMOVE ITEM
  if (e.target.classList.contains("remove-btn")) {
    const existingItem = orderHtml.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity -= 1;

      if (existingItem.quantity === 0) {
        const index = orderHtml.findIndex(item => item.id === id);
        orderHtml.splice(index, 1);
      }
    }
    renderOrder();
    return;

  }

  if(e.target.classList.contains("complete")) {
    modal.classList.remove("hide")
    return;
  }

   if(e.target.classList.contains("close-btn")) {
    modal.classList.add("hide");
    return;
  }
  

});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hide");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.querySelector("#full-name").value.trim();

  modal.classList.add("hide");
  order.classList.add("hide");
  message.classList.remove("hide");


  message.innerHTML = "";

  const goodbyeMessage = document.createElement("p");
  goodbyeMessage.textContent = `Thanks, ${fullName || "friend"}! Your order is on its way!`;
  message.appendChild(goodbyeMessage);

  
  orderHtml.length = 0;
  form.reset();
});


function renderOrder() {
    if (orderHtml.length === 0) {
        order.innerHTML = "";
        return;
    }

     order.innerHTML = `
        <h2>Your Order</h2>
        ${orderHtml.map(item => {
            const { name, price, id, quantity } = item;

            return `
            <section class="order-item">
                <div class="flex">
                <h2>${quantity > 1 ? `${quantity} x ${name}` : name}</h2>
                <button class="remove-btn" id="${id}">remove</button>
                </div>
                <p>$${price * quantity}</p>
            </section>
            `;
        }).join("")}
        ${totalPrice()}
    `;
            
    }
      
    function totalPrice() {
      const sum = orderHtml.reduce((total, item) => total + item.price *item.quantity, 0 )
      const finalTotal = sum + sum * .042;
        
      return `
        <section>
            <div class="total">
                <h3>Total price:</h3>
                <p>$${finalTotal.toFixed(2)}</p>
            </div>
            <div class="center">
                <button class="complete">Complete order</button>
            </div>
        </section>
      `

    }

 