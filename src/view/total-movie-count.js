import AbstractElement from "./abstract.js";

const createTotalMovieCountTemplate = (totalCount) => {
  return `<p>${totalCount} movies inside</p>`;
};

export default class TotalMovieCount extends AbstractElement {
  constructor(totalCount) {
    super();

    this._totalCount = totalCount;
  }

  getTemplate() {
    return createTotalMovieCountTemplate(this._totalCount);
  }
}
