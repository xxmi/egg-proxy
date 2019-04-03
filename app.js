'use strict';

const proxy = require('koa-proxy');

module.exports = app => {

  const xxmiProxy = app.config.xxmiEggProxy || {};
  if (xxmiProxy) {
    const PLUGIN_NAME = 'xxmi-egg-proxy: ';
    let proxyList = xxmiProxy.proxy || [];
    if (!Array.isArray(proxyList)) {
      proxyList = [].concat(proxyList);
    }
    for (let i = 0; i < proxyList.length; i++) {
      let config = proxyList[i];
      if (!(config instanceof RegExp) && typeof config !== 'object') {
        throw new Error(`${PLUGIN_NAME} proxy 只能是正在表达式或者Object`);
      }
      if (config instanceof RegExp) {
        config = {
          match: config,
        };
      }
      if (!xxmiProxy.host && !config.host) {
        throw new Error(`${PLUGIN_NAME} 未配置 host`);
      }
      if (!config.match instanceof RegExp) {
        throw new Error(`${PLUGIN_NAME} proxy.match 不是正者表达式`);
      }
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
  }
};
