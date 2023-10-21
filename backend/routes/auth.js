const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = 'swapnilAllowsYou';
// Route 1: creating user unsing endpoint Post: /api/auth/createUser
router.post('/createUser',
    body('name', 'enter valid name').notEmpty(),
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
            return res.status(400).json({success:"false", errors: errors.array() });
        }
        try {


            let user = await User.findOne({ email: req.body.email });
            if (user) {
                console.log(user);
                return res.status(400).json('Sorry a user with same email already exists');
            }
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // .then(user=>res.json(user))
            // .catch(err=>{console.log(err) 
            //     res.json({error:'Please enter a valid value for email'})})
            res.json({ success:"true",authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('some error occured');
        }

    })
// Route 2 :Authenticate using using the endpoint Post : /api/auth/login
router.post('/login',
    body('email', 'enter valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.send(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success:"false",error: 'You have entered invalid email/password' });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success:"false",error: 'Please try loging in with correct email/password' });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({success:"true", authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
)

// Route 3 : get user logged in details endpoint Post : /api/auth/getuser Login required

router.post('/getuser',fetchuser, async (req, res) => {
        try {
            const userId=req.user.id;
            const user=await User.findById(userId).select("-password");
            res.send(user);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
)

module.exports = router; 