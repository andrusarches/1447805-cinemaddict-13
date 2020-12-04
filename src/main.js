import {createUserRankTemplate} from "./view/user-rank.js";
import {createSiteMenuTemplate} from "./view/main-navigation.js";
import {createFilmSortingTemplate} from "./view/film-sorting.js";
import {createFilmsSectionTemplate} from "./view/films-section.js";
import {createFilmsListSectionTemplate} from "./view/films-list-section.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createExtraFilmsList} from "./view/films-list-extra.js";
import {createTotalMovieCountTemplate} from "./view/total-movie-count.js";
import {FILM_CARD_MOCK_DATA} from "./mock/filmdata.js";
import {FILMS_INITIALLY_DISPLAYED_NUMBER} from "./const.js";
import {renderElement} from "./util.js";
import {onShowMoreButton} from "./view/show-more-button.js";
import {createFilmDetailsPopupTemplate} from "./view/film-details-popup.js";
import {generateFilter, sortByRating, sortByCommentCount} from "./mock/filter.js";

// Variables

let filmsAvailableForDisplay = false;
const FILMS_EXTRA_MOCK = true;
const FILMS_EXTRA_LIST_NAMES = [`Top rated`, `Most commented`];

if (FILM_CARD_MOCK_DATA.length > 0) {
  filmsAvailableForDisplay = true;
}

const newSortedByRatingArray = sortByRating(FILM_CARD_MOCK_DATA);
const newSortedByCommentCountArray = sortByCommentCount(FILM_CARD_MOCK_DATA);
const filters = generateFilter(FILM_CARD_MOCK_DATA);

// Rendering of the user rank element within the HEADER element.

const siteHeaderElement = document.querySelector(`header`);

renderElement(siteHeaderElement, createUserRankTemplate(), `beforeend`);

// Rendering elements within the MAIN section.

const siteMainElement = document.querySelector(`main`);

renderElement(siteMainElement, createSiteMenuTemplate(filters), `afterbegin`);
renderElement(siteMainElement, createFilmSortingTemplate(), `beforeend`);
renderElement(siteMainElement, createFilmsSectionTemplate(), `beforeend`);

const siteFilmsSectionElement = siteMainElement.querySelector(`.films`);
renderElement(siteFilmsSectionElement, createFilmsListSectionTemplate(filmsAvailableForDisplay), `afterbegin`);

const siteFilmsListElement = siteFilmsSectionElement.querySelector(`.films-list`);
const siteFilmListContainerElement = siteFilmsSectionElement.querySelector(`.films-list__container`);

if (filmsAvailableForDisplay) {
  for (let i = 0; i < FILMS_INITIALLY_DISPLAYED_NUMBER; i++) {
    renderElement(siteFilmListContainerElement, createFilmCardTemplate(FILM_CARD_MOCK_DATA[i]), `beforeend`);
  }

  siteFilmsListElement.appendChild(createShowMoreButtonTemplate());

  const showMoreButton = siteFilmsListElement.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, onShowMoreButton);

  if (FILMS_EXTRA_MOCK) {
    if (newSortedByRatingArray[0].rating > 0) {
      renderElement(siteFilmsSectionElement, createExtraFilmsList(FILMS_EXTRA_LIST_NAMES[0], newSortedByRatingArray), `beforeend`);
    }

    if (newSortedByCommentCountArray[0].commentCount > 0) {
      renderElement(siteFilmsSectionElement, createExtraFilmsList(FILMS_EXTRA_LIST_NAMES[1], newSortedByCommentCountArray), `beforeend`);
    }
  }
}

// Rendering of the total movie count in the FOOTER element

const siteFooterElement = document.querySelector(`footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

renderElement(siteFooterStatisticsElement, createTotalMovieCountTemplate(FILM_CARD_MOCK_DATA.length), `afterbegin`);

// Rendering of the popup element

renderElement(siteFooterElement, createFilmDetailsPopupTemplate(FILM_CARD_MOCK_DATA[0]), `afterend`);
