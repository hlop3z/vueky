import Core from "./src/__init__.ts";

Core.init({
  mobile: ["xs", "sm", "md", "lg", "xl"],
  i18n: {
    en: {
      greetings: {
        hello: "Welcome!",
      },
    },
    fr: {
      greetings: {
        hello: "Bonjour!",
      },
    },
  },
  store: {
    title: "My Project",
  },
  magic: {
    demo() {
      return "HELLO WORLD";
    },
  },
  directives: {
    other: ({ el, exp, arg, modifiers, get, effect }) => {
      // Log directive information
      console.log({
        element: el,
        expression: exp,
        argument: arg,
        modifiers: modifiers,
      });

      // Evaluate the expression and get its value
      if (exp) {
        const value = get();
        console.log(value);

        // Evaluate an arbitrary expression in the current scope
        const evaluatedExpression = get(`${exp} + 10`);
        console.log(evaluatedExpression);

        // Run reactive effect
        effect(() => {
          console.log(get());
        });
      }

      return () => {
        // Cleanup if the element is unmounted
      };
    },
  },
  components: {
    counter: (props) => {
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
    },
  },
  methods: {
    demo({ $app }) {
      console.log($app.magic("i18n")("en.greetings.hello"));
    },
  },
  theme: {
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
  },
});

Core.store("darkMode").toggle();
Core.method("demo", { keyA: true });

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

const Mask = ({ el: element, get, exp, arg }: any) => {
  const value = get();

  const createMask = (config) => {
    const mask = IMask(element, config);
    element.__mask__ = mask;
    return () => mask.destroy();
  };

  const updateValue = (assign, value) => {
    const mask = element.__mask__;
    mask.value = value.toString();
    assign(mask.value);
  };

  const addInputListener = (handler) => {
    element.addEventListener("input", handler);
    return () => element.removeEventListener("input", handler);
  };

  const handleInput =
    (assign, unmasked = false) =>
    (e) => {
      const mask = element.__mask__;
      const value = unmasked ? mask.unmaskedValue : mask.value;
      assign(value);
    };

  if (!arg) {
    const config = typeof value === "string" ? { mask: value } : value;
    return createMask(config);
  }

  const assign = get(`(val) => { ${exp} = val }`);

  if (arg === "value") {
    updateValue(assign, value);
    return addInputListener(handleInput(assign));
  }

  if (arg === "unmasked") {
    if (element.__mask__) {
      assign(element.__mask__.unmaskedValue);
    }
    return addInputListener(handleInput(assign, true));
  }
};

// Directive
Core.directive("mask", Mask);

// Component
Core.component("popover", (props) => {
  return {
    $template: "#template-popover",
  };
});

Core.component("form", (props) => {
  return {
    $template: "#template-form",
  };
});

Core.app().mount();
