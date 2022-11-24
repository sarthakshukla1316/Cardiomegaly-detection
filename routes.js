const router = require('express').Router();

const authController = require('./controllers/auth-controller');
const reportController = require('./controllers/report-controller');
const userController = require('./controllers/user-controller');
const { authMiddleware } = require('./middlewares/auth-middlewares');


// Authentication
router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/login', authController.login);

// Refresh token
router.get('/api/refresh', authController.refresh);

// logout user
router.post('/api/logout', authMiddleware, authController.logout);

router.get('/api/user-details', authMiddleware, userController.userDetails);

router.post('/api/update-profile', authMiddleware, userController.updateProfile);

router.post('/api/upload', authMiddleware, userController.uploadFile);

router.post('/api/add-report', authMiddleware, reportController.addReport);
router.get('/api/fetch-report', authMiddleware, reportController.fetchReports);

module.exports = router;