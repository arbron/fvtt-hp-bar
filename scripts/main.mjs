import constants from './shared/constants.mjs';
import { error, log } from './shared/messages.mjs';
import DefaultHPBar from './systems/default.mjs';
import * as patches from './patches.mjs';
import { prepareTheme, registerSettings } from './theme.mjs';


Hooks.once('setup', async function() {
  const system = (game.release?.generation >= 10) ? game.system : game.system.data;
  let drawingSystem;
  try {
    log(`Loading HP bar for ${system.title}`);
    const drawingModule = await import(`./systems/${system.id ?? system.name}.mjs`);
    drawingSystem = drawingModule.default;
  } catch(e) {
    log(`Falling back to generic HP bar drawing`);
    drawingSystem = DefaultHPBar;
  }

  patches.addTokenHPBarClass(drawingSystem);
  patches.patchTokenDrawBar();

  // Settings version used for migrations if necessary
  game.settings.register(constants.moduleName, "settingVersion", {
    name: "Settings Version",
    scope: "client",
    config: false,
    default: 1,
    type: Number
  });

  prepareTheme(drawingSystem);
  registerSettings();
});
