import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import {
  templateCard,
  selectorCardsContainer,
  buttonOpenPopupProfile,
  buttonOpenPopupAddElement,
  profileName,
  profileAbout,
  profileAvatar,
  formProfile,
  formAddElement,
  formAvatar,
  selectorPopupProfile,
  selectorPopupAddElement,
  selectorPopupImage,
  selectorPopupAvatar,
  selectorPopupConfirm,
  config
} from '../utils/constants.js';
import './index.css';
import Api from '../components/Api.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '2c7dc0bc-6158-41d9-ad19-ea1880000019',
    "Content-Type": "application/json"
  }
});

const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

const formAvatarValidator = new FormValidator(config, formAvatar);
formAvatarValidator.enableValidation();

const userInfo = new UserInfo({
  profileName: profileName,
  profileAbout: profileAbout,
  profileAvatar: profileAvatar
});

const popupProfile = new PopupWithForm(selectorPopupProfile, (data) => {
  popupProfile.setCaptionButton(true);
  api.setProfile(data)
    .then(profile => {
      userInfo.setUserInfo(profile);
      popupProfile.close();
    })
    .catch(error => console.log(error))
    .finally(() => popupProfile.setCaptionButton(false));
});
popupProfile.setEventListeners();

// Cлушатель кнопки открытия редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  formProfileValidator.resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

// Добавления елементов при загрузке страницы
const section = new Section({
  renderer: (item) => {
    section.addItems(getCardElement(item));
  }
}, selectorCardsContainer);

/**
 * Загрузка с сервера данных о пользователе и карточки.
 */
api.renderUserAndCards()
  .then(res => {
    const [user, listCards] = res;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    userInfo.setUserId(user._id);
    section.renderItems(listCards);
  })
  .catch(error => console.log(error));

const handleLikeClick = (card) => {
  const method = card.isLiked ? 'DELETE' : 'PUT';
  
  api.setLikedCard(card.getCardId(), method)
    .then(data => {
      card.setLike(card.isLiked);
      card.updateLikesCounter(data.likes);
    })
    .catch(error => console.log(error));
}

function getCardElement(data) {
  data.userId = userInfo.getUserId();
  const card = new Card({data, selector: templateCard, 
    handleCardClick: (name, link) => popupImage.open(name, link), 
    handleCardDelete: () => popupConfirm.open(card),
    handleLikeClick
  });
  return card.createCard();
}

const popupImage = new PopupWithImage(selectorPopupImage);
popupImage.setEventListeners();

const popupAddElement = new PopupWithForm(selectorPopupAddElement, (data) => {
  popupAddElement.setCaptionButton(true);
  api.addCard(data)
    .then(card => {
      section.addElement(getCardElement(card));
      popupAddElement.close();
    })
    .catch(error => console.log(error))
    .finally(() => popupAddElement.setCaptionButton(false));
});
popupAddElement.setEventListeners();

// Слушатель кнопки открытия окна для добавления элемента
buttonOpenPopupAddElement.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupAddElement.open();
});

const popupAvatar = new PopupWithForm(selectorPopupAvatar, (data) => {
  popupAvatar.setCaptionButton(true);
  api.setAvatar(data)
    .then(avatar => {
      userInfo.setUserAvatar(avatar);
      popupAvatar.close();
    })
    .catch(error => console.log(error))
    .finally(() => popupAvatar.setCaptionButton(false));
});
popupAvatar.setEventListeners();

profileAvatar.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupAvatar.open();
});

const popupConfirm = new PopupWithConfirm(selectorPopupConfirm, (card) => {
  api.deleteCard(card.getCardId())
    .then(() => {
      card.deleteCard();
      popupConfirm.close();
    })
    .catch((error) => console.log(error));
});
popupConfirm.setEventListeners();