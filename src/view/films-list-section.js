import AbstractElement from "./abstract.js";

const createFilmsListSectionTemplate = (moviesPresentBoolean) => {
  return `<section class="films-list">
        <h2 class="films-list__title${moviesPresentBoolean ? ` visually-hidden">All movies. Upcoming` : `">There are no movies in our database`}</h2>
        ${moviesPresentBoolean ? `<div class="films-list__container"></div>` : ``}
      </section>
  `;
};

export default class FilmsListSection extends AbstractElement {
  constructor(booleanValue) {
    super();

    this._moviesPresentBoolean = booleanValue;
  }

  getTemplate() {
    return createFilmsListSectionTemplate(this._moviesPresentBoolean);
  }
}
