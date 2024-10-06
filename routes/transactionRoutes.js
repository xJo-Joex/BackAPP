const express = require('express');
const router = express.Router();
const { validateTransaction } = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/validate-transaction', authMiddleware, validateTransaction);

module.exports = router;
