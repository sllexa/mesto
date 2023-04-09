import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { 
  dataElements, 
  templateCard,
  selectorCardsContainer,
  selectorProfileName,
  selectorProfileAbout,
  inputProfileName,
  inputProfileAbout,
  buttonOpenPopupProfile,
  buttonOpenPopupAddElement,
  formProfile,
  formAddElement,
  selectorPopupProfile,
  selectorPopupAddElement,
  selectorPopupImage,
  config 
} from '../utils/constants.js';

const formProfileValidator = new FormValidator(config, formProfile);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddElement);
formAddValidator.enableValidation();

const userInfo = new UserInfo({
  profileName: selectorProfileName,
  profileAbout: selectorProfileAbout
});

const popupProfile = new PopupWithForm(selectorPopupProfile, (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});
popupProfile.setEventListeners();

// Cлушатель кнопки открытия редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  inputProfileName.value = name;
  inputProfileAbout.value = about;
  formProfileValidator.resetValidation();
  popupProfile.open();
});

// Добавления елементов при загрузке страницы
const section = new Section({
  items: dataElements,
  renderer: (item) => {
    section.addItem(getCardElement(item));
  }
}, selectorCardsContainer);
section.renderItems();

function getCardElement(data) {
  const card = new Card(data, templateCard, handleImageClick);
  return card.createCard();
}

const popupImage = new PopupWithImage(selectorPopupImage);
popupImage.setEventListeners();

function handleImageClick(name, link) {
  popupImage.open(name, link);
}

const popupAddElement = new PopupWithForm(selectorPopupAddElement, (data) => {
  section.addItem(getCardElement(data));
  popupAddElement.close();
});
popupAddElement.setEventListeners();

// Слушатель кнопки открытия окна для добавления элемента
buttonOpenPopupAddElement.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupAddElement.open();
});