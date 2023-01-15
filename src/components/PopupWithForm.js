import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");

    this._inputNameNewCard = this._form.querySelector(
      ".form__input_name-new-element"
    ); // имя нового элемента в поле ввода в модальном окне
    this._inputUrlNewCard = this._form.querySelector(
      ".form__input_url-new-element"
    ); // ссылка на картинку нового элемента на модальном окне
    this._inputTitle = this._form.querySelector(".form__input_name"); // имя на поле ввода в модальном окне
    this._inputSubtitle = this._form.querySelector(".form__input_activity"); // профессия/подзаголовок на модальном окне
  }
  _getInputValues = () => {
    this._valuesForm = {
      formName: this._form,
      inputNameNewCard: this._inputNameNewCard?.value,
      inputUrlNewCard: this._inputUrlNewCard?.value,
      inputTitle: this._inputTitle?.value,
      inputSubtitle: this._inputSubtitle?.value,
    };
    return this._valuesForm;
  };
  _sendValues = (event) => {
    this._handleFormSubmit(event, this._getInputValues());
  };
  close() {
    super.close();
    this._form.reset();
  }
  open(getUserInfo) {
    super.open();

    if (getUserInfo) {
      this._inputTitle.value = getUserInfo.title;
      this._inputSubtitle.value = getUserInfo.subtitle;
    }
  }
  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", this._sendValues);
  };
}
