/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Card; }
/* harmony export */ });
class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.title;
    this._image = data.image;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle("element__like_active");
  }

  _removeCard(evt) {
    evt.target.closest(".element").remove();
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".element__image").style.backgroundImage = "url(".concat(this._image, ")");
    this._element.querySelector(".element__title").textContent = this._title;
    return this._element;
  }

  _handleOpenPopup() {
    this._handleCardClick({
      image: this._image,
      title: this._title
    });
  }

  _setEventListeners() {
    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._handleOpenPopup();
    });

    const likeButton = this._element.querySelector(".element__like");

    const deleteButton = this._element.querySelector(".element__delete");

    likeButton.addEventListener("click", this._handleLikeIcon);
    deleteButton.addEventListener("click", this._removeCard);
  }

}

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidator": function() { return /* binding */ FormValidator; }
/* harmony export */ });
class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector("#".concat(inputElement.id, "-error"));

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector("#".concat(inputElement.id, "-error"));

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  resetValidation() {
    this._toggleButtonState(this._inputElements, this._buttonElement);

    this._inputElements.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputElements.some(inputElement => !inputElement.validity.valid);

    if (hasInvalidInput) {
      this._buttonElement.classList.add(this._inactiveButtonClass);

      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);

      this._buttonElement.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, inputElement.validationMessage);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputElements, this._buttonElement);

    this._inputElements.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", e => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

}
/* harmony default export */ __webpack_exports__["default"] = (FormValidator);

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popup": function() { return /* binding */ Popup; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Popup {
  constructor(popupSelector) {
    _defineProperty(this, "_handleEscClose", e => {
      if (e.key == "Escape") {
        this.close();
      }
    });

    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", evt => {
      if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) this.close();
    });
  }

  open() {
    this._popup.classList.add("popup_display");

    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_display");

    document.removeEventListener("keyup", this._handleEscClose);
  }

}

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithForm": function() { return /* binding */ PopupWithForm; }
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");

class PopupWithForm extends _Popup__WEBPACK_IMPORTED_MODULE_0__.Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".input");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", () => {
      this._submitHandler(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    this._form.reset();

    super.close();
  }

}

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithImage": function() { return /* binding */ PopupWithImage; }
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class PopupWithImage extends _Popup__WEBPACK_IMPORTED_MODULE_0__.Popup {
  constructor(popupSelector) {
    super(popupSelector);

    _defineProperty(this, "open", _ref => {
      let {
        image,
        title
      } = _ref;
      this._image.src = image;
      this._image.alt = "Image ".concat(title);
      this._caption.textContent = title;
      super.open();
    });

    this._image = this._popup.querySelector(".image-popup__image");
    this._caption = this._popup.querySelector(".image-popup__title");
  }

}

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Section": function() { return /* binding */ Section; }
/* harmony export */ });
class Section {
  constructor(_ref, containerSelector) {
    let {
      items,
      renderer
    } = _ref;
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  render() {
    this._items.forEach(data => {
      this._renderer(data);
    });
  }

}

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserInfo": function() { return /* binding */ UserInfo; }
/* harmony export */ });
class UserInfo {
  constructor(_ref) {
    let {
      userName,
      userJob
    } = _ref;
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
  }

