export const dataElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
export const buttonOpenPopupAddElement = document.querySelector('.profile__add-button');
export const formProfile = document.querySelector('#form-profile');
export const formAddElement = document.querySelector('#form-element');
export const selectorProfileName = '.profile__title';
export const selectorProfileAbout = '.profile__subtitle';

export const templateCard = '#template-element';
export const selectorCardsContainer = '.elements';

export const selectorPopupProfile = '.modal_type_edit-profile';
export const selectorPopupAddElement = '.modal_type_add-element';
export const selectorPopupImage = '.modal_type_image';

export const config = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button-save',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__input-error_active'
};