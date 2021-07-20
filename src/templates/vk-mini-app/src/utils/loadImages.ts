export const loadImage = async (src: string, onLoaded: () => void) =>
  new Promise((resolve) => {
    const curImage = new Image();
    curImage.src = src;
    curImage.onload = () => {
      onLoaded();
      resolve(null);
    };
    // если какой-то картинки не будет, все равно резолвим, чтобы приложение смогло загрузиться
    curImage.onerror = () => resolve(null);
  });

export default async (images: Array<string>, onNextLoaded = () => {}) => {
  await Promise.all(images.map((i) => loadImage(i, onNextLoaded)));
};
