export default (obj, path, def) => {
  const res = path
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .replace(/^\./, '')
    .split('.')
    .reduce((prev, curr) => {
      return prev && prev[curr];
    }, obj);

  return res === undefined ? def : res;
};
