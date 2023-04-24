export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }

  addItems(items) {
    this._container.append(items);
  }

  addElement(element) {
    this._container.prepend(element);
  }
}