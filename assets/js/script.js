// Variables
const body = document.querySelector("body");

const modelsContainerSection = document.querySelector(".models");
const pizzaOptionModelDiv = document.querySelector(".pizza-item");
const pizzaOptionModelImg = document.querySelector(".pizza-item--img img");
const pizzaOptionAddModelDiv = document.querySelector(".pizza-item--add");
const pizzaOptionPriceModelDiv = document.querySelector(".pizza-item--price");
const pizzaOptionNameModelDiv = document.querySelector(".pizza-item--name");
const pizzaOptionDiscountModelDiv = document.querySelector(".pizza-item--desc");
const pizzaOptionModelInCartDiv = document.querySelector(".cart--item");
const pizzaOptionModelInCartImg = document.querySelector(".cart--item img");
const pizzaOptionNameModelInCartDiv = document.querySelector(".cart--item-nome");
const pizzaDetailsContainerInCartDiv = document.querySelector(".cart--item--qtarea");
const subtractPizzaInCartButton = document.querySelector(".cart--item-qtmenos");
const numberOfPizzasInCartDiv = document.querySelector(".cart--item--qt");
const addPizzaInCartButton = document.querySelector(".cart--item-qtmais");

const openCartAreaDiv = document.querySelector("header .menu-openner");

const menuAreaDiv = document.querySelector(".pizza-area");

const aside = document.querySelector("aside");
const cartAreaDiv = document.querySelector("aside .cart--area");
const closeCartAreaDiv = document.querySelector(".menu-closer");
const areaOfChosenPizzasDiv = document.querySelector(".cart");
const cartDetailsDiv = document.querySelector(".cart--details");
const subtotalValueSpan = document.querySelector(".cart--totalitem.subtotal span:last-child");
const discountValueSpan = document.querySelector(".cart--totalitem.desconto span:last-child");
const totalValueSpan = document.querySelector(".cart--totalitem.total span:last-child");
const buyDiv = document.querySelector(".cart--finalizar");

const pizzaWindowContainerSection = document.querySelector(".pizzaWindowArea");
const pizzaWindowBodyDiv = document.querySelector(".pizzaWindowArea .pizzaWindowBody");
const cancelMobileVersionDiv = document.querySelector(".pizzaInfo--cancelMobileButton");
const pizzaImg = document.querySelector(".pizzaBig img");
const pizzaNameH1 = document.querySelector(".pizzaInfo h1");
const pizzaDescriptionDiv = document.querySelector(".pizzaInfo--desc");
const sizesPizzaDiv = document.querySelectorAll(".pizzaInfo--size");
const sizeSelectedDiv = document.querySelector(".pizzaInfo--size.selected");
const currentPizzaPriceDiv = document.querySelector(".pizzaInfo--actualPrice");
const reduceQuantityOfPizzaButton = document.querySelector(".pizzaInfo--qtmenos");
const numberOfPizzasDiv = document.querySelector(".pizzaInfo--qt");
const increaseQuantityOfPizzaButton = document.querySelector(".pizzaInfo--qtmais");
const addPizzaToCartBtnDiv = document.querySelector(".pizzaInfo--addButton");
const cancelPizzaToCartBtnDiv = document.querySelector(".pizzaInfo--cancelButton");

const footer = document.querySelector("footer");

const pizzaInsertAreaSection = document.querySelector(".pizzaWindowArea");

let modalQuantity = 1;
let valuePizza;
let newValueOfPizza = 0;

let cart = [];
let modalKey = 0;

// Functions
function openModal() {
    pizzaWindowContainerSection.style.display = "flex";
    setTimeout(() => {
        pizzaWindowContainerSection.style.opacity = 1;
    }, 100);
};

function closeModal() {
    pizzaWindowContainerSection.style.opacity = 0;
    setTimeout(() => {
        pizzaWindowContainerSection.style.display = "none";
    }, 500);
};

function showSelectedPizzas() {
    areaOfChosenPizzasDiv.innerHTML = "";
    let subtotal = 0;
    let discount = 0;
    let total = 0;
    for(let i in cart) {
        let pizzaItem = pizzaJson.find(item => item.id == cart[i].id);
        subtotal += pizzaItem.price * cart[i].qtd;

        let cartItemModel = pizzaOptionModelInCartDiv.cloneNode(true);

        let pizzaSize;
        switch(cart[i].size) {
            case 0: 
                pizzaSize = "P";
            break;
            case 1: 
                pizzaSize = "M";
            break;
            case 2: 
                pizzaSize = "G";
            break;
        };
        let pizzaName = `${pizzaItem.name} - ${pizzaSize}`;

        cartItemModel.querySelector("img").src = pizzaItem.img;
        cartItemModel.querySelector(".cart--item-nome").innerHTML = pizzaName;
        cartItemModel.querySelector(".cart--item--qt").innerHTML = cart[i].qtd;

        cartItemModel.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
            if(cart[i].qtd > 1) {
                cart[i].qtd--;
                subtotal -= pizzaItem.price;
            } else {
                cart.splice(i, 1);
            };
            updateCart();
        });
        cartItemModel.querySelector(".cart--item-qtmais").addEventListener("click", () => {
            cart[i].qtd++;
            subtotal += pizzaItem.price;
            updateCart();
        });

        discount = subtotal * 0.1;
        total = subtotal - discount;

        areaOfChosenPizzasDiv.appendChild(cartItemModel);
        subtotalValueSpan.innerHTML = `R$ ${subtotal.toFixed(2)}`;
        discountValueSpan.innerHTML = `R$ ${discount.toFixed(2)}`;
        totalValueSpan.innerHTML = `R$ ${total.toFixed(2)}`;
    };
};

