import Core from "./src/__init__.ts";

Core.theme.set({
  darkMode: Core.store("darkMode").on,
  base: {
    // Core
    none: "transparent", // None
    white: "white", // White
    black: "black", // Black
    gray: "#a5a5a5", // Gray
    light: "#fff", // Light
    dark: "#424242", // Dark

    // Main
    context: "#616161",

    // Util
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#ff9800",
    info: "#2196F3",

    // Theme
    primary: "#ba68c8",
    secondary: "#c2185b",
  },
  dark: {
    // Main
    context: "#a5a5a5",

    // Util
    success: "#4CAF50",
    danger: "#F44336",
    warning: "#ff9800",
    info: "#2196F3",

    // Theme
    primary: "#c2185b",
    secondary: "#ba68c8",
  },
});

// Core.store("darkMode").toggle();

/*
const Plugin = {
  install: (App, config) => {
    console.log(App, config);
    // Magic
    App.magic("i18n", () => "some value");

    // Component
    App.component("counter", (props) => {
      return {
        $template: "#template-counter",
        count: props.initialCount,
        inc() {
          this.count++;
          this.$store.demo.count++;
        },
      };
    });

    // Store
    App.store("demo", {
      count: 0,
      inc() {
        this.count++;
      },
    });
    console.log(App.store("demo"));
  },
};
Core.use(Plugin);
*/

const { IMask } = window;
const Mask = (ctx) => {
  const value = ctx.get();
  let config: any = {};
  if (typeof value === "string") {
    config.mask = value;
  } else {
    config = value;
  }
  const mask = IMask(ctx.el, config);
  console.log(mask);
};

Core.directive("mask", Mask);

Core.app().mount();
