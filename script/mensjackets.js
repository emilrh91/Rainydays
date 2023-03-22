const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
let jacketsData;

function openModal() {
  modal.classList.add("show-modal");
}

function closeModal() {
  modal.classList.remove("show-modal");
}

function updateModalContent(content) {
  modalContent.innerHTML = content;
}

function createModalContent(jacket) {
  return `
    <div class="jacket-details">
      <div class="jacket-details-container">
        <div class="jacket-image">
          <img class="jacket-img" src="${jacket.imgSrc}" alt="${jacket.imgAlt}" />
        </div>
        <div class="jacket-info">
          <h2 class="jacket-name">${jacket.jacketName}</h2>
          <p class="jacket-price">${jacket.price}</p>
          <label for="size">Size:</label>
          <select id="size" name="size">${jacket.sizes.map(size => `<option>${size}</option>`).join("")}</select>
          
          <br />
          <label for="color">Color:</label>
          <select id="color" name="color">${jacket.colors.map(color => `<option>${color}</option>`).join("")}</select>
          <br />
          <button class="buy-now" id="buy-now" data-jacket-id="${jacket.id}">BUY NOW</button>
          <p class="jacket-lorem">${jacket.info}</p>
        </div>
      </div>
    </div>`;
}

fetch("data/jackets.json")
  .then((response) => response.json())
  .then((data) => {
    jacketsData = data;
    data.jackets.forEach((jacket) => {
      const jacketDiv = document.createElement("div");
      jacketDiv.classList.add("jacket");

      const link = document.createElement("a");
      link.setAttribute("href", "#");
      link.setAttribute("class", "jacket_1");

      link.addEventListener("click", (e) => {
        e.preventDefault();
        updateModalContent(createModalContent(jacket));
        openModal();
      });

      const img = document.createElement("img");
      img.setAttribute("src", jacket.imgSrc);
      img.setAttribute("alt", jacket.imgAlt);
      img.setAttribute("class", `jacket_img${jacket.id}`);

      const h3 = document.createElement("h3");
      h3.textContent = jacket.jacketName;

      const h4 = document.createElement("h4");
      h4.textContent = jacket.price;

      link.appendChild(img);
      link.appendChild(h3);
      link.appendChild(h4);
      jacketDiv.appendChild(link);

      container.appendChild(jacketDiv);
    });
  });

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-now")) {
    const jacketId = e.target.getAttribute("data-jacket-id");
    const jacket = jacketsData.jackets.find((jacket) => jacket.id === parseInt(jacketId));

    const sizeSelect = document.getElementById("size");
    const colorSelect = document.getElementById("color");
    const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].value;
    const selectedColor = colorSelect.options[colorSelect.selectedIndex].value;

    window.location.href = `checkout.html?name=${encodeURIComponent(jacket.jacketName)}&size=${encodeURIComponent(selectedSize)}&color=${encodeURIComponent(selectedColor)}&price=${encodeURIComponent(jacket.price)}`;
  }
});
