import express from 'express';
const router = express.Router();
export default router;

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});
