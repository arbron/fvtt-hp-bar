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
    default: "",
    type: String
  });

  // Custom styling to use if the user has not saved their changes to a theme
  register("customizedTheme", {
    name: "SETTINGS.HPBarCustomizedTheme",
    hint: "SETTINGS.HPBarCustomizedThemeHint",
    scope: "client",
    config: false,
    default: defaultTheme,
    type: Object
  });
}


export const defaultTheme = {
  tempColor: 0x559cc6,
  maxPositiveColor: 0xf4f4f4,
  maxNegativeColor: 0x999999
};


class ThemeConfig extends FormApplication {
  /** @inheritdoc */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: game.i18n.localize("HPBAR.ThemeConfigTitle"),
      id: "hpbar-theme-config",
      template: `${constants.templateRoot}/theme-config.html`,
      width: 500
    });
  }

  /** @inheritdoc */
  getData(options) {
    let theme = game.settings.get(constants.moduleName, "customizedTheme") ?? defaultTheme;
    for ( const [key, value] of Object.entries(theme) ) {
      theme[key] = `#${value.toString(16)}`;
    }
    return theme;
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
    let theme = {};
    for ( const [key, value] of Object.entries(formData) ) {
      theme[key] = parseInt(value.slice(1), 16);
    }
    game.settings.set(constants.moduleName, "customizedTheme", theme);
  }
}
