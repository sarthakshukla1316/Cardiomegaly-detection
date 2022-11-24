const userModel = require("../models/user-model");

class UserController {

    async userDetails(req, res) {
        try {
            const user = await userModel.findById(req.user._id);
            return res.status(200).json(user);
        } catch(err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateProfile(req, res) {
        try {
            await userModel.findByIdAndUpdate(req.user._id, req.body);
            return res.status(200).json({ success: true, message: 'Profile updated successfully !' });
        } catch(err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async uploadFile(req, res) {
        try {
            console.log(req.body);
            return res.status(200).json({ success: true });
        } catch(err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


module.exports = new UserController();