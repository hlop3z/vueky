// @ts-nocheck
import { createApp, nextTick, reactive } from "./external/petite-vue.es.js";

import PluginCore from "./internal/__init__.ts";
import * as Util from "./internal/utils/__init__.ts";

const __MAGIC__ = ["delimiters", "store", "magic", "use"];

const isFunction = (v) => v && {}.toString.call(v) === "[object Function]";

const Project: any = {
  // Petite-Vue
  createApp,
  reactive,
  nextTick,

  // Custom
  method: () => {},
  theme: Util.theme,
  util: {
    actions: Util.actions,
    api: Util.api,
    form: Util.form,
    i18n: Util.i18n,
    inject: Util.inject,
    validator: Util.validator,
  },

  // Global Dict
  __magic__: {},
  __dict__: {
    store: {},
    directives: {},
    components: {},
    magic: {
      delimiters: null,
      store: null,
      magic: null,
      use: null,
    },
  },

  app(props: any = {}) {
    const config = {
      $delimiters: ["${", "}"],
      ...(props || {}),
      // Globals
      $store: this.__dict__.store,
      $magic: this.__dict__.magic,
      $use: this.__dict__.components,
    };

    // Magic
    const magicKeys = Object.keys(this.__dict__.magic).filter(
      (x) => !__MAGIC__.includes(x)
    );
    magicKeys.forEach((name) => {
      const method = this.__dict__.magic[name];
      config["$" + name] = method;
    });

    // App
    const App = createApp(config);

    // Directives
    Object.keys(this.__dict__.directives).forEach((name) => {
      App.directive(name, this.__dict__.directives[name]);
    });

    return App;
  },

  /**
   * @Plugins
   */
  use(setup: any, config: any = {}) {
    setup.install(this, config);
  },

  /**
   * @Init
   */
  init(options?) {
    this.use(PluginCore, options || {});
  },

  /**
   * @Directives
   */
  directive(name: string, method: Function) {
    this.__dict__.directives[name] = method;
  },

  /**
   * @Components
   */
  component(name: string, method: Function) {
    this.__dict__.components[name] = method;
  },

  /**
   * @Store
   */
  store(name: string, props?: any) {
    if (name && !props) {
      return this.__dict__.store[name];
    }
    this.__dict__.store[name] = reactive(props);
    return this.__dict__.store[name];
  },

  /**
   * @Magic
   */
  magic(name: string, method?: any) {
    // Getter
    if (name && !method) {
      return this.__dict__.magic[name];
    }
    // Register
    if (Object.keys(this.__dict__.magic).includes(name)) {
      const errorMessage = `Magic { ${name} } already exists!`;
      throw new Error(errorMessage);
    } else {
      if (isFunction(method)) {
        const val = method(this);
        this.__dict__.magic[name] = val;
        return val;
      }
    }
  },
};

export default Project;
