import {capitalizeString} from "../util.js";

const createFilterTemplate = (filtersElement) => {
  const {name, count} = filtersElement;

  return `<a href="#${name}" class="main-navigation__item">${capitalizeString(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterTemplate(filter))
    .join(``);

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};
