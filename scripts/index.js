/* ждем полной загрузки страницы и после этого включаем функцию отображения карточек*/
window.onload = function() {
  addElement(initialCards); // запуск отображения базовых 6 карточек
};
/* стандартные описания и картинки для карточек */

const initialCards = [
  {
    name: 'Река Белая',
    link: 'https://marlibon.github.io/mesto/images/agidel-river.jpg'
  },
  {
    name: 'Инзерские зубчатки',
    link: 'https://marlibon.github.io/mesto/images/inzer-zubchatki.jpg'
  },
  {
    name: 'озеро Аслыкуль',
    link: 'https://marlibon.github.io/mesto/images/aslikul.jpg'
  },
  {
    name: 'Мурадымовское ущелье',
    link: 'https://marlibon.github.io/mesto/images/muradim.jpg'
  },
  {
    name: 'гора Торатау',
    link: 'https://marlibon.github.io/mesto/images/toratau.jpg'
  },
  {
    name: 'Капова пещера',
    link: 'https://marlibon.github.io/mesto/images/kapova.jpg'
  }
];

const addElement = arrayElements => {  // тестируем возможности стрелочных функций)))

/* записываем в переменную контент шаблона template и селектор секции, куда будут вставляться карточки */
const templateImport = document.getElementById('elements').content
const sectionElements = document.querySelector('.elements');

/* методом forEach перебираем массив initialCards и для каждой карточки добавляем свойства */
arrayElements.forEach(function(item) {
  const element = templateImport.querySelector('.element').cloneNode(true); // клонируем template в переменную

  const elementTitle = element.querySelector('.element__title'); // заголовок карточки
  const elementImg = element.querySelector('.element__img'); // картинка
  const elementButtonLike = element.querySelector('.element__like-btn'); // кнопка лайка
  const elementButtonTrash = element.querySelector('.element__trash-btn'); // кнопка удаления

  const popupViewImage = document.querySelector('.popup_view-image'); // кнопка удаления


  elementTitle.textContent = item.name; // присвоили из массива значение для заголовка
  elementImg.src = item.link; // ссылка на картинку
  elementImg.alt = item.name; // alt для картинки


  /* функция установки лайка карточке */
  const toggleLike = () => elementButtonLike.classList.toggle('element__like-btn_active');

  /* функция удаления карточки */
  const elementTrash = () => elementButtonTrash.closest('.element').remove();

  /* функция показа картинки */
  const viewImage = () => {
    popupViewImage.querySelector('.popup__image').src=item.link;
    popupViewImage.querySelector('.popup__image').alt=item.name;
    popupViewImage.querySelector('.popup__description').textContent=item.name;
    popupViewImage.classList.add('popup_opened');
    listenerPopup('popup_view-image');
  }

  /* в section добавляем нашу карточку в конец */
  sectionElements.prepend(element);

  /* вешаем 1 слушателя на всю карточку */
  element.addEventListener('click', function (evt) {
    switch(evt.target) {
      case elementButtonLike:
        toggleLike();
          break;
      case elementButtonTrash:
        elementTrash();
          break;
      case elementImg:
        viewImage();
          break;
    } // выход из switch
      }); // выход из функции слушателя

}); // конец forEach
} // конец функции addElement()

const openPopup = (classPopup) => {
  const elementPopup = document.querySelector('.' + classPopup);
  elementPopup.classList.add('popup_opened');
  return listenerPopup(classPopup);
}

/* функция отслеживания клика чтобы закрыть любой попап */
const listenerPopup = (classPopup) => {
  const elementPopup = document.querySelector('.' + classPopup);
  const elementPopupBtnClose = elementPopup.querySelector('.popup__close');

  elementPopup.addEventListener('click', listener)

  function listener (event){
    if(event.target === elementPopupBtnClose || event.target === elementPopup) { //если наш клик был сделан по оверлею или по кнопке закрытия, то...
      closePopup(); // закрываем попап через др функцию
      elementPopup.removeEventListener('click', listener, false); // удаляем прослушиватель чтобы не создавал ошибки
    }
    return;
  }
}
const closePopup = () => {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
}

/* дальше переменные для имени и профессии на странице и для окна, где мы их будем редактировать */
let profileTitle = document.querySelector('.profile__title'); // Имя на странице
let profileSubtitle = document.querySelector('.profile__subtitle'); // профессия/подзаголовок на странице
let inputTitle = document.querySelector('.form__input_type_name'); // имя на поле ввода в модальном окне
let inputSubtitle = document.querySelector('.form__input_type_activity'); // профессия/подзаголовок на модальном окне


/* функция, которая добавляет класс  класс 'popup_opened' для отображения попапа + берем данные со страницы и вставляем в форму */
const popupProfileEdit = function () {
  inputTitle.value = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
  openPopup('popup_form_edit')
}

/* функция которая сохраняет данные формы на странице (запускается при нажатии на кнопку сохранить) */
const profileEditSubmit = function (event) {
  event.preventDefault(); /* отключаем отправку формы по умолчанию */
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closePopup(); // закрываем попап
}

/* откроем форму добавления новых элементов */
const popupNewElement = function () {
  openPopup('popup_form_new');
}

/* функция которая сохраняет данные формы добавления новых элементов на странице (запускается при нажатии на кнопку сохранить) */
const profileNewElementSubmit = function (event) {
  event.preventDefault(); /* отключаем отправку формы по умолчанию */
  const newElement = [
    { name: document.querySelector('.form__input_type_new').value,
      link: document.querySelector('.form__input_type_url').value }
  ]
  addElement(newElement); // добавляем новый элемент на страницу через функцию
  document.querySelector(".form_new").reset(); //сброс данных формы, чтобы при следующем добавлении не было заполненных значений
  closePopup(); // закрываем попап
}

/* вешаем прослушиватель клика на кнопку вызова модального окна и пишем туда нашу функцию*/
document.querySelector('.profile__edit-btn').addEventListener('click', popupProfileEdit);

/* вешаем прослушиватель клика на кнопку добавления формы */
document.querySelector('.profile__add-item-btn').addEventListener('click', popupNewElement);

/* вешаем прослушиватель на кнопку отправки формы  */
document.querySelector('.form_edit').addEventListener('submit', profileEditSubmit);

/* вешаем прослушиватель на кнопку отправки формы  */
document.querySelector('.form_new').addEventListener('submit', profileNewElementSubmit);
