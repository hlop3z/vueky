# Welcome to MkDocs

Vuek is a **standalone** wrapper and extension of <a href="https://github.com/vuejs/petite-vue" target="_blank">**`petite-vue`**</a> and also inspired by **`alpinejs`**, designed to offer a more robust and feature-rich experience while maintaining the lightweight and reactive nature of the original library. Vuek enhances the core capabilities of petite-vue by introducing additional functionalities.

## Usage

```html
<script src="https://unpkg.com/vuek@latest"></script>
```

## Templates

By default, Vuek templates use Custom Delimiters.

| Petite-Vue          | Vuek               |
| ------------------- | ------------------ |
| **`{{ myValue }}`** | **`${ myValue }`** |

Instead of using mustaches e.g. **`{{ myValue }}`**, Vuek uses **`${ myValue }`**.

This design choice ensures seamless integration with Django, Jinja2, or any other tool/framework that also utilizes mustache-style syntax.

```html
<div v-scope>${ myValue }</div>
```

## Features (**`Vuek`**)

| Name                   | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| **`vuek.init()`**      | Initializes Vuek with the provided configuration.                  |
| **`vuek.use()`**       | Plugin registration tool.                                          |
| **`vuek.store()`**     | Registers a reactive global object for state management.           |
| **`vuek.magic()`**     | Registers a global variable accessible via special **`$`** syntax. |
| **`vuek.directive()`** | Registers a custom global directive for use in templates.          |
| **`vuek.component()`** | Registers a custom global component for use in templates.          |

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
