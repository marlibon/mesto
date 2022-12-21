/* ИМПОРТ КЛАССОВ*/

import { Card } from './Card.js';
import { FormValidator, config } from './FormValidator.js';


/* объявляем все переменные */
/* кнопки */
const buttonEditProfile = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
const buttonAddElement = document.querySelector(".profile__add-item-btn"); // кнопка добавления нового элемента

/* ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const popupEditProfile = document.querySelector(".popup_form-edit"); // попап редактирования профиля
const formEditProfile = popupEditProfile.querySelector(".form_edit"); // форма редактирования профиля
const profileTitle = document.querySelector(".profile__title"); // Имя на странице
const profileSubtitle = document.querySelector(".profile__subtitle"); // профессия/подзаголовок на странице
const inputTitle = formEditProfile.querySelector(".form__input_name"); // имя на поле ввода в модальном окне
const inputSubtitle = formEditProfile.querySelector(".form__input_activity"); // профессия/подзаголовок на модальном окне
const buttonCloseInPopupEditProfile = popupEditProfile.querySelector(".popup__close"); // кнопка закрытия попапа

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ*/
const popupAddElement = document.querySelector(".popup_form-add-element"); // попап добавления карточки
const formAddElement = popupAddElement.querySelector(".form-add-element"); // форма добавления карточки
const inputNameNewElement = formAddElement.querySelector(".form__input_name-new-element"); // имя нового элемента в поле ввода в модальном окне
const inputUrlNewElement = formAddElement.querySelector(".form__input_url-new-element"); // ссылка на картинку нового элемента на модальном окне
const buttonCloseInPopupAddElement = popupAddElement.querySelector(".popup__close"); // кнопка закрытия попапа

/* ПОПАП ПРОСМОТРА КАРТИНКИ */
const popupViewImage = document.querySelector(".popup_view-image"); // попап просмотра картинки
const nameElementPopupViewImage = popupViewImage.querySelector(".popup__description"); // описание попапа
const imageElementPopupViewImage =
  popupViewImage.querySelector(".popup__image"); // картинка попапа
const buttonCloseInPopupViewImage =
  popupViewImage.querySelector(".popup__close"); // кнопка закрытия попапа

/* СЕКЦИЯ HTML */
const elementsSection = document.querySelector(".elements");

/* ФУНКЦИИ */
const addElement = (arrayElements) => {
  arrayElements.forEach(function (item) {
    const card = new Card(item.name, item.link, '#template-element');
    const cardElement = card.generateCard();
    elementsSection.append(cardElement);
  });
};

addElement(initialCards); // запуск отображения базовых 6 карточек

//добавление элемента на страницу
const renderElements = (element) => {
  elementsSection.prepend(element);
};


/* валидация форм редактирования профиля и добавления карточки */
const validationFormEditProfile = new FormValidator(config, '.form_edit');
const validationFormAddCard = new FormValidator(config, '.form-add-element');

validationFormEditProfile.enableValidation();
validationFormAddCard.enableValidation();


/* сохранение формы редактирования профиля */
const editProfileSubmit = function (event) {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(popupEditProfile);
};

/* сохранение данных формы добавления новых карточек */
const submitNewElement = function (event) {
  event.preventDefault();
  const newElement = new Card(
    inputNameNewElement.value,
    inputUrlNewElement.value, '#template-element');
  const cardElement = newElement.generateCard();
  renderElements(cardElement);
  formAddElement.reset(); //сброс данных формы, чтобы при следующем добавлении не было заполненных значений
  closePopup(popupAddElement);
};

/* закрытие попапа по клавише ESC */
const closeByEscape = (e) => {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

/* установка прослушивателя на Escape при открытии модального окна */
const addListenerPopupByKey = () => {
  document.addEventListener("keyup", closeByEscape);
};

/* закрытие указанного попапа */
const closePopup = (namePopup) => {
  namePopup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closeByEscape);
  namePopup.removeEventListener("click", checkClickByOverlay);
  const formInPopup = namePopup.querySelector('.form')
  if (formInPopup) formInPopup.reset()
};

// функция открытия попапа с аргументом
const openPopup = (namePopup) => {
  namePopup.classList.add("popup_opened");
  namePopup.addEventListener("click", checkClickByOverlay);
  addListenerPopupByKey(namePopup);
};

// функция открытия попапа просмотра картинки (подмена урл и описания в верстке), экспорт, чтобы можно было использовать в модуле Card, т.к. там своя область видимости
export const openPopupViewImage = (link, name) => {
  nameElementPopupViewImage.textContent = name;
  imageElementPopupViewImage.src = link;
  imageElementPopupViewImage.alt = name;
  openPopup(popupViewImage);
}

// функция обработки клика по оверлею
const checkClickByOverlay = (event) => {
  if (event.target == event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

/* ПРОСЛУШИВАТЕЛИ */
/* прослушиватель клика на кнопку редактирования профиля */
buttonEditProfile.addEventListener("click", function () {
  openPopup(popupEditProfile); // открываем попап редактирования профиля
});

/* прослушиватель клика на кнопку добавления формы */
buttonAddElement.addEventListener("click", function () {
  openPopup(popupAddElement); // открываем попап добавления элемента
});

/* прослушиватель на отправку формы редактирования профиля */
formEditProfile.addEventListener("submit", editProfileSubmit);

/* прослушиватель на отправку формы добавления элемента */
formAddElement.addEventListener("submit", submitNewElement);


/* прослушиватели клика на кнопку закрытия модального окна */
buttonCloseInPopupEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});
buttonCloseInPopupAddElement.addEventListener("click", function () {
  closePopup(popupAddElement);
});
buttonCloseInPopupViewImage.addEventListener("click", function () {
  closePopup(popupViewImage);
});
