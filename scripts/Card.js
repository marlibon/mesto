export class Card {
  constructor(config, templateSelector, openPopupViewImage) {
    this._name = config.name;
    this._link = config.link;
    this._templateSelector = templateSelector;
    this._openPopupViewImage = openPopupViewImage;
  }
  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector(".element__img"); // найдем картинку и запишем в переменную, чтобы не искать несколько раз
    this._elementTitle = this._element.querySelector(".element__title"); // заголовок

    this._setEventListenerClickForImage(); // слушатель клика по картинке
    this._setEventListenerClickForLike(); // слушатель клика по кнопке лайка
    this._setEventListenerClickForTrash(); // слушатель клика по кнопке удаления

    this._elementTitle.textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementImg.src = this._link;

    return this._element;
  }
  _setEventListenerClickForImage() {
    /* слушатель на картинку карточки, при нажатии открывается попап просмотра изображения*/
    this._elementImg.addEventListener("click", () => {
      this._openPopupViewImage(this._link, this._name);
    });
  }

  _setEventListenerClickForLike() {
    const buttonLike = this._element.querySelector(".element__like-btn");
    // слушатель на лайк
    buttonLike.addEventListener("click", function () {
      buttonLike.classList.toggle("element__like-btn_active");
    });
  }
  _setEventListenerClickForTrash() {
    //слушатель на кнопку удаления
    this._element
      .querySelector(".element__trash-btn")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }
}
