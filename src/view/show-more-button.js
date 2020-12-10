import {createElement} from "../util.js";

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show More</button>`;
};

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
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

// const reducerRenderMoreFilmCards = (accumulator, currentValue, currentIndex) => {
//   let indexIncreaseCounter = currentIndex;
//   if (oldDisplayCount - currentIndex === FILM_COUNT_PER_STEP) {
//     return '';
//   }
//   currentIndex++;
//   render(siteFilmListContainerElement, new FilmCard(FILM_CARD_MOCK_DATA[currentIndex]).getElement(), RENDER_POSITION.BEFOREEND);
//   oldDisplayCount++;
// };

// FILM_CARD_MOCK_DATA.reduce(reducerRenderMoreFilmCards, oldDisplayCount);
