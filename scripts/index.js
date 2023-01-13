/* ИМПОРТ КЛАССОВ*/
import { Card } from "./Card.js";
import { FormValidator, config } from "./FormValidator.js";

/* ИМПОРТ ПЕРЕМЕННЫХ*/
import {
  initialCards,
  buttonEditProfile,
  buttonAddElement,
  popupEditProfile,
  formEditProfile,
  profileTitle,
  profileSubtitle,
  inputTitle,
  inputSubtitle,
  buttonCloseInPopupEditProfile,
  popupAddCard,
  formAddCard,
  inputNameNewCard,
  inputUrlNewCard,
  buttonCloseInpopupAddCard,
  templateSelector,
  popupViewImage,
  nameElementPopupViewImage,
  imageElementPopupViewImage,
  buttonCloseInPopupViewImage,
  cardsSection

} from '../utils/constants.js';
import { Section } from "./Section.js";


/* ФУНКЦИИ */

// открытие попапа
const openPopup = (namePopup) => {
  namePopup.classList.add("popup_opened");
  addListenerClosePopupByEsc(namePopup);
};

// функция открытия попапа просмотра картинки (подмена урл и описания в верстке), экспорт, чтобы можно было использовать в модуле Card, т.к. там своя область видимости
const _handleImageClick = (link, name) => {
  nameElementPopupViewImage.textContent = name;
  imageElementPopupViewImage.src = link;
  imageElementPopupViewImage.alt = name;
  openPopup(popupViewImage);
};

const generateCard = (values, template) => {
  const newElement = new Card(
    {
      name: values.name,
      link: values.link,
    },
    template,
    _handleImageClick
  );
  return newElement.generateCard();
};


const baseCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const newElement = new Card(
      {
        name: item.name,
        link: item.link,
      },
      templateSelector,
      _handleImageClick
    );
    const cardElement = newElement.generateCard();
    baseCards.addItem(cardElement);
  },
},
cardsSection)


baseCards.renderItems();












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
  const cardElement = generateCard(
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
