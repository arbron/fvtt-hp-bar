import HPBarBase from './default.mjs';
import { Color } from '../drawing.mjs';
import * as utils from "../shared/utils.mjs";


export default class Tormenta20Bar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme,
      HPBarBase._defaultMaxTheme()
    ];
  }

  /** @inheritdoc */
	static shouldDraw(attribute) {
    return attribute === "attributes.pv";
  }

  prepareData() {
    const pv = utils.duplicate(this.system.attributes.pv);
    return {
      max: Number(pv.max),
      temp: Number(pv.temp),
      value: Number(pv.value),
    };
  }
}
