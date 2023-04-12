let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click',closePopup);

function openPopup() {
  popup.classList.add('popup_opened');

};

function closePopup() {
  popup.classList.remove('popup_opened');
};

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = document.querySelector('.input-name');
let jobInput = document.querySelector('.input-job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.

// Получите значение полей jobInput и nameInput из свойства value
let nameInputValue = document.getElementById('username-input').value;
let jobInputValue = document.getElementById('description-input').value;

// Выберите элементы, куда должны быть вставлены значения полей
let nameInputNew = document.querySelector('.profile__name');
let jobInputNew = document.querySelector('.profile__subtitle');

// Вставьте новые значения с помощью textContent
nameInputNew.textContent = nameInputValue;
jobInputNew.textContent = jobInputValue;

//Закрытие формы
popup.classList.remove('popup_opened');

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
