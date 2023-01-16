
/* ИМПОРТ СТИЛЯ ДЛЯ ВЕБПАК */
import './index.css';

/* ИМПОРТ КЛАССОВ*/
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

/* ИМПОРТ ПЕРЕМЕННЫХ*/
import {
  initialCards, // массив базовых 6 карточек
  buttonEditProfile, // кнопка вызова попапа редактирования профиля
  buttonAddElement, // кнопка вызова попапа добавления карточки
  selectorEditProfile, // селектор попапа редактирования профиля
  selectorProfileTitle, // селектор "имя пользователя" редактирования профиля
  selectorProfileSubtitle, // селектор "род деятельности" редактирования профиля
  selectorAddCard, // селектор попапа добавления карточки
  templateSelector, // селектор шаблона карточки
  selectorViewImage, // селектор попапа просмотра картинки
  cardsSelector, // селектор дива для размещения карточек
  config // селекторы для валидации
} from "../utils/constants.js";

/* ФУНКЦИИ */
// открытие попапа просмотра картинки (перенаправляем на метод открытия экземпляра Попапа просмотра изображений)
const handleCardClick = (link, name) => {
  viewImagePopup.open(link, name);
};

// создание экземпляра класса Card и возврат собранной карточки
const newInstanceCard = (item) => {
  const newElement = new Card(
    {
      name: item.name,
      link: item.link,
    },
    templateSelector,
    handleCardClick
  );
  return newElement.generateCard();
};

// создание экземпляра класса Section (добавление контента на страницу), внутри которого создание 6 базовых карточек (экземпляр класса Card)
const baseCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = newInstanceCard(item);
      baseCards.addItem(newCard);
    },
  },
  cardsSelector
);

baseCards.renderItems(); // метод класса Section - вывод на страницу

// обработка данных с заполненных форм
const handleFormSubmit = (event, valuesForm) => {
  event.preventDefault();
  const {
    formName,
    inputNameNewCard,
    inputUrlNewCard,
    inputTitle,
    inputSubtitle,
  } = valuesForm;

  if (formName.classList.contains("form_edit")) {
    // обработка формы редактирования
    editProfile.setUserInfo(inputTitle, inputSubtitle); //установить значения
    editProfilePopup.close(); // закрываем попап
  }

  if (formName.classList.contains("form-add-element")) {
    // обработка добавления карточки
    const cardElement = newInstanceCard(
      { name: inputNameNewCard, link: inputUrlNewCard }
    );
    baseCards.addItem(cardElement);
    addCardPopup.close(); // закрываем попап
  }

  formName.reset(); // очистка формы
};

/* ВАЛИДАЦИЯ */
/* создание экземпляров для валидации форм редактирования профиля и добавления карточки */
const validationFormEditProfile = new FormValidator(config, ".form_edit");
const validationFormAddCard = new FormValidator(config, ".form-add-element");

validationFormEditProfile.enableValidation(); // включение
validationFormAddCard.enableValidation(); // включение

/* СОЗДАНИЕ ЭКЗЕМПЛЯРОВ ПОПАПОВ */
const addCardPopup = new PopupWithForm(selectorAddCard, handleFormSubmit); // экземпляр для попапа добавления карточки
const editProfilePopup = new PopupWithForm(
  selectorEditProfile,
  handleFormSubmit
); // экземпляр для попапа редактирования профиля
const viewImagePopup = new PopupWithImage(selectorViewImage); //// экземпляр для попапа показа картинки

/* СОЗДАНИЕ ЭКЗЕМПЛЯРА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const editProfile = new UserInfo({
  selectorProfileTitle,
  selectorProfileSubtitle,
});

/* ПРОСЛУШИВАТЕЛИ */
/* прослушиватель клика на кнопку редактирования профиля */
buttonEditProfile.addEventListener("click", function () {
  editProfilePopup.open(editProfile.getUserInfo());
});

/* прослушиватель клика на кнопку добавления формы */
buttonAddElement.addEventListener("click", function () {
  addCardPopup.open();
});
