const productForm = document.getElementById("productForm");
const inputName = document.getElementById("title");
const inputValue = document.getElementById("value");
const inputThumbnail = document.getElementById("thumbnail");
const tbodyProducts = document.getElementById("tableContent");

const socket = io();

window.addEventListener("load", function (e) {
  socket.emit("NewConnection");
});

socket.on("Welcome", (data) => {
  alert(data);
});

//Add new prodcut
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newProduct = {
    title: inputName.value,
    value: inputValue.value,
    thumbnail: inputThumbnail.value,
  };

  //Emit product to the server
  socket.emit("addProduct", newProduct);

  inputName.value = "";
  inputValue.value = "";
  inputThumbnail.value = "";
});

socket.on("LastProduct", (lastProduct) => {
  AddNewProduct(lastProduct);
});

function AddNewProduct(lastProduct) {
  const trProduct = document.createElement("tr");
  const tdTitle = document.createElement("td");
  const tdValue = document.createElement("td");
  const tdThumbnail = document.createElement("td");
  const productImg = document.createElement("img");

  trProduct.appendChild(tdTitle);
  trProduct.appendChild(tdValue);
  trProduct.appendChild(tdThumbnail);
  tdThumbnail.appendChild(productImg);

  tdTitle.innerText = lastProduct.title;
  tdValue.innerText = lastProduct.value;

  productImg.setAttribute("src", lastProduct.thumbnail);
  productImg.setAttribute("alt", "Imágen");
  productImg.classList.add("imagenAdaptada");

  tbodyProducts.appendChild(trProduct);
}
