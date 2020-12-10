import {createElement} from "../util.js";

const createExtraFilmsList = (listName) => {
  return `<section class="films-list films-list--extra">
            <h2 class="films-list__title">${listName}</h2>
            <div class="films-list__container"></div>
          </section>`;
};

export default class ExtraFilmsList {
  constructor(listName) {
    this._listName = listName;

    this._element = null;
  }

  getTemplate() {
    return createExtraFilmsList(this._listName);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
