import HPBarBase from './default.mjs';


export default class ArchmageBar extends HPBarBase {
  /** @inheritdoc */
  static get themeOptions() {
    return [
      ...super.themeOptions,
      HPBarBase._defaultTempTheme
    ];
  }
}
