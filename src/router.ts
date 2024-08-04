// @ts-ignore
import { reactive } from "./external/petite-vue.es.js";

interface NavigatorOptions {
  history?: boolean;
  baseURL?: string;
  before?: any;
  after?: any;
}

export default function Router(options: NavigatorOptions) {
  return new RouterAPI(options);
}

class RouterAPI {
  history: boolean;
  baseURL: string;
  currentPath: string;
  searchArgs: Record<string, any>;
  method: Record<string, any>;
  current: any;

  constructor(options: NavigatorOptions) {
    const baseURL = cleanURL(options.baseURL || "", {
      remove: { prefix: true, suffix: true },
    });
    this.history = options.history || false;
    this.baseURL = baseURL;
    this.currentPath = this._getPath();
    this.searchArgs = this._getSearch();
    this.current = reactive({
      route: this.currentPath,
      search: this.searchArgs,
    });
    this.method = {
      before: options.before,
      after: options.before,
    };

    // History
    this._historyListen();
  }

  is(val: string) {
    return (
      this.current.route ===
      cleanURL(val, { remove: { prefix: true, suffix: true } })
    );
  }

  go(path: string, query: any) {
    const current = this._getCurrent();
    const { nextURL, nextRoute, nextSearch } = this._buildGo(path, query);

    const isDiff = checkDiff(current, {
      route: nextRoute,
      search: nextSearch,
    });

    const commit = () => {
      if (isDiff) {
        // Change State
        this._setArgs(nextRoute, nextSearch);
        window.history.pushState({}, "", nextURL);
      }
    };

    const redirect = (_p: string, _q: any) => {
      const { nextURL, nextRoute, nextSearch } = this._buildGo(_p, _q);

      const isDiff = checkDiff(current, {
        route: nextRoute,
        search: nextSearch,
      });

      if (isDiff) {
        // Change State
        this._setArgs(nextRoute, nextSearch);
        window.history.pushState({}, "", nextURL);
      }

      return new Promise((resolve) => {
        resolve({
          from: current,
          next: {
            route: nextRoute,
            search: nextSearch,
          },
        });
      });
    };

    if (this.method.before) {
      this.method.before({
        router: this,
        commit: commit,
        redirect: redirect,
        from: current,
        next: {
          route: nextRoute,
          search: nextSearch,
        },
      });
    } else {
      commit();
    }

    if (this.method.after) {
      this.method.after({
        router: this,
        from: current,
        next: {
          route: nextRoute,
          search: nextSearch,
        },
      });
    }
  }

  redirect(
    path: string = "",
    openName: string | boolean = false,
    query: any = {}
  ) {
    const fullPath = combinePathWithQuery(path, query);
    openName
      ? openOrFocusWindow(fullPath, openName)
      : (window.location.href = fullPath);
  }
  private _historyListen() {
    const vm = this;
    window.addEventListener("popstate", function () {
      const router = vm._getCurrent();
      vm.current.route = router.route;
      vm.current.search = router.search;
    });
  }

  private _cleanURL(route: any): any {
    const _route = route.replace(this.baseURL, "");
    return cleanURL(_route, {
      remove: { prefix: true, suffix: true },
    });
  }

  private _setArgs(route: any, search: any): any {
    const _route = this._cleanURL(route);
    this.currentPath = _route;
    this.searchArgs = search;
    // Reactive
    this.current.route = _route;
    this.current.search = search;
  }

  private _getCurrent(): any {
    return {
      route: this._getPath(),
      search: this._getSearch(),
    };
  }

  private _getPath(): string {
    const path = this.history
      ? window.location.pathname
      : window.location.hash.slice(1);
    const cleaned = this._cleanURL(path.split("?")[0]);
    return cleaned ? cleaned : "/";
  }

  private _getSearch(): any {
    const path = this.history
      ? window.location.pathname + window.location.search
      : window.location.hash.slice(1);
    const search = path.split("?")[1];
    return search ? extractSearchParams(search) : {};
  }

  private _buildGo(path: string = "", query: any = {}): any {
    const nextURL = this._buildGoQuery(path, query);
    const [pathWithoutQuery, search] = cleanURL(nextURL.replace("#", ""), {
      remove: { suffix: true, prefix: true },
    }).split("?");

    const nextRoute = pathWithoutQuery;
    const nextSearch = search ? extractSearchParams(search) : {};
    return { nextURL, nextRoute, nextSearch };
  }

  private _buildGoQuery(path: string = "", query: any = {}): string {
    const combinedPath = combinePathWithQuery(path, query);
    const finalPath = this.history
      ? cleanURL(`${this.baseURL}${combinedPath}`)
      : `${this.baseURL}#${combinedPath}`;
    return noSuffixSlashURL(finalPath);
  }
}

function checkDiff(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

function noSuffixSlashURL(url: string): string {
  return cleanURL(url, { remove: { suffix: true } });
}

function combinePathWithQuery(path: string, query: any = {}): string {
  let fullPath = /^(http|https):\/\//.test(path)
    ? path
    : noSuffixSlashURL(path);
  return Object.keys(query).length > 0
    ? `${fullPath}${createSearchParams(query)}`
    : fullPath;
}

function createSearchParams(params: any): string {
  const queryString = new URLSearchParams(cleanObject(params)).toString();
  return queryString ? `?${queryString}` : "";
}

function cleanObject(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value != null && value !== "null" && value !== "undefined"
    )
  );
}

function cleanURL(
  value: string,
  options: {
    prefix?: boolean;
    suffix?: boolean;
    remove?: { prefix?: boolean; suffix?: boolean };
  } = {}
): string {
  const defaultOptions = {
    prefix: true,
    suffix: true,
    remove: { prefix: false, suffix: false },
  };
  const { prefix, suffix, remove } = { ...defaultOptions, ...options };
  const slashify = (str: string) => `/${str.replace(/\/+/g, "/")}`;
  const prefixSlash = (str: string) =>
    (remove.prefix ? "" : "/") + str.replace(/^\/+/, "");
  const suffixSlash = (str: string) =>
    str.replace(/\/+$/, "") + (remove.suffix ? "" : "/");

  let cleanedValue = slashify(value);
  if (prefix) cleanedValue = prefixSlash(cleanedValue);
  if (suffix) cleanedValue = suffixSlash(cleanedValue);

  return cleanedValue ? cleanedValue : "/";
}

function openOrFocusWindow(path: string, openName: string | boolean) {
  const windowName: any = openName === true ? "_blank" : openName;
  const existingWindow = window.open(path, windowName);

  existingWindow?.focus() || window.open(path, windowName);
}

function extractSearchParams(search: string): any {
  return Object.fromEntries(new URLSearchParams(search).entries());
}
