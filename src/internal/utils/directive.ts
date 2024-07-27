import ref from "./ref.ts";

function DirectiveResponse(element: any, props?: any) {
  const args = props || {};
  return { ...args, self: ref(element), element: element };
}

function DirectiveObject(name: string, element: any) {
  if (!element.__dict__) {
    element.__dict__ = {};
  }
  if (!element.__dict__[name]) {
    element.__dict__[name] = {};
  }
}

export default {
  response: DirectiveResponse,
  object: DirectiveObject,
};
