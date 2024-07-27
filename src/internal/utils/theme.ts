import injectCSS from "./inject";

class ThemeCreator {
  base: any;
  dark: any;
  disable: any;
  zebra: string | boolean;
  colors: any;
  current: any;
  isDark: boolean;

  constructor({
    base = {},
    dark = {},
    disable = [],
    zebra = true,
    darkMode = false,
  }: any) {
    const init = Object.keys(base).length > 0;
    this.base = base;
    this.dark = { ...base, ...(dark || {}) };
    this.disable = disable;
    this.zebra = init && zebra ? "#f2f2f2" : false;
    this.colors = [];
    this.current = darkMode ? this.dark : base;
    this.isDark = darkMode;
  }

  createTheme() {
    const cssCode = this.generateThemeColors();
    injectCSS(cssCode, "theme-colors");
    this.generateNames();
  }

  toggle(value: boolean) {
    if (value === undefined || value === null) {
      this.isDark = !this.isDark;
    } else {
      this.isDark = value;
    }
    if (this.isDark) {
      this.current = this.dark;
    } else {
      this.current = this.base;
    }
    this.createTheme();
  }

  generateNames() {
    const items: any = [];
    Object.keys(this.current).forEach((x) => items.push(x));
    this.colors = items;
  }

  generateThemeColors() {
    let css = "";
    const isDisable = (value: any) => this.disable.includes(value);

    // Default Table Color (ODDS)
    if (this.zebra) css += this.colorDefaultTableZebra(this.zebra);

    // Generate Theme Colors
    Object.entries(this.current).forEach(([name, color]) => {
      const buildColor = (group: any) =>
        this.buildColorStyles(group, name, color);

      const addColorGroup = (group: any) => {
        if (!isDisable(group)) css += buildColor(group);
      };

      addColorGroup("background");
      addColorGroup("text");
      addColorGroup("border");
      addColorGroup("table");
    });

    return css;
  }

  buildColorStyles(group: any, name: any, color: any) {
    const method: any = Color[group];
    let css = "";
    css += method(name, color);
    return css;
  }

  colorDefaultTableZebra(color: any) {
    return `tbody tr:nth-child(even) { background-color: ${color}; }\n`;
  }
}

const ColorBase: any = {
  background: (color: any) => `background-color: ${color} !important;`,
  border: (color: any) => `border-color: ${color} !important;`,
  text: (color: any) => `color: ${color} !important;`,
  table: (color: any) =>
    `tbody tr:nth-child(even) { background-color: ${color} !important; }\n`,
};

const generateStyle = (group: any, name: any, color: any) => {
  if (group === "table") {
    return `.${getClass(group, name)} ${ColorBase[group](color)}\n`;
  } else {
    return `.${getClass(group, name)} { ${ColorBase[group](color)} }\n`;
  }
};

const Color: any = {
  background: (name: any, color: any) =>
    generateStyle("background", name, color),
  border: (name: any, color: any) => generateStyle("border", name, color),
  text: (name: any, color: any) => generateStyle("text", name, color),
  table: (name: any, color: any) => generateStyle("table", name, color),
};

// @ts-ignore
let currentTheme = new ThemeCreator({});

function createTheme(args: any) {
  const current = new ThemeCreator(args);
  current.createTheme();
  currentTheme = current;
}

function getClass(
  type: "background" | "border" | "text" | "table",
  name: string
) {
  const util: any = {
    background: (name: any) => `color-bg-${name}`,
    border: (name: any) => `color-br-${name}`,
    text: (name: any) => `color-tx-${name}`,
    table: (name: any) => `color-tb-${name}`,
  };
  return util[type](name);
}

export default {
  set: createTheme,
  class: getClass,
  toggle(value: any = undefined) {
    currentTheme.toggle(value);
  },
  get info() {
    return currentTheme;
  },
};
