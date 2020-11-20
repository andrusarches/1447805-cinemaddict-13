import {createUserRankTemplate} from "./view/user-rank.js";
import {createSiteMenuTemplate} from "./view/main-navigation.js";
import {createMovieSortingTemplate} from "./view/movie-sorting.js";
import {createFilmsSectionTemplate} from "./view/films-section.js";
import {createFilmsListSectionTemplate} from "./view/films-list-section.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createExtraFilmsList} from "./view/films-list-extra.js";
import {createTotalMovieCountTemplate} from "./view/total-movie-count.js";

// Variables

const MOVIES_PRESENT_MOCK = true;
const MOVIES_EXTRA_MOCK = true;
const MOVIES_EXTRA_LIST_NAMES = [`Top rated`, `Most commented`];
const MOVIES_EXTRA_CARD_LIMIT = 2;

const MOCK_TOTAL_MOVIE_COUNT = `130 291`;
const MOCK_FILM_COUNT = 5;
const FILM_CARD_MOCK_DATA = [
  {
    title: `The Great Flamarion`,
    rating: 8.9,
    year: 1945,
    duration: `1h 18m`,
    genre: `Mystery`,
    imgSrc: `./images/posters/the-great-flamarion.jpg`,
    description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…`,
    commentCount: 101
  },
  {
    title: `The Man with the Golden Arm`,
    rating: 9.0,
    year: 1955,
    duration: `1h 59m`,
    genre: `Drama`,
    imgSrc: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
    commentCount: 18
  },
  {
    title: `Made for Each Other`,
    rating: 5.8,
    year: 1939,
    duration: `1h 32m`,
    genre: `Comedy`,
    imgSrc: `./images/posters/made-for-each-other.png`,
    description: `John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…`,
    commentCount: 56
  },
  {
    title: `Sagebrush Trail`,
    rating: 3.2,
    year: 1933,
    duration: `54m`,
    genre: `Western`,
    imgSrc: `./images/posters/sagebrush-trail.jpg`,
    description: `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
    commentCount: 89
  },
  {
    title: `Santa Claus Conquers the Martians`,
    rating: 2.3,
    year: 1964,
    duration: `1h 21m`,
    genre: `Comedy`,
    imgSrc: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    description: `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
    commentCount: 465
  }
];

// Element(any) rendering function

const renderElement = (container, element, position) => {
  container.insertAdjacentHTML(position, element);
};

// Rendering of the user rank element within the HEADER element.

const siteHeaderElement = document.querySelector(`header`);

renderElement(siteHeaderElement, createUserRankTemplate(), `beforeend`);

// Rendering elements within the MAIN section.

const siteMainElement = document.querySelector(`main`);

renderElement(siteMainElement, createSiteMenuTemplate(), `afterbegin`);
renderElement(siteMainElement, createMovieSortingTemplate(), `beforeend`);
renderElement(siteMainElement, createFilmsSectionTemplate(), `beforeend`);

const siteFilmsSectionElement = siteMainElement.querySelector(`.films`);
renderElement(siteFilmsSectionElement, createFilmsListSectionTemplate(MOVIES_PRESENT_MOCK), `afterbegin`);

const siteFilmListContainerElement = siteFilmsSectionElement.querySelector(`.films-list__container`);

if (MOVIES_PRESENT_MOCK) {
  for (let i = 0; i < MOCK_FILM_COUNT; i++) {
    renderElement(siteFilmListContainerElement, createFilmCardTemplate(FILM_CARD_MOCK_DATA[i]), `beforeend`);
  }
  renderElement(siteFilmListContainerElement, createShowMoreButtonTemplate(), `afterend`);
  if (MOVIES_EXTRA_MOCK) {
    MOVIES_EXTRA_LIST_NAMES.forEach(function (value) {
      renderElement(siteFilmsSectionElement, createExtraFilmsList(value), `beforeend`);
    });

    const filmsListExtraListElements = siteFilmsSectionElement.querySelectorAll(`.films-list--extra`);
    filmsListExtraListElements.forEach(function (value, index) {
      let extraListFilmContainer = filmsListExtraListElements[index].querySelector(`.films-list__container`);
      for (let i = 0; i < MOVIES_EXTRA_CARD_LIMIT; i++) {
        renderElement(extraListFilmContainer, createFilmCardTemplate(FILM_CARD_MOCK_DATA[i]), `beforeend`);
      }
    });
  }
}

// Rendering of the total movie count in the FOOTER element

const siteFooterElement = document.querySelector(`footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

renderElement(siteFooterStatisticsElement, createTotalMovieCountTemplate(MOCK_TOTAL_MOVIE_COUNT), `afterbegin`);
