let caaart;
let car = document.querySelectorAll('.cart');

let p=[

    {
        name:"Garlic",
        tag:"garlic",
        price:21,
        inCart:0

    },
        {
            name:"Onion",
            tag:"onion",
            price:22,
            inCart:0
             
        },
       
        {
            name:"Tomatoes",
            tag:"tomatoes",
            price:23,
            inCart:0
        },
       
          {
            name:"Brinjal",
            tag:"brinjal",
            price:20,
            inCart:0
    
          },
        
          {
            name:"Broccoli",
            tag:"broccoli",
            price:24,
            inCart:0
          },
       
        {
            name:"Potatoes",
            tag:"potatoes",
            price:25,
            inCart:0
        },
        
        {
            name:"Fresh Carrots",
            tag:"freshcarrots",
            price:26,
            inCart:0
        },
        
        {
        name:"Brussels Sprouts",
        tag:"brusselssprouts",
        price:19,
        inCart:0
        },
       
      {
        name:"Sweet Corn",
        tag:"sweetcorn",
        price:27,
        inCart:0
      },
       
         {
            name:"Kale",
            tag:"kale",
            price:28,
            inCart:0
         },
    
           
         {
            name:"Cabbage",
            tag:"cabbage",
            price:18,
            inCart:0
         },
       
        {
        name:"Lemon",
        tag:"lemon",
        price:12,
        inCart:0
        },

        {
          name:"Oranges",
          tag:"oranges",
          price:12,
          inCart:0
        },

];
for(let i=0;i<car.length;i++)
{
 car[i].addEventListener('click',() => {
     alert("Product added");
     cartNumbers(p[i]);
     totalcost(p[i]);
 })
}
function onLoadCartNumbers()
{
  let pn=localStorage.getItem('cartNumbers');
  if( pn ) {
    document.querySelector('.label span').textContent = pn;
}
   // document.querySelector('.label span').textContent=pn;
  
}
function cartNumbers(p1,action)
{
    let pn=localStorage.getItem('cartNumbers');
    pn=parseInt(pn);
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);
    if(action)
    {
      localStorage.setItem("cartNumbers",pn-1);
      document.querySelector('.label span').textContent = pn-1;
      console.log("action running");
    }
    
      else if(pn){
    localStorage.setItem("cartNumbers",pn+1);
    document.querySelector('.label span').textContent=pn+1;
   }
   else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.label span').textContent=1;
   }
   setItems(p1);
}

function  setItems(p1)
{
  let pn = localStorage.getItem('cartNumbers');
  pn = parseInt(pn);
  let cartItems=localStorage.getItem('productsincart');
  cartItems=JSON.parse(cartItems);
  
  if(cartItems!=null)
  {
    let currentProduct = p1.tag;
    if(cartItems[currentProduct]==undefined)
    {
       cartItems={
         ...cartItems,
         [currentProduct]:p1

       }
    }
     cartItems[currentProduct].inCart +=1;
  }
  else
  {
    
  p1.inCart=1;
  cartItems = {
   [p1.tag]:p1
  
 };
  }

 
  localStorage.setItem('productsincart',JSON.stringify(cartItems));
}

function totalcost(p1,action)
{
 
 let cartcost = localStorage.getItem("totalcost");
 
 if( action) {
   cartcost = parseInt(cartcost);
   localStorage.setItem("totalcost",cartcost - p1.price);
 }
 else if(cartcost!=null)
 {
  cartcost=parseInt(cartcost);
localStorage.setItem("totalcost",cartcost + p1.price);
 }
 else{
  localStorage.setItem("totalcost",p1.price);
 }
}
 function displaycart()
 {
   let cartItems=localStorage.getItem("productsincart");
   cartItems=JSON.parse(cartItems);
   
   let cartcost = localStorage.getItem("totalcost");
   cartcost = parseInt(cartcost);

   let productcontainer = document.querySelector(".products1") ;
if(cartItems && productcontainer )
{
  productcontainer.innerHTML='';
  Object.values(cartItems).map((item,index) => {
  productcontainer.innerHTML += 
     `<div class="ppp">
     <ion-icon name="close-circle"></ion-icon>
       <img src="img/${item.tag}.png"/>
         <span class="sm-hide" style="font-size:15px">${item.name}</span>
       </div>
       <div class="price1 sm-hide">Rs.${item.price}.00</div>
       <div class="quantity">
           <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
               <span>${item.inCart}</span>
           <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
       </div>
       <div style ="padding-right:10px"; class="total">Rs.${item.inCart * item.price}.00</div>
       `;
  });
              productcontainer.innerHTML += `
         <div style="padding-right:0px"; class="basketTotalContainer">
         <h4 class="basketTotalTitle">Basket Total</h4>
          <h4 class="basketTotal">Rs.${cartcost}.00</h4>
           </div>`

deleteButtons();
manageQuantity();
}      
 }
function manageQuantity()
{
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');
  let currentQuantity = 0;
  let currentProduct = '';
  let cartItems=localStorage.getItem('productsincart');
   cartItems=JSON.parse(cartItems);

   for(let i=0; i < increaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click', () => {
        console.log(cartItems);
        currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
        console.log(currentQuantity);
        currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
        console.log(currentProduct);

        if(cartItems[currentProduct].inCart > 1 ) {
          cartItems[currentProduct].inCart -= 1;
          cartNumbers(cartItems[currentProduct], "decrease");
          totalcost(cartItems[currentProduct], "decrease");
          localStorage.setItem('productsincart', JSON.stringify(cartItems));
          displaycart();
      }
  });
  increaseButtons[i].addEventListener('click', () => {
    console.log(cartItems);
    currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
    console.log(currentQuantity);
    currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
    console.log(currentProduct);

    cartItems[currentProduct].inCart += 1;
    cartNumbers(cartItems[currentProduct]);
    totalcost(cartItems[currentProduct]);
    localStorage.setItem('productsincart', JSON.stringify(cartItems));
    displaycart();
});
}
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.ppp ion-icon');
  let pn = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem("totalcost");
  let cartItems = localStorage.getItem('productsincart');
  cartItems = JSON.parse(cartItems);
  let productName;

  caaart = cartItems;
  console.log(cartItems);

  for(let i=0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', () => {
    productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
    console.log(productName);
    console.log(cartItems[productName].name + " " +cartItems[productName].inCart);
     localStorage.setItem('cartNumbers', pn - cartItems[productName].inCart);
    localStorage.setItem('totalcost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
    delete cartItems[productName];
    localStorage.setItem('productsincart', JSON.stringify(cartItems));
    alert('Item will be removed from cart');

   
    displaycart();
    onLoadCartNumbers();
})
}
}

function makingalert(event)
{
  if (localStorage.getItem('cartNumbers')!=0){
    // Array.from(caaart).forEach(function(el){
    //   console.log();
    // })
    console.log(localStorage.getItem('cartNumbers'));
    alert('Thank you for your order!');
    window.open('checkout.html');
    // ... other code here
  }   
  else {
    alert("There is nothing in your cart!");
  }
}

var element = document.getElementById("made-center");
element.onclick = function(event) {
  makingalert(event);
  console.log(event);
}

onLoadCartNumbers();

displaycart();

