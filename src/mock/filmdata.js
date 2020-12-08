import {nanoid} from "nanoid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {getRandomInteger, getRandomIntegerWDecimal, getConvertedTime} from "../util.js";
import {
  FILM_POSTERS,
  FILM_DESCRIPTION,
  FILM_GENRES_MAP,
  FILM_TITLES,
  FILM_ORIGINAL_TITLES,
  CONTENT_RATING_OPTIONS,
  COUNTRIES,
  MOCK_DIRECTORS_MAP,
  MOCK_ACTORS_MAP,
  MOCK_WRITERS_MAP,
  MOCK_RANDOM_COMMENT_AUTHORS_ARRAY,
  MOCK_RANDOM_COMMENTS_ARRAY,
  MAX_GENRES_PER_FILM,
  FILM_RELEASE_DATE_FORMAT,
  COMMENT_PUBLICATION_TIME_FORMAT
} from "../const.js";

dayjs.extend(utc);

const MOCK_FILM_COUNT = 27;
const INITIAL_COMMENT_COUNT = 0;

const getRandomFilmTitle = () => {
  const randomIndex = getRandomInteger(0, FILM_TITLES.length - 1);

  return FILM_TITLES[randomIndex];
};

const getRandomPosterSrc = () => {
  const randomIndex = getRandomInteger(0, FILM_POSTERS.length - 1);

  return FILM_POSTERS[randomIndex];
};

const generateRandomDescription = () => {
  const getRandomDescriptionLength = () => {
    const descriptionLengthOptions = [56, 114, 159, 201, 269];

    const randomIndex = getRandomInteger(0, descriptionLengthOptions.length - 1);

    const newDescriptionLength = descriptionLengthOptions[randomIndex];

    return newDescriptionLength;
  };

  const newDescription = FILM_DESCRIPTION.slice(0, getRandomDescriptionLength());

  return newDescription;
};

const getRandomReleaseDate = () => {
  const MIN_DATE = new Date(1929, 0, 1);
  const MAX_DATE = new Date(2010, 0, 1);
  const newRandomDate = new Date(MIN_DATE.getTime() + Math.random() * (MAX_DATE.getTime() - MIN_DATE.getTime()));

  const newReleaseDate = dayjs(newRandomDate).format(FILM_RELEASE_DATE_FORMAT);

  return newReleaseDate;
};

const getRandomContentRating = () => {
  const newRandomInteger = getRandomInteger(0, CONTENT_RATING_OPTIONS.length - 1);
  const newContentRating = CONTENT_RATING_OPTIONS[newRandomInteger];

  return newContentRating;
};

const getRandomDuration = () => {
  const MIN_DURATION_IN_MIN = 29;
  const MAX_DURATION_IN_MIN = 160;

  const newDuration = getRandomInteger(MIN_DURATION_IN_MIN, MAX_DURATION_IN_MIN);

  return newDuration;
};

const getRandomRating = () => {
  const LOWEST_RATING = 1;
  const HIGHTEST_RATING = 10;
  const newRating = getRandomIntegerWDecimal(LOWEST_RATING, HIGHTEST_RATING);

  return newRating;
};

const getRandomOriginalTitle = () => {
  const newRandomInteger = getRandomInteger(0, FILM_ORIGINAL_TITLES.length - 1);
  const newOriginalTitle = FILM_ORIGINAL_TITLES[newRandomInteger];

  return newOriginalTitle;
};

const getFilmId = () => {
  const newFilmId = nanoid();

  return newFilmId;
};

const getRandomCountry = () => {
  const newRandomInteger = getRandomInteger(0, COUNTRIES.length - 1);
  const newCountry = COUNTRIES[newRandomInteger];

  return newCountry;
};

const getRandomDirector = () => {
  const newRandomDirectorNumber = getRandomInteger(1, MOCK_DIRECTORS_MAP.size);

  return newRandomDirectorNumber;
};

const getRandomGenres = () => {
  const newGenresNumber = getRandomInteger(1, MAX_GENRES_PER_FILM);
  const newGenresSet = new Set();

  for (let i = 0; i < newGenresNumber; i++) {
    newGenresSet.add(getRandomInteger(1, FILM_GENRES_MAP.size));
  }

  const newGenresArray = Array.from(newGenresSet);

  return newGenresArray;
};

const getRandomActorsString = () => {
  const newActorsNumber = getRandomInteger(1, MOCK_ACTORS_MAP.size);
  const newActorsSet = new Set();

  for (let i = 0; i < newActorsNumber; i++) {
    newActorsSet.add(getRandomInteger(1, MOCK_ACTORS_MAP.size));
  }

  const newActorsArray = Array.from(newActorsSet);

  return newActorsArray;
};