function updateCart() {
    openCartAreaDiv.querySelector("span").innerHTML = cart.length;

    if(cart.length > 0) {
        aside.classList.add("show");
        showSelectedPizzas();
    } else {
        aside.classList.remove("show");
        aside.style.left = "100vw";
    };
};

function showMenu() {
    menuAreaDiv.innerHTML = "";
    pizzaJson.map((item, index) => {
        let pizzaOptionModel = pizzaOptionModelDiv.cloneNode(true);
    
        pizzaOptionModel.setAttribute("data-key", index);
        pizzaOptionModel.querySelector(".pizza-item--img img").setAttribute("src", item.img);
        pizzaOptionModel.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;
        pizzaOptionModel.querySelector(".pizza-item--name").innerHTML = item.name;
        pizzaOptionModel.querySelector(".pizza-item--desc").innerHTML = item.description;

        pizzaOptionModel.querySelector("a").addEventListener("click", (e) => {
            e.preventDefault();
    
            let key = e.target.closest(".pizza-item").getAttribute("data-key");
            valuePizza = pizzaJson[key].price;
            modalQuantity = 1;
            modalKey = key;
            
            pizzaImg.src = pizzaJson[key].img;
            pizzaNameH1.innerHTML = pizzaJson[key].name;
            pizzaDescriptionDiv.innerHTML = pizzaJson[key].description;

            document.querySelector(".pizzaInfo--size.selected").classList.remove("selected");

            sizesPizzaDiv.forEach((size, sizeIndex) => {
                size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
                if(sizeIndex === 2) {
                    size.classList.add("selected");
                };
            });
            newValueOfPizza = pizzaJson[key].price;
            currentPizzaPriceDiv.innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    
            numberOfPizzasDiv.innerHTML = modalQuantity;
            reduceQuantityOfPizzaButton.classList.add("close");
            
            openModal();
        });
        menuAreaDiv.append(pizzaOptionModel);
    });
};

function createFinalModal() {
    const div = document.createElement("div");
    div.classList.add("body--confirmarmodal");

    const img = document.createElement("img");
    img.src = "./assets/images/check.png";
    img.style.width = "100px";
    img.style.position = "absolute";
    img.style.top = "-50px";

    const h2 = document.createElement("h2");
    h2.innerHTML = "Seu pedido foi realizado com sucesso!";

    const p = document.createElement("p");
    p.innerHTML = "Segue o número do seu pedido";

    const span = document.createElement("span");
    span.innerHTML = `#${parseInt(Math.floor(Math.random() * 9000000) + 1000000)}`;

    const button = document.createElement("button");
    button.classList.add("body--novopedidoButton");
    button.innerHTML = "Fazer novo pedido";

    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(button);
    body.appendChild(div);

    const newRequest = document.querySelector(".body--novopedidoButton")

    newRequest.addEventListener("mouseover", () => newRequest.style.backgroundColor = "#0D64E2");

    newRequest.addEventListener("mouseout", () => newRequest.style.backgroundColor = "#0D64C2");
    
    newRequest.addEventListener("click", () => {
        body.style.opacity = 0;
        setTimeout(() => {
            location.reload();
        }, 500);
    });
};

// Events
showMenu();
document.querySelectorAll(".pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton").forEach(button => button.addEventListener("click", closeModal));

reduceQuantityOfPizzaButton.addEventListener("click", () => {
    modalQuantity--;
    newValueOfPizza -= valuePizza;
    numberOfPizzasDiv.innerHTML = modalQuantity;
    currentPizzaPriceDiv.innerHTML = `R$ ${newValueOfPizza.toFixed(2)}`;

    if(modalQuantity < 2) {
        reduceQuantityOfPizzaButton.classList.add("close");
    };
});

increaseQuantityOfPizzaButton.addEventListener("click", () => {
    modalQuantity++;
    newValueOfPizza = valuePizza * modalQuantity;
    numberOfPizzasDiv.innerHTML = modalQuantity;
    currentPizzaPriceDiv.innerHTML = `R$ ${newValueOfPizza.toFixed(2)}`;

    if(modalQuantity > 1) {
        reduceQuantityOfPizzaButton.classList.remove("close");
    };
});

sizesPizzaDiv.forEach((size) => {
    size.addEventListener("click", () => {
        document.querySelector(".pizzaInfo--size.selected").classList.remove("selected");
        size.classList.add("selected");
    });
});

addPizzaToCartBtnDiv.addEventListener("click", () => {
    let pizzaSize = parseInt(sizeSelectedDiv.getAttribute("data-key"));
    let identifier = pizzaJson[modalKey].id+"@"+pizzaSize;

    let key = cart.findIndex(item => item.identifier == identifier);

    if(key > -1) {
        cart[key].qtd += modalQuantity;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size: pizzaSize,
            qtd: modalQuantity
        });
    };

    updateCart();
    closeModal();
    window.scrollTo(0, 0);
});

openCartAreaDiv.addEventListener("click", () => {
    if(cart.length > 0) aside.style.left = "0vw";
});
    
closeCartAreaDiv.addEventListener("click", () => {
    aside.style.left = "100vw";
});

buyDiv.addEventListener("click", () => {
    body.style.display = "none";
    body.innerHTML = "";
    body.style.opacity = 0;
    setTimeout(() => {
        body.style.display = "flex"
    }, 50);
    setTimeout(() => {
        body.style.opacity = 1;
        createFinalModal();
    }, 500);
});