import constants from './shared/constants.js';


export function registerSettings() {
  const register = (key, data) => game.settings.register(constants.moduleName, key, data);

  game.settings.registerMenu(constants.moduleName, "hpBarThemes", {
    name: "SETTINGS.HPBarThemeConfig",
    label: "SETTINGS.HPBarThemeConfigLabel",
    hint: "SETTINGS.HPBarThemeConfigHint",
    icon: "fas fa-swatchbook",
    type: ThemeConfig
  });

  // An array of custom themes created by the user accessible on all worlds
  register("themes", {
    name: "SETTINGS.HPBarThemes",
    hint: "SETTINGS.HPBarThemesHint",
    scope: "global",
    config: false,
    default: [],
    type: Array
  });

  // Name of the currently selected theme for this user
  register("selectedTheme", {
    name: "SETTINGS.HPBarSelectedTheme",
    hint: "SETTINGS.HPBarSelectedThemeHint",
    scope: "client",
    config: false,
    default: "Standard",
    type: String
  });

  // Custom styling to use if the user has not saved their changes to a theme
  register("customizedTheme", {
    name: "SETTINGS.HPBarCustomizedTheme",
    hint: "SETTINGS.HPBarCustomizedThemeHint",
    scope: "client",
    config: false,
    default: defaultTheme,
    type: Object,
    onChange: value => { canvas?.draw(); }
  });
}


export const defaultTheme = {
  tempColor: 0x66ccff,
  nonlethalColor: 0xffff00,
  staggeredColor: 0xff0000,
  maxPositiveColor: 0xf4f4f4,
  maxNegativeColor: 0xb30000
};


class ThemeConfig extends FormApplication {
  /** @inheritdoc */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: game.i18n.localize("HPBAR.ThemeConfigTitle"),
      id: "hpbar-theme-config",
      template: `${constants.templateRoot}/theme-config.html`,
      width: 500,
      classes: ["hpbar-theme-config"]
    });
  }

  /** @inheritdoc */
  getData(options) {
    const customizedTheme = game.settings.get(constants.moduleName, "customizedTheme");
    return Object.keys(defaultTheme).reduce((theme, key) => {
      const value = customizedTheme[key] ?? defaultTheme[key];
      theme[key] = `#${value.toString(16).padStart(6, "0")}`;
      return theme;
    }, {});
  }

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);
    html.on("click", "button[name=reset]", this._onReset.bind(this));
  }

  /**
   * Reset theme to default.
   *
   * @private
   */
  _onReset() {
    game.settings.set(constants.moduleName, "customizedTheme", defaultTheme);
    this.render();
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    let theme = Object.keys(defaultTheme).reduce((theme, key) => {
      theme[key] = parseInt(formData[key].replace("#", "").trim(), 16);
      if ( isNaN(theme[key]) ) theme[key] = defaultTheme[key];
      return theme;
    }, {});
    await game.settings.set(constants.moduleName, "customizedTheme", theme);
  }
}
