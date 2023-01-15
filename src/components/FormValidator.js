export class FormValidator {
  constructor(configuration, formSelector) {
    this._inputSelector = configuration.inputSelector;
    this._submitButtonSelector = configuration.submitButtonSelector;
    this._inactiveButtonClass = configuration.inactiveButtonClass;
    this._inputErrorClass = configuration.inputErrorClass;
    this._errorClass = configuration.errorClass;
    this._formSelector = formSelector;

    this._formElement = document.querySelector(this._formSelector); // форму сохранили в переменную
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    ); // массив инпутов в переменной
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    ); // кнопка сабмита в переменной
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement, inputElement.validationMessage)
      : this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  /* функция сброса ошибок, вызывается при повторном открытии попапа */
  _resetErrorsValidation() {
    this._inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._inputErrorClass)) {
        this._hideInputError(inputElement);
      }
      this._toggleButtonState();
    });
  }
  _setEventListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener("reset", () => {
      /* таймер нужен, чтобы прошло время между моментом сброса формы и новой валидацией формы (в т.ч. состояние сабмита). Если убрать его, то форма не успевает очиститься до валидации. Нулевой таймер кажется бессмысленным, но на отработку этой функции проходит время, достаточное для окончания сброса формы. Вариант с отслеживанием сброса формы и установки setTimeout предложил другой ревьюер в ПР6. Решение действительно, костыльное, но другого рабочего способа очистки ошибок после закрытия заполненного попапа найти не удалось.*/
      setTimeout(() => {
        this._resetErrorsValidation();
      }, 0);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}


