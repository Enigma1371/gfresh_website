// var addToCartButtons = document.getElementsByClassName('.cart')
//     for (var i = 0; i < addToCartButtons.length; i++) {
//         var button = addToCartButtons[i]
//         button.addEventListener('click', addToCartClicked)
//     }

//     function addToCartClicked(event) {
//       var button = event.target
//       var shopItem = button.parentElement.parentElement
//       var title = shopItem.getElementsByClassName('.ti')[0].innerText
//       var price = shopItem.getElementsByClassName('.price')[0].innerText
//       var imageSrc = shopItem.getElementsByClassName('.mg')[0].src
//       console.log(title)
//       // addItemToCart(title, price, imageSrc)
//       // updateCartTotal()
//   }



let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});




