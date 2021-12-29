const LocalStorage =
  jest.createMockFromModule<{ [key: string]: any }>("../LocalStorage");

let localstorage: { [key: string]: any } = {};

LocalStorage.add = (key: string, value: string) => {
  console.info("LocalStorage add");
  localstorage[key] = value;
};

LocalStorage.get = (key: string) => {
  console.info("LocalStorage get");
  return localstorage[key];
};

LocalStorage.remove = (key: string) => {
  console.info("LocalStorage remove");
  delete localstorage[key];
};

LocalStorage.clear = () => {
  console.info("LocalStorage clear");
  localstorage = {};
};

export default LocalStorage;
