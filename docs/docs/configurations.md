# Configurations `init`

Initializes Vueky with the provided configuration settings.

## Fields

- **`mobile`**: Defines responsive breakpoints for different screen sizes.
- **`i18n`**: Sets up internationalization with localized strings.
- **`store`**: Initializes a global reactive store for state management.
- **`magic`**: Registers global magic properties accessible throughout the application.
- **`directives`**: Registers custom directives to be used in templates.
- **`components`**: Registers custom components with associated templates.
- **`methods`**: Defines custom methods for various functionalities.
- **`theme`**: Configures theme settings for base and dark modes.

## Basics

All fields are optional.

```js
vueky.init({
  mobile: ["xs", "sm", "md"], // Define responsive breakpoints
  i18n: {
    // Internationalization settings
  },
  store: {
    // Global reactive store
  },
  magic: {
    // Global magic properties
  },
  directives: {
    // Custom directives
  },
  components: {
    // Custom components
  },
  methods: {
    // Custom methods
  },
  theme: {
    // Theme settings
    base: {},
    dark: {},
  },
});
```

## Setup Example

```js
vueky.init({
  // Default: ["xs", "sm", "md"]
  mobile: ["xs", "sm", "md"], // Options: ["xs", "sm", "md", "lg", "xl"]
  i18n: {
    // Internationalization settings
    fr: {
      greetings: {
        hello: "Bonjour!",
      },
    },
  },
  store: {
    // Global reactive store
    count: 0,
  },
  magic: {
    // Global magic properties
    title() {
      return "My Project";
    },
  },
  directives: {
    // Custom directives
    "my-dir": (ctx) => console.log(ctx),
  },
  components: {
    // Custom components
    form: (props) => ({
      $template: "#template-form",
    }),
  },
  methods: {
    // Custom methods
    doSomething({ $app }) {
      console.log($app.magic("i18n")("greetings.hello"));
    },
  },
  theme: {
    // Theme settings
    base: {
      primary: "#ba68c8",
      secondary: "#c2185b",
    },
    dark: {
      primary: "#c2185b",
      secondary: "#ba68c8",
    },
  },
});
```
