const crypto = require('crypto');
const UserModel = require('./models/user');

const generateRandomPassword = () => {
    return crypto.randomBytes(16).toString('hex');
};

const createDefaultAdmin = async () => {
    try {
        const adminExists = await UserModel.findOne({ Email: 'johnmcafee@bme.hu' });

        if (!adminExists) {

            const newAdmin = new UserModel({
                Email: 'johnmcafee@bme.hu',
                Username: 'John',
                Password: generateRandomPassword(),
                Role: 'admin'
            });

            await newAdmin.save();
            console.log('Default admin user created.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
};

module.exports = createDefaultAdmin;