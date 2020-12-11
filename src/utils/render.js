import AbstractElement from "../view/abstract.js";

export const RENDER_POSITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, element, position) => {
  if (container instanceof AbstractElement) {
    container = container.getElement();
  }

  if (element instanceof AbstractElement) {
    element = element.getElement();
  }

  switch (position) {
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
