var express = require('express');
var router = express.Router();

router.use(express.json());

//POST for logging a user out
//just clears the sessionId cookie
router.post('/', (req, res, next) => {
    const { logout } = req.body;
    if (logout) {
        res.clearCookie("sessionId");
        res.status(200).send();
    }
});

module.exports = router;