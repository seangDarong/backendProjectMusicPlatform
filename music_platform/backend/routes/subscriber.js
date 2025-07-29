const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const SubscriberController = require('../controllers/subscriber');

router.put('/:subscriber_id/upgrade', SubscriberController.upgradePlan);
router.put('/change-plan', authMiddleware, SubscriberController.changePlan);
router.get('/', SubscriberController.getAll);
router.get('/premium', SubscriberController.getAllPremiumSubscribers);
router.get('/premium/:subscriber_id', SubscriberController.getPremiumSubscribersById);

module.exports = router;
