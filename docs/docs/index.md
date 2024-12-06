# Welcome to MkDocs

Vueky is a **standalone** wrapper and extension of <a href="https://github.com/vuejs/petite-vue" target="_blank">**`petite-vue`**</a> and also inspired by **`alpinejs`**, designed to offer a more robust and feature-rich experience while maintaining the lightweight and reactive nature of the original library. Vueky enhances the core capabilities of petite-vue by introducing additional functionalities.

## Usage

```html
<script src="https://unpkg.com/vueky@latest"></script>
```

## Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vueky</title>
    <script
      src="https://unpkg.com/vueky@latest"
      type="text/javascript"
    ></script>
  </head>

  <body>
    <div v-scope>
      <p>${ $lorem.s(50) }</p>
    </div>

    <script>
      vueky.init();
      vueky.app().mount();
    </script>
  </body>
</html>
```

## Templates

By default, Vueky templates use Custom Delimiters.

| Petite-Vue          | Vueky              |
| ------------------- | ------------------ |
| **`{{ myValue }}`** | **`${ myValue }`** |

Instead of using mustaches e.g. **`{{ myValue }}`**, Vueky uses **`${ myValue }`**.

This design choice ensures seamless integration with Django, Jinja2, or any other tool/framework that also utilizes mustache-style syntax.

```html
<div v-scope>${ myValue }</div>
```

## Features (**`Vueky`**)

| Name                    | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| **`vueky.init()`**      | Initializes Vueky with the provided configuration.                 |
| **`vueky.use()`**       | Plugin registration tool.                                          |
| **`vueky.store()`**     | Registers a reactive global object for state management.           |
| **`vueky.magic()`**     | Registers a global variable accessible via special **`$`** syntax. |
| **`vueky.directive()`** | Registers a custom global directive for use in templates.          |
| **`vueky.component()`** | Registers a custom global component for use in templates.          |

## Features (**`petite-vue`**)

| Name                 | Description                                               |
| -------------------- | --------------------------------------------------------- |
| **`v-scope`**        | Marks the regions on the page that should be controlled . |
| **`v-effect`**       | Execute reactive inline statements.                       |
| **`@vue:mounted`**   | Component mounted event.                                  |
| **`@vue:unmounted`** | Component unmounted event.                                |

### Vue Compatible

| Name                                        | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| **`v-bind`** or **`:`**                     | For class/style reactive handling.                      |
| **`v-on`** or **`@`**                       | Event Handling.                                         |
| **`v-model`**                               | Input value binding.                                    |
| **`v-if`** / **`v-else`** / **`v-else-if`** | Conditional rendering blocks.                           |
| **`v-for`**                                 | Render a list of items.                                 |
| **`v-show`**                                | Toggle the display of an element.                       |
| **`v-html`**                                | Render HTML content.                                    |
| **`v-text`**                                | Update text content.                                    |
| **`v-pre`**                                 | Skip compilation for this element and all its children. |
| **`v-once`**                                | Render the element and component once only.             |
| **`v-cloak`**                               | Prevents the display until compiled.                    |
| **`reactive()`**                            | Creates a reactive data object.                         |
| **`nextTick()`**                            | Executes a callback after the next DOM update cycle.    |
| **Template refs**                           | References to DOM elements or child components.         |
