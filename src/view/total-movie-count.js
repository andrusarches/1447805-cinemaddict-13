import {createElement} from "../util.js";

const createTotalMovieCountTemplate = (totalCount) => {
  return `<p>${totalCount} movies inside</p>`;
};

export default class TotalMovieCount {
  constructor(totalCount) {
    this._totalCount = totalCount;

    this._element = null;
  }

  getTemplate() {
    return createTotalMovieCountTemplate(this._totalCount);
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
