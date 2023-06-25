export default class Card {

  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true);
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
      this._handleCardClick({ name: this._name, link: this._link });
    });
  };

  _deleteCard = () => {
    this._element.remove();
  }

  _like = () => {
    this._likeButton.classList.toggle('cards__like-button_active');
  }
}
