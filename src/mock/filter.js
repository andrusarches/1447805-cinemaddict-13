const filmToFilterMap = {
  watchlist: (filmDataArray) => filmDataArray.filter((filmData) => filmData.isWatchlist).length,
  history: (filmDataArray) => filmDataArray.filter((filmData) => filmData.isWatched).length,
  favorites: (filmDataArray) => filmDataArray.filter((filmData) => filmData.isFavorite).length
};

export const generateFilter = (filmDataArray) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(filmDataArray),
    };
  });
};

export const sortByRating = (filmDataArray) => {
  const newFilteredByRatingArray = filmDataArray.slice(0).sort((a, b) => {
    if (b.rating - a.rating === 0) {
      return a.title - b.title;
    }
    return b.rating - a.rating;
  });

  return newFilteredByRatingArray;
};

export const sortByReleaseDate = (filmDataArray) => {
  const newFilteredByReleaseDateArray = filmDataArray.slice(0).sort((a, b) => {
    const firstElementReleaseDate = new Date(a.releaseDate);
    const secondElementReleaseDate = new Date(b.releaseDate);
    if (secondElementReleaseDate - firstElementReleaseDate === 0) {
      return a.title - b.title;
    }
    return secondElementReleaseDate - firstElementReleaseDate;
  });

  return newFilteredByReleaseDateArray;
};

export const sortByCommentCount = (filmDataArray) => {
  const newFilteredByCommentCountArray = filmDataArray.slice(0).sort((a, b) => {
    const firstElementCommentCount = a.commentCount;
    const secondElementCommentCount = b.commentCount;
    if (secondElementCommentCount - firstElementCommentCount === 0) {
      return a.title - b.title;
    }
    return secondElementCommentCount - firstElementCommentCount;
  });

  return newFilteredByCommentCountArray;
};
