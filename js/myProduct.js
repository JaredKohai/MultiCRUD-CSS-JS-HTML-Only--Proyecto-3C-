let nameP = document.getElementById("name");
let price = document.getElementById("price");
const containerImg = document.getElementById("image");
const btnDelete = document.getElementById("delete");
const modal = document.querySelector(".modal");
const btnUpload = document.getElementById("btn-upload");
let productId = null;
const nameProduct = document.getElementById("name");
const priceProduct = document.getElementById("price");

let products = [];
(() => {
    const storedProducts = localStorage.getItem("products");
    try {
        products = JSON.parse(storedProducts) || [];
    } catch (error) {
        console.error("Error parsing stored products:", error);
        products = [];
    }
    loadProduct();
})();

function loadProduct() {
    containerImg.innerHTML = "";

    products.forEach((product) => {
        if (!product.hasOwnProperty("id")) {
            product.id = generateUniqueId();
        }
        
        containerImg.innerHTML += `
            <div class="box" id="${product.id}">
                <div class="data">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                </div>
                <img src="${product.imageUrl}" alt="">
                <div class="icons">
                    <i class='bx bxs-edit-alt' id="edit" data-product-id="${product.id}"></i>
                    <i class='bx bxs-trash-alt' id="delete"></i>
                </div>
            </div>
        `;

    });
}


function generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

function deleteProduct(e) {
    const boxElement = e.target.parentElement.parentElement;
    const productId = boxElement.id;
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        localStorage.setItem("products", JSON.stringify(products));
        loadProduct();
    } else {
        console.error("Producto no encontrado en el arreglo.");
    }
}

function handleDeleteClick(e) {
    deleteProduct(e);
}

const deleteIcons = document.querySelectorAll('.bx.bxs-trash-alt');

deleteIcons.forEach((icon) => {
    icon.addEventListener('click', handleDeleteClick);
});

function editProducts(e) {
    let productSelect = e.target.parentElement.parentElement;
    let productId = productSelect.id;
    const product = products.find((product) => product.id === productId);

    if (product) {
        nameP.value = product.name;
        price.value = product.price;
    } else {
        console.error("Producto no encontrado en el arreglo.");
    }
}

function handleEditClick() {
    modal.classList.add("modal-show");

    const product = products.find((product) => product.id === productId);
    if (product) {
        document.getElementById("name").setAttribute("value", product.name);
        document.getElementById("price").setAttribute("value", product.price);

        modal.classList.add("modal-show");
    } else {
        console.error("Producto no encontrado en el arreglo.");
    }
}

document.addEventListener("click", function(e){
    const target = e.target.closest("#edit");
  
    if(target){
        productId = target.getAttribute("data-product-id");
        handleEditClick(productId)
    }
});

btnUpload.addEventListener("click", (e) => {
    e.preventDefault();
    validationForm(e);
});

let acceptData = (file) => {
    var foundIndex = products.findIndex(x => x.id == productId);
    products[foundIndex].name = nameProduct.value
    products[foundIndex].price = priceProduct.value
    
    localStorage.setItem("products", JSON.stringify(products));
    modal.classList.remove("modal-show");
    loadProduct();
};

function validationForm(e) {
    e.preventDefault();
    if (nameProduct.value === "" && priceProduct.value === "") {
        msg.innerHTML = "Complete los campos";
    } else {
        msg.innerHTML = "";
        acceptData()
    }
}