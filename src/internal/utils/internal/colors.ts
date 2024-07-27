const DEFAULT = "background";

export default {
  types: ["text", "border", "background", "table"],
  setup({ arg }: any) {
    const setup = {
      type: DEFAULT,
      color: null,
      base: false,
      active: arg?.startsWith("active"),
      error: arg?.startsWith("error"),
    };
    setup.base = !setup.active && !setup.error;
    if (arg) {
      setup.type = arg
        .replace("active", "")
        .replace("error", "")
        .replace("-", "");
    }
    if (setup.type === "") {
      setup.type = DEFAULT;
    }
    return setup;
  },
};
