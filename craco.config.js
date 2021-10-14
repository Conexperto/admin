const CracoEsbuildPlugin = require("craco-esbuild");

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        enableSvgr: true,
        esbuildLoaderOptions: {
          loader: "tsx",
          target: "es2016",
        },
        esbuildMinimizerOptions: {
          target: "es2016",
          css: true,
        },
        esbuildJestOptions: {
          loaders: {
            ".ts": "ts",
            ".tsx": "tsx",
          },
        },
      },
    },
  ],
};
