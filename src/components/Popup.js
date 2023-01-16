export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector(".popup__close");
    this.handleClosePopup = this.close.bind(this);
  }

  removeEventListeners() {
    this._buttonClose.removeEventListener("click", this.handleClosePopup);
    document.removeEventListener("keyup", this._handleEscClose);
    this._popup.removeEventListener("click", this.checkClickByOverlay);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  checkClickByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._buttonClose.addEventListener("click", this.handleClosePopup);
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.addEventListener("click", this.checkClickByOverlay);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }
}
