let products = [
    { name: 'Product 1', price: 10.00 },
    { name: 'Product 2', price: 20.00 },
    { name: 'Product 3', price: 15.00 },
  ];

   let cartItems = [];
   let cartTotal = document.getElementById("cart-total");
  let cartList = document.getElementById("cart-list");
  let productList = document.getElementById("product-list");
  let checkOutBtn = document.getElementById("check-out");



 function displayProducts(){
    products.forEach(product=>{
  let li = document.createElement("li");
  li.innerHTML = `<span>${product.name}</span>
  <span>$${product.price.toFixed(2)}</span>
  <button>Add to Chart</button>`
  let button = li.querySelector("button")
  button.addEventListener("click", ()=>addToChart(product))

  productList.appendChild(li)
});
 };


function addToChart(product){
  let existingItem = cartItems.find(item =>item.name === product.name)
    if(existingItem){
      
      existingItem.quantity++;
    }else {
      cartItems.push({name: product.name, price:product.price, quantity: 1})
    }
    renderCartItems()
}


function removeItems(item){
  confirm("Are you sure you want to remove this item")
  let itemIndex = cartItems.indexOf(item);
  
  cartItems.splice(itemIndex, 1);
  renderCartItems();
}



function renderCartItems(){
  cartList.innerHTML = "";
  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span>${item.name} quantity:${item.quantity}</span>
    <span>$${(item.price * item.quantity).toFixed(2)}</span>
    <button>Remove</button>  `;
    let btn = li.querySelector("button");
    btn.addEventListener("click", ()=>{
      removeItems(item)
    });
    cartList.appendChild(li);
    total += item.price * item.quantity
  });
  cartTotal.innerHTML = `<h1>Total Price: $${total.toFixed(2)}</h1>`
}

function checkout(){
  alert("thank you for purchasing");
  cartItems = [];
  renderCartItems()
}
function init(){
  displayProducts()
  checkOutBtn.addEventListener("click", ()=> checkout())
}
init()