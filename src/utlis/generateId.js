const generator = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const generateId = () =>
  generator() +
  generator() +
  "-" +
  generator() +
  "-" +
  generator() +
  "-" +
  generator() +
  "-" +
  generator() +
  generator() +
  generator();
