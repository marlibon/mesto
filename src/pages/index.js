/* ИМПОРТЫ */
// импорт стилей для вебпака
import "./index.css";

// импорт классов
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// импорт переменных
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
  config, // селекторы для валидации
} from "../utils/constants.js";

/* ФУНКЦИИ */
// открытие попапа просмотра картинки (перенаправляем на метод открытия экземпляра Попапа просмотра изображений)
const handleCardClick = (link, name) => {
  viewImagePopup.open(link, name);
};

// создание экземпляра класса Card и возврат собранной карточки
const createCard = (item) => {
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
      const newCard = createCard(item);
      baseCards.addItem(newCard);
    },
  },
  cardsSelector
);

baseCards.renderItems(); // метод класса Section - вывод на страницу

// подстановка в поля инпута данных со страницы
const handleSubstituteValuesEditProfile = () => {
  const { name, activity } = userInfo.getUserInfo(); // данные со страницы
  
  const form = document.forms.form_edit; // находим форму
  form.elements.name.value = name; // в форме находим инпут name и устанавливаем значение
  form.elements.activity.value = activity; // аналогично с инпутом activity
  
  popupEditProfile.open();
};

// обработка формы редактирования
const handleFormSubmitEditProfile = (event, valuesForm) => {
  event.preventDefault();
  const { name, activity } = valuesForm;
  userInfo.setUserInfo(name, activity); //установить значения
  popupEditProfile.close(); // закрываем попап
};

// обработка добавления карточки
const handleFormSubmitAddCard = (event, valuesForm) => {
  event.preventDefault();
  const { title, url } = valuesForm;
  const cardElement = createCard({ name: title, link: url });
  baseCards.addItem(cardElement);
  popupAddCard.close(); // закрываем попап
};

/* СОЗДАНИЕ ЭКЗЕМПЛЯРОВ ПОПАПОВ */

// экземпляр для попапа добавления карточки
const popupAddCard = new PopupWithForm(
  selectorAddCard,
  handleFormSubmitAddCard
); 

// экземпляр для попапа редактирования профиля
const popupEditProfile = new PopupWithForm(
  selectorEditProfile,
  handleFormSubmitEditProfile
); 

// экземпляр для попапа просмотра картинок
const viewImagePopup = new PopupWithImage(selectorViewImage); //// экземпляр для попапа показа картинки

/* СОЗДАНИЕ ЭКЗЕМПЛЯРА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const userInfo = new UserInfo({
  selectorProfileTitle,
  selectorProfileSubtitle,
});

/* ВАЛИДАЦИЯ */
// создание экземпляра - редактирование профиля 
const validationFormEditProfile = new FormValidator(config, ".form_edit");
validationFormEditProfile.enableValidation(); // включение

// создание экземпляра - добавление карточки 
const validationFormAddCard = new FormValidator(config, ".form-add-element");
validationFormAddCard.enableValidation(); // включение

/* ПРОСЛУШИВАТЕЛИ */
/* прослушиватель клика на кнопку редактирования профиля */
buttonEditProfile.addEventListener("click", handleSubstituteValuesEditProfile);

/* прослушиватель клика на кнопку добавления формы */
buttonAddElement.addEventListener("click", function () {
  popupAddCard.open();
});
