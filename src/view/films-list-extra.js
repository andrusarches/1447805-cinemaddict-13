import {createFilmCardTemplate} from "./film-card.js";

export const createExtraFilmsList = (listName, dataArray) => {
  const generateCardsString = () => {
    let cardsHTMLString = ``;
    const MAX_CARDS_NUMBER = 2;
    for (let i = 0; i < MAX_CARDS_NUMBER; i++) {
      cardsHTMLString += createFilmCardTemplate(dataArray[i]);
    }

    return cardsHTMLString;
  };

  return `<section class="films-list films-list--extra">
            <h2 class="films-list__title">${listName}</h2>
            <div class="films-list__container">${generateCardsString()}</div>
          </section>`;
};
