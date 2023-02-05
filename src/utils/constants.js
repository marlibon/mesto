/* объявляем все переменные */

/* кнопки */
export const buttonEditProfile = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
export const buttonReplaceAvatar = document.querySelector(".profile__avatar-btn"); // кнопка смены аватарки
export const buttonAddElement = document.querySelector(
  ".profile__add-item-btn"
); // кнопка добавления нового элемента

/* ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
export const selectorEditProfile = ".popup_type_form-edit";
export const selectorProfileTitle = ".profile__title"; // селектор имя на странице
export const selectorProfileSubtitle = ".profile__subtitle"; // селектор профессия/подзаголовок на странице
export const buttonSubmitEditProfile = document.forms.form_edit.elements.form__submit; // кнопка сабмита формы редактирования профиля

/* ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ*/
export const selectorAddCard = ".popup_type_form-add-element";
export const templateSelector = "#template-card";
export const buttonSubmitAddCard = document.forms.form_add.elements.form__submit; // кнопка сабмита добавления карточки на попапе

/* ПОПАП ПРОСМОТРА КАРТИНКИ */
export const selectorViewImage = ".popup_type_view-image";

/* ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ */
export const selectorConfirmation = ".popup_type_confirmation";
export const buttonSubmitRemoveCard = document.forms.form_confirmation.elements.form__submit; // кнопка сабмита подтверждения удаления карточки

/* ПОПАП СМЕНЫ АВАТАРКИ */
export const selectorPopupAvatar = ".popup_type_replace-avatar"; // попап смены аватарки
export const profileAvatar = ".profile__avatar"; // элемент аватарки на странице
export const buttonSubmitReplaceAvatar = document.forms.form_avatar.elements.form__submit;// кнопка сабмита смены аватарки на попапе

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
