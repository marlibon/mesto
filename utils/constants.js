/* объявляем все переменные */

/* базовые карточки */
export const initialCards = [
  {
    name: 'Река Белая',
    link: './images/agidel-river.jpg'
  },
  {
    name: 'Инзерские зубчатки',
    link: './images/inzer-zubchatki.jpg'
  },
  {
    name: 'озеро Аслыкуль',
    link: './images/aslikul.jpg'
  },
  {
    name: 'Мурадымовское ущелье',
    link: './images/muradim.jpg'
  },
  {
    name: 'Капова пещера',
    link: './images/kapova.jpg'
  },
  {
    name: 'гора Торатау',
    link: './images/toratau.jpg'
  }
];

/* кнопки */
export const buttonEditProfile = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
export const buttonAddElement = document.querySelector(".profile__add-item-btn"); // кнопка добавления нового элемента

/* ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
export const popupEditProfile = document.querySelector(".popup_form-edit"); // попап редактирования профиля
export const formEditProfile = popupEditProfile.querySelector(".form_edit"); // форма редактирования профиля
export const profileTitle = document.querySelector(".profile__title"); // Имя на странице
export const profileSubtitle = document.querySelector(".profile__subtitle"); // профессия/подзаголовок на странице
export const inputTitle = formEditProfile.querySelector(".form__input_name"); // имя на поле ввода в модальном окне
export const inputSubtitle = formEditProfile.querySelector(".form__input_activity"); // профессия/подзаголовок на модальном окне
export const buttonCloseInPopupEditProfile =
  popupEditProfile.querySelector(".popup__close"); // кнопка закрытия попапа

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ*/
export const popupAddCard = document.querySelector(".popup_form-add-element"); // попап добавления карточки
export const formAddCard = popupAddCard.querySelector(".form-add-element"); // форма добавления карточки
export const inputNameNewCard = formAddCard.querySelector(
  ".form__input_name-new-element"
); // имя нового элемента в поле ввода в модальном окне
export const inputUrlNewCard = formAddCard.querySelector(
  ".form__input_url-new-element"
); // ссылка на картинку нового элемента на модальном окне
export const buttonCloseInpopupAddCard = popupAddCard.querySelector(".popup__close"); // кнопка закрытия попапа
export const templateSelector = "#template-card";

/* ПОПАП ПРОСМОТРА КАРТИНКИ */
export const popupViewImage = document.querySelector(".popup_view-image"); // попап просмотра картинки
export const nameElementPopupViewImage = popupViewImage.querySelector(
  ".popup__description"
); // описание попапа
export const imageElementPopupViewImage =
  popupViewImage.querySelector(".popup__image"); // картинка попапа
  export const buttonCloseInPopupViewImage =
  popupViewImage.querySelector(".popup__close"); // кнопка закрытия попапа

/* СЕКЦИЯ HTML */
export const cardsSection = ".elements";
