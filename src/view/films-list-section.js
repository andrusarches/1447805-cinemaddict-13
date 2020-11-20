export const createFilmsListSectionTemplate = (moviesPresent) => {
  return `    <section class="films-list">
        <h2 class="films-list__title${moviesPresent ? ` visually-hidden">All movies. Upcoming` : `">There are no movies in our database`}</h2>
        ${moviesPresent ? `<div class="films-list__container"></div>` : ``}
      </section>
  `;
};
