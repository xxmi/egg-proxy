/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = () => {
  const config = {};
  config.xxmiProxy = {
    host: 'http://127.0.0.1:8001/',
    proxy: [
      /^\/demo/,
      {
        match: /^\/api/, // path pattern.
      },
      {
        host: 'http://www.xxmi.cn/',
        match: /^\/xxmi/, // path pattern.
      },
    ],
  };
  return config;
};
