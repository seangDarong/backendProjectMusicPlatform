const express = require('express');
const router = express.Router();
const SubscriberController = require('../controllers/subscriber');

router.put('/:subscriber_id/upgrade', SubscriberController.upgradePlan);
router.get('/', SubscriberController.getAll);
router.get('/premium', SubscriberController.getAllPremiumSubscribers);
router.get('/premium/:subscriber_id', SubscriberController.getPremiumSubscribersById);

module.exports = router;
