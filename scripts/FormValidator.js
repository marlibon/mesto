export class FormValidator {
  constructor (configuration, form) {
    this._inputSelector = configuration.inputSelector;
    this._submitButtonSelector = configuration.submitButtonSelector;
    this._inactiveButtonClass = configuration.inactiveButtonClass;
    this._inputErrorClass = configuration.inputErrorClass;
    this._errorClass = configuration.errorClass;
    this._formSelector = form;
  }
  _showInputError (inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError (inputElement, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {

    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        this._inputErrorClass,
        this._errorClass
      );
    } else {
      this._hideInputError(
        inputElement,
        this._inputErrorClass,
        this._errorClass
        );
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {

    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    this._formElement.addEventListener('reset', () => {
      setTimeout( this._toggleButtonState(inputList, buttonElement), 0)

      })
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

  }

  enableValidation () {
    this._formElement = document.querySelector(this._formSelector);

    this._formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

    this._setEventListeners();

  }
}

export const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disable",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
}


