export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector(".popup__close");
  }

  removeEventListeners() {
    this._buttonClose.removeEventListener("click", this.close.bind(this));
    document.removeEventListener("keyup", this._handleEscClose);
    this._popup.removeEventListener("click", this.checkClickByOverlay);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this._popup.classList.remove("popup_opened");
      this.close();
    }
  };

  checkClickByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._buttonClose.addEventListener("click", this.close.bind(this));
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.addEventListener("click", this.checkClickByOverlay);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }
}
