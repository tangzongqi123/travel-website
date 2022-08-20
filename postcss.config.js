module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      selectorBlackList: ["favor"], //可以选择哪些选择器不变为vw
    },
  },
};
