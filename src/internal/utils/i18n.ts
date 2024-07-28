function translations(options: any) {
  return (key: string): any => {
    return key.split(".").reduce((o, i) => {
      if (o) return o[i];
    }, options);
  };
}

export default translations;
