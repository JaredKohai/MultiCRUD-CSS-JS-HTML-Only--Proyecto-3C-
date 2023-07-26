const inputImagen = document.getElementById('inputImagen');
const imagenPreview = document.getElementById('imagenPreview');
const btn = document.getElementById('btn');
const formC = document.querySelector(".form");

const imageContainer = document.querySelector(".container-img");
const btnUpload = document.getElementById("btn-upload");
const nameProduct = document.getElementById("name");
const priceProduct = document.getElementById("price");
const msg = document.getElementById("msg");

let file;
let products = [];

inputImagen.addEventListener('change', (event) => {
  imagenPreview.classList.remove("remove-image");
  file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const imagen = document.createElement('img');
    imagen.src = reader.result;
    imagenPreview.innerHTML = '';
    imagenPreview.appendChild(imagen);
  };

  if (file) {
    reader.readAsDataURL(file);
    getForm();
    msg.innerHTML = "";
  }
});

btn.addEventListener("click", () => {
  inputImagen.click();
  inputImagen.value = "";
});


let getForm = () => {
  btn.classList.add("btn-none");
  formC.classList.add("open-form");
};

btnUpload.addEventListener("click", (e) => {
  validationForm(e);
});

function validationForm(e) {
  if (nameProduct.value === "" && priceProduct.value === "") {
    msg.innerHTML = "Complete los campos";
  } else {
    msg.innerHTML = "";
    acceptData(file);
  }
  e.preventDefault();
}

let acceptData = (file) => {
  const newProduct = {
    name: nameProduct.value,
    price: priceProduct.value,
    imageUrl: URL.createObjectURL(file),
  };

  createProduct(newProduct);
};

let createProduct = (product) => {
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  const newBox = `
    <div class="box">
      <div class="data">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      </div>
      <img src="${product.imageUrl}" alt="">
      <div class="icons">
        <i class='bx bx-cart-add'></i>
      </div>
    </div>
  `;

  imageContainer.insertAdjacentHTML("beforeend", newBox);
  modal.classList.remove("modal-show");
  btn.classList.remove("btn-none");
  formC.classList.remove("open-form");
  imagenPreview.classList.add("remove-image");
  nameProduct.value = "";
  priceProduct.value = "";
  inputImagen.value = "";
};

(() => {
  products = JSON.parse(localStorage.getItem("products")) || [];
  if (products.length > 0) {
    products.forEach((product) => {
      const newBox = `
        <div class="box">
          <div class="data">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
          </div>
          <img src="${product.imageUrl}" alt="">
          <div class="icons">
            <i class='bx bx-cart-add'></i>
          </div>
        </div>
      `;
      imageContainer.insertAdjacentHTML("beforeend", newBox);
    });
  }
})();

const modal = document.querySelector(".modal");
const btnModal = document.querySelector(".btn-modal").addEventListener("click", () => {
  modal.classList.add("modal-show");
});

const uploadCancel = document.getElementById("btn-cancel").addEventListener("click", () => {
  modal.classList.remove("modal-show");
});


//  const btnClear = document.getElementById("btn-clear");

//  btnClear.addEventListener("click", () => {
//   clearLocalStorage();
//   products = [];
//   imageContainer.innerHTML = ""; 
//  });

// function clearLocalStorage() {
//    localStorage.removeItem("products");
// }
