import { error, log } from './shared/messages.js';
import * as patches from './patches.js';

Hooks.on('setup', async function() {
  const system = game.system.data;
  try {
    log(`Loading HP bar for ${system.title}`);
    const drawingModule = await import(`./systems/${system.name}.js`);

    patches.addTokenDrawHPBar(drawingModule);
    patches.patchTokenDrawBar();
  } catch(e) {
    error(`Could not load HP bar for ${system.title}`);
  }
});
