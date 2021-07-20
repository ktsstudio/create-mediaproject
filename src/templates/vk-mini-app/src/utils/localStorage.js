function getLocalStorage() {
  window.__localstorage__ = {};

  // VK Apps Ломает localStorage после очистки кеша. В случайный момент времени
  return {
    setItem: (key, value) => {
      window.__localstorage__[key] = value;
    },
    getItem: (key) => window.__localstorage__[key],
    removeItem: (key) => {
      delete window.__localstorage__[key];
    },
  };
}

export default getLocalStorage();
