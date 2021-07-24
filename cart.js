let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name: "Capricciosa",
    tag: "Cap",
    price: 5,
    inCart: 0
  },
  {
    name: "Margherita",
    tag: "Mar",
    price:  5,
    inCart: 0
  },
  {
    name: "Ham and mushrooms",
    tag: "Ham",
    price: 6,
    inCart: 0
  },
  {
    name: "Vegetarian",
    tag: "Veg",
    price: 4,
    inCart: 0
  },
  {
    name: "Mustard",
    tag: "Mus",
    price: 6,
    inCart: 0
  },
  {
    name: "Rustic BBQ",
    tag: "Rus",
    price: 7,
    inCart: 0
  },
  {
    name: "Mama's pasta, spaghetti",
    tag: "MS",
    price: 3,
    inCart: 0
  },
  {
    name: "Mama's pasta, penne",
    tag: "MP",
    price: 3,
    inCart: 0
  },
  {
    name: "Primavera pasta, penne",
    tag: "PP",
    price: 4,
    inCart: 0
  },
  {
    name: "Meat Calzone",
    tag: "MC",
    price: 4,
    inCart: 0
  },
  {
    name: "Vegetarian Calzone",
    tag: "VC",
    price: 3,
    inCart: 0
  },
  {
    name: "Potato slices",
    tag: "PS",
    price: 2,
    inCart: 0
  },
  {
    name: "Strawberry Milk cocktail",
    tag: "SM",
    price: 2,
    inCart: 0
  },
  {
    name: "Chocolate Milk cocktail",
    tag: "CM",
    price: 2,
    inCart: 0
  },
  {
    name: "Vanilla Milk coctail",
    tag: "VM",
    price: 2,
    inCart: 0
  },
  {
    name: "Pepsi",
    tag: "Pep",
    price: 1,
    inCart: 0
  },
  {
    name: "Mirinda",
    tag: "Mir",
    price: 1,
    inCart: 0
  },
  {
    name: "7UP",
    tag: "7up",
    price: 1,
    inCart: 0
  },
  {
    name: "Chocolate cheesecake",
    tag: "Ches",
    price: 2,
    inCart: 0
  },
  {
    name: "Syrniki",
    tag: "Syr",
    price: 3,
    inCart: 0
  },
  {
    name: "Choko scrolls",
    tag: "ChSC",
    price: 4,
    inCart: 0
  },
  {
    name: "New York cheesecake",
    tag: "NY",
    price: 2,
    inCart: 0
  },
  {
    name: "Crecsent with strawberry",
    tag: "Cres",
    price: 3,
    inCart: 0
  },
  {
    name: "Apple and cinnamon rolls",
    tag: "AC",
    price: 4,
    inCart: 0
  },

]


for (let i=0; i < carts.length; i++){
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product){
  let productNumbers = localStorage.getItem('cartNumbers');
  
  productNumbers = parseInt(productNumbers);

  if( productNumbers ){
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
} 

function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if(cartItems != null){

    if(cartItems[product.tag] == undefined){
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

  localStorage.setItem("productsInCart", JSON.stringify
  (cartItems));

}

function totalCost(product) {

  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price)
  } else {
    localStorage.setItem("totalCost", product.price)
 }
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class = "product">
                <i class="fas fa-times"></i>
                <img src="./img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">
            $${item.price}.00
            </div>
            <div class="quantity">
                <i class="fas fa-angle-left"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-angle-right"></i>
            </div>
            <div class="total">
                  <span>$${item.inCart * item.price}.00</span>
            </div> 
          `
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">
            Basket Total
          </h4>
          <h4 class="basketTotal">
            $${cartCost}.00
          </h4>
        `;
    }
}

onLoadCartNumbers();
displayCart();