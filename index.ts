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
      console.log($app.magic("i18n")("greetings.hello"));
    },
  },
  globals: {
    title: "My Project",
  },
});

Core.store("darkMode").toggle();

Core.method("demo", { keyA: true });

Core.magic("i18n").locale = "fr";
console.log(Core.magic("i18n")("greetings.hello"));

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

Core.component("button", (props) => {
  return {
    $template: "<button>${ text }</button>",
    text: props.text,
  };
});

console.log(Object.keys(Core.__dict__.magic));

Core.app().mount();
