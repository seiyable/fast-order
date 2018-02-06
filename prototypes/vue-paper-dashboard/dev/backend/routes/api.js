var express = require('express');
var router = express.Router();

router.post('/something', function(req, res, next) {
  console.log('POST on /api/something');
});
