const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupFullscreen = document.querySelector('.popup_fullscreen');
const openPopupEditButton = document.querySelector('.profile__edit');
const openPopupAddButton = document.querySelector('.profile__add');
const closePopupEditButton = document.querySelector('.popup__close-edit');
const closePopupAddButton = document.querySelector('.popup__close-add');
const nameValue = document.querySelector('.profile__name');
const subtitleValue = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

openPopupEditButton.addEventListener('click', openPopupEdit);
closePopupEditButton.addEventListener('click',closePopupEdit);

openPopupAddButton.addEventListener('click', openPopupAdd);
closePopupAddButton.addEventListener('click',closePopupAdd);

// функции открытия/закрытия попапа редактирования профиля
function openPopupEdit() {
  nameInput.value = nameValue.textContent;
  jobInput.value = subtitleValue.textContent;
  popupEdit.classList.add('popup_opened');
};
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
};
// функции открытия/закрытия попапа добавления карточки
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
};
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
};

function openPopupFullscreen() {
  popupFullscreen.classList.add('popup_opened');
};
function closePopupFullscreen() {
  popupFullscreen.classList.remove('popup_opened');
};

// Отправка формы редактирования профиля
const formElement = document.querySelector('.popup__form-edit');
function handleFormSubmit (evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  subtitleValue.textContent = jobInput.value;
closePopupEdit();
}
formElement.addEventListener('submit', handleFormSubmit);

const templateCard = document.getElementById("template__card");
const templateCardContent = templateCard.content;
const templateCardItem = templateCardContent.querySelector(".cards__item");
const cards = document.querySelector(".cards");
const formAddCard = document.querySelector(".popup__form-add");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_link");
const popupImage = document.querySelector(".popup__image");
const popupName = document.querySelector(".popup__image-name");

const createCard = (data) => {
  const newCard = templateCardItem.cloneNode(true);
  const cardName = newCard.querySelector(".cards__name");
  const cardImage = newCard.querySelector(".cards__image");
  const deleteButton = newCard.querySelector(".cards__delete-button");
  const likeButton = newCard.querySelector(".cards__like-button");

  cardImage.src = data.link;
  cardName.textContent = data.name;
  cardImage.alt = data.name;

  cardImage.addEventListener("click", () => {
  popupImage.src = data.link;
  popupName.textContent = data.name;
  popupImage.alt = data.name;
  openPopupFullscreen();
  });

  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.cards__item').remove();
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('cards__like-button_active');
  });
  
  return newCard;
};

const addNewCard = (newCard) => {
  cards.prepend(newCard);
}

initialCards.forEach((element) => {
  addNewCard(createCard(element));
});

const buttonCloseImage = document.querySelector(".popup__close-image");
buttonCloseImage.addEventListener("click", () => {
  closePopupFullscreen();
});

function addCardSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const cardData = {
    name, link
  };

  addNewCard(createCard(cardData));
  closePopupAdd();
}

formAddCard.addEventListener("submit", addCardSubmit);