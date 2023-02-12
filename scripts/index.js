const dataElements = [
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

const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('#edit-profile-close');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');
const formProfile = document.querySelector('#form-profile');
const openAddElementButton = document.querySelector('.profile__add-button');
const inputAddElementName = document.querySelector('.form__input_type_place');
const inputAddElementLink = document.querySelector('.form__input_type_link');
const closeAddElementButton = document.querySelector('#add-element-close');
const elementsContainer = document.querySelector('.elements');
const modalFormElement = document.querySelector('#form-element');

const modalEditProfile = document.querySelector('.modal_type_edit-profile');
const modalAddElement = document.querySelector('.modal_type_add-element');
const formAddElement = modalAddElement.querySelector('.form');

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
}

function openModal(modal) {
  modal.classList.add('modal_open');
}

function closeModal(modal) {
  modal.classList.remove('modal_open');
}

// Cлушатель кнопки открытия редактирования профиля
openEditButton.addEventListener('click', openEditProfile);

// Кнопка закрытия редактирования профиля
closeEditButton.addEventListener('click', () => {
  closeModal(modalEditProfile);
});

// Cлушатель отправки формы редактирования профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

// Добавления елементов при загрузке страницы
dataElements.forEach(function (item) {
  renderElement(item.link, item.name);
})

function renderElement(link, name) {
  const elementTemplate = document.querySelector('#template-element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = name;
  element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__like').addEventListener('click', (evt) => evt.target.classList.toggle('element__like_active'));
  element.querySelector('.element__delete-button').addEventListener('click', () => element.remove());
  
  elementsContainer.prepend(element);
}

// Слушатель кнопки открытия окна для добавления элемента
openAddElementButton.addEventListener('click', () => {
  openModal(modalAddElement);
});

// Слушатель кнопки закрытия окна добавления элемента
closeAddElementButton.addEventListener('click', () => {
  closeModal(modalAddElement);
});

// Добавления элемента через инпут
function handleElementFormSubmit(evt) {
  evt.preventDefault();
  renderElement(inputAddElementLink.value, inputAddElementName.value);
  closeModal(modalAddElement);
  inputAddElementLink.value = '';
  inputAddElementName.value = '';
}

// Cлушатель отправки формы добавления элемента
modalFormElement.addEventListener('submit', handleElementFormSubmit);