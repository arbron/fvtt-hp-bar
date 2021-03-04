import constants from './shared/constants.js';
import { log } from './shared/messages.js';
import * as patches from './patches.js';

Hooks.on('setup', () => {
  patches.addTokenDrawHPBar();
  patches.patchTokenDrawBar();
});
