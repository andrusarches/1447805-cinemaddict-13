import {createElement} from "../util.js";

const createFilmsListSectionTemplate = (moviesPresentBoolean) => {
  return `<section class="films-list">
        <h2 class="films-list__title${moviesPresentBoolean ? ` visually-hidden">All movies. Upcoming` : `">There are no movies in our database`}</h2>
        ${moviesPresentBoolean ? `<div class="films-list__container"></div>` : ``}
      </section>
  `;
};

export default class FilmsListSection {
  constructor(booleanValue) {
    this._moviesPresentBoolean = booleanValue;

    this._element = null;
  }

  getTemplate() {
    return createFilmsListSectionTemplate(this._moviesPresentBoolean);
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
