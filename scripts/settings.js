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
    default: {},
    type: Object
  });
}


class ThemeConfig extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: game.i18n.localize("HPBAR.ThemeConfigTitle"),
      id: "hpbar-theme-config",
      template: `${constants.templateRoot}/theme-config.html`,
      width: 500,
      height: 500
    });
  }
}
