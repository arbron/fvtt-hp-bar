import constants from './shared/constants.mjs';
import { log, uiError } from './shared/messages.mjs';
import { Monkey } from './shared/Monkey.mjs';


/**
 * Add custom drawing method for HP bars.
 */
export function addTokenHPBarClass(cls) {
  const TokenClass = _tokenClass();
  log(`Adding ${TokenClass.name}._hpBarClass`);

  TokenClass.prototype._hpBarClass = cls;
}


/**
 * Modify Token._drawBar to call custom drawing method if 
 */
export function patchTokenDrawBar() {
  const TokenClass = _tokenClass();
  log(`Patching ${TokenClass.name}._drawBar`);

  Monkey.replaceMethod(TokenClass, '_drawBar', function(number, bar, data) {
    if (this._hpBarClass.shouldDraw(data.attribute)) {
      const hpBar = new this._hpBarClass(this, number, bar);
      return hpBar._draw();
    }

    return Monkey.callOriginalFunction(this, '_drawBar', number, bar, data);
  });
}


/**
 * Retrieve the token class for this system.
 * @private
 */
function _tokenClass() {
  return CONFIG["Token"]?.objectClass ?? Token;
}
