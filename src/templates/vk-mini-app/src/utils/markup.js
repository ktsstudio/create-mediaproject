const SIZE = {
  desktop: { width: 630, height: 660 },
  mobile: { width: 375, height: 812 },
};

export default {
  const: {
    initScale: 10,
    maxAspect: 1,
    minAspect: 1,
  },
  initResize: false,
  currentFontSize: null,
  init: function init(maxFontSize) {
    if (maxFontSize !== undefined) {
      this.const.maxFontSize = maxFontSize;
    }

    this.setConst(window.IS_MOBILE ? SIZE.mobile : SIZE.desktop);

    this.fit();
    // window.addEventListener('resize', this.fit.bind(this));
    // window.onresize = () => {
    //   if (!this.initResize) {
    //     this.initResize = true;
    //     this.fit();
    //   }
    // };
  },

  setConst: function ({ height, width }) {
    this.const.height = height;
    this.const.width = width;
  },

  fit: function fit() {
    const currentHeight = window.innerHeight;
    const currentWidth = window.innerWidth; // делим на 2 только в проекте ПФР, потому что экран разделен на две половинки

    let scaleX = currentWidth / this.const.width;
    let scaleY = currentHeight / this.const.height;

    if (scaleX * this.const.height > currentHeight) {
      scaleX = currentHeight / this.const.height;
    }

    if (scaleY * this.const.width > currentWidth) {
      scaleY = currentWidth / this.const.width;
    }

    let currentScale = Math.min(scaleX, scaleY);
    if (currentHeight > currentWidth * 2) {
      currentScale +=
        0.1 * (currentHeight / (currentWidth * 2 + currentHeight));
    }

    const result = currentScale * this.const.initScale;

    this.currentFontSize = this.round(result);
    if (
      this.const.maxFontSize !== undefined &&
      this.currentFontSize > this.const.maxFontSize
    ) {
      this.currentFontSize = this.const.maxFontSize;
    }

    document.documentElement.style.fontSize = `${this.currentFontSize}px`;
  },
  round: function round(value) {
    return Math.round(value * 2) / 2;
  },
  remToPx: function remToPx(rem) {
    return this.round(rem * this.currentFontSize);
  },
  pxToRem: function pxToRem(px) {
    return px / 10 + 'rem';
  },
};
