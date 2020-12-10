import UserRank from "./view/user-rank.js";
import MainNavigation from "./view/main-navigation.js";
import FilmSorting from "./view/film-sorting.js";
import FilmsSection from "./view/films-section.js";
import FilmsListSection from "./view/films-list-section.js";
import ShowMoreButton from "./view/show-more-button.js";
import FilmCard from "./view/film-card.js";
import ExtraFilmsList from "./view/films-list-extra.js";
import TotalMovieCount from "./view/total-movie-count.js";
import FilmDetailsPopup from "./view/film-details-popup.js";
import {FILM_CARD_MOCK_DATA} from "./mock/filmdata.js";
import {FILMS_INITIALLY_DISPLAYED_NUMBER} from "./const.js";
import {render, RENDER_POSITION} from "./util.js";
import {generateFilter, sortIntoNewArray} from "./mock/filter.js";

// Variables

let filmsAvailableForDisplay = false;
const FILMS_EXTRA_MOCK = true;
const FILMS_EXTRA_LIST_NAMES = [`Top rated`, `Most commented`];

if (FILM_CARD_MOCK_DATA.length > 0) {
  filmsAvailableForDisplay = true;
}

const newSortedByRatingArray = sortIntoNewArray(FILM_CARD_MOCK_DATA, `rating`);
const newSortedByCommentCountArray = sortIntoNewArray(FILM_CARD_MOCK_DATA, `commentCount`);
const filters = generateFilter(FILM_CARD_MOCK_DATA);

// Rendering of the user rank element within the HEADER element.

const bodyElement = document.querySelector(`body`);
const headerElement = bodyElement.querySelector(`header`);

const userRankElement = new UserRank();
render(headerElement, userRankElement.getElement(), RENDER_POSITION.BEFOREEND);

// Rendering elements within the MAIN section.

const mainElement = bodyElement.querySelector(`main`);

const mainNavigationElement = new MainNavigation(filters);
const filmSortingElement = new FilmSorting();
const filmsSectionElement = new FilmsSection();

render(mainElement, mainNavigationElement.getElement(), RENDER_POSITION.BEFOREEND);
render(mainElement, filmSortingElement.getElement(), RENDER_POSITION.BEFOREEND);
render(mainElement, filmsSectionElement.getElement(), RENDER_POSITION.BEFOREEND);

const filmsListSectionElement = new FilmsListSection(filmsAvailableForDisplay);

render(filmsSectionElement.getElement(), filmsListSectionElement.getElement(), RENDER_POSITION.AFTERBEGIN);

const filmsListElement = filmsSectionElement.getElement().querySelector(`.films-list`);
const filmListContainerElement = filmsListElement.querySelector(`.films-list__container`);

