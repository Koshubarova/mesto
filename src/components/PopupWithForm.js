import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input =>
      this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  setInputValues(dataUser) {
    this._inputList.forEach((input) => {
      input.value = dataUser[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitButton.textContent = 'Сохранение...'
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
