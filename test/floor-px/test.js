var assert = require('assert');

module.exports = function (importResult) {
  assert.deepEqual(importResult.fontsize, 18);
};
