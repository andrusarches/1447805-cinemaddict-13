import FilmSorting from "../view/film-sorting.js";
import FilmsSection from "../view/films-section.js";
import FilmsListSection from "../view/films-list-section.js";
import ShowMoreButton from "../view/show-more-button.js";
import ExtraFilmsList from "../view/films-list-extra.js";
import FilmCardPresenter from "./filmcard.js";
import {render, RENDER_POSITION, remove} from "../utils/render.js";
import {FILMS_INITIALLY_DISPLAYED_NUMBER, FILM_DISPLAY_COUNT_INCREASE} from "../const.js";
import {sortIntoNewArray} from "../mock/filter.js";
import {updateItem} from "../utils/common.js";

const filmCountPerStep = FILM_DISPLAY_COUNT_INCREASE;

export default class FilmsBoardPresenter {
  constructor(boardContainer, moviesPresentBoolean, filmsExtraListsBoolean) {
    this._boardContainer = boardContainer;
    this._moviesPresentBoolean = moviesPresentBoolean;
    this._filmsExtraListsBoolean = filmsExtraListsBoolean;
    this._renderedFilmCount = filmCountPerStep;
    this._filmCardPresenter = {
      mainList: {},
      topRatedList: {},
      mostCommentedList: {}
    };

    this._filmSorting = new FilmSorting();
    this._filmsSection = new FilmsSection();
    this._filmsListSection = new FilmsListSection(this._moviesPresentBoolean);
    this._showMoreButton = new ShowMoreButton();
    this._extraFilmsList = new ExtraFilmsList();
    this._filmListContainerElement = this._filmsListSection.getElement().querySelector(`.films-list__container`);

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(boardFilms, commentsDataArray) {
    this._boardFilms = boardFilms.slice();
    this._commentsDataArray = commentsDataArray;

    this._renderSort();
    this._renderFilmsSection();
    this._renderFilmsBoard();
    this._renderExtraFilmsBoards();
  }

  _renderSort() {
    render(this._boardContainer, this._filmSorting, RENDER_POSITION.BEFOREEND);
  }

  _renderFilmsSection() {
    render(this._boardContainer, this._filmsSection, RENDER_POSITION.BEFOREEND);
  }

  _renderFilmsBoard() {
    render(this._filmsSection, this._filmsListSection, RENDER_POSITION.BEFOREEND);

    if (this._moviesPresentBoolean && this._boardFilms.length > 0) {
      this._renderFilmCards(this._filmCardPresenter.mainList, this._boardFilms, this._filmListContainerElement, 0, Math.min(this._boardFilms.length, FILMS_INITIALLY_DISPLAYED_NUMBER));

      if (this._boardFilms.length > filmCountPerStep) {
        this._renderShowMoreButton();
      }
    }
  }

  _renderFilmCard(filmPresenterList, parentElement, filmDataArrayElement) {
    const filmCard = new FilmCardPresenter(parentElement, this._handleFilmCardChange);
    filmCard.init(filmDataArrayElement, this._commentsDataArray);
    filmPresenterList[filmDataArrayElement.id] = filmCard;
  }

  _handleModeChange() {
    Object
      .values(this._filmCardPresenter.mainList)
      .forEach((presenter) => presenter.resetView());

    Object
      .values(this._filmCardPresenter.mostCommentedList)
      .forEach((presenter) => presenter.resetView());

    Object
      .values(this._filmCardPresenter.topRatedList)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._updateFilmCard(updatedFilm);
  }

  _updateFilmCard(updatedFilm) {
    if (this._filmCardPresenter.mainList[updatedFilm.id]) {
      this._filmCardPresenter.mainList[updatedFilm.id].init(updatedFilm, this._commentsDataArray);
    }

    if (this._filmCardPresenter.topRatedList[updatedFilm.id]) {
      this._filmCardPresenter.topRatedList[updatedFilm.id].init(updatedFilm, this._commentsDataArray);
    }

    if (this._filmCardPresenter.mostCommentedList[updatedFilm.id]) {
      this._filmCardPresenter.mostCommentedList[updatedFilm.id].init(updatedFilm, this._commentsDataArray);
    }
  }

  _clearMainFilmList() {
    Object
      .values(this._filmCardPresenter.mainList)
      .forEach((filmCard) => filmCard.destroy());
    this._filmCardPresenter.mainList = {};
    this._renderedFilmCount = filmCountPerStep;
    this._removeShowMoreButton();
  }

  _clearMostCommentedList() {
    Object
      .values(this._filmCardPresenter.mostCommentedList)
      .forEach((filmCard) => filmCard.destroy());
    this._filmCardPresenter.mostCommentedList = {};
    this._renderedFilmCount = filmCountPerStep;
    this._removeShowMoreButton();
  }

  _clearTopRatedList() {
    Object
      .values(this._filmCardPresenter.topRatedList)
      .forEach((filmCard) => filmCard.destroy());
    this._filmCardPresenter.topRatedList = {};
    this._renderedFilmCount = filmCountPerStep;
    this._removeShowMoreButton();
  }

  _renderFilmCards(filmPresenterList, dataArray, parentElement, from, to) {
    dataArray
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(filmPresenterList, parentElement, film));
  }

