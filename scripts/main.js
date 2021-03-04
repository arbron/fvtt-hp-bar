import * as patches from './patches.js';

Hooks.on('setup', () => {
  patches.addTokenDrawHPBar();
  patches.patchTokenDrawBar();
});
