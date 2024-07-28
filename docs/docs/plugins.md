# Plugins

Plugins are extensions that add extra functionality to the core library, allowing developers to integrate additional features seamlessly. They enhance the capabilities of the framework by providing reusable and modular components, directives, and utilities.

## Create Plugin

```js
const Plugin = {
  install: (App, options) => {
    const opts = options || {};

    // Store
    App.store("example", { value: "reactive-value" });

    // Magic
    App.magic("title", () => "My-Title");

    // Directive
    App.directive("my-dir", (ctx) => console.log(ctx));

    // Component
    App.component("button", (props) => {
      return {
        $template: "<button>${ text }</button>",
        text: props.text,
      };
    });
  },
};
```

## Install Plugin (`use`)

```js
// Install
vuek.use(Plugin);

// Install with Options
vuek.use(Plugin, { arg: "one" });

// Run
vuek.init();
vuek.app().mount();
```
