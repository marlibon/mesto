/* объявляем все переменные */

/* базовые карточки */

import riverBelayaImg from '../images/agidel-river.jpg';
import inzerImg from '../images/inzer-zubchatki.jpg';
import aslikulImg from '../images/aslikul.jpg';
import muradimImg from '../images/muradim.jpg';
import kapovaImg from '../images/kapova.jpg';
import toratauImg from '../images/toratau.jpg';

export const initialCards = [/*
  {
    name: "Река Белая",
    link: riverBelayaImg,
  },
  {
    name: "Инзерские зубчатки",
    link: inzerImg,
  },
  {
    name: "озеро Аслыкуль",
    link: aslikulImg,
  },
  {
    name: "Мурадымовское ущелье",
    link: muradimImg,
  },
  {
    name: "Капова пещера",
    link: kapovaImg,
  },
  {
    name: "гора Торатау",
    link: toratauImg,
  },*/
];

/* кнопки */
export const buttonEditProfile = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
export const buttonReplaceAvatar = document.querySelector(".profile__avatar-btn"); // кнопка смены аватарки
export const buttonAddElement = document.querySelector(
  ".profile__add-item-btn"
); // кнопка добавления нового элемента

/* ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
export const selectorEditProfile = ".popup_form-edit";
export const selectorProfileTitle = ".profile__title"; // селектор имя на странице
export const selectorProfileSubtitle = ".profile__subtitle"; // селектор профессия/подзаголовок на странице

/* ПОПАП СМЕНЫ АВАТАРКИ */
export const selectorPopupAvatar = ".popup_avatar"; // попап смены аватарки
export const profileAvatar = ".profile__avatar"; // элемент аватарки на странице

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ*/
export const selectorAddCard = ".popup_form-add-element";
export const templateSelector = "#template-card";

/* ПОПАП ПРОСМОТРА КАРТИНКИ */
export const selectorViewImage = ".popup_view-image";

/* ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ */
export const selectorConfirmation = ".popup_confirmation";

/* СЕКЦИЯ ДЛЯ ВСТАВКИ КАРТОЧЕК */
export const cardsSelector = ".elements";
export const spinner = document.querySelector('.spinner');


/* НАСТРОЙКИ ДЛЯ КЛАССА ВАЛИДАЦИИ */
export const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disable",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};
