import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector('.modal__image');
    this._caption = this._popup.querySelector('.modal__caption');
  }

  open(caption, link) {
    this._image.src = link;
    this._image.alt = caption;
    this._caption.textContent = caption;

    super.open();
  }
}