export default class Section {
  constructor(renderer, containerSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(dataCard) {
    dataCard.forEach((item) => {
      this.renderer(item)});
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
