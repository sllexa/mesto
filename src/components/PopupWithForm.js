import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handlerSubmit) {
    super(selectorPopup);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.modal__form');
    this._listInput = this._form.querySelectorAll('.modal__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._listInput.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    
    this._form.reset();
  }

  setInputValues(data) {
    this._listInput.forEach((input) => {
      input.value = data[input.name];
    });
  }
}