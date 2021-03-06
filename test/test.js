var fs = require('fs');
var importVars = require('../index');
var less = require('less');
var path = require('path');

var directories = fs.readdirSync(__dirname).filter(function(file) {
  return fs.statSync(path.join(__dirname, file)).isDirectory();
});

describe('Passes', function () {

  directories.forEach(function (dir) {

    // Uncomment the following line to make just that one test run.
    //if (dir !== 'lighten') return;

    var importResult = null;

    var lessFilePath = path.join(__dirname, dir, 'index.less');

    // Skip empty subdirectories.
    try {
      fs.statSync(lessFilePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return;
      }
      throw err;
    }

    var source = fs.readFileSync(
      lessFilePath,
      {encoding: 'utf8'}
    );

    less.parse(source, {}, function (err, tree) {
      if (err) {
        throw err;
      }

      importResult = importVars(tree.rules);
    });

    it(dir, function () {

      var test = require(
        path.join(__dirname, dir, 'test.js')
      );

      test(importResult);

    });

  })

});
