const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { matchText, matchIds } = require('../controllers/aiController');

router.post('/match-text', verifyToken, matchText);
router.post('/match-ids', verifyToken, matchIds);

module.exports = router;


