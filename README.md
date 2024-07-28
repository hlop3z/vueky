<h1 style="font-size: 5em; letter-spacing: -2px; font-family: Georgia, sans-serif;" align="center">
   Welcome to <strong>Vueky</strong>
</h1>

<p align="center" style="font-size: 2.5em; letter-spacing: -2px; font-family: Georgia, sans-serif;" >
    Standalone extension of petite-vue.
</p>

<p
  align="center"
  style="font-size: 2.5em; letter-spacing: -2px; font-family: Georgia, sans-serif;"
>
  <span style="font-size: 2em;">Links</span>
  <br /><br />
  <a href="https://github.com/hlop3z/vueky" target="_blank"> Github </a>
  <br /><br />
  <a href="https://hlop3z.github.io/vueky/" target="_blank"> Docs </a>
</p>

## Usage

```html
<script src="https://unpkg.com/vueky@latest" type="text/javascript"></script>
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