const getRandomWriters = () => {
  const newWritersNumber = getRandomInteger(1, MOCK_WRITERS_MAP.size);
  const newWritersSet = new Set();

  for (let i = 0; i < newWritersNumber; i++) {
    newWritersSet.add(getRandomInteger(1, MOCK_WRITERS_MAP.size));
  }

  const newWritersArray = Array.from(newWritersSet);

  return newWritersArray;
};

const generateFilmData = () => {
  const id = getFilmId();
  const title = getRandomFilmTitle();
  const rating = getRandomRating();
  const releaseDate = getRandomReleaseDate();
  const duration = getConvertedTime(getRandomDuration());
  const genres = getRandomGenres();
  const imgSrc = getRandomPosterSrc();
  const description = generateRandomDescription();
  const commentCount = INITIAL_COMMENT_COUNT;
  const contentRating = getRandomContentRating();
  const originalTitle = getRandomOriginalTitle();
  const country = getRandomCountry();
  const director = getRandomDirector();
  const writers = getRandomWriters();
  const actors = getRandomActorsString();
  const isFavorite = Boolean(getRandomInteger(0, 1));
  const isWatched = Boolean(getRandomInteger(0, 1));
  const isWatchlist = Boolean(getRandomInteger(0, 1));

  return {
    id,
    title,
    originalTitle,
    rating,
    country,
    director,
    writers,
    actors,
    releaseDate,
    duration,
    genres,
    imgSrc,
    description,
    commentCount,
    contentRating,
    isFavorite,
    isWatched,
    isWatchlist
  };
};

const getRandomReaction = () => {
  const newRandomReaction = getRandomInteger(1, 4);

  return newRandomReaction;
};

const getRandomAuthor = () => {
  const newRandomInteger = getRandomInteger(0, MOCK_RANDOM_COMMENT_AUTHORS_ARRAY.length - 1);
  const newRandomAuthor = MOCK_RANDOM_COMMENT_AUTHORS_ARRAY[newRandomInteger];

  return newRandomAuthor;
};

const getRandomCommentText = () => {
  const newRandomInteger = getRandomInteger(0, MOCK_RANDOM_COMMENTS_ARRAY.length - 1);
  const newRandomCommentText = MOCK_RANDOM_COMMENTS_ARRAY[newRandomInteger];

  return newRandomCommentText;
};

const getRandomCommentTime = () => {
  const MIN_TIME = new Date(2012, 0, 1);
  const MAX_TIME = new Date();
  const newTime = new Date(MIN_TIME.getTime() + Math.random() * (MAX_TIME.getTime() - MIN_TIME.getTime()));

  const newCommentTime = dayjs(newTime).utc().format(COMMENT_PUBLICATION_TIME_FORMAT);

  return newCommentTime;
};

const generateRandomComment = () => {
  const author = getRandomAuthor();
  const reaction = getRandomReaction();
  const text = getRandomCommentText();
  const time = getRandomCommentTime();

  return {
    author,
    reaction,
    text,
    time
  };
};

const generateFilmComments = (filmData) => {
  const newRandomCommentNumber = getRandomInteger(0, 10);

  const newComments = new Array(newRandomCommentNumber).fill().map(generateRandomComment);

  newComments.sort((a, b) => {
    const firstElementPublicationTime = new Date(a.time);
    const secondElementPublicationTime = new Date(b.time);

    if (firstElementPublicationTime - secondElementPublicationTime === 0) {
      return a.author - b.author;
    }

    return firstElementPublicationTime - secondElementPublicationTime;
  });

  return {
    id: filmData.id,
    comments: newComments
  };
};

export const COMMENTS_MOCK_DATA = new Array(MOCK_FILM_COUNT).fill();

export const FILM_CARD_MOCK_DATA = new Array(MOCK_FILM_COUNT).fill().map(generateFilmData);

COMMENTS_MOCK_DATA.forEach((item, index) => {
  const newFilmsComments = generateFilmComments(FILM_CARD_MOCK_DATA[index]);

  COMMENTS_MOCK_DATA[index] = newFilmsComments;
});

FILM_CARD_MOCK_DATA.forEach((item, index) => {
  FILM_CARD_MOCK_DATA[index].commentCount = COMMENTS_MOCK_DATA[index].comments.length;
});


window.data = {
  FILM_CARD_MOCK_DATA
};
