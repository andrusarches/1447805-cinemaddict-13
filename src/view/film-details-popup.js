import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";
import {FILM_GENRES_MAP, MOCK_DIRECTORS_MAP, MOCK_ACTORS_MAP, MOCK_WRITERS_MAP, COMMENT_REACTION, HUMANIZED_FILM_RELEASE_DATE_FORMAT} from "../const.js";
import {COMMENTS_MOCK_DATA} from "../mock/filmdata.js";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(updateLocale);
dayjs.updateLocale(`en`, {
  relativeTime: {
    future: `in %s`,
    past: `%s ago`,
    s: `a few seconds`,
    m: `1 minute`,
    mm: `a few minutes`,
    h: `1 hour`,
    hh: `%d hours`,
    d: `1 day`,
    dd: `%d days`,
    M: `1 month`,
    MM: `%d months`,
    y: `1 year`,
    yy: `%d years`
  }
});

export const createFilmDetailsPopupTemplate = (filmInfo) => {
  const {id, title, originalTitle, rating, country, director, writers, actors, releaseDate, duration, genres, imgSrc, description, commentCount, contentRating} = filmInfo;

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

  const humanizeCommentTime = (item) => {
    return dayjs(item).utc().local().fromNow();
  };

  const generateCommentHTML = (commentData) => {
    const {author, reaction, text, time} = commentData;

    const resolvedReaction = COMMENT_REACTION.get(reaction);
    const commentTime = humanizeCommentTime(time);

    return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${resolvedReaction}.png" width="55" height="55" alt="emoji-${resolvedReaction}">
              </span>
              <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${commentTime}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
  };

  const renderComments = (filmDataId) => {
    const filmId = filmDataId;

    const filmComments = COMMENTS_MOCK_DATA.find((element) => element.id === filmId);

    if (filmComments.comments.length === 0) {
      return ``;
    }

    let newFilmCommentsHTMLString = ``;

    for (let i = 0; i < filmComments.comments.length; i++) {
      newFilmCommentsHTMLString += generateCommentHTML(filmComments.comments[i]);
    }

    return newFilmCommentsHTMLString;
  };

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

                  <ul class="film-details__comments-list">${renderComments(id)}</ul>

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
