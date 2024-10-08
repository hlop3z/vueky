# Configurations `init`

Initializes Vueky with the provided configuration settings.

## Fields

- **`mobile`**: Defines responsive breakpoints for different screen sizes.
- **`router`**: Router settings.
- **`globals`**: Defines global variables.
- **`i18n`**: Sets up internationalization with localized strings.
- **`store`**: Initializes a global reactive store for state management.
- **`magic`**: Registers global magic properties accessible throughout the application.
- **`directives`**: Registers custom directives to be used in templates.
- **`components`**: Registers custom components with associated templates.
- **`methods`**: Defines custom methods for various functionalities.

## Basics

All fields are optional.

```js
vueky.init({
  mobile: ["xs", "sm", "md"], // Define responsive breakpoints
  router: {
    // Router settings
  },
  globals: {
    // Global variables
  },
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
});
```

## Setup Example

```js
vueky.init({
  // Default: ["xs", "sm", "md"]
  mobile: ["xs", "sm", "md"], // Options: ["xs", "sm", "md", "lg", "xl"]
  router: {
    history: true,
    baseURL: "apps/",
  },
  globals: {
    title: "My Project",
  },
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
});
```
