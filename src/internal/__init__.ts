// @ts-nocheck
import Directives from "./directives.ts";
import Device from "./device.ts";
import Lorem from "./utils/lorem.ts";
// import Store from "./store.ts";

const isDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export default {
  install: (App, config) => {
    // Tools
    console.log(App, config);

    // Directives
    const directives = Directives(App);
    Object.keys(directives).forEach((name) =>
      App.directive(name, directives[name])
    );

    // Device Size
    Device(App);

    // Dark Mode
    App.store("darkMode", {
      on: isDark,
      toggle() {
        this.on = !this.on;
      },
    });

    // Magic
    App.magic("lorem", Lorem);

    /**
     * @Demo
     */
    // Magic
    App.magic("i18n", () => "some value");

    // Component
    App.component("counter", (props) => {
      return {
        $template: "#template-counter",
        count: props.initialCount,
        open: false,
        get css() {
          return {
            on: `css-${this.count}`,
            off: `css-dark`,
          };
        },
        inc() {
          this.count++;
        },
      };
    });
  },
};
