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

// HTML template rendering function

export const RENDER_POSITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
    case RENDER_POSITION.AFTEREND:
      container.insertAdjacentElement(RENDER_POSITION.AFTEREND, element);
      break;
  }
};

export const renderTemplate = (container, element, position) => {
  container.insertAdjacentHTML(position, element);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const capitalizeString = (s) => {
  if (typeof s !== `string`) {
    return ``;
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};
