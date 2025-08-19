const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getMyResume, upsertMyResume, getMyResumePdf } = require('../controllers/resumeController');

router.use(verifyToken);
router.get('/me', getMyResume);
router.post('/me', upsertMyResume);
router.get('/me/pdf', getMyResumePdf);

module.exports = router;


