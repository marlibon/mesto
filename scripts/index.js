/* ИМПОРТ КЛАССОВ*/
import { Card } from "./Card.js";
import { FormValidator, config } from "./FormValidator.js";

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
const buttonCloseInPopupEditProfile =
  popupEditProfile.querySelector(".popup__close"); // кнопка закрытия попапа

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ*/
const popupAddCard = document.querySelector(".popup_form-add-element"); // попап добавления карточки
const formAddCard = popupAddCard.querySelector(".form-add-element"); // форма добавления карточки
const inputNameNewCard = formAddCard.querySelector(
  ".form__input_name-new-element"
); // имя нового элемента в поле ввода в модальном окне
const inputUrlNewCard = formAddCard.querySelector(
  ".form__input_url-new-element"
); // ссылка на картинку нового элемента на модальном окне
const buttonCloseInpopupAddCard = popupAddCard.querySelector(".popup__close"); // кнопка закрытия попапа
const templateSelector = "#template-card";

/* ПОПАП ПРОСМОТРА КАРТИНКИ */
const popupViewImage = document.querySelector(".popup_view-image"); // попап просмотра картинки
const nameElementPopupViewImage = popupViewImage.querySelector(
  ".popup__description"
); // описание попапа
const imageElementPopupViewImage =
  popupViewImage.querySelector(".popup__image"); // картинка попапа
const buttonCloseInPopupViewImage =
  popupViewImage.querySelector(".popup__close"); // кнопка закрытия попапа

/* СЕКЦИЯ HTML */
const cardsSection = document.querySelector(".elements");

/* ФУНКЦИИ */
//добавление элемента на страницу
const renderCard = (element) => {
  cardsSection.prepend(element);
};

// открытие попапа
const openPopup = (namePopup) => {
  namePopup.classList.add("popup_opened");
  addListenerClosePopupByEsc(namePopup);
};

// функция открытия попапа просмотра картинки (подмена урл и описания в верстке), экспорт, чтобы можно было использовать в модуле Card, т.к. там своя область видимости
const openPopupViewImage = (link, name) => {
  nameElementPopupViewImage.textContent = name;
  imageElementPopupViewImage.src = link;
  imageElementPopupViewImage.alt = name;
  openPopup(popupViewImage);
};

const generateACard = (values, template) => {
  const newElement = new Card(
    {
      name: values.name,
      link: values.link,
    },
    template,
    openPopupViewImage
  );
  return newElement.generateCard();
};

const addCards = (arrayCards) => {
  arrayCards.forEach(function (item) {
    const cardElement = generateACard(item, templateSelector);
    renderCard(cardElement);
  });
};

addCards(initialCards); // запуск отображения базовых 6 карточек

/* валидация форм редактирования профиля и добавления карточки */
const validationFormEditProfile = new FormValidator(config, ".form_edit");
const validationFormAddCard = new FormValidator(config, ".form-add-element");

validationFormEditProfile.enableValidation();
validationFormAddCard.enableValidation();

/* сохранение формы редактирования профиля */
const handleEditProfileSubmit = function (event) {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(popupEditProfile);
};

/* сохранение данных формы добавления новых карточек */
const handleAddCardFormSubmit = function (event) {
  event.preventDefault();
  const cardElement = generateACard(
    { name: inputNameNewCard.value, link: inputUrlNewCard.value },
    templateSelector
  );
  renderCard(cardElement); // добавление в верстку
  formAddCard.reset(); //сброс данных формы, чтобы при следующем добавлении не было заполненных значений
  closePopup(popupAddCard);
};

/* закрытие попапа */
const closePopup = (namePopup) => {
  namePopup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closeByEscape);
};

/* закрытие попапа по клавише ESC */
const closeByEscape = (e) => {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

/* установка прослушивателя на Escape при открытии модального окна */
const addListenerClosePopupByEsc = () => {
  document.addEventListener("keyup", closeByEscape);
};

// функция открытия попапа редактирования профиля
const openPopupEditProfile = () => {
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
};
// функция обработки клика по оверлею
const checkClickByOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

/* ПРОСЛУШИВАТЕЛИ */
/* прослушиватель клика на кнопку редактирования профиля */
buttonEditProfile.addEventListener("click", openPopupEditProfile);

/* прослушиватель клика на кнопку добавления формы */
buttonAddElement.addEventListener("click", function () {
  openPopup(popupAddCard); // открываем попап добавления элемента
});

/* прослушиватель на отправку формы редактирования профиля */
formEditProfile.addEventListener("submit", handleEditProfileSubmit);

/* прослушиватель на отправку формы добавления элемента */
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

/* прослушиватели клика на кнопку закрытия модального окна */
buttonCloseInPopupEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});
buttonCloseInpopupAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});
buttonCloseInPopupViewImage.addEventListener("click", function () {
  closePopup(popupViewImage);
});
/* прослушиватели клика на оверлей */
popupEditProfile.addEventListener("click", checkClickByOverlay);
popupAddCard.addEventListener("click", checkClickByOverlay);
popupViewImage.addEventListener("click", checkClickByOverlay);
