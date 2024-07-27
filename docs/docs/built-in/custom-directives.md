# Custom Directives

**Directives** allow developers to extend the HTML with new behaviors. They enable the execution of specific logic when applied to elements.

## Installing a Directive

```js
vuek.directive("my-dir", (ctx) => console.log(ctx));
```

## Using a Directive

```html
<div v-my-dir v-scope></div>
```

## Creating a Directive

```js
const myDirective = ({ el, exp, arg, modifiers, get, effect }) => {
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
};
```

## IMask Directive Example

```js
import IMask from "imask";

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
```
