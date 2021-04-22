
import { error, log } from './shared/messages.js';
import DefaultHPBar from './systems/default.js';
import * as patches from './patches.js';
import { registerSettings } from './settings.js';


Hooks.once('init', function() {
  registerSettings();
});


Hooks.once('setup', async function() {
  const system = game.system.data;
  try {
    log(`Loading HP bar for ${system.title}`);
    const drawingModule = await import(`./systems/${system.name}.js`);

    patches.addTokenHPBarClass(drawingModule.default);
  } catch(e) {
    log(`Falling back to generic HP bar drawing`);
    patches.addTokenHPBarClass(DefaultHPBar);
  }
  patches.patchTokenDrawBar();
});


