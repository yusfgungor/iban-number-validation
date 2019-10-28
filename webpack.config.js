const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/ibanValidation.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ibanValidation.min.js'
  }
};
