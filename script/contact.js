function validateForm() {
    const subjectInput = document.getElementById("subject");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
  
    const subjectRegex = /^.{3,}$/;
    const nameRegex = /^.{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messageRegex = /^.{10,160}$/;
  
    let isValid = true;
  
    if (!subjectRegex.test(subjectInput.value.trim())) {
      setErrorFor(subjectInput, "Subject must be at least 3 characters");
      isValid = false;
    } else {
      setSuccessFor(subjectInput);
    }
  
    if (!nameRegex.test(nameInput.value.trim())) {
      setErrorFor(nameInput, "Name must be at least 3 characters");
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
  
    if (!messageRegex.test(messageInput.value.trim())) {
      setErrorFor(messageInput, "Message must be between 10 and 160 characters");
      isValid = false;
    } else {
      setSuccessFor(messageInput);
    }
  
    return isValid;
  }
  
  function setErrorFor(input, message) {
    const formField = input.parentElement;
    const errorMessage = formField.querySelector(".error-message");
  
    errorMessage.innerText = message;
    formField.classList.add("error");
  }
  
  function setSuccessFor(input) {
    const formField = input.parentElement;
    formField.classList.remove("error");
  }
  
  function submitForm(event) {
    event.preventDefault();
  
    if (validateForm()) {
      
      const templateParams = {
        subject: document.getElementById("subject").value.trim(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
      };
      
      console.log("Email to contact@rainydays.com would be sent with the following data:", templateParams); 
      
    }
  }
  
  window.onload = function () {
    function initContactMap() {
      const location = { lat: 59.91144816890831, lng: 10.749494029772572 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
      });
  
      const marker = new google.maps.Marker({
        position: location,
        map: map,
      });
    }
  
    initContactMap();
  };
  