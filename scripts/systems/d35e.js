import HPBarBase from './default.js';


export default class D35eBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme,
      HPBarBase._defaultNonlethalTheme
    ];
  }
}
