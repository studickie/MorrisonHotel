const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

// router.post('/signup', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             return res.status(404).json({ message: 'User already exists' });
//         }

//         const newUser = new User({ email, password });

//         await newUser.save();

//         req.session.user = newUser;
//         res.render('index', { message: 'User created' });

//     } catch (e) {
//         res.status(500).json({ message: 'Oops! Something went wrong', error: e });
//     }
// });

router.get('/signin', (req, res) => res.render('signin'));

router.post('/signin', [
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 8, max: 16}).withMessage('Must be between 8-16 characters')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('errors', errors.array());
        return res.render('signin', { errors: errors.array() });
    }
    
    res.redirect('/')
});

router.post('/signout', async (req, res) => {
    // req.session.destroy();
    // res.render('index');
});

module.exports = router;