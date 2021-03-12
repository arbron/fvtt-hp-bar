import constants from './shared/constants.js';
import { log, uiError } from './shared/messages.js';
import { Monkey } from './shared/Monkey.js';


/**
 * Add custom drawing method for HP bars.
 */
export function addTokenHPBarClass(cls) {
  log('Adding Token._hpBarClass');

  Token.prototype._hpBarClass = cls;
}


/**
 * Modify Token._drawBar to call custom drawing method if 
 */
export function patchTokenDrawBar() {
  log('Patching Token._drawBar');

  Monkey.replaceMethod(Token, '_drawBar', function(number, bar, data) {
    if (this._hpBarClass.shouldDraw(data.attribute)) {
      const hpBar = new this._hpBarClass(this, number, bar);
      return hpBar._draw();
    }

    return Monkey.callOriginalFunction(this, '_drawBar', number, bar, data);
  });
}
