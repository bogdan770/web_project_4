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
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass); 
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _toggleButtonState(inputElements, buttonElement) {
        const hasInvalidInput = this._inputElements.some(inputElement => !inputElement.validity.valid);

        if (hasInvalidInput) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.disabled = true;
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
        }
    }

    _checkInputValidity(inputElement) {
        if(inputElement.validity.valid){
            this._hideInputError(inputElement, inputElement.validationMessage);
        } else{
            this._showInputError(inputElement);
        }
    }

    _setEventListeners() {
       this._inputElements.forEach(inputElement => {
            inputElement.addEventListener('input', () =>{
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputElements, this._buttonElement); 
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', e => {
            e.preventDefault();
        });
        
        this._setEventListeners();
    }
}

export default FormValidator;