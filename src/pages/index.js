/* ИМПОРТЫ */

// импорт стилей для вебпака
import "./index.css";

// импорт классов
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

// импорт переменных
import {
  initialCards, // массив базовых 6 карточек
  buttonEditProfile, // кнопка вызова попапа редактирования профиля
  buttonAddElement, // кнопка вызова попапа добавления карточки
  selectorEditProfile, // селектор попапа редактирования профиля
  selectorProfileTitle, // селектор "имя пользователя" редактирования профиля
  selectorProfileSubtitle, // селектор "род деятельности" редактирования профиля
  profileAvatar, // селектор "аватарка" редактирования профиля
  buttonReplaceAvatar, // кнопка редактирования аватарки
  selectorPopupAvatar, // селектора попапа смены аватарки
  selectorAddCard, // селектор попапа добавления карточки
  templateSelector, // селектор шаблона карточки
  selectorViewImage, // селектор попапа просмотра картинки
  selectorConfirmation, // селектор попапа подтверждения удаления
  cardsSelector, // селектор дива для размещения карточек
  spinner, // контейнер картинки загрузки контента
  config, // селекторы для валидации
} from "../utils/constants.js";

/* ФУНКЦИИ */




// загрузка контента
function renderLoading(isLoading) {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
  } else {
    spinner.classList.remove("spinner_visible");
  }
}
// открытие попапа просмотра картинки (перенаправляем на метод открытия экземпляра Попапа просмотра изображений)
const handleClickImage = (link, name) => {
  popupWithImage.open(link, name);
};

// обработка подтверждения удаления карточки
const handleConfirmation = (that) => {
  popupWithConfirmation.initialCard = that;
  popupWithConfirmation.open();
};

// обработка удаления карточки
const handleRemoveCard = () => {
  const buttonSubmitRemoveCard =
    document.forms.form_confirmation.elements.form__submit;
  buttonSubmitRemoveCard.textContent = "удаление";

  api
    .removeCard(popupWithConfirmation.initialCard["_id"])
    .then((data) => {
      if (!data) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        popupWithConfirmation.initialCard.remove();
        buttonSubmitRemoveCard.textContent = "выполнено!";
      }
    })
    .catch((err) => {
      buttonSubmitRemoveCard.textContent = "ошибка запроса :(";
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        buttonSubmitRemoveCard.textContent = "Да";
        buttonSubmitRemoveCard.disabled = false;
        popupWithConfirmation.close();
      }, 1200);
    });
};
// установка/снятие лайка
const handleClickLike = (id, isLiked, that) => {
  api.setLike(id, isLiked)
    .then((array) => {
      if (!array) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        that.setLikes(array.likes)
      }
    })
    .catch((err) => {
      console.log(err);
    })
}
// создание экземпляра класса Card и возврат собранной карточки
const createCard = (data) => {
  const newElement = new Card(
    { ...data, idCurrentUser: userInfo.id },
    templateSelector,
    handleClickImage,
    handleConfirmation,
    handleClickLike
  );
  return newElement.generateCard();
};

// подстановка в поля инпута данных со страницы
const handleSubstituteValuesEditProfile = () => {
  const { name, about } = userInfo.getUserInfo(); // данные со страницы

  const form = document.forms.form_edit; // находим форму
  form.elements.name.value = name; // в форме находим инпут name и устанавливаем значение
  form.elements.about.value = about; // аналогично с инпутом about

  popupEditProfile.open();
};

// обработка формы редактирования
const handleFormSubmitEditProfile = (event, valuesForm) => {
  event.preventDefault();
  const buttonSubmitEditProfile =
    document.forms.form_edit.elements.form__submit;
  buttonSubmitEditProfile.textContent = "сохранение...";
  buttonSubmitEditProfile.disabled = true;

  const { name, about } = valuesForm;

  api
    .patchUserInfo(name, about)
    .then((data) => {
      if (!data) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        userInfo.setUserInfo(data.name, data.about); //установить значения
        buttonSubmitEditProfile.textContent = "выполнено!";
      }
    })
    .catch((err) => {
      buttonSubmitEditProfile.textContent = "ошибка запроса :(";
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        buttonSubmitEditProfile.textContent = "сохранить";
        buttonSubmitEditProfile.disabled = false;
        popupEditProfile.close();
      }, 1200);
    });
};

// обработка смены аватарки
const handleFormSubmitReplaceAvatar = (event, valueForm) => {
  const buttonSubmitReplaceAvatar =
  document.forms.form_avatar.elements.form__submit;
  
  buttonSubmitReplaceAvatar.disabled = true;;
  buttonSubmitReplaceAvatar.textContent = "сохранение...";
  
  api.replaceAvatar(valueForm.url)
  .then((data) => {
    if (!data) {
      return Promise.reject(`Ошибка получения данных`);
    } else {
      console.log(data);
      userInfo.setAvatar(data.avatar); //установить значения
      buttonSubmitReplaceAvatar.textContent = "выполнено!";
    }
  })
  .catch((err) => {
    buttonSubmitReplaceAvatar.textContent = "ошибка запроса :(";
    console.log(err);
  })
  .finally(() => {
    setTimeout(() => {
      buttonSubmitReplaceAvatar.textContent = "Сохранить";
      buttonSubmitReplaceAvatar.disabled = false;
      popupReplaceAvatar.close();
    }, 1000);
  });


}

