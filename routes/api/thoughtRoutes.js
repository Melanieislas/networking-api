const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts)
    .post(createThought);

router.route('/:thoughtId').get(getSingleThought)
    .delete(deleteThought);

router.route('/:thoughtId/reacions').post(newReaction);

router.route('/:thoughtId/reacions/:reactionId')
    .delete(deleteThought);

module.exports = router;