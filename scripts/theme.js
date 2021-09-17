import constants from './shared/constants.js';
import { error } from './shared/messages.js';


/**
 * Theme configuration option.
 *
 * @typedef {object} ThemeOption
 * @property {string} name - Name used to store and retrieve the option from a theme object.
 * @property {string} label - Localized label for this option.
 * @property {string} type - Type of data represented by this option. Currently only supports "color".
 * @property {*} default - Default value used if theme is reset or an invalid value is provided.
 */

/**
 * Grouping of theme options.
 *
 * @typedef {object} ThemeCategory
 * @property {string} label - Localized label for this category.
 * @property {string} icon - Font Awesome icon string (e.g. "fas fa-soap")
 * @property {Array.<ThemeOption>} options - Individual options within the category.
 */

/**
 * Default theme constructed from the 
 */
export let defaultTheme = {};

/**
 * Theme options gathered from the selected system.
 *
 * @type {Array.<ThemeCategory>}
 */
let themeOptions;

/**
 * Use data provided by a system's themeOptions property to build a default
 * theme object.
 *
 * @param {HPBarBase} system - Drawing system providing the theme options.
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
    scope: "client",
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
    onChange: value => { 
      if ( isNewerVersion("0.8.0", game.data.version) ) {
        canvas?.draw();
      } else {
        game.canvas.scene.data.tokens.map(token => {
          token.object.drawBars();
        });
      }
    }
  });
}


class ThemeConfig extends FormApplication {
  /**
   * Flat mapping of the config options.
   * @type {object.<string, object>}
   */
  config = {};

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
        switch (option.type) {
          case "color":
            option.value = `#${value.toString(16).padStart(6, "0")}`;
            break;
          case "range":
            option.value = Number(value);
            break;
          default:
            error(`Invalid theme option type: ${option.type}`);
            break;
        }
        this.config[option.name] = option;
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
      const option = this.config[key];
      if ( !option ) continue;

      let value = formData[key];
      switch (option.type) {
        case "color":
          value = parseInt(formData[key].replace("#", "").trim(), 16);
          break;
        case "range":
          value = Math.clamped(Number(value), option.min, option.max);
          break;
        default:
          value = null;
          break;
      }
      if ( value && !isNaN(value) ) theme[key] = value;
    }
    await game.settings.set(constants.moduleName, "customizedTheme", theme);
  }
}
