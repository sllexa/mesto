export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const element = document.querySelector(this._selector)
      .content.querySelector('.element').cloneNode(true);

    return element;
  }

  createCard() {
    this._element = this._getTemplate();

    this._delButton = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._like = this._element.querySelector('.element__like');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._delButton.addEventListener('click', () => this._handleDeleteElement());

    this._like.addEventListener('click', (evt) => this._handleLikeClick(evt));
  }

  _handleDeleteElement() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('element__like_active');
  }
}