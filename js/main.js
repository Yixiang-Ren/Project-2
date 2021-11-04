let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Nintendo Switch',
        tag:'NS',
        price: 299.99,
        inCart:0
    },
    {
        name:'Mario Kart 8',
        tag:'MarioKart8',
        price: 49.99,
        inCart:0
    },
    {
        name:'Super Smash Bro',
        tag:'SuperSmashBros',
        price: 45.99,
        inCart:0
    },
    {
        name:'Kirby Star Allies',
        tag:'KirbyStarAllies',
        price: 59.99,
        inCart:0
    },
    {
        name:'The Legend of Zelda Breath of the Wild',
        tag:'TheLegendofZeldaBreathoftheWild',
        price: 39.99,
        inCart:0
    },
    {
        name:'Mario Plus Rabbids Kingdom Battle',
        tag:'MarioPlusRabbidsKingdomBattle',
        price: 18.99,
        inCart:0
    },
    {
        name:'Super Mario 3D World Plus Bowsers Fury',
        tag:'SuperMario3DWorldPlusBowsersFury',
        price: 44.99,
        inCart:0
    },
    {
        name:'Dragon Ball Xenoverse 2',
        tag:'DragonBallXenoverse2',
        price: 27.99,
        inCart:0
    },
];

for(let i=0;i < carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers=localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers=localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1 );
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1 );
        document.querySelector('.cart span').textContent = 1;
    }

    setItem(product);
}

function setItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    // console.log("My CartItems are",cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems={
            [product.tag]:product
        }
    }

    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }
    else{
        localStorage.setItem('totalCost',product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=`
            <tr>
                <th scope="row">
                    <img src="images/${item.tag}.jpg" class="img-thumbnail imgsize">
                    <span>${item.name}</span>
                </th>
                <td class="align-middle">$${item.price}</td>
                <td class="quantity align-middle">
                    <span>${item.inCart}</span>
                </td>
                <td class="total align-middle">
                    $${item.inCart * item.price}
                </td>
            </tr>
            `
            //No idea how to react to these i class to change in the data
            //<i class="fas fa-times-circle"></i> Location in first row before img
            //<i class="fas fa-arrow-circle-down"></i> Location before <span>${item.inCart}</span>
            //<i class="fas fa-arrow-circle-up"></i> Location after <span>${item.inCart}</span>
        });

        productContainer.innerHTML += `
            <div class="mt-4 width-size">
                <ul class="d-flex list-group ms">
                    <li class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Sub Total</h5>

                            <small class="text-muted">$${cartCost}</small>
                        </div>
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Tax</h5>
                            <small class="text-muted">$${(cartCost* 0.045).toFixed(2)}</small>
                        </div>
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">Total Amount</h5>
                            <small class="text-muted">$${(cartCost * 1.045).toFixed(2)}</small>
                        </div>
                    </li>
                    <a class="btn btn-primary" href="checkOut.html" role="button">Check Out</a>
                </ul>
            </div>
        `
    }
}

onLoadCartNumbers();
displayCart();