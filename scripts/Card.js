import { openPopup } from "./index.js";
export default class Card {

  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate = () => {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true);

  return cardElement;
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.cards__delete-button');
    this._likeButton = this._element.querySelector('.cards__like-button');
    this._cardName = this._element.querySelector('.cards__name');
    this._cardImage = this._element.querySelector('.cards__image');

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners = () => {
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._likeButton.addEventListener('click', (evt) => {
      this._like(evt);
    });
    this._cardImage.addEventListener('click', () => {
      this._popupCardImage = document.querySelector('.popup__image');
      this._popupCardName = document.querySelector('.popup__image-name');
      this._popupCardName.textContent = this._name;
      this._popupCardImage.src = this._link;
      this._popupCardImage.alt = this._name;
      const popupFullscreen = document.querySelector('.popup_fullscreen');
      openPopup(popupFullscreen);
    });
  };

  _deleteCard = () => {
    this._element.remove();
  }

  _like = (evt) => {
    evt.target.classList.toggle('cards__like-button_active');
  }
}
