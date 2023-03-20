
const urlParams = new URLSearchParams(window.location.search);
const jacketName = urlParams.get("name");
const selectedSize = urlParams.get("size");
const selectedColor = urlParams.get("color");
const jacketPrice = urlParams.get("price")

console.log(jacketPrice);


function displaySelectedOptions() {
  document.getElementById("jacketName").innerText = jacketName;
  document.getElementById("selectedSize").innerText = selectedSize;
  document.getElementById("selectedColor").innerText = selectedColor;
  document.getElementById("jacketPrice").innerText = jacketPrice;

}


displaySelectedOptions();

function validateForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("address")
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const zipInput = document.getElementById("zip");
    const cardNumberInput = document.getElementById("card-number");
    const expDateInput = document.getElementById("exp-date");
    const cvvInput = document.getElementById("cvv")
    
    const nameRegex = /^[a-zA-Z ]{4,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const addressRegex = /^.{3,}$/;
    const cityRegex = /^.{3,}$/;
    const stateRegex = /^.{3,}$/;    
    const zipRegex = /^\d{4}$/;
    const cardNumberRegex = /^\d{16}$/;
    const expDateRegex = /^\d{4}$/;
    const cvvRegex = /^\d{3}$/;
    
    
    let isValid = true;
    
    if (!nameRegex.test(nameInput.value.trim())) {
      setErrorFor(nameInput, "Name must be at least 4 characters");
      isValid = false;
    } else {
      setSuccessFor(nameInput);
    }
    
    if (!emailRegex.test(emailInput.value.trim())) {
      setErrorFor(emailInput, "Please enter a valid email");
      isValid = false;
    } else {
      setSuccessFor(emailInput);
    }

    if (!addressRegex.test(addressInput.value.trim())) {
        setErrorFor(addressInput, "Please enter a valid address");
        isValid = false;
      } else {
        setSuccessFor(addressInput);
      }

    if (!cityRegex.test(cityInput.value.trim())) {
        setErrorFor(cityInput, "Please enter a valid city");
        isValid = false;
      } else {
        setSuccessFor(cityInput);
      }


    if (!stateRegex.test(stateInput.value.trim())) {
        setErrorFor(stateInput, "Please enter a valid state");
        isValid = false;
    } else {
        setSuccessFor(stateInput);
    }
    
    if (!zipRegex.test(zipInput.value.trim())) {
      setErrorFor(zipInput, "Please enter a valid zip code");
      isValid = false;
    } else {
      setSuccessFor(zipInput);
    }
    
    if (!cardNumberRegex.test(cardNumberInput.value.trim())) {
        setErrorFor(cardNumberInput, "Please enter a valid card number");
        isValid = false;
      } else {
        setSuccessFor(cardNumberInput);
      }

    if (!expDateRegex.test(expDateInput.value.trim())) {
        setErrorFor(expDateInput, "Please enter a valid date");
        isValid = false;
      } else {
        setSuccessFor(expDateInput);
      }

    if (!cvvRegex.test(cvvInput.value.trim())) {
        setErrorFor(cvvInput, "Please enter a valid cvv");
        isValid = false;
      } else {
        setSuccessFor(cvvInput);
      }

    return isValid;
  }
  
  function setErrorFor(input, message) {
    const formField = input.parentElement;
    const errorMessage = formField.querySelector('.error-message');
    
    errorMessage.innerText = message;
    formField.classList.add('error');
  }
  
  function setSuccessFor(input) {
    const formField = input.parentElement;
    formField.classList.remove('error');
  }
  
  function submitForm(event) {
    event.preventDefault();
  
    if (validateForm()) {
      window.location.href = `success.html?name=${jacketName}&size=${selectedSize}&color=${selectedColor}&price=${jacketPrice}`;
    }
  }
  
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', submitForm);
  
  



 