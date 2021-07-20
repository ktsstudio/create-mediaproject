export default function findGetParameter(parameterName, loc) {
  let result = null,
    tmp = [];
  (loc || location.search)
    .substr(1)
    .split('&')
    .forEach((item) => {
      tmp = item.split('=');
      if (tmp[0] === parameterName) {
        result = decodeURIComponent(tmp[1]);
      }
    });
  return result;
}
