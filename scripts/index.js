import Card from './Card.js';
import { configValidation, initialCards } from './constants.js';
import FormValidator from './FormValidator.js';

export { openPopup };

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

//попап увеличения картинки
const popupFullscreen = document.querySelector('.popup_fullscreen');
const popupCardImage = document.querySelector('.popup__image');
const popupCardName = document.querySelector('.popup__image-name');
const buttonCloseImage = document.querySelector('.popup__close-image');

//селекторы форм для валидации
const profileForm = document.querySelector('.popup__form-edit');
const cardsForm = document.querySelector('.popup__form-add');

//закрытие попапов на Escape и overlay
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape')  {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
const closePopupOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  };
};

// общие функции открытия/закрытия попапа
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// закрытие попапа по оверлей
const popupOverlay = document.querySelectorAll('.popup');
const setPopupOverlay = (i, overlay) => {
for (let i = 0; i < popupOverlay.length; i++) {
  const overlay = popupOverlay[i];
  overlay.addEventListener('click', closePopupOverlay);
};
};
setPopupOverlay();

// слушатели на кнопки открытия/закрытия попапа
openPopupEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = nameValue.textContent;
  jobInput.value = subtitleValue.textContent;
});
closePopupEditButton.addEventListener('click',() => {
  closePopup(popupEdit);
});
openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});
closePopupAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
});
buttonCloseImage.addEventListener('click', () => {
  closePopup(popupFullscreen);
});

// Отправка формы редактирования профиля
const formEditProfile = document.querySelector('.popup__form-edit');
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  subtitleValue.textContent = jobInput.value;
  closePopup(popupEdit);
}
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// Создание карточки через класс Card
function createCard(data) {
  const card = new Card(data, '#template__card');
  const newCard = card.generateCard();
  return newCard;
};

const addNewCard = (newCard) => {
  cards.prepend(newCard);
}

// добавление стартовых карточек
const addStartCards = (newCard) => {
  cards.append(newCard);
}
initialCards.forEach((element) => {
  addStartCards(createCard(element));
});

// сабмит добавления карточки
const addCardSubmit = (evt) => {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const cardData = {
    name, link
  };

  addNewCard(createCard(cardData));
  closePopup(popupAdd);
  formAddCard.reset();
  evt.submitter.classList.add('popup__submit_inactive');
  evt.submitter.disabled = true;
}

formAddCard.addEventListener('submit', addCardSubmit);

//валидации форм
const profileValidation = new FormValidator(configValidation, profileForm);
profileValidation.enableValidation();
const cardsValidation = new FormValidator(configValidation, cardsForm);
cardsValidation.enableValidation();
