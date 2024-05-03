const AccountService = require('../../services/auth/account.service');
const LocationService = require('../../services/socket/tracking.service');
const db = require('../../models/index.model');

const trackLocation = async (req, res) => {
    try {
        const {location} = req.body;
        const {userId} = req.params;
        const user = await db.Account.findOne({where: {id: userId}});
        const trackLocation = await Location.create({location, userId});
        res.status(200).json({
            success: true,
            message: 'Location tracked successfully',
            trackLocation,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}