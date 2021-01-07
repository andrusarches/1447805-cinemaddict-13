import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";
import AbstractElement from "./abstract.js";
import {COMMENT_REACTION} from "../const.js";

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

const humanizeCommentTime = (item) => {
  return dayjs(item).utc().local().fromNow();
};

const generateCommentTemplate = (commentData) => {
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

export default class PopupCommentElement extends AbstractElement {
  constructor(commentData) {
    super();

    this._commentData = commentData;
  }

  getTemplate() {
    return generateCommentTemplate(this._commentData);
  }
}
