const router = require('express').Router();
const { verifyToken } = require('../middleware/authMiddleware');

// Simple requireAdmin middleware for demonstration
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin access required' });
}
const { listJobs, createJob, updateJob, deleteJob, scrape } = require('../controllers/jobController');

router.get('/', listJobs);
router.post('/', verifyToken, requireAdmin, createJob);
router.put('/:id', verifyToken, requireAdmin, updateJob);
router.delete('/:id', verifyToken, requireAdmin, deleteJob);
router.post('/scrape', verifyToken, requireAdmin, scrape);

module.exports = router;

