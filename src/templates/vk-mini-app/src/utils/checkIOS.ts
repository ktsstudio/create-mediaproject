export default (PLATFORM: string) => {
  const isIOS =
    PLATFORM === 'mobile_iphone' ||
    PLATFORM === 'mobile_iphone_messenger' ||
    /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

  if (isIOS) {
    document.body.classList.add('ios');
  }
};
