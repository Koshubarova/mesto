export default class Card {

  constructor(data, templateSelector, handleCardClick, submitDelete, handleLike) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._submitDelete = submitDelete;
    this._handleLike = handleLike;
    this._cardId = data._id;
    this._myId = data.myid;
    this._ownerId = data.owner._id;
    this._likes = data.likes
    this._likesLength = data.likes.length;
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
    this._likeCounter = this._element.querySelector('.cards__like-counter');

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    this._likesCheck();
    this._deleteButtonVisibility();
    return this._element;
  }

  _setEventListeners = () => {
    this._deleteButton.addEventListener('click', this._deleteCard);
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLike(this._cardId, this._likeButton);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  };

  _deleteCard = () => {
    this._submitDelete(this, this._cardId);
  }

  _likeCard = () => {
    this._handleLike(this._likeButton, this._cardId)
  }

  _likesCheck() {
    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._likeButton.classList.add('cards__like-button_active')
      }
    })
    this._likeCounter.textContent = this._likesLength;
  }

  _deleteButtonVisibility() {
    if (this._myId !== this._ownerId) {
    this._deleteButton.remove()};
  }

  removeCard = () => {
    this._element.remove();
  }

  like = (likes) => {
    this._likeButton.classList.toggle('cards__like-button_active');
    this._likeCounter.textContent = likes.length;
  }
}
