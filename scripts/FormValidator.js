export default class FormValidator {

    constructor(configValidation, formSelector) {
        this._formSelector = formSelector;
        this._configValidation = configValidation;
        this._inputSelector = configValidation.inputSelector;
        this._submitButtonSelector = configValidation.submitButtonSelector;
        this._inactiveButtonClass = configValidation.inactiveButtonClass;
        this._inputErrorClass = configValidation.inputErrorClass;
        this._errorClass = configValidation.errorClass;
        this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    };

    _setEventListeners = () => {
        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        this._toggleButtonState();
        this._inputList.forEach((input) => {
          input.addEventListener('input', () => {
            this._checkInputValidity(input);
            this._toggleButtonState();
          });
        });
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)){
          this.disableSubmitButton();
        } else {
          this._enableSubmitButton();
        }
    };

    _enableSubmitButton = () => {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    };

    disableSubmitButton = () => {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    };

    _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    _checkInputValidity = (inputElement) => {
      this._inputElement = inputElement;
      this._errorElement = document.querySelector(`.${inputElement.id}-error`);
      if (!this._inputElement.validity.valid){
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    };

    _showInputError = (inputElement) => {
      inputElement.classList.add(this._inputErrorClass);
      this._errorElement.classList.add(this._errorClass);
      this._errorElement.textContent = this._inputElement.validationMessage;
    };

    _hideInputError = (inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
      this._errorElement.classList.remove(this._errorClass);
      this._errorElement.textContent = '';
    };

    enableValidation = () => {
      this._setEventListeners();
    };
};
