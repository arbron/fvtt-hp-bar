import HPBarBase from './default.mjs';
import { Color } from '../drawing.mjs';


export default class DnD4eBar extends HPBarBase {
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme
    ];
  }

  prepareData() {
    const _hp = duplicate(this.system.attributes.hp);
    const _tmp = duplicate(this.system.attributes.temphp);
    return {
      max: Number(_hp.max),
      temp: Number(_tmp.value),
      value: Number(_hp.value),
    };
  }
}
