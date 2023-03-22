const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const jacketName = document.querySelector(".jacket-name");
const jacketImg = document.querySelector(".jacket-img");
const jacketPrice = document.querySelector(".jacket-price");
const jacketSizes = document.querySelector(".jacket-sizes");
const jacketColors = document.querySelector(".jacket-colors");
const jacketLorem = document.querySelector(".jacket-lorem");
const buyNowBtn = document.querySelector(".buy-now");

async function fetchJacketData(jacketId) {
  const response = await fetch("data/jackets.json");
  const data = await response.json();
  const jacket = data.jackets.find((jacket) => jacket.id === parseInt(jacketId));
  return jacket;
}

async function updateJacketDetails() {
  const jacket = await fetchJacketData(id);
  jacketName.textContent = jacket.jacketName;
  jacketImg.src = jacket.imgSrc;
  jacketImg.alt = jacket.imgAlt;
  jacketPrice.textContent = jacket.price;
  jacketLorem.textContent = jacket.info;
  jacketImg.src = jacket.imgSrc;
  jacketImg.alt = jacket.imgAlt;

  const sizeSelect = document.getElementById("size");
  jacket.sizes.forEach((size) => {
    const option = document.createElement("option");
    option.text = size;
    sizeSelect.add(option);
  });

  const colorSelect = document.getElementById("color");
  jacket.colors.forEach((color) => {
    const option = document.createElement("option");
    option.text = color;
    colorSelect.add(option);
  });
}

updateJacketDetails();

buyNowBtn.addEventListener("click", redirectToCheckout);

function redirectToCheckout() {
  const name = jacketName.textContent;
  const selectedSize = document.getElementById("size").value;
  const selectedColor = document.getElementById("color").value;
  const price = jacketPrice.textContent;

  sessionStorage.setItem("name", name);
  sessionStorage.setItem("size", selectedSize);
  sessionStorage.setItem("color", selectedColor);
  sessionStorage.setItem("price", price);

  window.location.href = "checkout.html";
}
