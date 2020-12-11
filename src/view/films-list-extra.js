import AbstractElement from "./abstract.js";

const createExtraFilmsList = (listName) => {
  return `<section class="films-list films-list--extra">
            <h2 class="films-list__title">${listName}</h2>
            <div class="films-list__container"></div>
          </section>`;
};

export default class ExtraFilmsList extends AbstractElement {
  constructor(listName) {
    super();

    this._listName = listName;
  }

  getTemplate() {
    return createExtraFilmsList(this._listName);
  }
}
