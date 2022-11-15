/* присваиваем переменной popupElement через const (менять содержимое переменной не будем) значение DOM элемента popup, чтобы в дальнейшем добавлять класс для показа попапа  */
const popupElement = document.querySelector('.popup');

/* присваиваем переменной popupCloseButtonElement через const (менять содержимое переменной не будем) значение DOM элемента popupCloseButtonElement, который находится внутри popupElement, чтобы в дальнейшем отслеживать события на эту кнопку - закрытие попапа.  */
const popupCloseButtonElement = popupElement.querySelector('.popup__close');

/* присваиваем переменной popupCloseButtonElement через const (менять содержимое переменной не будем) значение DOM элемента profile__edit-btn, чтобы в дальнейшем отслеживать события на эту кнопку - показ попапа при клике на эту кнопку */
const popupProfileEditButtonElement = document.querySelector('.profile__edit-btn');

/* дальше переменные для имени и профессии на странице и для окна, где мы их будем редактировать */
let profileTitle = document.querySelector('.profile__title'); // Имя на странице
let profileSubtitle = document.querySelector('.profile__subtitle'); // профессия/подзаголовок на странице
let inputTitle = document.querySelector('.form-edit-profile__input_type_name'); // имя на поле ввода в модальном окне
let inputSubtitle = document.querySelector('.form-edit-profile__input_type_activity'); // профессия/подзаголовок на модальном окне
const formEditProfile = document.querySelector('.form-edit-profile'); // форма


/* функция, которая добавляет класс  класс 'popup_opened' для отображения попапа + берем данные со страницы и вставляем в форму */
const functionPopupOpened = function () {
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;

  return inputTitle.setAttribute('value', profileTitle.textContent), popupElement.classList.add('popup_opened');
}

/* функция, которая удаляет класс класс 'popup_opened' для закрытия попапа */
const functionPopupClosed = function () {
  return popupElement.classList.remove('popup_opened');
}

/* функция которая сравнивает target и если они одинаковые закрывает модальное окно */
const functionPopupClosedByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  functionPopupClosed();
}
/* функция которая сохраняет данные формы на странице (запускается при нажатии на кнопку сохранить) */
const functionSaveInputData = function (event) {
  event.preventDefault(); /* отключаем отправку формы по умолчанию */
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;

  functionPopupClosed();
}


/* вешаем прослушиватель клика на кнопку вызова модального окна и пишем туда нашу функцию*/
popupProfileEditButtonElement.addEventListener('click', functionPopupOpened);

/* вешаем прослушиватель клика на кнопку закрытия модального окна */
popupCloseButtonElement.addEventListener('click', functionPopupClosed);

/* вешаем прослушивание кликов на оверлей */
popupElement.addEventListener('click', functionPopupClosedByClickOnOverlay);

/* вешаем прослушиватель на форму */
formEditProfile.addEventListener('submit', functionSaveInputData);
