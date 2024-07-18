import HPBarBase from './default.mjs';
import { Color } from '../drawing.mjs';
import * as utils from "../shared/utils.mjs";


export default class DnD4eBar extends HPBarBase {
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme
    ];
  }

  prepareData() {
    const _hp = utils.duplicate(this.system.attributes.hp);
    const _tmp = utils.duplicate(this.system.attributes.temphp);
    return {
      max: Number(_hp.max),
      temp: Number(_tmp.value),
      value: Number(_hp.value),
    };
  }
}
