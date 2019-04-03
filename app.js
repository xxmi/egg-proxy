'use strict';

const proxy = require('koa-proxy');

module.exports = app => {

  const xxmiProxy = app.config.xxmiEggProxy || {};
  if (xxmiProxy) {
    let proxyList = xxmiProxy.proxy || [];
    if (!Array.isArray(proxyList)) {
      proxyList = [].concat(proxyList);
    }

    proxyList.forEach(config => {
      if (xxmiProxy.host || config.host) {
        config.host = config.host ? config.host : xxmiProxy.host;
        if (!config.map) {
          config.map = function(path) {
            if (this.match && this.match.test(path)) {
              return path.replace(this.match, '');
            }
            return path;
          };
        }
        app.use(proxy(config));
      }
    });
  }
};
