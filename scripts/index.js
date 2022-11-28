/* объявляем все переменные */
/* кнопки */
const buttonEditProfile = document.querySelector('.profile__edit-btn'); // кнопка редактирования профиля
const buttonAddElement = document.querySelector('.profile__add-item-btn'); // кнопка добавления нового элемента

/* попапы, их формы и инпуты */
const popupEditProfile = document.querySelector('.popup_form-edit'); // попап редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.form_edit'); // форма редактирования профиля
let profileTitle = document.querySelector('.profile__title'); // Имя на странице
let profileSubtitle = document.querySelector('.profile__subtitle'); // профессия/подзаголовок на странице
let inputTitle = formEditProfile.querySelector('.form__input_type_name'); // имя на поле ввода в модальном окне
let inputSubtitle = formEditProfile.querySelector('.form__input_type_activity'); // профессия/подзаголовок на модальном окне
const closeButtonInPopupEditProfile = popupEditProfile.querySelector('.popup__close'); // кнопка закрытия попапа

const popupAddElement = document.querySelector('.popup_form-add-element'); // попап добавления карточки
const formAddElement = document.querySelector('.form-add-element'); // форма добавления карточки
let inputNameNewElement = formAddElement.querySelector('.form__input_type_name-new-element'); // имя нового элемента в поле ввода в модальном окне
let inputUrlNewElement = formAddElement.querySelector('.form__input_type_url-new-element'); // ссылка на картинку нового элемента на модальном окне
const closeButtonInPopupAddElement = popupAddElement.querySelector('.popup__close'); // кнопка закрытия попапа

const popupViewImage = document.querySelector('.popup_view-image'); // попап просмотра картинки
let nameElementPopupViewImage = popupViewImage.querySelector('.popup__description'); // картинка попапа
let imageElementPopupViewImage = popupViewImage.querySelector('.popup__image'); // картинка попапа
const closeButtonInPopupViewImage = popupViewImage.querySelector('.popup__close'); // кнопка закрытия попапа

/* записываем в переменную контент шаблона template и селектор секции, куда будут вставляться карточки */
const templateImport = document.getElementById('template-element').content;
const elementIsTemplate = templateImport.querySelector('.element'); //

const sectionElements = document.querySelector('.elements'); // это див/секция, куда будут загружаться элементы

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
  let elementTitle = element.querySelector('.element__title'); // заголовок карточки
  let elementImg = element.querySelector('.element__img'); // картинка
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
  sectionElements.prepend(element);
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
  closePopup(); // закрываем попап
}


/* функция которая сохраняет данные формы добавления новых элементов на странице (запускается при нажатии на кнопку сохранить) */
const submitNewElement = function (event) {
  event.preventDefault(); /* отключаем отправку формы по умолчанию */

    if (!inputNameNewElement.value || !inputUrlNewElement.value) {
      return alert('не заполнено одно или несколько полей');}
    if (inputUrlNewElement.value.includes('jpeg') || inputUrlNewElement.value.includes('jpg') ||inputUrlNewElement.value.includes('png') || inputUrlNewElement.value.includes('svg')) {} else {
      return alert('не корректная ссылка на картинку');}

  const newElement = createElement(inputNameNewElement.value, inputUrlNewElement.value);
  renderElements(newElement)
  formAddElement.reset(); //сброс данных формы, чтобы при следующем добавлении не было заполненных значений
  closePopup(); // закрываем попап
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
const closePopup = () => {
  if (event.target == event.currentTarget) {
    event.target.closest('.popup').classList.remove('popup_opened');
  }
}

/* вешаем прослушивание кликов на оверлей (для каждого попапа) */
popupEditProfile.addEventListener('click', function (event) {
  closePopup(popupEditProfile)
});
popupAddElement.addEventListener('click', function (event) {
  closePopup(popupAddElement)
});
popupViewImage.addEventListener('click', function (event) {
  closePopup(popupViewImage)
});

/* вешаем прослушиватель клика на кнопку закрытия модального окна */
closeButtonInPopupEditProfile.addEventListener('click', function (event) {
  closePopup(popupEditProfile)
});
closeButtonInPopupAddElement.addEventListener('click', function (event) {
  closePopup(popupAddElement)
});
closeButtonInPopupViewImage.addEventListener('click', function (event) {
  closePopup(popupViewImage)
});

