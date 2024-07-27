// @ts-nocheck
import { createApp, nextTick, reactive } from "./external/petite-vue.es.js";

import PluginCore from "./internal/__init__.ts";
import * as Util from "./internal/utils/__init__.ts";

const __MAGIC__ = ["delimiters", "store", "magic", "use"];

const Project = {
  // Petite-Vue
  createApp,
  reactive,
  nextTick,

  // Custom
  actions: Util.actions,
  api: Util.api,
  form: Util.form,
  i18n: Util.i18n,
  inject: Util.inject,
  theme: Util.theme,
  validator: Util.validator,

  // Global Dict
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
      config["$" + name] = this.__dict__.magic[name];
    });

    // App
    const App = createApp(config);

    // Directives
    Object.keys(this.__dict__.directives).forEach((name) => {
      App.directive(name, this.__dict__.directives[name]);
    });

    return App;
  },

  use(setup: any, config: any = {}) {
    setup.install(this, config);
  },

  store(name: string, props?: any) {
    if (name && !props) {
      return this.__dict__.store[name];
    }
    this.__dict__.store[name] = reactive(props);
    return this.__dict__.store[name];
  },

  component(name: string, method: Function) {
    this.__dict__.components[name] = method;
  },

  directive(name: string, method: Function) {
    this.__dict__.directives[name] = method;
  },

  magic(name: string, props: any) {
    if (Object.keys(this.__dict__.magic).includes(name)) {
      const errorMessage = `Magic { ${name} } already exists!`;
      throw new Error(errorMessage);
    } else {
      if (name && !props) {
        return this.__dict__.magic[name];
      }
      this.__dict__.magic[name] = props;
      return this.__dict__.magic[name];
    }
  },
};

// Install Core Plugin
Project.use(PluginCore);

export default Project;
