const urlParams = new URLSearchParams(window.location.search);
const jacketName = urlParams.get("name");
const selectedSize = urlParams.get("size");
const selectedColor = urlParams.get("color");
const jacketPrice = urlParams.get("price");

function displaySelectedOptions() {
  document.getElementById("jacketName").innerText = jacketName;
  document.getElementById("selectedSize").innerText = selectedSize;
  document.getElementById("selectedColor").innerText = selectedColor;
  document.getElementById("jacketPrice").innerText = jacketPrice;
}

function calculateDeliveryDate() {
  const currentDate = new Date();
  const twoWorkDays = 2 * 24 * 60 * 60 * 1000;
  const deliveryDate = new Date(currentDate.getTime() + twoWorkDays);

  const deliveryDateString = deliveryDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("deliveryDate").innerText = deliveryDateString;
}

displaySelectedOptions();
calculateDeliveryDate();
