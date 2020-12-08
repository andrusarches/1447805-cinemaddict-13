const filmToFilterMap = {
  watchlist: (filmDataArray) => filmDataArray.filter((filmData) => filmData.isWatchlist).length,
  history: (filmDataArray) => filmDataArray.filter((filmData) => filmData.isWatched).length,
  favorites: (filmDataArray) => filmDataArray.filter((filmData) => filmData.isFavorite).length
};

export const generateFilter = (filmDataArray) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(filmDataArray)
    };
  });
};

export const sortIntoNewArray = (filmDataArray, objectKey, toNewDateBoolean = false) => {
  const newFilteredArray = filmDataArray.slice(0).sort((a, b) => {
    let firstValue = a[objectKey];
    let secondValue = b[objectKey];

    if (toNewDateBoolean) {
      firstValue = new Date(a[objectKey]);
      secondValue = new Date(b[objectKey]);
    }

    if (secondValue - firstValue === 0) {
      return a.title - b.title;
    }
    return secondValue - firstValue;
  });

  return newFilteredArray;
};
