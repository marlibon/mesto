/* объявляем все переменные */
/* кнопки */
const buttonEditProfile = document.querySelector('.profile__edit-btn'); // кнопка редактирования профиля
const buttonAddElement = document.querySelector('.profile__add-item-btn'); // кнопка добавления нового элемента

/* попапы, их формы и инпуты */
const popupEditProfile = document.querySelector('.popup_form-edit'); // попап редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.form_edit'); // форма редактирования профиля
const profileTitle = document.querySelector('.profile__title'); // Имя на странице
const profileSubtitle = document.querySelector('.profile__subtitle'); // профессия/подзаголовок на странице
const inputTitle = formEditProfile.querySelector('.form__input_type_name'); // имя на поле ввода в модальном окне
const inputSubtitle = formEditProfile.querySelector('.form__input_type_activity'); // профессия/подзаголовок на модальном окне
const buttonCloseInPopupEditProfile = popupEditProfile.querySelector('.popup__close'); // кнопка закрытия попапа

const popupAddElement = document.querySelector('.popup_form-add-element'); // попап добавления карточки
const formAddElement = document.querySelector('.form-add-element'); // форма добавления карточки
const inputNameNewElement = formAddElement.querySelector('.form__input_type_name-new-element'); // имя нового элемента в поле ввода в модальном окне
const inputUrlNewElement = formAddElement.querySelector('.form__input_type_url-new-element'); // ссылка на картинку нового элемента на модальном окне
const buttonCloseInPopupAddElement = popupAddElement.querySelector('.popup__close'); // кнопка закрытия попапа

const popupViewImage = document.querySelector('.popup_view-image'); // попап просмотра картинки
const nameElementPopupViewImage = popupViewImage.querySelector('.popup__description'); // картинка попапа
const imageElementPopupViewImage = popupViewImage.querySelector('.popup__image'); // картинка попапа
const buttonCloseInPopupViewImage = popupViewImage.querySelector('.popup__close'); // кнопка закрытия попапа

/* записываем в переменную контент шаблона template и селектор секции, куда будут вставляться карточки */
const templateImported = document.getElementById('template-element').content;
const elementIsTemplate = templateImported.querySelector('.element'); //

const elementsSection = document.querySelector('.elements'); // это див/секция, куда будут загружаться элементы

/* ждем полной загрузки страницы и после этого включаем функцию отображения карточек*/
window.onload = function() {
  addElement(initialCards); // запуск отображения базовых 6 карточек
};


const addElement = arrayElements => {  // тестируем возможности стрелочных функций)))

/* методом forEach перебираем массив initialCards */
arrayElements.forEach(function(item) {
  const createdElement = createElement(item.name, item.link)
  renderElements(createdElement);

});
}

// функция открытия попапа с аргументом
const openPopup = namePopup => {
  namePopup.classList.add('popup_opened');
}

//создаем элемент
const createElement = (name, link) => {
  const element = elementIsTemplate.cloneNode(true); // склонировали из template со всеми внутренностями
  const elementTitle = element.querySelector('.element__title'); // заголовок карточки
  const elementImg = element.querySelector('.element__img'); // картинка
  const elementButtonLike = element.querySelector('.element__like-btn'); // кнопка лайка
  const elementButtonTrash = element.querySelector('.element__trash-btn'); // кнопка удаления
  elementTitle.textContent = name;
  elementImg.alt = name;
  elementImg.src = link;

  /* слушатель на кнопку лайка и функция установки лайка */
  elementButtonLike.addEventListener('click', function () {
    elementButtonLike.classList.toggle('element__like-btn_active');
  })

  /* слушатель на кнопку удаления и фукнция удаления */
  elementButtonTrash.addEventListener('click', function () {
    element.remove();
    })

  /* слушатель на картинку для открытия попапа + корректировка в верстке*/
  elementImg.addEventListener('click', function () {
    nameElementPopupViewImage.textContent = name;
    imageElementPopupViewImage.src = link;
    imageElementPopupViewImage.alt = name;
    openPopup(popupViewImage)
    })

  return element;

}

//функция добавления элемента на страницу
const renderElements = (element) => {
  elementsSection.prepend(element);
}

//функция удаления элемента
const deleteElement = element => {
  element.remove
}

/* функция которая сохраняет данные формы на странице (запускается при нажатии на кнопку сохранить) */
const editProfileSubmit = function (event) {
  event.preventDefault(); /* отключаем отправку формы по умолчанию */
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(popupEditProfile); // закрываем попап
}


/* функция которая сохраняет данные формы добавления новых элементов на странице (запускается при нажатии на кнопку сохранить) */
const submitNewElement = function (event) {
  event.preventDefault(); /* отключаем отправку формы по умолчанию */

    if (!inputNameNewElement.value || !inputUrlNewElement.value) {
      return alert('не заполнено одно или несколько полей');}

  const newElement = createElement(inputNameNewElement.value, inputUrlNewElement.value);
  renderElements(newElement)
  formAddElement.reset(); //сброс данных формы, чтобы при следующем добавлении не было заполненных значений
  closePopup(popupAddElement); // закрываем попап
}

/* вешаем прослушиватель клика на кнопку вызова модального окна и пишем туда нашу функцию*/
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile); // открываем попап редактирования профиля
});

/* вешаем прослушиватель клика на кнопку добавления формы */
buttonAddElement.addEventListener('click', function () {
  openPopup(popupAddElement); // открываем попап добавления элемента
});

/* вешаем прослушиватель отправку формы  */
formEditProfile.addEventListener('submit', editProfileSubmit);

/* вешаем прослушиватель на отправку формы  */
formAddElement.addEventListener('submit', submitNewElement);


/* функция, которая удаляет класс класс 'popup_opened' для закрытия попапа */
const closePopup = namePopup =>  namePopup.classList.remove('popup_opened');


/* вешаем прослушивание кликов на оверлей (для каждого попапа) */
popupEditProfile.addEventListener('click', function (event) {
  if (event.target == event.currentTarget) {
    closePopup(popupEditProfile)
  }

});
popupAddElement.addEventListener('click', function (event) {
  if (event.target == event.currentTarget) {
    closePopup(popupAddElement)
  }
});
popupViewImage.addEventListener('click', function (event) {
  if (event.target == event.currentTarget) {
    closePopup(popupViewImage)
  }
});

/* вешаем прослушиватель клика на кнопку закрытия модального окна */
buttonCloseInPopupEditProfile.addEventListener('click', function (event) {
  closePopup(popupEditProfile)
});
buttonCloseInPopupAddElement.addEventListener('click', function (event) {
  closePopup(popupAddElement)
});
buttonCloseInPopupViewImage.addEventListener('click', function (event) {
  closePopup(popupViewImage)
});

