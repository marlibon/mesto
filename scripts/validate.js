
/*
функция showInputError = (formElement, inputElement, errorMessage)
находит див для показа ошибки, меняет стили, чтобы продемонстрировать ошибку (красные границы, показ span )

функция hideInputError = (formElement, inputElement)
тоже самое, что первое, но скрывает ошибку

checkInputValidity = (formElement, inputElement)
проверяет валидность (согласно требованиям указанным в html верстке ) данного ему 1 инпута и отправляет либо на показ ошибки (showInputError), либо отключение показа (hideInputError)

setEventListeners = (formElement)
ищет все инпуты внутри формы и записывает в массив, потом проходит по массиву и каждому инпуту вешает слушатель 'input', слушателю добавляется функция checkInputValidity, а также toggleButtonState (для проверки валидности и запрета нажатия кнопки submit, если не валидно)


enableValidation
ищет все формы на странице и записывает в массив, потом проходит по массиву и каждой форме вешает слушатель на submit, слушателю добавляется функция отключения стд.действий браузера. Внутри перебора формы, дополнительно проводится поиск всех fieldset'ов этой формы, и по каждому записан запуск функции setEventListeners с аргументом этого fieldset

hasInvalidInput = (inputList)
проверяет все инпуты на соответствие валидности и возвращает true или false

toggleButtonState = (inputList, buttonElement)
переключение активности кнопки отправки формы, в зависимости от того, какое условие возвращает hasInvalidInput
*/

/* порядок
enableValidation - нашли все формы на странице, навешали слушателей на submit, и отдельно на фиелдсеты
setEventListeners - ищем инпуты внутри формы, слушатель на input
checkInputValidity - условия если валидно или нет
showInputError, hideInputError - показ ошибки в верстке

если не верно забито
hasInvalidInput - проверка инпута
toggleButtonState - запрет нажатия кнопки


*/
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    console.log('-')
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    console.log('+')

    hideInputError(formElement, inputElement, config);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);

  }
}
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  //console.log(buttonElement)

  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};



const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    //console.log(formList)

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      //console.log(formElement)
    });
    setEventListeners(formElement, config);
  });
};

const configs = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disable',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}
enableValidation(configs);

