import { dataElements, config } from './constants.js';
import { enableValidation } from './validate.js';

const openEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');
const formProfile = document.querySelector('#form-profile');
const openAddElementButton = document.querySelector('.profile__add-button');
const inputAddElementName = document.querySelector('.form__input_type_place');
const inputAddElementLink = document.querySelector('.form__input_type_link');
const elementsContainer = document.querySelector('.elements');
const formAddElement = document.querySelector('#form-element');

const modalEditProfile = document.querySelector('.modal_type_edit-profile');
const modalAddElement = document.querySelector('.modal_type_add-element');
const modalFigure = document.querySelector('.modal_type_image');
const elementTemplate = document.querySelector('#template-element')
const modalFigureImage = modalFigure.querySelector('.figure__image');
const modalFigureCaption = modalFigure.querySelector('.figure__caption');
const closeButtons = document.querySelectorAll('.modal__close-button');

// Открытие окна редактирования профиля
function openEditProfile() {
  openModal(modalEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

// Изменение данных профиля 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closeModal(modalEditProfile);
  formProfile.querySelector('.form__button').disabled = true;
}

function openModal(modal) {
  modal.classList.add('modal_open');
  modal.addEventListener('mousedown', closeModalByOverlay);
  document.addEventListener('keydown', closeModalByEsc);
}

function closeModal(modal) {
  modal.classList.remove('modal_open');
  modal.removeEventListener('mousedown', closeModalByOverlay);
  document.removeEventListener('keydown', closeModalByEsc);
}

// Cлушатель кнопки открытия редактирования профиля
openEditButton.addEventListener('click', openEditProfile);

// Закрытие всех модальных окон по крестику
closeButtons.forEach((button) => {
  const modal = button.closest('.modal');
  button.addEventListener('click', () => closeModal(modal));
});

// Cлушатель отправки формы редактирования профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// Добавления елементов при загрузке страницы
dataElements.forEach(function (item) {
  renderElement(item.link, item.name);
})

function renderElement(link, name) {
  elementsContainer.prepend(createElement(link, name));
}

function createElement(link, name) {
  const element = elementTemplate.content.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');

  elementImage.src = link;
  elementImage.alt = name;
  element.querySelector('.element__title').textContent = name;
  elementImage.addEventListener('click', () => {
    openModal(modalFigure);
    modalFigureImage.src = link;
    modalFigureImage.alt = name;
    modalFigureCaption.textContent = name;
  });
  element.querySelector('.element__like').addEventListener('click', (evt) => evt.target.classList.toggle('element__like_active'));
  element.querySelector('.element__delete-button').addEventListener('click', () => element.remove());

  return element;
}

// Слушатель кнопки открытия окна для добавления элемента
openAddElementButton.addEventListener('click', () => {
  openModal(modalAddElement);
});

// Добавления элемента через инпут
function handleElementFormSubmit(evt) {
  evt.preventDefault();
  renderElement(inputAddElementLink.value, inputAddElementName.value);
  closeModal(modalAddElement);
  evt.target.reset();
  formAddElement.querySelector('.form__button').disabled = true;
}

// Cлушатель отправки формы добавления элемента
formAddElement.addEventListener('submit', handleElementFormSubmit);

// закрытие модального окна по оверлею 
const closeModalByOverlay = function (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// закрытие модального окна по кнопке Escape
const closeModalByEsc = function (evt) {
  if (evt.key === 'Escape') {
    const modalOpen = document.querySelector('.modal_open');
    closeModal(modalOpen);
  }
}

enableValidation(config);