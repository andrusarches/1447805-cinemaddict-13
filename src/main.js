import UserRank from "./view/user-rank.js";
import MainNavigation from "./view/main-navigation.js";
import TotalMovieCount from "./view/total-movie-count.js";
import {FILM_CARD_MOCK_DATA, COMMENTS_MOCK_DATA} from "./mock/filmdata.js";
import {render, RENDER_POSITION} from "./utils/render.js";
import {generateFilter} from "./mock/filter.js";
import FilmsBoardPresenter from "./presenter/filmsboard.js";

// Variables

let filmsAvailableForDisplay = false;
const FILMS_EXTRA_MOCK_BOOLEAN = true;

if (FILM_CARD_MOCK_DATA.length > 0) {
  filmsAvailableForDisplay = true;
}

const filters = generateFilter(FILM_CARD_MOCK_DATA);

// Rendering of the user rank element within the HEADER element.

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`header`);

const userRankElement = new UserRank();
render(headerElement, userRankElement, RENDER_POSITION.BEFOREEND);

// Rendering elements within the MAIN section.

const mainElement = bodyElement.querySelector(`main`);

const mainNavigationElement = new MainNavigation(filters);
render(mainElement, mainNavigationElement, RENDER_POSITION.BEFOREEND);

// FILMS BOARD PRESENTER

const filmsBoard = new FilmsBoardPresenter(mainElement, filmsAvailableForDisplay, FILMS_EXTRA_MOCK_BOOLEAN);

filmsBoard.init(FILM_CARD_MOCK_DATA, COMMENTS_MOCK_DATA);

// Rendering of the total movie count in the FOOTER element

if (filmsAvailableForDisplay) {
  const footerElement = bodyElement.querySelector(`footer`);
  const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
  const totalMovieCountElement = new TotalMovieCount(FILM_CARD_MOCK_DATA.length);

  render(footerStatisticsElement, totalMovieCountElement, RENDER_POSITION.AFTERBEGIN);
}
