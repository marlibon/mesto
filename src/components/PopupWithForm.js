import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
  }
  
  _getInputValues = () => {
    this._inputList = this._form.querySelectorAll("input");
    this._valuesForm = {};
    this._inputList.forEach((item, i) => {
      this._valuesForm[item.name] = this._inputList[i].value;
    });
    return this._valuesForm;
  };

  _sendValues = (event) => {
    this._handleFormSubmit(event, this._getInputValues());
  };

  close() {
    super.close();
    this._form.reset();
  }
  setValuesInForm(values) {
    Object.keys(values).forEach((item) => {
      this._form.elements[item].value = values[item];
    })
  }
  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", this._sendValues);
  };
}
