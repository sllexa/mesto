import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup, handlerSubmit) {
    super(selectorPopup);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.modal__form');
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._card);
    });
  }
}