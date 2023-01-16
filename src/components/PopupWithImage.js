import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._linkPhoto = this._popup.querySelector(".popup__image");
    this._titlePhoto = this._popup.querySelector(".popup__description");
  }
  open(link, name) {
    super.open(link, name);
    this._titlePhoto.textContent = name;
    this._linkPhoto.src = link;
    this._titlePhoto.alt = name;
  }
}
