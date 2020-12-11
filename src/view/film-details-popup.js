import dayjs from "dayjs";
import {FILM_GENRES_MAP, MOCK_DIRECTORS_MAP, MOCK_ACTORS_MAP, MOCK_WRITERS_MAP, HUMANIZED_FILM_RELEASE_DATE_FORMAT} from "../const.js";
import AbstractElement from "./abstract.js";

const createFilmDetailsPopupTemplate = (filmInfo) => {
  const {title, originalTitle, rating, country, director, writers, actors, releaseDate, duration, genres, imgSrc, description, commentCount, contentRating} = filmInfo;

  const getGenreHTML = (item) => {
    return `<span class="film-details__genre">${item}</span>`;
  };

  const resolveGenres = () => {
    let newGenresHTML = ``;

    for (let i = 0; i < genres.length; i++) {
      newGenresHTML += getGenreHTML(FILM_GENRES_MAP.get(genres[i]));
    }

    return newGenresHTML;
  };

  const humanizedReleaseDate = dayjs(releaseDate).format(HUMANIZED_FILM_RELEASE_DATE_FORMAT);

  const arrayToStringWMap = (array, map) => {
    const newArray = [];

    const reducerToNewArray = (accumulator, currentValue) => {
      newArray.push(map.get(currentValue));
    };

    array.reduce(reducerToNewArray, 0);

    return newArray.join(`, `);
  };

  const getDirectorsName = () => {
    const newDirector = MOCK_DIRECTORS_MAP.get(director);

    return newDirector;
  };

  return `<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              <div class="film-details__top-container">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src="${imgSrc}" alt="${title} - poster">

                    <p class="film-details__age">${contentRating}+</p>
                  </div>

                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${title}</h3>
                        <p class="film-details__title-original">Original: ${originalTitle}</p>
                      </div>

                      <div class="film-details__rating">
                        <p class="film-details__total-rating">${rating}</p>
                      </div>
                    </div>

                    <table class="film-details__table">
                      <tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${getDirectorsName()}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                        <td class="film-details__cell">${arrayToStringWMap(writers, MOCK_WRITERS_MAP)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                        <td class="film-details__cell">${arrayToStringWMap(actors, MOCK_ACTORS_MAP)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${humanizedReleaseDate}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Runtime</td>
                        <td class="film-details__cell">${duration}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${country}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                        <td class="film-details__cell">${resolveGenres()}</td>
                      </tr>
                    </table>

                    <p class="film-details__film-description">
                      ${description}
                    </p>
                  </div>
                </div>

                <section class="film-details__controls">
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
                  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
                  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                </section>
              </div>

              <div class="film-details__bottom-container">
                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

                  <ul class="film-details__comments-list"></ul>

                  <div class="film-details__new-comment">
                    <div class="film-details__add-emoji-label"></div>

                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>

                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                      <label class="film-details__emoji-label" for="emoji-puke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>

                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </section>`;
};

export default class FilmDetailsPopup extends AbstractElement {
  constructor(filmData) {
    super();

    this._filmData = filmData;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._filmData);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  removeEventListener() {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._clickHandler);
  }
}
