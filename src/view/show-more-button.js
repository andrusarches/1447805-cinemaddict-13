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

  removeEventListener() {
    this.getElement().removeEventListener(`click`, this._clickHandler);
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
