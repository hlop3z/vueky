# Magic

- **`$use`**: Registered Components
- **`$i18n`**: Translations
- **`$lorem`**: Utility for Testing Areas

## **`$use`**: Registered Components

Allows the use of registered components within your templates.

**Description:**
Utilizes the registered components, enabling modular and reusable elements across your application.

**Example:**

```html
<script>
  vueky.component("button", (props) => {
    return {
      $template: "<button>${ text }</button>",
      text: props.text,
    };
  });
</script>

<div v-scope="$use.button({ text: 'click me' })"></div>
```

## **`$i18n`**: Translations

Provides a simple way to handle translations and localization in your application.

**Description:**
Enables multilingual support by offering translation strings based on the current locale.

**Example:**

```js
// Register translations
vueky.init({
  i18n: {
    en: {
      greeting: "Hello",
    },
    fr: {
      greeting: "Bonjour",
    },
  },
});

// Switch language
vueky.magic("$i18n").locale = "fr";
console.log(vueky.magic("$i18n")("greeting"));
```

```html
<div v-scope>${ $i18n('greeting') }</div>
```

## **`$lorem`**: Utility for Testing Areas

Generates placeholder text for testing purposes.

**Description:**
Provides a quick way to generate Lorem Ipsum text for layout and design testing.

- **`word`** or **`w`**
- **`sentence`** or **`s`**

**Example:**

```html
<div v-scope>
  <p>${ $lorem.word(5) }</p>
  <!-- Generates 5 words -->
  <p>${ $lorem.sentence(5) }</p>
  <!-- Generates 5 sentence -->
  <p>${ $lorem.s(50) }</p>
  <!-- Generates 50 sentence -->
</div>
```
