import { openPopupViewImage } from './index.js';

export class Card {
  constructor (name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const templateElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return templateElement;
  }
  generateCard() {

    this._element = this._getTemplate();
    this._elementImg =  this._element.querySelector(".element__img"); // найдем картинку и запишем в переменную, чтобы не искать несколько раз
    this._elementTitle = this._element.querySelector(".element__title"); // заголовок

    this._setEventListeners(); // установка слушателей

    this._elementTitle.textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementImg.src = this._link;

    return this._element;
  }
  _setEventListeners() {

    /* слушатель на картинку карточки, при нажатии открывается попап просмотра изображения*/
    this._elementImg.addEventListener("click", () => {
      openPopupViewImage(this._link, this._name)
    })

    // слушатель на лайк
    this._element.querySelector(".element__like-btn").addEventListener("click", function (e) {
      e.currentTarget.classList.toggle("element__like-btn_active");
    })

    //слушатель на кнопку удаления
    this._element.querySelector(".element__trash-btn").addEventListener("click", function (e) {
      e.target.closest('.element').remove();
    })
  }
}


