import AbstractElement from "../view/abstract.js";
import FilmCard from "../view/film-card.js";
import FilmDetailsPopup from "../view/film-details-popup.js";
import PopupCommentElement from "../view/popup-comment.js";
import {render, RENDER_POSITION, remove, replace} from "../utils/render.js";
import {KEYCODE_ESC} from "../const.js";

const HIDE_OVERFLOW_CLASS = `hide-overflow`;

export default class FilmCardPresenter {
  constructor(container, changeData) {
    this._parentContainer = container;
    this._changeData = changeData;

    this._filmCard = null;
    this._filmDetailsPopup = null;
    this._filmComments = null;

    this._filmCardClickHandler = this._filmCardClickHandler.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this._onEscKeyDownPopup = this._onEscKeyDownPopup.bind(this);
    this._popupCloseButtonHandler = this._popupCloseButtonHandler.bind(this);
  }

  init(filmData, commentsDataArray) {
    this._filmData = filmData;
    this._bodyElement = document.querySelector(`body`);
    this._filmCommentsObject = commentsDataArray.find((element) => element.id === this._filmData.id);
    this._filmComments = [];

    const prevFilmCard = this._filmCard;

    this._filmCard = new FilmCard(filmData);

    this._filmCard.setClickHandler(this._filmCardClickHandler);
    this._filmCard.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCard.setWatchlistClickHandler(this._handleWatchlistClick);

    if (prevFilmCard === null) {
      render(this._parentContainer, this._filmCard, RENDER_POSITION.BEFOREEND);
      return;
    }

    if (this._parentContainer.contains(prevFilmCard.getElement())) {
      replace(this._filmCard, prevFilmCard);
    }

    remove(prevFilmCard);
  }

  _destroy() {
    remove(this._filmCard);

    if (this._filmDetailsPopup !== null) {
      remove(this._filmDetailsPopup);
    }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              isFavorite: !this._filmData.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              isWatched: !this._filmData.isWatched
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              isWatchlist: !this._filmData.isWatchlist
            }
        )
    );
  }

  _filmCardClickHandler() {
    this._renderPopupElement();
  }

  _renderPopupElement() {
    const prevFilmDetailsPopup = this._filmDetailsPopup;

    this._filmDetailsPopup = new FilmDetailsPopup(this._filmData);

    this._renderFilmComments();

    this._filmDetailsPopup.setClickHandler(this._popupCloseButtonHandler);
    this._filmDetailsPopup.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsPopup.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsPopup.setWatchlistClickHandler(this._handleWatchlistClick);
    document.addEventListener(`keydown`, this._onEscKeyDownPopup);

    if (!this._bodyElement.classList.contains(HIDE_OVERFLOW_CLASS)) {
      this._bodyElement.classList.add(HIDE_OVERFLOW_CLASS);
    }

    if (prevFilmDetailsPopup === null || !this._bodyElement.contains(prevFilmDetailsPopup.getElement())) {
      render(this._bodyElement, this._filmDetailsPopup, RENDER_POSITION.BEFOREEND);
      return;
    }

    if (this._bodyElement.contains(prevFilmDetailsPopup.getElement())) {
      replace(this._filmDetailsPopup, prevFilmDetailsPopup);
    }

    remove(prevFilmDetailsPopup);
  }

  _renderFilmComments() {
    const filmDetailsPopupCommentsListElement = this._filmDetailsPopup.getElement().querySelector(`.film-details__comments-list`);

    if (this._filmCommentsObject.comments.length > 0) {
      for (let i = 0; i < this._filmCommentsObject.comments.length; i++) {
        const popupComment = new PopupCommentElement(this._filmCommentsObject.comments[i]);
        this._filmComments.push(popupComment);
        render(filmDetailsPopupCommentsListElement, popupComment, RENDER_POSITION.BEFOREEND);
      }
    }
  }

  _removeFilmDetailsPopup() {
    document.removeEventListener(`keydown`, this._onEscKeyDownPopup);
    this._bodyElement.removeChild(this._filmDetailsPopup.getElement());

    if (this._filmCommentsObject.comments.length > 0) {
      for (let i = 0; i < this._filmComments.length; i++) {
        if (this._filmComments[i] instanceof AbstractElement) {
          remove(this._filmComments[i]);
        }
      }
      this._filmComments = [];
    }

    this._bodyElement.classList.remove(HIDE_OVERFLOW_CLASS);
    this._filmDetailsPopup.removeElement();
  }

  _popupCloseButtonHandler() {
    this._removeFilmDetailsPopup();
  }

  _onEscKeyDownPopup(evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      this._removeFilmDetailsPopup();
    }
  }
}
