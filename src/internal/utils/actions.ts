function actionCore(root: any): any {
  return (key: any) =>
    key.split(".").reduce((obj: any, key: any) => {
      if (obj) return obj[key];
    }, root);
}

export function flattenActions(obj: any, path: string = "") {
  let result: any = [];
  for (const key in obj) {
    const newPath = path ? `${path}.${key}` : key;
    if (typeof obj[key] === "function") {
      result.push(newPath);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      result = result.concat(flattenActions(obj[key], newPath));
    } else {
      result.push(newPath);
    }
  }
  return result;
}

function actionGroups(root: any) {
  const admin: any = actionCore(root);
  return (name: string, args: any): any => {
    const method = admin(name);
    if (method) {
      return method(args);
    } else {
      const errorMessage = `Method { ${name} } Not Found`;
      throw new Error(errorMessage);
    }
  };
}

export default function action(root: any) {
  const methods: any = actionGroups(root);
  methods.keys = flattenActions(root);
  return methods;
}
/*
  const action: any = actions({
    app: {
      model: {
        method() {
          console.log("Hello from <app.model.method>");
        },
      },
    },
  });
  
  action("app.model.method");
  action("namespace.not.found");
  
  */
