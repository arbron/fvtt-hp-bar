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

  const prefix = CONFIG.Token?.objectClass ? "CONFIG.Token.objectClass" : "Token";
  Monkey.mix(`${prefix}.prototype._drawBar`, function(wrapped, number, bar, data) {
    if (this._hpBarClass.shouldDraw(data.attribute)) {
      const hpBar = new this._hpBarClass(this, number, bar);
      return hpBar._draw();
    }

    return wrapped(number, bar, data);
  });
}


/**
 * Retrieve the token class for this system.
 * @private
 */
function _tokenClass() {
  return CONFIG.Token?.objectClass ?? Token;
}
