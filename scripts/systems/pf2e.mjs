import HPBarBase from './default.mjs';


export default class PF2eBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme
    ];
  }
}
