//* this file should be in src folder

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
