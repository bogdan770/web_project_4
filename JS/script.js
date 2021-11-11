let userName = document.querySelector(".profile__username");
let userProf = document.querySelector(".profile__userprof");
//choosing strings from HTML

const placesList = document.querySelector(".elements__grid");

let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");

const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];

let popupEditProfile = document.querySelector(".popup_type_edit-profile");
let popupAddCard = document.querySelector(".popup_type_add-card");
let popupCloseProfileButton = popupEditProfile.querySelector(".popup__close");
let popupCloseCardButton = popupAddCard.querySelector(".popup__close");


let formElement = document.querySelector(".popup__form"); 

let nameInput = document.querySelector("#userName");
let jobInput = document.querySelector("#userJob");


//getting inputs from popup that add card
let cardName = document.querySelector("#cardNameId");
let cardImageLink = document.querySelector("#cardLinkId");



//cards
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

const cardTemplateImage = document.querySelector(".image-popup");
let cardCloseButton = cardTemplateImage.querySelector(".popup__close")

const createCardButton = document.querySelector(".popup__button_create-card");

editButton.addEventListener('click', () =>{ 
    nameInput.value = userName.textContent; 
    jobInput.value = userProf.textContent; 
    popupEditProfile.classList.add("popup_display");
    // adding new class to the popup
}); 
// editButton get 'click' from the user, and turn the popup form with context from the page to him.

formElement.addEventListener('submit',handleProfileFormSubmit);

function closeProfilePopup(){
    popupEditProfile.classList.remove("popup_display");
}

function closeCardPopup(){
    popupAddCard.classList.remove("popup_display");
}

//function that remove the class from variable popupEditProfile, it's mean than popup is disappear

function handleProfileFormSubmit(evt) {
    evt.preventDefault()
    userName.textContent = nameInput.value;
    userProf.textContent = jobInput.value;
    closeProfilePopup()
}//this function let us to change


function createCardElement(cardData){
    const card = cardTemplate.cloneNode(true);
    card.querySelector(".element__title").textContent = cardData.name;
    card.querySelector(".element__image").style.backgroundImage = `url(${cardData.link})`;

    card.querySelector(".element__like").addEventListener("click", function(evt){
        evt.target.classList.toggle("element__like_active");
    });//adding like

    card.querySelector(".element__delete").addEventListener("click",function(){
        card.remove()
         });//remove card

    const imageZoom = card.querySelector(".element__image");
    imageZoom.addEventListener('click',()=>{
      cardTemplateImage.classList.add("popup_display");
      cardTemplateImage.querySelector(".image-popup__title").textContent = cardData.name;
      cardTemplateImage.querySelector(".image-popup__image").src = cardData.link;
      cardCloseButton.addEventListener('click', ()=>{
        cardTemplateImage.classList.remove("popup_display");
      });
    });
    return card;
};


function addCardToPage(event){
  event.preventDefault();
  const cardNew = createCardElement({
    name: cardName.value,
    link: cardImageLink.value
  });
  placesList.prepend(cardNew);
  closeCardPopup();
};

createCardButton.addEventListener('click', addCardToPage);



addButton.addEventListener('click', function() {popupAddCard.classList.add("popup_display")});

popupCloseProfileButton.addEventListener('click', closeProfilePopup);
popupCloseCardButton.addEventListener('click', closeCardPopup);

initialCards.forEach(initialCardData =>{
    placesList.prepend(createCardElement(initialCardData));
});