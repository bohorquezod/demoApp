const log = (...args) => {
  if (__DEV__) {
    console.log(...args);
  }
};

export default log;
