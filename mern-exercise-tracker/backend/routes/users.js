//Need express router for new route
//Reference model as "template" for this route
const router = require('express').Router();
let User = require('../models/user.model');

/* Checks GET request for endpoint /users/  with no following keyword,
returns user list */
router.route('/').get((req, res) => {
        User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});
// POST req for /users/add
//Check for POST request, creates user, maps info to user model, then save.
router.route('/add').post((req, res) => {
    //username is part of req body (POST request)
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error' + err));

})

module.exports = router;