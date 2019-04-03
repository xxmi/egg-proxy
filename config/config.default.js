/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = () => {
  const config = {};
  config.xxmiEggProxy = {
    host: 'http://127.0.0.1:8001/', // target host that matched path will be proxy to
    match: /^\/api/, // path pattern.
    map(path) {
      if (this.match && this.match.test(path)) {
        return path.replace(this.match, '');
      }
      return path;
    },
  };
  return config;
};
