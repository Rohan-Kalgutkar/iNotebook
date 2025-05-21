const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// const { Schema } = mongoose;

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

var fetchuser=require('../middleware/fetchUser');



const JWT_SECRET = 'Rohanisagoodb$boy';

//Route 1: Create a User using: POST "/api/auth/createUser". No Login Required


router.post('/createUser', [

    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),



], async (req, res) => {

    let success=false;

    //If there are errors return Bad request along with errors

    console.log('--- Request received at /api/auth/createUser ---');

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }


    //Check whether user with the Email exist already

    try {

        let user = await User.findOne({ email: req.body.email });

        console.log(user);

        if (user) {
            return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
        }


        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        console.log('User successfully created:', user);

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        console.log(authToken);



        // res.json(user);
        success=true;
        res.json({ success,authToken });

    }

    catch (error) { // Catch any errors during findOne or create
        console.error('Error during user creation:', error.message);
        res.status(500).send("Internal Server Error Occurred");
    }


    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique value for email', message:err.message})});


    // console.log(req.body);

    // const user=User(req.body);
    // user.save(); 

    // res.send(req.body);
    // res.json(obj)

})


//Route 2: Authenticate a User using: POST "/api/auth/login". No Login Required

router.post('/login', [


    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),



], async (req, res) => {

    let success=false;

    //If there are errors return Bad request along with errors


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });


        if (!user) {
            success=false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {

            
            success=false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            

        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;

        res.json({ success, authToken })

    } catch (error) {

        console.error('Error during user authentication:', error.message);
        res.status(500).send("Internal Server Error Occurred");

    }


})



//Route 3: Get Logged In user Detail using: POST "/api/auth/getuser". Login Required


router.post('/getuser', fetchuser, async (req, res) => {



    try {

        userId = req.user.id;
        const user = await User.findById(userId).select("-password ")
        res.send(user);

    } catch (error) {

        console.error('Error during user authentication:', error.message);
        res.status(500).send("Internal Server Error Occurred");
    }
})


module.exports = router

