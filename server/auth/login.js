var express = require('express');
var router = express.Router();
const { User } = require('../../db');

router.use(express.json());

//POST for submitting a user's login email and password;
router.post('/', (req, res, next) => {
    const { email, password } = req.body;
    //TODO:
    //1) hash the password
    //2) search the User model by email
    //3) compare the hashed password to that of the returned user
    //4a) if no match, return 404
    //4b) if they do match, generate a new sessionId
    //5) update the user in the db with the new sessionId
    //6) set the res.cookie("sessionId", sessionId);
});


module.exports = router;

