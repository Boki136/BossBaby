function openNav() {
  document.getElementById("mySidebar").style.width = "300px";

}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";

}



//Adding products

let carts = document.querySelectorAll(".add_to_cart");

let products = [

  {
    name: "Goo-Goo Serum",
    price: 45,
    tag: "serum-one",
    inCart: 0

  },
  {

    name: "Sunshine Serum",
    price: 45,
    tag: "serum-two",
    inCart: 0


  },
  {
    name: "Glitter Serum",
    price: 45,
    tag: "serum-three",
    inCart: 0
  }


]


for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', function() {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".basket-count").textContent = productNumbers;
  }
}

function cartNumbers(product) {


  let productNumbers = localStorage.getItem("cartNumbers");


  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".basket-count").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".basket-count").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems !== null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }


  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {

  let cartCost = localStorage.getItem("totalCost")


  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }


}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let summaryBox = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && summaryBox) {
    summaryBox.innerHTML = "";
    Object.values(cartItems).map(item => {
      summaryBox.innerHTML += `

      <div class="product">
           <img src="./images/${item.tag}.png">
           <span style="display: block;">${item.name}</span>
       </div>

       <div class="second-part">
       <h4 class="price">Price: ${item.price},00</h4>
       <h4>Quantitiy: ${item.inCart}</h4>
       <h4 class="total">Total: ${item.inCart * item.price},00</h4>
       </div>
      `;
    });

    summaryBox.innerHTML += `

  <div class="basketTotalContainer">

<h4 class="basketTotalTitle">
Basket Total:
</h4>

<h4 class="basketTotal">
${cartCost},00
</h4>

</div>
`;

  }

}

onLoadCartNumbers();
displayCart();
