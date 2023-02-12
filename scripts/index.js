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
const elementsContainer = document.querySelector('.elements');

const modalEditProfile = document.querySelector('.modal_type_edit-profile');

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
  // const elementTemplate = new Element('#template-element', name, link);
  const elementTemplate = document.querySelector('#template-element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = name;
  element.querySelector('.element__title').textContent = name;
  
  elementsContainer.prepend(element);
}