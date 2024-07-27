function Plugin(App: any, mobile?: string[]) {
  const mobileSizes = mobile || ["xs", "sm", "md"];

  App.store("device", {
    x: window.innerWidth,
    y: window.innerHeight,

    _config: {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      mobile: mobileSizes,
    },

    config(updates: any) {
      this._config = { ...this._config, ...updates };
    },

    get mobile() {
      return this.is(...this._config.mobile);
    },

    is(...vals: any) {
      return vals.includes(this.size);
    },

    get size() {
      if (this.x <= this._config.xs) {
        return "xs";
      } else if (this.x <= this._config.sm) {
        return "sm";
      } else if (this.x <= this._config.md) {
        return "md";
      } else if (this.x <= this._config.lg) {
        return "lg";
      } else {
        return "xl";
      }
    },
  });

  window.addEventListener("resize", () => {
    App.store("device").x = window.innerWidth;
    App.store("device").y = window.innerHeight;
  });
}

export default Plugin;

/*
    config(updates: any) {
      this._config = { ...this._config, ...updates };
    },

    get size() {
      if (this.x <= this._config.xs) {
        return "xs";
      } else if (this.x <= this._config.sm) {
        return "sm";
      } else if (this.x <= this._config.md) {
        return "md";
      } else if (this.x <= this._config.lg) {
        return "lg";
      } else {
        return "xl";
      }
    },

    get keys() {
      return ["xs", "sm", "md", "lg", "xl"];
    },

    get mobile() {
      return this.is("xs", "sm", "md");
    },

    is(...vals: any) {
      return vals.includes(this.size);
    },
*/
