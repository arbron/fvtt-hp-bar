import constants from './shared/constants.js';
import { log, uiError } from './shared/messages.js';
import { Monkey } from './shared/Monkey.js';
import { drawHPBar } from './drawing.js';


/**
 * Add custom drawing method for HP bars.
 */
export function addTokenDrawHPBar() {
  log('Adding Token._drawHPBar');

  Token.prototype._drawHPBar = drawHPBar;
}


/**
 * Modify Token._drawBar to call custom drawing method if 
 */
export function patchTokenDrawBar() {
  log('Patching Token._drawBar');

  Monkey.replaceMethod(Token, '_drawBar', function(number, bar, data) {
    if ((data.attribute === "attributes.hp") && (this.actor.data.type === "character")) {
      return this._drawHPBar(number, bar, data);
    }
    return Monkey.callOriginalFunction(this, '_drawBar', number, bar, data);
  });
}
