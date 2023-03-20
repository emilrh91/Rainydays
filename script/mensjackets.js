const container = document.querySelector(".container");

fetch("data/jackets.json")
  .then((response) => response.json())
  .then((data) => {

    data.jackets.forEach((jacket) => {
      const jacketDiv = document.createElement("div");
      jacketDiv.classList.add("jacket");

      const link = document.createElement("a");
      link.setAttribute("href", `details.html?id=${encodeURIComponent(jacket.id)}`);
      link.setAttribute("class", "jacket_1");

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


