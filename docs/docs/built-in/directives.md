- **`v-css`**: Provides a way to apply custom CSS rules directly within templates.
- **`v-style`**: Applies dynamic styles to elements based on reactive data.
- **`v-hover`**: Triggers actions when an element is hovered over.
- **`v-ripple`**: Adds a ripple effect to elements when clicked.
- **`v-scroll`**: Handles scroll events, allowing for actions based on scroll position.
- **`v-swipe`**: Detects swipe gestures and triggers actions based on swipe direction.
- **`v-popover`**: Creates popover elements that display additional content when triggered.

Here are the improved documentation and examples, with each directive and directive group separated for better clarity.

## Directives

### `v-ripple`

Adds a ripple effect to elements when clicked.

#### Example:

```html
<div>
  <button v-ripple>Click Me for Ripple Effect</button>
</div>
```

### `v-css`

Provides a way to apply custom CSS rules directly within templates.

#### Example:

```html
<!-- Animate (CSS) -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>

<!-- Example -->
<div v-scope="{open : false}">
  <button @click="open = !open">Click Me</button>
  <div
    class="animate__animated animate__faster"
    v-css.hide:is="open"
    v-css:on="('animate__fadeIn')"
    v-css:off="('animate__fadeOut')"
  >
    The Content
  </div>
</div>
```

### `v-style`

Applies dynamic styles to elements based on reactive data.

#### Example:

```html
<div v-scope="{ height: '60px' }">
  <button v-style:height="height" @click="height = '80px'">
    Button with Dynamic Height
  </button>
</div>
```

### `v-hover`

Triggers actions when an element is hovered over.

#### Example:

```html
<div v-scope="{ hover: false }">
  <div v-hover="({ value }) => (hover = value)">Hover over me!</div>
  <div v-if="hover">You are hovering!</div>
</div>
```

### `v-scroll`

Handles scroll events, allowing for actions based on scroll position.

#### Example:

```html
<div v-scope="{ position: 0 }">
  <div
    v-scroll="({ value }) => position = value.y"
    style="height: 100px; overflow-y: scroll"
  >
    <div style="height: 300px">Scroll me!</div>
  </div>
  <div>Scroll Position: ${ position }</div>
</div>
```

### `v-swipe`

Detects swipe gestures and triggers actions based on swipe direction.

#### Example:

```html
<div v-scope>
  <div
    v-swipe="({ value }) => console.log(value)"
    style="width: 100px; height: 100px; background-color: lightblue;"
  >
    Swipe Me!
  </div>
</div>
```

### `v-popover`

Creates popover elements that display additional content when triggered.

- **`x`**: Horizontal positioning. Options are **`auto`**, **`center`**, **`left`**, **`right`**.
- **`y`**: Vertical positioning. Options are **`auto`**, **`center`**, **`top`**, **`bottom`**.
- **`:space`**: Adds space between the activator and the content.

#### Example:

```html
<div v-scope="{open : false}" v-hover="({ value }) => open = value">
  <button x-data x-ripple @click.prevent="open = !open">PopOver + CSS</button>

  <div
    v-popover="{ x:'auto', y:'auto' }"
    v-popover:space="{ x:'0px', y:'10px' }"
    class="animate__animated animate__faster"
    v-css.hide:is="open"
    v-css:on="('animate__fadeIn')"
    v-css:off="('animate__fadeOut')"
  >
    <div
      class="bd-a sb-12"
      v-style:width="('200px')"
      v-style:height="('200px')"
    >
      The Content
    </div>
  </div>
</div>
```
