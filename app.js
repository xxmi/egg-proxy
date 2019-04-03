'use strict';

const proxy = require('koa-proxy');

module.exports = app => {
  let proxyConfig = app.config.xxmiEggProxy || [];
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [].concat(proxyConfig);
  }

  proxyConfig.forEach(config => {
    app.use(proxy(config));
  });
};