if (filmsAvailableForDisplay) {
  const footerElement = bodyElement.querySelector(`footer`);

  const renderFilmCard = (parentElement, filmDataArrayElement) => {
    const filmCard = new FilmCard(filmDataArrayElement);

    render(parentElement, filmCard.getElement(), RENDER_POSITION.BEFOREEND);

    const filmCardPoster = filmCard.getElement().querySelector(`.film-card__poster`);
    const filmCardTitle = filmCard.getElement().querySelector(`.film-card__title`);
    const filmCardCommentCount = filmCard.getElement().querySelector(`.film-card__comments`);

    // Rendering of the FILM DETAILS POPUP element

    const onClickRenderFilmDetailsPopup = (evt) => {
      evt.preventDefault();

      bodyElement.classList.add(`hide-overflow`);

      const filmDetailsPopup = new FilmDetailsPopup(filmDataArrayElement);

      bodyElement.appendChild(filmDetailsPopup.getElement());

      const filmDetailsPopupCloseButton = filmDetailsPopup.getElement().querySelector(`.film-details__close-btn`);

      const removeFilmDetailsPopup = () => {
        filmDetailsPopupCloseButton.removeEventListener(`click`, onFilmDetailsPopupCloseButton);
        document.removeEventListener(`keydown`, onEscKeyDown);
        bodyElement.removeChild(filmDetailsPopup.getElement());
        bodyElement.classList.remove(`hide-overflow`);
        filmDetailsPopup.removeElement();
      };

      const onFilmDetailsPopupCloseButton = (evtClick) => {
        evtClick.preventDefault();

        removeFilmDetailsPopup();
      };

      const onEscKeyDown = (evtKeyDown) => {
        if (evtKeyDown.keyCode === 27) {
          evtKeyDown.preventDefault();

          removeFilmDetailsPopup();
        }
      };

      filmDetailsPopupCloseButton.addEventListener(`click`, onFilmDetailsPopupCloseButton);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    filmCardPoster.addEventListener(`click`, onClickRenderFilmDetailsPopup);
    filmCardTitle.addEventListener(`click`, onClickRenderFilmDetailsPopup);
    filmCardCommentCount.addEventListener(`click`, onClickRenderFilmDetailsPopup);
  };


  for (let i = 0; i < Math.min(FILM_CARD_MOCK_DATA.length, FILMS_INITIALLY_DISPLAYED_NUMBER); i++) {
    renderFilmCard(filmListContainerElement, FILM_CARD_MOCK_DATA[i]);
  }

  if (FILM_CARD_MOCK_DATA.length > FILMS_INITIALLY_DISPLAYED_NUMBER) {
    const FILM_COUNT_PER_STEP = 5;
    let oldDisplayCount = FILMS_INITIALLY_DISPLAYED_NUMBER;

    const showMoreButtonElement = new ShowMoreButton();

    render(filmsListElement, showMoreButtonElement.getElement(), RENDER_POSITION.BEFOREEND);

    const removeShowMoreButtonElement = () => {
      showMoreButtonElement.getElement().removeEventListener(`click`, onShowMoreButton);
      showMoreButtonElement.getElement().remove();
      showMoreButtonElement.removeElement();
    };

    const onShowMoreButton = (evt) => {
      evt.preventDefault();

      let displayCountIncrease = FILM_COUNT_PER_STEP;

      let newDisplayCount = oldDisplayCount + displayCountIncrease;

      if (FILM_CARD_MOCK_DATA.length <= newDisplayCount) {
        newDisplayCount = oldDisplayCount + (FILM_CARD_MOCK_DATA.length - oldDisplayCount);

        for (let i = oldDisplayCount; i < newDisplayCount; i++) {
          renderFilmCard(filmListContainerElement, FILM_CARD_MOCK_DATA[i]);
          oldDisplayCount++;
        }

        removeShowMoreButtonElement();
      } else {
        for (let i = oldDisplayCount; i < newDisplayCount; i++) {
          renderFilmCard(filmListContainerElement, FILM_CARD_MOCK_DATA[i]);
          oldDisplayCount++;
        }
      }
    };

    showMoreButtonElement.getElement().addEventListener(`click`, onShowMoreButton);
  }

  // Rendering of the MOST COMMENTED and TOP RATED films

  if (FILMS_EXTRA_MOCK) {
    const EXTRA_LIST_MAX_CARD_NUMBER = 2;

    if (newSortedByRatingArray[0].rating > 0) {
      const topRatedFilmsList = new ExtraFilmsList(FILMS_EXTRA_LIST_NAMES[0]);

      render(filmsSectionElement.getElement(), topRatedFilmsList.getElement(), RENDER_POSITION.BEFOREEND);

      const topRatedFilmsContainer = topRatedFilmsList.getElement().querySelector(`.films-list__container`);

      for (let i = 0; i < EXTRA_LIST_MAX_CARD_NUMBER; i++) {
        renderFilmCard(topRatedFilmsContainer, newSortedByRatingArray[i]);
      }
    }

    if (newSortedByCommentCountArray[0].commentCount > 0) {
      const mostCommentedFilmsList = new ExtraFilmsList(FILMS_EXTRA_LIST_NAMES[1]);

      render(filmsSectionElement.getElement(), mostCommentedFilmsList.getElement(), RENDER_POSITION.BEFOREEND);

      const mostCommentedFilmsContainer = mostCommentedFilmsList.getElement().querySelector(`.films-list__container`);

      for (let i = 0; i < EXTRA_LIST_MAX_CARD_NUMBER; i++) {
        renderFilmCard(mostCommentedFilmsContainer, newSortedByCommentCountArray[i]);
      }
    }
  }

  // Rendering of the total movie count in the FOOTER element

  const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

  const totalMovieCountElement = new TotalMovieCount(FILM_CARD_MOCK_DATA.length);

  render(footerStatisticsElement, totalMovieCountElement.getElement(), RENDER_POSITION.AFTERBEGIN);
}
