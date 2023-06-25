import Card from '../components/Card.js';
import { configValidation, initialCards } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// попап редактирования профиля
const popupEdit = document.querySelector('.popup-edit');
const openPopupEditButton = document.querySelector('.profile__edit');
const closePopupEditButton = document.querySelector('.popup__close-edit');
const nameValue = document.querySelector('.profile__name');
const subtitleValue = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

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

//валидации форм
const profileValidation = new FormValidator(configValidation, profileForm);
profileValidation.enableValidation();
const cardsValidation = new FormValidator(configValidation, cardsForm);
cardsValidation.enableValidation();

const popupImage = new PopupWithImage('.popup_fullscreen');
popupImage.setEventListeners();

const userInfo = new UserInfo({userNameSelector: ".profile__name", userDescriptionSelector: ".profile__subtitle"});

const popupProfile = new PopupWithForm('.popup-edit', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValues());
  popupProfile.close();
});
popupProfile.setEventListeners();

openPopupEditButton.addEventListener("click", () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

const popupCards = new PopupWithForm('.popup-add', (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupCards.getInputValues()));
  popupCards.close();
});
popupCards.setEventListeners();

openPopupAddButton.addEventListener("click", () => {
  popupCards.open();
});

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, '#template__card', popupImage.open);
      return card.generateCard();
    },
  },
  '.cards');
section.renderItems();
