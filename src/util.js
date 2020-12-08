export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIntegerWDecimal = (lowestValue = 1, highestValue = 10) => {
  const precision = 10; // 1 decimal
  const newIntegerWDecimal = (Math.floor(Math.random() * (highestValue * precision - lowestValue * precision) + lowestValue * precision) / (lowestValue * precision)).toFixed(1);

  return newIntegerWDecimal;
};

export const getConvertedTime = (durationInMinutes) => {
  const minutesCount = durationInMinutes;
  const hours = (minutesCount / 60);
  const roundedHours = Math.floor(hours);
  const minutes = (hours - roundedHours) * 60;
  const roundedMinutes = Math.round(minutes);

  return (roundedHours > 0 ? `${roundedHours}h ${roundedMinutes}m` : `${roundedMinutes}m`);
};

// Element(any) rendering function

export const renderElement = (container, element, position) => {
  container.insertAdjacentHTML(position, element);
};

export const capitalizeString = (s) => {
  if (typeof s !== `string`) {
    return ``;
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};
