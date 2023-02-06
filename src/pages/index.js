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
  buttonEditProfile, // кнопка вызова попапа редактирования профиля
  buttonAddElement, // кнопка вызова попапа добавления карточки
  buttonSubmitAddCard, // кнопка сабмита добавления карточки на попапе
  selectorEditProfile, // селектор попапа редактирования профиля
  selectorProfileTitle, // селектор "имя пользователя" редактирования профиля
  selectorProfileSubtitle, // селектор "род деятельности" редактирования профиля
  buttonSubmitEditProfile, // кнопка сабмита формы редактирования профиля на попапе
  profileAvatar, // селектор "аватарка" редактирования профиля
  buttonReplaceAvatar, // кнопка редактирования аватарки
  selectorPopupAvatar, // селектора попапа смены аватарки
  buttonSubmitReplaceAvatar, // кнопка сабмита смены аватарки на попапе
  selectorAddCard, // селектор попапа добавления карточки
  templateSelector, // селектор шаблона карточки
  selectorViewImage, // селектор попапа просмотра картинки
  selectorConfirmation, // селектор попапа подтверждения удаления
  buttonSubmitRemoveCard, // кнопка сабмита подтверждения удаления на попапе
  cardsSelector, // селектор дива для размещения карточек
  spinner, // контейнер картинки загрузки контента
  config, // селекторы для валидации
} from "../utils/constants.js";

/* ----------------------- ФУНКЦИИ ----------------------- */




// картинка загрузки контента
function renderLoading(isLoading) {
  if (isLoading) {
    spinner.classList.add("spinner_visible");
  } else {
    spinner.classList.remove("spinner_visible");
  }
}
renderLoading(true); // анимация загрузки контента

const changeStateButtonSubmit = (button, text = 'Сохранить', state = true) => {
  button.textContent = text;
  button.disabled = !state; // true это кнопка активна, false - не активна
  state
    ? button.classList.remove('form__submit_disable')
    : button.classList.add('form__submit_disable');

}



// открытие попапа просмотра картинки (перенаправляем на метод открытия экземпляра Попапа просмотра изображений)
const handleClickImage = (link, name) => {
  popupWithImage.open(link, name);
};

// обработка подтверждения удаления карточки
const handleConfirmation = (newHandleSubmit) => {
  popupWithConfirmation.open();
  popupWithConfirmation.handleSubmit(newHandleSubmit)
};

// обработка удаления карточки
const handleRemoveCard = () => {
  changeStateButtonSubmit(buttonSubmitRemoveCard, "удаление...", false)
  api
    .removeCard(card._id)
    .then((data) => {
      if (!data) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        card.remove();
        changeStateButtonSubmit(buttonSubmitRemoveCard, "выполнено", false)

      }
    })
    .catch((err) => {
      changeStateButtonSubmit(buttonSubmitRemoveCard, "ошибка запроса :(", false)

      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        changeStateButtonSubmit(buttonSubmitRemoveCard, "Да")
        popupWithConfirmation.close();
      }, 800);
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
  const card = new Card(
    { ...data, idCurrentUser: userInfo.id },
    templateSelector,
    {
      handleClickImage,
      handleCardDelete: (cardData) => {
        popupWithConfirmation.open();
        popupWithConfirmation.handleSubmit(() => {
          changeStateButtonSubmit(buttonSubmitRemoveCard, "удаление...", false)
          api
            .removeCard(cardData._id)
            .then((data) => {
              if (!data) {
                return Promise.reject(`Ошибка получения данных`);
              } else {
                card.remove();
                changeStateButtonSubmit(buttonSubmitRemoveCard, "выполнено", false)

              }
            })
            .catch((err) => {
              changeStateButtonSubmit(buttonSubmitRemoveCard, "ошибка запроса :(", false)

              console.log(err);
            })
            .finally(() => {
              setTimeout(() => {
                changeStateButtonSubmit(buttonSubmitRemoveCard, "Да")
                popupWithConfirmation.close();
              }, 800);
            })
        })
      },
      handleClickLike
    }
  );
  return card.generateCard();
};

// подстановка в поля инпута данных со страницы
const handleSubstituteValuesEditProfile = () => {
  console.log(userInfo.getUserInfo());
  const { name, about } = userInfo.getUserInfo(); // данные со страницы
  popupEditProfile.setValuesInForm({ name, about });
  popupEditProfile.open();
};

// обработка формы редактирования
const handleFormSubmitEditProfile = (event, valuesForm) => {
  event.preventDefault();
  changeStateButtonSubmit(buttonSubmitEditProfile, 'сохранение...', false)

  const { name, about } = valuesForm;

  api
    .patchUserInfo(name, about)
    .then((data) => {
      if (!data) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        userInfo.setUserInfo(data.name, data.about); //установить значения
        changeStateButtonSubmit(buttonSubmitEditProfile, 'выполнено!', false)

      }
    })
    .catch((err) => {
      changeStateButtonSubmit(buttonSubmitEditProfile, 'ошибка запроса :(', false)

      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        changeStateButtonSubmit(buttonSubmitEditProfile, 'сохранить')
        popupEditProfile.close();
      }, 800);
    });
};