  setUserInfo(_ref2) {
    let {
      userN: name,
      userJ: job
    } = _ref2;
    this._userJob.textContent = job;
    this._userName.textContent = name;
  }

}

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popupEditProfile": function() { return /* binding */ popupEditProfile; },
/* harmony export */   "popupAddCard": function() { return /* binding */ popupAddCard; },
/* harmony export */   "placesList": function() { return /* binding */ placesList; },
/* harmony export */   "editButton": function() { return /* binding */ editButton; },
/* harmony export */   "addButton": function() { return /* binding */ addButton; },
/* harmony export */   "formProfileElement": function() { return /* binding */ formProfileElement; },
/* harmony export */   "formAddCardElement": function() { return /* binding */ formAddCardElement; },
/* harmony export */   "nameInput": function() { return /* binding */ nameInput; },
/* harmony export */   "jobInput": function() { return /* binding */ jobInput; },
/* harmony export */   "initialCards": function() { return /* binding */ initialCards; },
/* harmony export */   "cardName": function() { return /* binding */ cardName; },
/* harmony export */   "cardImageLink": function() { return /* binding */ cardImageLink; },
/* harmony export */   "settings": function() { return /* binding */ settings; }
/* harmony export */ });
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const placesList = document.querySelector(".elements__grid");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formProfileElement = popupEditProfile.querySelector("#popup__form-edit");
const formAddCardElement = popupAddCard.querySelector("#popup__form-new");
const nameInput = document.querySelector("#userName");
const jobInput = document.querySelector("#userJob");
const cardName = document.querySelector("#cardNameId");
const cardImageLink = document.querySelector("#cardLinkId");
const initialCards = [{
  title: "Yosemite Valley",
  image: "https://code.s3.yandex.net/web-code/yosemite.jpg"
}, {
  title: "Lake Louise",
  image: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
}, {
  title: "Bald Mountains",
  image: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
}, {
  title: "Latemar",
  image: "https://code.s3.yandex.net/web-code/latemar.jpg"
}, {
  title: "Vanoise National Park",
  image: "https://code.s3.yandex.net/web-code/vanoise.jpg"
}, {
  title: "Lago di Braies",
  image: "https://code.s3.yandex.net/web-code/lago.jpg"
}];
const settings = {
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};


/***/ }),

/***/ "./src/page/index.css":
/*!****************************!*\
  !*** ./src/page/index.css ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***************************!*\
  !*** ./src/page/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_FormValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/FormValidator */ "./src/components/FormValidator.js");
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card */ "./src/components/Card.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "./src/page/index.css");
/* harmony import */ var _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/PopupWithImage */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithForm */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/UserInfo */ "./src/components/UserInfo.js");
/* harmony import */ var _components_Section__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Section */ "./src/components/Section.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");








const userInfo = new _components_UserInfo__WEBPACK_IMPORTED_MODULE_5__.UserInfo({
  userName: ".profile__username",
  userJob: ".profile__userprof"
});
const imagePopup = new _components_PopupWithImage__WEBPACK_IMPORTED_MODULE_3__.PopupWithImage(".image-popup");
imagePopup.setEventListeners();

const createCard = item => {
  return new _components_Card__WEBPACK_IMPORTED_MODULE_1__["default"](item, "#card-template", imagePopup.open).generateCard();
};

const section = new _components_Section__WEBPACK_IMPORTED_MODULE_6__.Section({
  items: _utils_constants__WEBPACK_IMPORTED_MODULE_7__.initialCards,
  renderer: item => {
    const card = createCard(item);
    section.addItem(card);
  }
}, ".elements__grid");
section.render();
const editPopup = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_4__.PopupWithForm(".popup_type_edit-profile", data => {
  userInfo.setUserInfo(data);
  editPopup.close();
});
editPopup.setEventListeners();
const addCard = new _components_PopupWithForm__WEBPACK_IMPORTED_MODULE_4__.PopupWithForm(".popup_type_add-card", data => {
  const card = createCard(data);
  section.addItem(card);
  addCard.close();
});
addCard.setEventListeners(); //validation

const editFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_0__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_7__.settings, _utils_constants__WEBPACK_IMPORTED_MODULE_7__.popupEditProfile);
const cardFormValidator = new _components_FormValidator__WEBPACK_IMPORTED_MODULE_0__["default"](_utils_constants__WEBPACK_IMPORTED_MODULE_7__.settings, _utils_constants__WEBPACK_IMPORTED_MODULE_7__.popupAddCard);
editFormValidator.enableValidation();
cardFormValidator.enableValidation(); //getting inputs from popup that add card
//opening popup form with profile and filling it by data from the page  CORRECT

