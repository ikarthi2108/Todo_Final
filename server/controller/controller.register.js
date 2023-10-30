const User = require('../models/registerModel')
const bcrypt = require('bcrypt')


const handleRegister = async (req, res) => {
    try {
        const { name, email, dateOfBirth, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            dateOfBirth,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

module.exports = handleRegister