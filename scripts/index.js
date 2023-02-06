const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('#edit-profile-close');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');
const formProfile = document.querySelector('#form-profile');
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