// обработка добавления карточки через форму
const handleFormSubmitAddCard = (event, valuesForm) => {
  event.preventDefault();

  const buttonSubmitAddCard = document.forms.form_add.elements.form__submit;
  buttonSubmitAddCard.textContent = "добавление...";
  buttonSubmitAddCard.disabled = true;

  const { title, url } = valuesForm;
  api
    .addCard(title, url)
    .then((data) => {
      if (!data) return Promise.reject(`Ошибка получения данных`);
      const cardElement = createCard({ ...data, likes: [] });
      cards.addItem(cardElement);
      buttonSubmitAddCard.textContent = "выполнено!";
    })
    .catch((err) => {
      buttonSubmitAddCard.textContent = "ошибка запроса :(";
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        buttonSubmitAddCard.textContent = "создать";
        buttonSubmitAddCard.disabled = false;
        popupAddCard.close();
      }, 1200);
    });
};

/* СОЗДАНИЕ ЭКЗЕМПЛЯРОВ ПОПАПОВ */

// экземпляр для попапа добавления карточки
const popupAddCard = new PopupWithForm(
  selectorAddCard,
  handleFormSubmitAddCard
);

// экземпляр для попапа редактирования профиля
const popupEditProfile = new PopupWithForm(
  selectorEditProfile,
  handleFormSubmitEditProfile
);

// экземпляр для попапа просмотра картинок
const popupWithImage = new PopupWithImage(selectorViewImage);

// экземпляр для попапа подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(
  selectorConfirmation,
  handleRemoveCard
);

// экземпляр для попапа подтверждения удаления карточки
const popupReplaceAvatar = new PopupWithForm(
  selectorPopupAvatar,
  handleFormSubmitReplaceAvatar
);

/* СОЗДАНИЕ ЭКЗЕМПЛЯРА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const userInfo = new UserInfo({
  selectorProfileTitle,
  selectorProfileSubtitle,
  profileAvatar,
});

/* ВАЛИДАЦИЯ */

// создание экземпляра - редактирование профиля
const validationFormEditProfile = new FormValidator(config, ".form_edit");
validationFormEditProfile.enableValidation(); // включение

// создание экземпляра - добавление карточки
const validationFormAddCard = new FormValidator(config, ".form-add-element");
validationFormAddCard.enableValidation(); // включение

// создание экземпляра - обновление аватарки
const validationFormReplaceAvatar = new FormValidator(config, ".form_avatar");
validationFormReplaceAvatar.enableValidation(); // включение

/* ВСТАВКА КОНТЕНТА - Section */

// инициализация класса Section для использования вставок на страницу
const cards = new Section(
  {
    items: "",
    renderer: (item) => { },
  },
  cardsSelector
);

/* API */

// создание экземпляра подключения к серверу
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "6820f07f-8dfa-4fad-8bb6-c96815674778",
    "Content-Type": "application/json",
  },
});

// загрузка с сервера данных пользователя
const apiGetUserInfo = api.getUserInfo()
;

// выгрузка карточек с сервера и размещение на странице
const apiGetInitialCards = api.getInitialCards()
.then((response) => {
  if (response.ok) {
    renderLoading(true); // связь есть, значит можно включить картинку подзагрузки
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
});
Promise.all([apiGetUserInfo, apiGetInitialCards])
  .then(([userData, cardsData]) => {
    /* пользователь */
    userInfo.setUserInfo(userData.name, userData.about); // установка данных пользователя на странице
    userInfo.id = userData._id; // сохраняем id текущего пользователя
    userInfo.setAvatar(userData.avatar); // установка аватарки

    /* карточки */
    cardsData
      .splice(1, 20) // только первые ... карточек
      .forEach((data) => {
        const cardElement = createCard({
          ...data,
          idCurrentUser: userData._id,
        });
        cards.addItem(cardElement); // добавление на страницу, cards это экземпляр Section
      });
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => renderLoading(false));

/* ПРОСЛУШИВАТЕЛИ */

/* прослушиватель клика на кнопку редактирования профиля */
buttonEditProfile.addEventListener("click", handleSubstituteValuesEditProfile);

/* прослушиватель клика на кнопку добавления формы */
buttonAddElement.addEventListener("click", function () {
  popupAddCard.open();
});
/* прослушиватель клика на редактирование аватарки */
buttonReplaceAvatar.addEventListener("click", function () {
  popupReplaceAvatar.open();
});
