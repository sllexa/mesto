export default class Card {
  constructor({data, selector, handleCardClick, handleCardDelete, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = data.userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCount = this._element.querySelector('.element__like-count');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    
    this.updateLikesCounter(this._likes);
    this._setEventListeners();
    this._deleteButtonState();
    this._toggleLikeState();

    return this._element;
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._delButton.addEventListener('click', () => this._handleCardDelete());

    this._like.addEventListener('click', () => this._handleLikeClick(this));
  }

  _deleteButtonState() {
    if (this._ownerId !== this._userId) {
      this._delButton.remove();
      this._delButton = null;
    }
  }

  _toggleLikeState() {
    if (this._likes.some(item => item._id === this._userId)) {
      this.setLike(false);
    } else {
      this.setLike(true);
    }
  }

  setLike(isLike) {
    if (isLike) {
      this._like.classList.remove('element__like_active');
      this.isLiked = false;
    } else {
      this._like.classList.add('element__like_active');
      this.isLiked = true;
    }
  }

  updateLikesCounter(data) {
    this._likeCount.textContent = data.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  getCardId() {
    return this._cardId;
  }
}