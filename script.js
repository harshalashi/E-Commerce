const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

console.log("running");

let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-1",
    price: 30,
    inCart: 0,
  },
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-2",
    price: 12,
    inCart: 0,
  },
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-3",
    price: 18,
    inCart: 0,
  },
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-4",
    price: 15,
    inCart: 0,
  },
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-5",
    price: 60,
    inCart: 0,
  },
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-6",
    price: 40,
    inCart: 0,
  },
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-7",
    price: 10,
    inCart: 0,
  },
  {
    name: "Cartoon Astronaut T-Shirt",
    tag: "cat-8",
    price: 20,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log("My Cart Items Are", cartItems);

  if (cartItems != null) {
    if (cartItems[products.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);

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
  let productContainer = document.querySelector(".products");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <i class="fas fa-times"></i>
        <img src="./img/products/${item.tag}.jpg">
        <span>${item.name}</span>
      </div>
      <div class="price">$${item.price}.00</div>
      <div class="quantity">
        <i class="fas fa-chevron-left"></i>
        <span>${item.inCart}</span>
        <i class="fas fa-chevron-right"></i>
      </div>
      <div class="total">
        $${item.inCart * item.price}.00
        
      `;
    });
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">
        Basket Total
      </h4>
        <h4 class="basketTotal">
          $${cartCost}.00
        </h4>
    </div>
  
        `;
  }
}

displayCart();
onLoadCartNumbers();
