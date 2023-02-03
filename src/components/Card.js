export class Card {
  constructor(data, templateSelector, handleClickImage, handleConfirmation, handleClickLike) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._idOwnerCard = data.owner._id;
    this._idCurrentUser = data.idCurrentUser;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleClickImage = handleClickImage;
    this._handleConfirmation = handleConfirmation;
    this._handleClickLike = handleClickLike;

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
    this._img = this._element.querySelector(".element__img"); 
    this._title = this._element.querySelector(".element__title"); 
    this._buttonTrash = this._element.querySelector(".element__trash-btn");
    if ( !(this._idOwnerCard === this._idCurrentUser) ) this._buttonTrash.remove();
    this._buttonLike = this._element.querySelector(".element__like-btn");
    this._likesContainer = this._element.querySelector(".element__like-count");
    this._title.textContent = this._name;
    this._img.alt = this._name;
    this._img.src = this._link;
    this.setLikes(this._likes); 

    this._setEventListeners(); // установка слушателей
    return this._element;
  }

  remove() {
    this._element.remove();
  }

  _setEventListenerClickForImage() {
    /* слушатель на картинку карточки, при нажатии открывается попап просмотра изображения*/
    this._img.addEventListener("click", () => {
      this._handleClickImage(this._link, this._name);
    });
  }

  _setEventListenerClickForLike() {
    // слушатель на лайк
    this._buttonLike.addEventListener("click", () => {
      this._buttonLike.classList.add('element__like-btn_progress')
      this._handleClickLike(this._id, this._likeCurrentUser(), this);
    });
  }

  _setEventListenerClickForTrash() {
    //слушатель на кнопку удаления
    this._buttonTrash?.addEventListener("click", () => {
      this._handleConfirmation(this)
      });
  }

  _setEventListeners() {
    this._setEventListenerClickForImage(); // слушатель клика по картинке
    this._setEventListenerClickForLike(); // слушатель клика по кнопке лайка
    this._setEventListenerClickForTrash(); // слушатель клика по кнопке удаления
  }

  setLikes (array) {
    this._likes = array;
    this._likesContainer.textContent = this._likes.length;
    if (this._likeCurrentUser()) { 
      this._buttonLike.classList.add("element__like-btn_active");
    } else {
      this._buttonLike.classList.remove("element__like-btn_active");
    }

    this._buttonLike.setAttribute("title", 
    this._likes.reduce((sum, current) => sum + current.name + "; ", "")
    )
    this._buttonLike.classList.remove('element__like-btn_progress')

  }

  _likeCurrentUser() {
    return this._likes.some((user) => user._id == this._idCurrentUser)
  }
}
