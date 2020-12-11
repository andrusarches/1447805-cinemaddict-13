import AbstractElement from "./view/abstract.js";
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
import PopupCommentElement from "./view/popup-comment.js";
import {FILM_CARD_MOCK_DATA, COMMENTS_MOCK_DATA} from "./mock/filmdata.js";
import {FILMS_INITIALLY_DISPLAYED_NUMBER} from "./const.js";
import {render, RENDER_POSITION} from "./utils/render.js";
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
render(headerElement, userRankElement, RENDER_POSITION.BEFOREEND);

// Rendering elements within the MAIN section.

const mainElement = bodyElement.querySelector(`main`);

const mainNavigationElement = new MainNavigation(filters);
const filmSortingElement = new FilmSorting();
const filmsSectionElement = new FilmsSection();

render(mainElement, mainNavigationElement, RENDER_POSITION.BEFOREEND);
render(mainElement, filmSortingElement, RENDER_POSITION.BEFOREEND);
render(mainElement, filmsSectionElement, RENDER_POSITION.BEFOREEND);

const filmsListSectionElement = new FilmsListSection(filmsAvailableForDisplay);

render(filmsSectionElement, filmsListSectionElement, RENDER_POSITION.AFTERBEGIN);

const filmsListElement = filmsSectionElement.getElement().querySelector(`.films-list`);
const filmListContainerElement = filmsListElement.querySelector(`.films-list__container`);

if (filmsAvailableForDisplay) {
  const footerElement = bodyElement.querySelector(`footer`);

  const renderFilmCard = (parentElement, filmDataArrayElement) => {
    const filmCard = new FilmCard(filmDataArrayElement);

    render(parentElement, filmCard, RENDER_POSITION.BEFOREEND);

    // Rendering of the FILM DETAILS POPUP element

    filmCard.setClickHandler(() => {
      bodyElement.classList.add(`hide-overflow`);

      const filmDetailsPopup = new FilmDetailsPopup(filmDataArrayElement);

      bodyElement.appendChild(filmDetailsPopup.getElement());

      const filmId = filmDataArrayElement.id;
      const filmCommentsObject = COMMENTS_MOCK_DATA.find((element) => element.id === filmId);
      const filmDetailsPopupCommentsListElement = filmDetailsPopup.getElement().querySelector(`.film-details__comments-list`);

      let commentsForDeletion = [];

      if (filmCommentsObject.comments.length > 0) {
        for (let i = 0; i < filmCommentsObject.comments.length; i++) {
          const popupComment = new PopupCommentElement(filmCommentsObject.comments[i]);
          commentsForDeletion.push(popupComment);
          render(filmDetailsPopupCommentsListElement, popupComment, RENDER_POSITION.BEFOREEND);
        }
      }

      const removeFilmDetailsPopup = () => {
        filmDetailsPopup.removeEventListener();
        document.addEventListener(`keydown`, onEscKeyDownPopup);
        bodyElement.removeChild(filmDetailsPopup.getElement());
        if (filmCommentsObject.comments.length > 0) {
          for (let i = 0; i < commentsForDeletion.length; i++) {
            if (commentsForDeletion[i] instanceof AbstractElement) {
              commentsForDeletion[i].getElement().remove();
              commentsForDeletion[i].removeElement();
            }
          }
          commentsForDeletion.length = 0;
        }

        bodyElement.classList.remove(`hide-overflow`);
        filmDetailsPopup.removeElement();
      };

      filmDetailsPopup.setClickHandler(() => {
        removeFilmDetailsPopup();
      });

      const onEscKeyDownPopup = (evt) => {
        if (evt.keyCode === 27) {
          removeFilmDetailsPopup();
        }
      };

      filmDetailsPopup.setClickHandler(() => {
        removeFilmDetailsPopup();
      });
      document.addEventListener(`keydown`, onEscKeyDownPopup);
    });
  };


  for (let i = 0; i < Math.min(FILM_CARD_MOCK_DATA.length, FILMS_INITIALLY_DISPLAYED_NUMBER); i++) {
    renderFilmCard(filmListContainerElement, FILM_CARD_MOCK_DATA[i]);
  }

  if (FILM_CARD_MOCK_DATA.length > FILMS_INITIALLY_DISPLAYED_NUMBER) {
    const FILM_COUNT_PER_STEP = 5;
    let oldDisplayCount = FILMS_INITIALLY_DISPLAYED_NUMBER;

    const showMoreButtonElement = new ShowMoreButton();

    render(filmsListElement, showMoreButtonElement, RENDER_POSITION.BEFOREEND);

    const removeShowMoreButtonElement = () => {
      showMoreButtonElement.removeEventListener();
      showMoreButtonElement.getElement().remove();
      showMoreButtonElement.removeElement();
    };

    showMoreButtonElement.setClickHandler(() => {
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
    });
  }

  // Rendering of the MOST COMMENTED and TOP RATED films

  if (FILMS_EXTRA_MOCK) {
    const EXTRA_LIST_MAX_CARD_NUMBER = 2;

    if (newSortedByRatingArray[0].rating > 0) {
      const topRatedFilmsList = new ExtraFilmsList(FILMS_EXTRA_LIST_NAMES[0]);

      render(filmsSectionElement, topRatedFilmsList, RENDER_POSITION.BEFOREEND);

      const topRatedFilmsContainer = topRatedFilmsList.getElement().querySelector(`.films-list__container`);

      for (let i = 0; i < EXTRA_LIST_MAX_CARD_NUMBER; i++) {
        renderFilmCard(topRatedFilmsContainer, newSortedByRatingArray[i]);
      }
    }

    if (newSortedByCommentCountArray[0].commentCount > 0) {
      const mostCommentedFilmsList = new ExtraFilmsList(FILMS_EXTRA_LIST_NAMES[1]);

      render(filmsSectionElement, mostCommentedFilmsList, RENDER_POSITION.BEFOREEND);

      const mostCommentedFilmsContainer = mostCommentedFilmsList.getElement().querySelector(`.films-list__container`);

      for (let i = 0; i < EXTRA_LIST_MAX_CARD_NUMBER; i++) {
        renderFilmCard(mostCommentedFilmsContainer, newSortedByCommentCountArray[i]);
      }
    }
  }

  // Rendering of the total movie count in the FOOTER element

  const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

  const totalMovieCountElement = new TotalMovieCount(FILM_CARD_MOCK_DATA.length);

  render(footerStatisticsElement, totalMovieCountElement, RENDER_POSITION.AFTERBEGIN);
}
