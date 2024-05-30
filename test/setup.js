const sinon = require('sinon');

// Use dynamic import for chai.js
import('chai').then((chai) => {
  chai.use(require('chai-as-promised'));
  global.expect = chai.expect;
}).catch((error) => {
  console.error('Error importing chai:', error);
});

global.sinon = sinon;