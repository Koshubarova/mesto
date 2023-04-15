let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click',closePopup);

function openPopup() {
  let nameValue = document.querySelector('.profile__name').innerText;
  let subtitleValue = document.querySelector('.profile__subtitle').innerText;
  let nameValueOpen = document.getElementById('username-input');
  let subtitleValueOpen = document.getElementById('description-input');
  nameValueOpen.value = nameValue;
  subtitleValueOpen.value = subtitleValue;
  popup.classList.add('popup_opened');
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

let nameInputValue
let jobInputValue
let nameInputNew
let jobInputNew

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.

// Получите значение полей jobInput и nameInput из свойства value
nameInputValue = document.getElementById('username-input').value;
jobInputValue = document.getElementById('description-input').value;

// Выберите элементы, куда должны быть вставлены значения полей
nameInputNew = document.querySelector('.profile__name');
jobInputNew = document.querySelector('.profile__subtitle');

// Вставьте новые значения с помощью textContent
nameInputNew.textContent = nameInputValue;
jobInputNew.textContent = jobInputValue;

//Закрытие формы
closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
