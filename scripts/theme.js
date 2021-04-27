import constants from './shared/constants.js';


export let defaultTheme = {};
let themeOptions;

/**
 * Use data provided by a system's themeOptions property to build a default
 * theme object.
 */
export function prepareTheme(system) {
  themeOptions = system.themeOptions ?? [];

  defaultTheme = themeOptions.reduce((acc, category) => {
    category.options.map(option => acc[option.name] = option.default);
    return acc;
  }, {});
}


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
    const categories = themeOptions.map(category => {
      category.options = category.options.map(option => {
        const value = customizedTheme[option.name] ?? option.default;
        option.value = `#${value.toString(16).padStart(6, "0")}`;
        return option;
      });
      return category;
    });
    return { categories };
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
    let theme = game.settings.get(constants.moduleName, "customizedTheme");
    for ( const key of Object.keys(defaultTheme) ) {
      const value = parseInt(formData[key].replace("#", "").trim(), 16);
      if ( !isNaN(value) ) theme[key] = value;
    }
    await game.settings.set(constants.moduleName, "customizedTheme", theme);
  }
}
