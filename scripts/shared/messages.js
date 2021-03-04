import constants from './constants.js';

export class GCError extends Error {
  constructor(error) {
    super(formatMessage(error));
  }
}

export function log(message) {
  console.log(formatMessage(message));
}

export function error(message) {
  console.error(formatMessage(message));
}

export function uiError(localizationKey, toConsole=true) {
  let message = game.i18n.localize(localizationKey);
  if (toConsole) error(message);
  ui.notifications.error(message);
}

export function makeError(message) {
  return new Error(formatMessage(message));
}

function formatMessage(message) {
  return `${constants.moduleLabel} | ${message}`;
}
