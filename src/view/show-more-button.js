import AbstractElement from "./abstract.js";

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show More</button>`;
};

export default class ShowMoreButton extends AbstractElement {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  deleteElement() {
    this.getElement().remove();

    this._element = null;
  }
}
