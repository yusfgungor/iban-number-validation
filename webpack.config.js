const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/iban-number-validation.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'iban-number-validation.min.js'
  }
};
