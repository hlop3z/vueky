// @ts-nocheck
import Directives from "./directives.ts";
import Device from "./device.ts";
import * as Util from "./utils/__init__.ts";

const isDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const _CORE = ["store", "components", "directives", "magic"];

export default {
  __kwargs__: ["methods", "i18n", "mobile", ..._CORE],

  install: (App, opts) => {
    const options = opts || {};

    // Directives
    const directives = Directives(App);
    Object.keys(directives).forEach((name) =>
      App.directive(name, directives[name])
    );

    // Magic
    App.magic("lorem", () => Util.lorem);

    // Device Size
    Device(App, options.mobile);

    // Dark Mode
    App.store("darkMode", {
      on: isDark,
      toggle() {
        this.on = !this.on;
      },
    });

    // Actions
    if (options.methods) {
      const actions = Util.actions(options.methods, App);
      App.method = actions;
    }

    // i18n
    if (options.i18n) {
      const translations = Util.i18n(options.i18n);
      const method = (arg) =>
        translations(App.magic("i18n").locale + "." + arg);
      App.store("i18n", method);
      App.magic("i18n", () => method);
      App.magic("i18n").locale = "en";
    }

    const registerItems = (items, registerFn) => {
      if (items) {
        Object.entries(items).forEach(([name, item]) => registerFn(name, item));
      }
    };

    // Register stores, magic, directives, and components
    registerItems(options.store, App.store.bind(App));
    registerItems(options.magic, App.magic.bind(App));
    registerItems(options.directives, App.directive.bind(App));
    registerItems(options.components, App.component.bind(App));
    /**
     * @Demo
     */
    // App.magic("i18n", () => "some value");
  },
};
