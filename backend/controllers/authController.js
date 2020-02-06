const User = require('../models/User');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
    const user = {
        user_id: uuidv4(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        pw: req.body.pw,
        status_is: 'active'
    };
    let newUser = await User.create(user);
    const token = jwt.sign({ id: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    newUser.pw = undefined;
    res.status(201).json({
        status: 'success',
        token,
        newUser
    });
});