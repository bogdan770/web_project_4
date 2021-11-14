const userName = document.querySelector(".profile__username");
const userProf = document.querySelector(".profile__userprof");
//choosing strings from HTML

const placesList = document.querySelector(".elements__grid");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

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

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupCloseProfileButton = popupEditProfile.querySelector(".popup__close");
const popupCloseCardButton = popupAddCard.querySelector(".popup__close");


const formProfileElement = popupEditProfile.querySelector("#popup__form-edit");
const formAddCardElement = popupAddCard.querySelector("#popup__form-new");


const nameInput = document.querySelector("#userName");
const jobInput = document.querySelector("#userJob");


//getting inputs from popup that add card
const cardName = document.querySelector("#cardNameId");
const cardImageLink = document.querySelector("#cardLinkId");



//cards
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

const cardTemplateImage = document.querySelector(".image-popup");
const cardCloseButton = cardTemplateImage.querySelector(".popup__close")

const createCardButton = document.querySelector(".popup__button_create-card");

//open and close popup functions
function openPopup(popup){
  popup.classList.add("popup_display");
}
function closePopup(popup){
  popup.classList.remove('popup_display');
}


addButton.addEventListener('click', () =>{
  openPopup(popupAddCard);
});

//close buttons(below)
popupCloseProfileButton.addEventListener('click', () =>{
  closePopup(popupEditProfile)
});
popupCloseCardButton.addEventListener('click', () =>{
  closePopup(popupAddCard)
});
cardCloseButton.addEventListener('click', () =>{
  closePopup(cardTemplateImage);
});

editButton.addEventListener('click', () =>{ 
    nameInput.value = userName.textContent; 
    jobInput.value = userProf.textContent; 
    openPopup(popupEditProfile);
    // adding new class to the popu
}); 
// editButton get 'click' from the user, and turn the popup form with context from the page to him.

formProfileElement.addEventListener('submit',handleProfileFormSubmit);


//function that remove the class from variable popupEditProfile, it's mean than popup is disappear
function handleProfileFormSubmit(evt) {
    evt.preventDefault()
    userName.textContent = nameInput.value;
    userProf.textContent = jobInput.value;
    closePopup(popupEditProfile);
  }//this function const us to change


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

    card.querySelector(".element__image").addEventListener('click',()=>{
      openPopup(cardTemplateImage);
      cardTemplateImage.querySelector(".image-popup__title").textContent = cardData.name;
      cardTemplateImage.querySelector(".image-popup__image").src = cardData.link;
      cardTemplateImage.querySelector(".image-popup__image").alt = cardData.name;
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
  closePopup(popupAddCard);
  cardName.value = "",
  cardImageLink.value = ""
  return cardNew;
};

formAddCardElement.addEventListener('submit', addCardToPage);

initialCards.forEach(initialCardData =>{
    placesList.prepend(createCardElement(initialCardData));
});