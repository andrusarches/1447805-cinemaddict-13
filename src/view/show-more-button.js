import {FILMS_INITIALLY_DISPLAYED_NUMBER} from "../const.js";
import {renderElement} from "../util.js";
import {FILM_CARD_MOCK_DATA} from "../mock/filmdata.js";
import {createFilmCardTemplate} from "../view/film-card.js";

const FILM_COUNT_PER_STEP = 5;

export const createShowMoreButtonTemplate = () => {
  const newFragment = document.createDocumentFragment();
  const showMoreButton = document.createElement(`button`);
  showMoreButton.classList.add(`films-list__show-more`);
  showMoreButton.textContent = `Show More`;
  newFragment.appendChild(showMoreButton);

  return newFragment;
};

const removeShowMoreButton = () => {
  const siteFilmListContainerElement = document.querySelector(`.films-list`);
  const showMoreButton = siteFilmListContainerElement.querySelector(`.films-list__show-more`);

  showMoreButton.remove();
};

let oldDisplayCount = FILMS_INITIALLY_DISPLAYED_NUMBER;

export const onShowMoreButton = (evt) => {
  evt.preventDefault();

  const siteFilmListContainerElement = document.querySelector(`.films-list__container`);

  let displayCountIncrease = FILM_COUNT_PER_STEP;

  let newDisplayCount = oldDisplayCount + displayCountIncrease;

  // const reducerRenderMoreFilmCards = (accumulator, currentValue, currentIndex) => {
  //   let indexIncreaseCounter = currentIndex;
  //   if (oldDisplayCount - currentIndex === FILM_COUNT_PER_STEP) {
  //     return '';
  //   }
  //   currentIndex++;
  //   renderElement(siteFilmListContainerElement, createFilmCardTemplate(FILM_CARD_MOCK_DATA[currentIndex]), `beforeend`);
  //   oldDisplayCount++;
  // };

  if (FILM_CARD_MOCK_DATA.length <= newDisplayCount) {
    newDisplayCount = oldDisplayCount + (FILM_CARD_MOCK_DATA.length - oldDisplayCount);

    // FILM_CARD_MOCK_DATA.reduce(reducerRenderMoreFilmCards, oldDisplayCount);
    for (let i = oldDisplayCount; i < newDisplayCount; i++) {
      renderElement(siteFilmListContainerElement, createFilmCardTemplate(FILM_CARD_MOCK_DATA[i]), `beforeend`);
      oldDisplayCount++;
    }
    removeShowMoreButton();
  } else {
    for (let i = oldDisplayCount; i < newDisplayCount; i++) {
      renderElement(siteFilmListContainerElement, createFilmCardTemplate(FILM_CARD_MOCK_DATA[i]), `beforeend`);
      oldDisplayCount++;
    }
    // FILM_CARD_MOCK_DATA.reduce(reducerRenderMoreFilmCards, oldDisplayCount);
  }
};
