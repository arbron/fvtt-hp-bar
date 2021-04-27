import { error, log } from './shared/messages.js';
import DefaultHPBar from './systems/default.js';
import * as patches from './patches.js';
import { prepareTheme, registerSettings } from './theme.js';


Hooks.once('setup', async function() {
  const system = game.system.data;
  let drawingSystem;
  try {
    log(`Loading HP bar for ${system.title}`);
    const drawingModule = await import(`./systems/${system.name}.js`);
    drawingSystem = drawingModule.default;
  } catch(e) {
    log(`Falling back to generic HP bar drawing`);
    drawingSystem = DefaultHPBar;
  }

  patches.addTokenHPBarClass(drawingSystem);
  patches.patchTokenDrawBar();

  prepareTheme(drawingSystem);
  registerSettings();
});
