let userName = document.querySelector(".profile__username");
let userProf = document.querySelector(".profile__userprof");
//choosing strings from HTML


let editButton = document.querySelector(".profile__edit-button");
let displayPopup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
let formElement = document.querySelector("#popup__form"); 


let nameInput = document.querySelector("#userName");
let jobInput = document.querySelector("#userJob");


editButton.addEventListener('click', () =>{ 
    nameInput.value = userName.textContent; 
    jobInput.value = userProf.textContent; 
    displayPopup.classList.add("popup_display");
    // adding new class to the popup
}); 
// editButton get 'click' from the user, and turn the popup form with context from the page to him.

formElement.addEventListener('submit',handleProfileFormSubmit);

function closePopup(){
    displayPopup.classList.remove("popup_display");
}
//function that remove the class from variable displayPopup, it's mean than popup is disappear

function handleProfileFormSubmit(evt) {
    evt.preventDefault()
    userName.textContent = nameInput.value;
    userProf.textContent = jobInput.value;
    closePopup()
}
//this function let us to change

closeButton.addEventListener('click', closePopup);
