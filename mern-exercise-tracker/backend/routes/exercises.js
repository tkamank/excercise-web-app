//Need express router for new route
//Reference model as "template" for this route
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

/* Checks GET request for endpoint /users/  with no following keyword,
returns user list */
router.route('/').get((req, res) => {
        Exercise.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});
// POST req for /users/add
//Check for POST request, creates user, maps info to user model, then save.
router.route('/add').post((req, res) => {
    //username is part of req body (POST request)
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => status(400).json('Error: ' + err));
})

router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
});

module.exports = router;