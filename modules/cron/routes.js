const express = require('express');
const router = express.Router();

const response = require('../../app/utils/response');

router.get('/', (req, res) => {
    response.success(res, null, 'Crons list');
})

module.exports = router;