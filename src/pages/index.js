import './index.css';
import Card from '../components/Card.js';
import { configValidation, initialCards } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// попап редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
const openPopupEditButton = document.querySelector('.profile__edit');
const closePopupEditButton = document.querySelector('.popup__close-edit');
const nameValue = document.querySelector('.profile__name');
const subtitleValue = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const popupEditPhotoButton = document.querySelector('.profile__photo-button');
const popupEditPhotoSelector = '.popup-edit-photo';
const popupDeleteCardSelector = '.popup-delete';

//попап добавления карточки
const popupAdd = document.querySelector('.popup-add');
const openPopupAddButton = document.querySelector('.profile__add');
const closePopupAddButton = document.querySelector('.popup__close-add');
const templateCard = document.getElementById('template__card');
const templateCardContent = templateCard.content;
const templateCardItem = templateCardContent.querySelector('.cards__item');
const cards = document.querySelector('.cards');
const formAddCard = document.querySelector('.popup__form-add');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_link');
const buttonSubmit = document.querySelector('.popup__submit');

//попап увеличения картинки
const popupFullscreen = document.querySelector('.popup_fullscreen');
const popupCardImage = document.querySelector('.popup__image');
const popupCardName = document.querySelector('.popup__image-name');
const buttonCloseImage = document.querySelector('.popup__close-image');

//селекторы форм для валидации
const profileForm = document.querySelector('.popup__form-edit');
const cardsForm = document.querySelector('.popup__form-add');
const photoForm = document.querySelector('.popup__form-photo');

//валидации форм
const profileValidation = new FormValidator(configValidation, profileForm);
profileValidation.enableValidation();
const cardsValidation = new FormValidator(configValidation, cardsForm);
cardsValidation.enableValidation();
const profilePhotoValidation = new FormValidator(configValidation, photoForm);
profilePhotoValidation.enableValidation();

//Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '39c56915-9550-44c8-84ed-160de228f283',
    'Content-Type': 'application/json'
  }
});

//Фото фуллскрин
const popupImage = new PopupWithImage('.popup_fullscreen');
popupImage.setEventListeners();

const userInfo = new UserInfo({userNameSelector: '.profile__name', userDescriptionSelector: '.profile__subtitle', userPhotoSelector: '.profile__photo'});

//Редактирование профиля
const popupProfile = new PopupWithForm('.popup-edit', (data) => {
  api.setUserInfo(data)
  .then(res => {
    userInfo.setUserInfo({name: res.name, description: res.about, photo: res.avatar})
  popupProfile.close();
  })
  .catch((error) => console.error(error))
  .finally(() => popupProfile.submitButton.textContent = 'Сохранить')
});
popupProfile.setEventListeners();

openPopupEditButton.addEventListener("click", () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

//Изменение фото профиля
const popupEditPhoto = new PopupWithForm(popupEditPhotoSelector, (data) => {
  api.setPhoto(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, description: res.about, photo: res.avatar });
      popupEditPhoto.close()
    })
    .catch((error) => console.error(error))
    .finally(() => popupEditPhoto.submitButton.textContent = 'Сохранить')
});
popupEditPhoto.setEventListeners();

popupEditPhotoButton.addEventListener('click', ()=> {
  profilePhotoValidation.disableSubmitButton();
  popupEditPhoto.open()
})

//Удаление карточки
const popupSubmitDelete = new PopupWithSubmit('.popup-delete', (card, cardId) => {
  api.deleteCard(cardId)
  .then(() => {
    card.removeCard(card)
    popupSubmitDelete.close();
  })
  .catch((error) => console.error(error))
  .finally(() => popupSubmitDelete.submitButton.textContent = 'Да')
});
popupSubmitDelete.setEventListeners();

//Создание карточки
const popupCards = new PopupWithForm('.popup-add', (data) => {
  Promise.all([api.getUserInfo(), api.addNewCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id
      rendererCards.addItem(createCard(dataCard))
      popupCards.close()
    })
    .catch((error) => console.error(error))
    .finally(() => popupCards.submitButton.textContent = 'Добавить')
});
popupCards.setEventListeners();

openPopupAddButton.addEventListener("click", () => {
  cardsValidation.disableSubmitButton();
  popupCards.open();
});

//Создание карточки
const createCard = (data) => {
  const createCard = new Card(data, '#template__card', popupImage.open, popupSubmitDelete.open, (likeElement, cardId) => {
    if (likeElement.classList.contains('cards__like-button_active')) {
      api.deleteLike(cardId)
        .then(res => {
          createCard.like(res.likes)
        })
        .catch((error) => console.error(error))
    } else {
      api.addLike(cardId)
        .then(res => {
          createCard.like(res.likes)
        })
        .catch((error) => console.error(error))
    }
  })
  return createCard.generateCard();
}

const rendererCards = new Section({
  renderer: (data) => {
    rendererCards.addItem(createCard(data));
  }}, '.cards');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id);
    userInfo.setUserInfo({ username: dataUser.name, description: dataUser.about, photo: dataUser.avatar });
    rendererCards.renderItems(dataCard);
  })
  .catch((error) => console.error(error))