// обработка смены аватарки
const handleFormSubmitReplaceAvatar = (event, valueForm) => {

  changeStateButtonSubmit(buttonSubmitReplaceAvatar, 'сохранение...', false)

  api.replaceAvatar(valueForm.url)
    .then((data) => {
      if (!data) {
        return Promise.reject(`Ошибка получения данных`);
      } else {
        userInfo.setAvatar(data.avatar); //установить значения
        changeStateButtonSubmit(buttonSubmitReplaceAvatar, 'выполнено!', false)
      }
    })
    .catch((err) => {
      changeStateButtonSubmit(buttonSubmitReplaceAvatar, 'ошибка запроса :(', false)
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        changeStateButtonSubmit(buttonSubmitReplaceAvatar, 'Сохранить')
        popupReplaceAvatar.close();
      }, 800);
    });


}

// обработка добавления карточки через форму
const handleFormSubmitAddCard = (event, valuesForm) => {
  event.preventDefault();

  changeStateButtonSubmit(buttonSubmitAddCard, 'добавление...', false)

  const { title, url } = valuesForm;
  api
    .addCard(title, url)
    .then((data) => {
      if (!data) return Promise.reject(`Ошибка получения данных`);
      const cardElement = createCard({ ...data, likes: [] });
      cardsSection.addItem(cardElement);
      changeStateButtonSubmit(buttonSubmitAddCard, 'выполнено!', false)
    })
    .catch((err) => {
      changeStateButtonSubmit(buttonSubmitAddCard, 'ошибка запроса :(', false)
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        changeStateButtonSubmit(buttonSubmitAddCard, 'создать')
        popupAddCard.close();
      }, 800);
    });
};

/* ----------------------- СОЗДАНИЕ ЭКЗЕМПЛЯРОВ ПОПАПОВ ----------------------- */

// экземпляр для попапа добавления карточки
const popupAddCard = new PopupWithForm(
  selectorAddCard,
  handleFormSubmitAddCard
);
popupAddCard.setEventListeners();

// экземпляр для попапа редактирования профиля
const popupEditProfile = new PopupWithForm(
  selectorEditProfile,
  handleFormSubmitEditProfile
);
popupEditProfile.setEventListeners();

// экземпляр для попапа просмотра картинок
const popupWithImage = new PopupWithImage(selectorViewImage);
popupWithImage.setEventListeners();

// экземпляр для попапа подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(
  selectorConfirmation,
  handleRemoveCard
);
popupWithConfirmation.setEventListeners();

// экземпляр для попапа изменения аватарки
const popupReplaceAvatar = new PopupWithForm(
  selectorPopupAvatar,
  handleFormSubmitReplaceAvatar
);
popupReplaceAvatar.setEventListeners();

/* ----------------------- СОЗДАНИЕ ЭКЗЕМПЛЯРА РЕДАКТИРОВАНИЯ ПРОФИЛЯ ----------------------- */
const userInfo = new UserInfo({
  selectorProfileTitle,
  selectorProfileSubtitle,
  profileAvatar,
});

/* ----------------------- ВАЛИДАЦИЯ ----------------------- */

// создание экземпляра - редактирование профиля
const validationFormEditProfile = new FormValidator(config, ".form_edit");
validationFormEditProfile.enableValidation(); // включение

// создание экземпляра - добавление карточки
const validationFormAddCard = new FormValidator(config, ".form-add-element");
validationFormAddCard.enableValidation(); // включение

// создание экземпляра - обновление аватарки
const validationFormReplaceAvatar = new FormValidator(config, ".form_avatar");
validationFormReplaceAvatar.enableValidation(); // включение

/* ----------------------- ВСТАВКА КОНТЕНТА - Section ----------------------- */
// инициализация класса Section для использования вставок на страницу
const cardsSection = new Section(
  {
    renderer: (item) => {

      const cardElement = createCard({
        ...item,
        idCurrentUser: userInfo.id,
      });    
      cardsSection.addItem(cardElement)
    }
  },
  cardsSelector
);

/* ----------------------- API ----------------------- */

// создание экземпляра подключения к серверу
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "6820f07f-8dfa-4fad-8bb6-c96815674778",
    "Content-Type": "application/json",
  },
});

// загрузка с сервера данных пользователя
const apiGetUserInfo = api.getUserInfo();

// выгрузка карточек с сервера и размещение на странице
const apiGetInitialCards = api.getInitialCards();

Promise.all([apiGetUserInfo, apiGetInitialCards])
  .then(([userData, cardsData]) => {
    /* пользователь */
    userInfo.setUserInfo(userData.name, userData.about); // установка данных пользователя на странице
    userInfo.id = userData._id; // сохраняем id текущего пользователя
    userInfo.setAvatar(userData.avatar); // установка аватарки

    /* карточки */
    cardsSection.renderItems(cardsData)
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => renderLoading(false));

/* ----------------------- ПРОСЛУШИВАТЕЛИ ----------------------- */

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
