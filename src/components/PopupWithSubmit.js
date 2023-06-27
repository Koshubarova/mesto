import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor (popupSelector, handlePopupSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._handlePopupSubmit = handlePopupSubmit;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._submitButton.textContent = 'Удаляем...'
    this._handlePopupSubmit(this._card, this._cadrId)
    })
  }

  open = (card, cardId) => {
    super.open()
    this._card = card;
    this._cadrId = cardId;
  }

  close() {
    super.close();
    this._form.reset();
    this._submitButton.textContent = "Да";
  }
}