_utils_constants__WEBPACK_IMPORTED_MODULE_7__.editButton.addEventListener("click", () => {
  editPopup.open();
  editFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  _utils_constants__WEBPACK_IMPORTED_MODULE_7__.nameInput.value = data.name;
  _utils_constants__WEBPACK_IMPORTED_MODULE_7__.jobInput.value = data.job;
}); //opening popup with new card

_utils_constants__WEBPACK_IMPORTED_MODULE_7__.addButton.addEventListener("click", () => {
  addCard.open();
  cardFormValidator.resetValidation();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXJkLmpzIiwid2VicGFjazovL3NwcmludF8wOC8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vc3ByaW50XzA4Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vc3ByaW50XzA4Ly4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9zcHJpbnRfMDgvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9zcHJpbnRfMDgvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3NwcmludF8wOC8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NwcmludF8wOC8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ByaW50XzA4Ly4vc3JjL3BhZ2UvaW5kZXguY3NzPzQ0YzEiLCJ3ZWJwYWNrOi8vc3ByaW50XzA4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NwcmludF8wOC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ByaW50XzA4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3ByaW50XzA4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ByaW50XzA4Ly4vc3JjL3BhZ2UvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZFNlbGVjdG9yLCBoYW5kbGVDYXJkQ2xpY2spIHtcclxuICAgIHRoaXMuX3RpdGxlID0gZGF0YS50aXRsZTtcclxuICAgIHRoaXMuX2ltYWdlID0gZGF0YS5pbWFnZTtcclxuXHJcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XHJcblxyXG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZUxpa2VJY29uKGV2dCkge1xyXG4gICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiZWxlbWVudF9fbGlrZV9hY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBfcmVtb3ZlQ2FyZChldnQpIHtcclxuICAgIGV2dC50YXJnZXQuY2xvc2VzdChcIi5lbGVtZW50XCIpLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgX2dldFRlbXBsYXRlKCkge1xyXG4gICAgY29uc3QgY2FyZEVsZW1lbnQgPSBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXHJcbiAgICAgIC5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gY2FyZEVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUNhcmQoKSB7XHJcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5lbGVtZW50X19pbWFnZVwiXHJcbiAgICApLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt0aGlzLl9pbWFnZX0pYDtcclxuICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbGVtZW50X190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX3RpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZU9wZW5Qb3B1cCgpIHtcclxuICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayh7IGltYWdlOiB0aGlzLl9pbWFnZSwgdGl0bGU6IHRoaXMuX3RpdGxlIH0pO1xyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fZWxlbWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5lbGVtZW50X19pbWFnZVwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVPcGVuUG9wdXAoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc3QgbGlrZUJ1dHRvbiA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbGVtZW50X19saWtlXCIpO1xyXG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmVsZW1lbnRfX2RlbGV0ZVwiKTtcclxuXHJcbiAgICBsaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9oYW5kbGVMaWtlSWNvbik7XHJcbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3JlbW92ZUNhcmQpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRm9ybVZhbGlkYXRvciB7XHJcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbGVtZW50KSB7XHJcbiAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gc2V0dGluZ3MuaW5wdXRTZWxlY3RvcjtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcztcclxuICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IHNldHRpbmdzLmlucHV0RXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBzZXR0aW5ncy5lcnJvckNsYXNzO1xyXG5cclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5faW5wdXRFbGVtZW50cyA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvcilcclxuICAgICk7XHJcbiAgICB0aGlzLl9idXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3JcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XHJcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgIyR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmBcclxuICAgICk7XHJcblxyXG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZTtcclxuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xyXG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXHJcbiAgICApO1xyXG5cclxuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICByZXNldFZhbGlkYXRpb24oKSB7XHJcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSh0aGlzLl9pbnB1dEVsZW1lbnRzLCB0aGlzLl9idXR0b25FbGVtZW50KTtcclxuXHJcbiAgICB0aGlzLl9pbnB1dEVsZW1lbnRzLmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICBjb25zdCBoYXNJbnZhbGlkSW5wdXQgPSB0aGlzLl9pbnB1dEVsZW1lbnRzLnNvbWUoXHJcbiAgICAgIChpbnB1dEVsZW1lbnQpID0+ICFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWRcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGhhc0ludmFsaWRJbnB1dCkge1xyXG4gICAgICB0aGlzLl9idXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYnV0dG9uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9idXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCkge1xyXG4gICAgaWYgKGlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCkge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQsIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUodGhpcy5faW5wdXRFbGVtZW50cywgdGhpcy5fYnV0dG9uRWxlbWVudCk7XHJcblxyXG4gICAgdGhpcy5faW5wdXRFbGVtZW50cy5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGVuYWJsZVZhbGlkYXRpb24oKSB7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xyXG4iLCJleHBvcnQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwXCIpIHx8XHJcbiAgICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cF9fY2xvc2VcIilcclxuICAgICAgKVxyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb3BlbigpIHtcclxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9kaXNwbGF5XCIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcInBvcHVwX2Rpc3BsYXlcIik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZUVzY0Nsb3NlID0gKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IFBvcHVwIH0gZnJvbSBcIi4vUG9wdXBcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIHN1Ym1pdEhhbmRsZXIpIHtcclxuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fc3VibWl0SGFuZGxlciA9IHN1Ym1pdEhhbmRsZXI7XHJcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcclxuXHJcbiAgICB0aGlzLl9pbnB1dHMgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5wdXRcIik7XHJcbiAgfVxyXG5cclxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHt9O1xyXG4gICAgdGhpcy5faW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaW5wdXRWYWx1ZXM7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEhhbmRsZXIodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XHJcbiAgICBzdXBlci5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBQb3B1cCB9IGZyb20gXCIuL1BvcHVwXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIuaW1hZ2UtcG9wdXBfX2ltYWdlXCIpO1xyXG4gICAgdGhpcy5fY2FwdGlvbiA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIuaW1hZ2UtcG9wdXBfX3RpdGxlXCIpO1xyXG4gIH1cclxuXHJcbiAgb3BlbiA9ICh7IGltYWdlLCB0aXRsZSB9KSA9PiB7XHJcbiAgICB0aGlzLl9pbWFnZS5zcmMgPSBpbWFnZTtcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IGBJbWFnZSAke3RpdGxlfWA7XHJcbiAgICB0aGlzLl9jYXB0aW9uLnRleHRDb250ZW50ID0gdGl0bGU7XHJcbiAgICBzdXBlci5vcGVuKCk7XHJcbiAgfTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG5cclxuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShlbGVtZW50KSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGRhdGEpID0+IHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcih7IHVzZXJOYW1lLCB1c2VySm9iIH0pIHtcclxuICAgIHRoaXMuX3VzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VyTmFtZSk7XHJcbiAgICB0aGlzLl91c2VySm9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih1c2VySm9iKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogdGhpcy5fdXNlck5hbWUudGV4dENvbnRlbnQsXHJcbiAgICAgIGpvYjogdGhpcy5fdXNlckpvYi50ZXh0Q29udGVudCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzZXRVc2VySW5mbyh7IHVzZXJOOiBuYW1lLCB1c2VySjogam9iIH0pIHtcclxuICAgIHRoaXMuX3VzZXJKb2IudGV4dENvbnRlbnQgPSBqb2I7XHJcbiAgICB0aGlzLl91c2VyTmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHBvcHVwRWRpdFByb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX3R5cGVfZWRpdC1wcm9maWxlXCIpO1xyXG5jb25zdCBwb3B1cEFkZENhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX3R5cGVfYWRkLWNhcmRcIik7XHJcbmNvbnN0IHBsYWNlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVsZW1lbnRzX19ncmlkXCIpO1xyXG5jb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcclxuY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnV0dG9uXCIpO1xyXG5jb25zdCBmb3JtUHJvZmlsZUVsZW1lbnQgPSBwb3B1cEVkaXRQcm9maWxlLnF1ZXJ5U2VsZWN0b3IoXCIjcG9wdXBfX2Zvcm0tZWRpdFwiKTtcclxuY29uc3QgZm9ybUFkZENhcmRFbGVtZW50ID0gcG9wdXBBZGRDYXJkLnF1ZXJ5U2VsZWN0b3IoXCIjcG9wdXBfX2Zvcm0tbmV3XCIpO1xyXG5jb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJOYW1lXCIpO1xyXG5jb25zdCBqb2JJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlckpvYlwiKTtcclxuY29uc3QgY2FyZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmROYW1lSWRcIik7XHJcbmNvbnN0IGNhcmRJbWFnZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmRMaW5rSWRcIik7XHJcblxyXG5jb25zdCBpbml0aWFsQ2FyZHMgPSBbXHJcbiAge1xyXG4gICAgdGl0bGU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICBpbWFnZTogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS95b3NlbWl0ZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBpbWFnZTogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYWtlLWxvdWlzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICBpbWFnZTogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9iYWxkLW1vdW50YWlucy5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIHRpdGxlOiBcIkxhdGVtYXJcIixcclxuICAgIGltYWdlOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xhdGVtYXIuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aXRsZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGltYWdlOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL3Zhbm9pc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICB0aXRsZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgaW1hZ2U6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFnby5qcGdcIixcclxuICB9LFxyXG5dO1xyXG5cclxuY29uc3Qgc2V0dGluZ3MgPSB7XHJcbiAgaW5wdXRTZWxlY3RvcjogXCIuaW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIucG9wdXBfX2J1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwicG9wdXBfX2J1dHRvbl9kaXNhYmxlZFwiLFxyXG4gIGlucHV0RXJyb3JDbGFzczogXCJwb3B1cF9faW5wdXRfdHlwZV9lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwicG9wdXBfX2Vycm9yX3Zpc2libGVcIixcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgcG9wdXBFZGl0UHJvZmlsZSxcclxuICBwb3B1cEFkZENhcmQsXHJcbiAgcGxhY2VzTGlzdCxcclxuICBlZGl0QnV0dG9uLFxyXG4gIGFkZEJ1dHRvbixcclxuICBmb3JtUHJvZmlsZUVsZW1lbnQsXHJcbiAgZm9ybUFkZENhcmRFbGVtZW50LFxyXG4gIG5hbWVJbnB1dCxcclxuICBqb2JJbnB1dCxcclxuICBpbml0aWFsQ2FyZHMsXHJcbiAgY2FyZE5hbWUsXHJcbiAgY2FyZEltYWdlTGluayxcclxuICBzZXR0aW5ncyxcclxufTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvclwiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkXCI7XHJcbmltcG9ydCBcIi4vaW5kZXguY3NzXCI7XHJcbmltcG9ydCB7IFBvcHVwV2l0aEltYWdlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2VcIjtcclxuaW1wb3J0IHsgUG9wdXBXaXRoRm9ybSB9IGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm1cIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvblwiO1xyXG5pbXBvcnQge1xyXG4gIHBvcHVwRWRpdFByb2ZpbGUsXHJcbiAgcG9wdXBBZGRDYXJkLFxyXG4gIHBsYWNlc0xpc3QsXHJcbiAgZWRpdEJ1dHRvbixcclxuICBhZGRCdXR0b24sXHJcbiAgZm9ybVByb2ZpbGVFbGVtZW50LFxyXG4gIGZvcm1BZGRDYXJkRWxlbWVudCxcclxuICBuYW1lSW5wdXQsXHJcbiAgam9iSW5wdXQsXHJcbiAgaW5pdGlhbENhcmRzLFxyXG4gIGNhcmROYW1lLFxyXG4gIGNhcmRJbWFnZUxpbmssXHJcbiAgc2V0dGluZ3MsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xyXG4gIHVzZXJOYW1lOiBcIi5wcm9maWxlX191c2VybmFtZVwiLFxyXG4gIHVzZXJKb2I6IFwiLnByb2ZpbGVfX3VzZXJwcm9mXCIsXHJcbn0pO1xyXG5cclxuY29uc3QgaW1hZ2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIi5pbWFnZS1wb3B1cFwiKTtcclxuaW1hZ2VQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuY29uc3QgY3JlYXRlQ2FyZCA9IChpdGVtKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBDYXJkKGl0ZW0sIFwiI2NhcmQtdGVtcGxhdGVcIiwgaW1hZ2VQb3B1cC5vcGVuKS5nZW5lcmF0ZUNhcmQoKTtcclxufTtcclxuXHJcbmNvbnN0IHNlY3Rpb24gPSBuZXcgU2VjdGlvbihcclxuICB7XHJcbiAgICBpdGVtczogaW5pdGlhbENhcmRzLFxyXG4gICAgcmVuZGVyZXI6IChpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcmQgPSBjcmVhdGVDYXJkKGl0ZW0pO1xyXG4gICAgICBzZWN0aW9uLmFkZEl0ZW0oY2FyZCk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgXCIuZWxlbWVudHNfX2dyaWRcIlxyXG4pO1xyXG5zZWN0aW9uLnJlbmRlcigpO1xyXG5cclxuY29uc3QgZWRpdFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIucG9wdXBfdHlwZV9lZGl0LXByb2ZpbGVcIiwgKGRhdGEpID0+IHtcclxuICB1c2VySW5mby5zZXRVc2VySW5mbyhkYXRhKTtcclxuICBlZGl0UG9wdXAuY2xvc2UoKTtcclxufSk7XHJcblxyXG5lZGl0UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbmNvbnN0IGFkZENhcmQgPSBuZXcgUG9wdXBXaXRoRm9ybShcIi5wb3B1cF90eXBlX2FkZC1jYXJkXCIsIChkYXRhKSA9PiB7XHJcbiAgY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQoZGF0YSk7XHJcbiAgc2VjdGlvbi5hZGRJdGVtKGNhcmQpO1xyXG4gIGFkZENhcmQuY2xvc2UoKTtcclxufSk7XHJcbmFkZENhcmQuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbi8vdmFsaWRhdGlvblxyXG5jb25zdCBlZGl0Rm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBwb3B1cEVkaXRQcm9maWxlKTtcclxuY29uc3QgY2FyZEZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgcG9wdXBBZGRDYXJkKTtcclxuZWRpdEZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG5jYXJkRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcblxyXG4vL2dldHRpbmcgaW5wdXRzIGZyb20gcG9wdXAgdGhhdCBhZGQgY2FyZFxyXG5cclxuLy9vcGVuaW5nIHBvcHVwIGZvcm0gd2l0aCBwcm9maWxlIGFuZCBmaWxsaW5nIGl0IGJ5IGRhdGEgZnJvbSB0aGUgcGFnZSAgQ09SUkVDVFxyXG5lZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgZWRpdFBvcHVwLm9wZW4oKTtcclxuICBlZGl0Rm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcclxuICBjb25zdCBkYXRhID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcclxuICBuYW1lSW5wdXQudmFsdWUgPSBkYXRhLm5hbWU7XHJcbiAgam9iSW5wdXQudmFsdWUgPSBkYXRhLmpvYjtcclxufSk7XHJcblxyXG4vL29wZW5pbmcgcG9wdXAgd2l0aCBuZXcgY2FyZFxyXG5hZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBhZGRDYXJkLm9wZW4oKTtcclxuICBjYXJkRm9ybVZhbGlkYXRvci5yZXNldFZhbGlkYXRpb24oKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJDYXJkIiwiY29uc3RydWN0b3IiLCJkYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlQ2FyZENsaWNrIiwiX3RpdGxlIiwidGl0bGUiLCJfaW1hZ2UiLCJpbWFnZSIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2hhbmRsZUxpa2VJY29uIiwiZXZ0IiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiX3JlbW92ZUNhcmQiLCJjbG9zZXN0IiwicmVtb3ZlIiwiX2dldFRlbXBsYXRlIiwiY2FyZEVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiZ2VuZXJhdGVDYXJkIiwiX2VsZW1lbnQiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInRleHRDb250ZW50IiwiX2hhbmRsZU9wZW5Qb3B1cCIsImFkZEV2ZW50TGlzdGVuZXIiLCJsaWtlQnV0dG9uIiwiZGVsZXRlQnV0dG9uIiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfZm9ybUVsZW1lbnQiLCJfaW5wdXRFbGVtZW50cyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfYnV0dG9uRWxlbWVudCIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWxlbWVudCIsImVycm9yRWxlbWVudCIsImlkIiwiYWRkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGlkZUlucHV0RXJyb3IiLCJyZXNldFZhbGlkYXRpb24iLCJfdG9nZ2xlQnV0dG9uU3RhdGUiLCJmb3JFYWNoIiwiaGFzSW52YWxpZElucHV0Iiwic29tZSIsInZhbGlkaXR5IiwidmFsaWQiLCJkaXNhYmxlZCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJlbmFibGVWYWxpZGF0aW9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiUG9wdXAiLCJwb3B1cFNlbGVjdG9yIiwia2V5IiwiY2xvc2UiLCJfcG9wdXAiLCJzZXRFdmVudExpc3RlbmVycyIsImNvbnRhaW5zIiwib3BlbiIsIl9oYW5kbGVFc2NDbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJQb3B1cFdpdGhGb3JtIiwic3VibWl0SGFuZGxlciIsIl9zdWJtaXRIYW5kbGVyIiwiX2Zvcm0iLCJfaW5wdXRzIiwiX2dldElucHV0VmFsdWVzIiwiaW5wdXRWYWx1ZXMiLCJpbnB1dCIsIm5hbWUiLCJ2YWx1ZSIsInJlc2V0IiwiUG9wdXBXaXRoSW1hZ2UiLCJzcmMiLCJhbHQiLCJfY2FwdGlvbiIsIlNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXMiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwicmVuZGVyIiwiVXNlckluZm8iLCJ1c2VyTmFtZSIsInVzZXJKb2IiLCJfdXNlck5hbWUiLCJfdXNlckpvYiIsImdldFVzZXJJbmZvIiwiam9iIiwic2V0VXNlckluZm8iLCJ1c2VyTiIsInVzZXJKIiwicG9wdXBFZGl0UHJvZmlsZSIsInBvcHVwQWRkQ2FyZCIsInBsYWNlc0xpc3QiLCJlZGl0QnV0dG9uIiwiYWRkQnV0dG9uIiwiZm9ybVByb2ZpbGVFbGVtZW50IiwiZm9ybUFkZENhcmRFbGVtZW50IiwibmFtZUlucHV0Iiwiam9iSW5wdXQiLCJjYXJkTmFtZSIsImNhcmRJbWFnZUxpbmsiLCJpbml0aWFsQ2FyZHMiLCJ1c2VySW5mbyIsImltYWdlUG9wdXAiLCJjcmVhdGVDYXJkIiwiaXRlbSIsInNlY3Rpb24iLCJjYXJkIiwiZWRpdFBvcHVwIiwiYWRkQ2FyZCIsImVkaXRGb3JtVmFsaWRhdG9yIiwiY2FyZEZvcm1WYWxpZGF0b3IiXSwic291cmNlUm9vdCI6IiJ9