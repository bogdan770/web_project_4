let editButton = document.querySelector(".profile__edit-button");
let displayPopup = document.querySelector(".popup_display");
let closeButton = document.querySelector(".popup__close");
let formElement = document.querySelector(".popup_box");
let saveButton = document.querySelector(".popup__button");


let userName = document.querySelector(".profile__username");
let userProf = document.querySelector(".profile__userprof");


let nameInput = document.querySelector(".popup__username");
let jobInput = document.querySelector(".popup__prof")


editButton.addEventListener('click', () =>{
    nameInput.value = userName.textContent;
    jobInput.value = userProf.textContent;
    displayPopup.setAttribute("style", "display: block");
});

saveButton.addEventListener('click',() =>{
    userName.textContent = nameInput.value;
    userProf.textContent = jobInput.value;
    closePopup()
});

function closePopup(){
    displayPopup.setAttribute("style", "display: none");
}

closeButton.addEventListener('click', closePopup);