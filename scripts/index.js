let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let nameValue = document.querySelector('.profile__name');
let subtitleValue = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click',closePopup);

function openPopup() {
  nameInput.value = nameValue.textContent;
  jobInput.value = subtitleValue.textContent;
  popup.classList.add('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
  nameValue.textContent = nameInput.value;
  subtitleValue.textContent = jobInput.value;

//Закрытие формы
closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
