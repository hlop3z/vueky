function loremBase(style: any, count: any) {
  const lorem = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    "An unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  ];
  const list = [];
  const len = lorem.length;
  let i;
  switch (style[0]) {
    case "w":
      for (i = 0; i < count; i += 1) {
        const rand = Math.floor(len * Math.random());
        const words = lorem[rand].trim().split(" ");
        list.push(words[Math.floor(len * Math.random())]);
      }
      break;
    case "s":
      for (i = 0; i < count; i += 1) {
        const rand = Math.floor(len * Math.random());
        list.push(lorem[rand]);
      }
      break;
    default:
      break;
  }
  return list.join(" ");
}

export default {
  /**
   *
   * @param {integer} count Create a random `lorem` string.
   */
  word(count: any) {
    return loremBase("w", count);
  },
  sentence(count: any) {
    return loremBase("s", count);
  },
  w(count: any) {
    return loremBase("w", count);
  },
  s(count: any) {
    return loremBase("s", count);
  },
};
