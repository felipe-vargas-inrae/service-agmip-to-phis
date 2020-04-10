const express = require('express');
const router = express.Router();
const ctrl= require('../apis/agmip_phis_request.controller')

// routes
router.route('/').post(ctrl.index);

module.exports = router;