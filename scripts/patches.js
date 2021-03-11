import constants from './shared/constants.js';
import { log, uiError } from './shared/messages.js';
import { Monkey } from './shared/Monkey.js';


/**
 * Add custom drawing method for HP bars.
 */
export function addTokenDrawHPBar(module) {
  log('Adding Token._shouldDrawHPBar');
  log('Adding Token._drawHPBar');

  Token.prototype._shouldDrawHPBar = module.shouldDrawHPBar;
  Token.prototype._drawHPBar = module.drawHPBar;
}


/**
 * Modify Token._drawBar to call custom drawing method if 
 */
export function patchTokenDrawBar() {
  log('Patching Token._drawBar');

  Monkey.replaceMethod(Token, '_drawBar', function(number, bar, data) {
    if (this._shouldDrawHPBar(data.attribute)) return this._drawHPBar(number, bar, data);

    return Monkey.callOriginalFunction(this, '_drawBar', number, bar, data);
  });
}