  _renderShowMoreButton() {
    if (this._moviesPresentBoolean && this._boardFilms.length > FILMS_INITIALLY_DISPLAYED_NUMBER) {
      render(this._filmsListSection, this._showMoreButton, RENDER_POSITION.BEFOREEND);

      this._showMoreButton.setClickHandler(this._handleLoadMoreButtonClick);
    }
  }

  _removeShowMoreButton() {
    remove(this._showMoreButton);
  }

  _handleLoadMoreButtonClick() {
    let displayCountIncrease = filmCountPerStep;
    let newDisplayCount = this._renderedFilmCount + displayCountIncrease;

    if (this._boardFilms.length <= newDisplayCount) {
      newDisplayCount = this._renderedFilmCount + (this._boardFilms.length - this._renderedFilmCount);

      this._removeShowMoreButton();
    }

    this._renderFilmCards(this._filmCardPresenter.mainList, this._boardFilms, this._filmListContainerElement, this._renderedFilmCount, newDisplayCount);
    this._renderedFilmCount = newDisplayCount;
  }

  _renderExtraFilmsBoards() {
    if (this._filmsExtraListsBoolean && this._moviesPresentBoolean && this._boardFilms.length > 0) {
      const extraListMaxCardNumber = 2;
      const filmsExtraListsNames = [`Top rated`, `Most commented`];
      const newSortedByRatingArray = sortIntoNewArray(this._boardFilms, `rating`).slice(0, extraListMaxCardNumber);
      const newSortedByCommentCountArray = sortIntoNewArray(this._boardFilms, `commentCount`).slice(0, extraListMaxCardNumber);

      if (newSortedByRatingArray[0].rating > 0) {
        const topRatedFilmsList = new ExtraFilmsList(filmsExtraListsNames[0]);

        render(this._filmsSection, topRatedFilmsList, RENDER_POSITION.BEFOREEND);

        const topRatedFilmsContainer = topRatedFilmsList.getElement().querySelector(`.films-list__container`);

        this._renderFilmCards(this._filmCardPresenter.topRatedList, newSortedByRatingArray, topRatedFilmsContainer, 0, extraListMaxCardNumber);
      }

      if (newSortedByCommentCountArray[0].commentCount > 0) {
        const mostCommentedFilmsList = new ExtraFilmsList(filmsExtraListsNames[1]);

        render(this._filmsSection, mostCommentedFilmsList, RENDER_POSITION.BEFOREEND);

        const mostCommentedFilmsContainer = mostCommentedFilmsList.getElement().querySelector(`.films-list__container`);

        this._renderFilmCards(this._filmCardPresenter.mostCommentedList, newSortedByCommentCountArray, mostCommentedFilmsContainer, 0, extraListMaxCardNumber);
      }
    }
  }
}
