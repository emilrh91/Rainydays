const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

function showLoader() {
  document.getElementById('loader-container').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('loader-container').style.display = 'none';
}

function openModal() {
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.add("show-modal");
  }, 30); 
}

function closeModal() {
  modal.classList.remove("show-modal");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300); 
}

function updateModalContent(content) {
  modalContent.innerHTML = content;
}

function createModalContent(product) {
  const imageUrl = product.images.length ? product.images[0].src : '';
  const imageAlt = product.images.length ? product.images[0].alt : '';
  const productPrice = product.prices.sale_price !== '0' ? product.prices.sale_price : product.prices.price;
  const formattedPrice = (parseInt(productPrice) / (10 ** product.prices.currency_minor_unit)).toFixed(product.prices.currency_minor_unit);

  const sizeOptions = product.attributes.find(attr => attr.name === "Size")?.terms || [];
  const colorOptions = product.attributes.find(attr => attr.name === "Color")?.terms || [];

  return `
    <div class="jacket-details">
      <div class="jacket-details-container">
        <div class="jacket-image">
          <img class="jacket-img" src="${imageUrl}" alt="${imageAlt}" />
        </div>
        <div class="jacket-info">
          <h2 class="jacket-name">${product.name}</h2>
          <p class="jacket-price">${product.prices.currency_prefix}${formattedPrice}${product.prices.currency_suffix}</p>
          <label for="size">Size:</label>
          <select id="size" name="size">
            ${sizeOptions.map(size => `<option value="${size.slug}">${size.name}</option>`).join('')}
          </select>
          <br />
          <label for="color">Color:</label>
          <select id="color" name="color">
            ${colorOptions.map(color => `<option value="${color.slug}">${color.name}</option>`).join('')}
          </select>
          <br />
          <button class="buy-now" id="buy-now" data-jacket-id="${product.id}">BUY NOW</button>
          <p class="jacket-lorem">${product.description}</p>
        </div>
      </div>
    </div>`;
}

async function fetchAndSortProductData() {
  try {
    showLoader();

    const allProductsResponse = await fetch("https://www.emilhalvorsen.no/wordpress-rainydays/wp-json/wc/store/products?status=any&consumer_key=ck_e885bf4b57ada4e74f4f85e4fae5d048f3c8b611&consumer_secret=74f746cb2c1c89c09e60a91eb1bffceb5cae0402");
    const allProductsData = await allProductsResponse.json();

    const featuredProductsResponse = await fetch("https://www.emilhalvorsen.no/wordpress-rainydays/wp-json/wc/store/products?status=any&featured=true&consumer_key=ck_e885bf4b57ada4e74f4f85e4fae5d048f3c8b611&consumer_secret=74f746cb2c1c89c09e60a91eb1bffceb5cae0402");
    const featuredProductsData = await featuredProductsResponse.json();

    if (!Array.isArray(allProductsData) || !Array.isArray(featuredProductsData)) {
      console.error('API response is not an array:', allProductsData, featuredProductsData);
      return;
    }

    const otherProducts = allProductsData;

    return {
      featuredProducts: featuredProductsData,
      otherProducts: otherProducts
    };
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    hideLoader(); 
  }
}



function isProductFeatured(product) {
  return product.is_featured;
}

const renderProductGrid = (productList, parentContainer) => {
  productList.forEach((product) => {
    const jacketDiv = document.createElement("div");
    jacketDiv.classList.add("jacket");

    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "jacket_1");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      updateModalContent(createModalContent(product));
      openModal();
    });

    const img = document.createElement("img");
    img.setAttribute("src", product.images[0].src);
    img.setAttribute("alt", product.images[0].alt);
    img.setAttribute("class", `jacket_img${product.id}`);

    const h3 = document.createElement("h3");
    h3.textContent = product.name;

    const h4 = document.createElement("h4");
    h4.textContent = `${product.prices.currency_prefix}${(product.prices.price / 100).toFixed(2)}`;

    link.appendChild(img);
    link.appendChild(h3);
    link.appendChild(h4);
    jacketDiv.appendChild(link);

    parentContainer.appendChild(jacketDiv);
  });
};

fetchAndSortProductData()
  .then(({ featuredProducts, otherProducts }) => {
    const featuredContainer = document.querySelector(".featured-container");
    renderProductGrid(featuredProducts, featuredContainer);

    const allProductsContainer = document.querySelector(".container");
    renderProductGrid(otherProducts, allProductsContainer);
  });

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-now")) {
    const jacketId = e.target.getAttribute("data-jacket-id");
    fetchAndSortProductData()
      .then(({ featuredProducts, otherProducts }) => {
        const products = [...featuredProducts, ...otherProducts];
        const jacket = products.find((product) => product.id === parseInt(jacketId));

        const sizeSelect = document.getElementById("size");
        const colorSelect = document.getElementById("color");
        const selectedSize = sizeSelect.options[sizeSelect.selectedIndex].value;
        const selectedColor = colorSelect.options[colorSelect.selectedIndex].value;

        window.location.href = `checkout.html?name=${encodeURIComponent(jacket.name)}&size=${encodeURIComponent(selectedSize)}&color=${encodeURIComponent(selectedColor)}&price=${encodeURIComponent(jacket.prices.price)}`;
      });
  }
});