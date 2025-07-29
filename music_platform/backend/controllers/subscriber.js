const Subscriber = require('../models/Subscriber');

const subscriberController = {
    async upgradePlan(req, res) {
        try {
            const { subscriber_id } = req.params;
            const subscriber = await Subscriber.findByPk(subscriber_id);
            if (!subscriber) {
                return res.status(404).json({ error: 'Subscriber not found' });
            }
            
            const now = new Date();
            const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

            subscriber.planType = 'premium';
            subscriber.subscriptionStart = now;
            subscriber.subscriptionEnd = oneMonthFromNow;
            
            await subscriber.save();
            res.json({ message: 'Plan upgraded to premium', subscriber });
        } catch (error) {
            console.error('Error upgrading plan:', error);
            res.status(500).json({ error: 'Internal server error'});
        }
    },
    async changePlan(req, res) {
        console.log('changePlan endpoint hit!');
        console.log('Authenticated user:', req.user);
        console.log('Body:', req.body);
        
        try {
            // Use the authenticated user's ID instead of URL param
            const subscriber_id = req.user.id;
            const { planType } = req.body;
            
            console.log('Using subscriber_id from auth:', subscriber_id);
            console.log('Extracted planType:', planType);
            
            if (!['free', 'premium'].includes(planType)) {
                return res.status(400).json({ error: 'Invalid plan type. Must be "free" or "premium"' });
            }

            const subscriber = await Subscriber.findByPk(subscriber_id);
            console.log('Found subscriber:', subscriber ? 'Yes' : 'No');
            
            if (!subscriber) {
                return res.status(404).json({ error: 'Subscriber not found' });
            }
            
            const now = new Date();
            
            if (planType === 'premium') {
                const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                subscriber.planType = 'premium';
                subscriber.subscriptionStart = now;
                subscriber.subscriptionEnd = oneMonthFromNow;
            } else {
                subscriber.planType = 'free';
                subscriber.subscriptionStart = null;
                subscriber.subscriptionEnd = null;
            }
            
            await subscriber.save();
            console.log('Subscriber updated successfully');
            
            res.json({ 
                message: `Plan changed to ${planType}`, 
                subscriber 
            }); 
        } catch (error) {
            console.error('Error changing plan:', error);
            res.status(500).json({ error: 'Internal server error'});
        }
    },
    async getAll(req, res) {
        try {
            const subscribers = await Subscriber.findAll();
            res.json(subscribers);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            res.status(500).json({ error: 'Internal server error'});
        }
    },
    async getAllPremiumSubscribers(req, res) {
        try {
            const premiumSubscribers = await Subscriber.findAll({
                where: { planType: 'premium' }
            });
            res.json(premiumSubscribers);
        } catch (error) {
            console.error('Error fetching premium subscribers:', error);
            res.status(500).json({ error: 'Internal server error'});
        }
    },
    async getPremiumSubscribersById(req, res) {
        try {
            const { subscriber_id } = req.params;
            const subscriber = await Subscriber.findOne({
                where: { 
                    subscriber_id: subscriber_id,
                    planType: 'premium' 
                }
            });
            if (!subscriber) {
                return res.status(404).json({ error: 'Premium subscriber not found' });
            }
            res.json(subscriber);
        } catch (error) {
            console.error('Error fetching premium subscriber:', error);
            res.status(500).json({ error: 'Internal server error'});
        }
    }
}
module.exports = subscriberController;