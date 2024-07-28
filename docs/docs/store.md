# State

Manage reactive data with ease.

## Local State

Define and manipulate local state within a component.

```html
<div v-scope="{ count: 0 }">
  ${ count }
  <button @click="count++">Increment</button>
</div>
```

## Global State

Register a global store using **vuek.store** and access it with the magic word **`$store`**.

```js
// Register a global store
vuek.store("darkMode", {
  on: false,
  toggle() {
    this.on = !this.on;
  },
});

// Toggle the dark mode
vuek.store("darkMode").toggle();

// Get the current value
console.log(vuek.store("darkMode").on);
```

### Inside Components

Use global state within components to maintain consistency across your application.

```html
<script>
  // Register a global store for demonstration purposes
  vuek.store("demo", {
    count: 0,
    inc() {
      this.count++;
    },
  });
</script>

<div v-scope>
  ${ $store.demo.count }
  <button @click="$store.demo.inc">Increment</button>
</div>
```

This approach ensures that your state management is both intuitive and powerful, whether you're working with local or global data.
