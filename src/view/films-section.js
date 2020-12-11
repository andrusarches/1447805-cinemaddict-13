import AbstractElement from "./abstract.js";

const createFilmsSectionTemplate = () => {
  return `<section class="films"></section>`;
};

export default class FilmsSection extends AbstractElement {
  getTemplate() {
    return createFilmsSectionTemplate();
  }
}
