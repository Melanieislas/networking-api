const { Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select: ('-__v')
            .then((thought) => 
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            )
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    createThought (req,res) {
        Thought.create(req.body)
            .then((thouhgt) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    deleteThouhgt (req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then((thought) => {
                    !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            })
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
        },
        newReaction (req, res) {
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: {reactions: req.body}}
            )
            .then((thought) => {
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            })
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
        }, 
        deleteReaction (req, res) {
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: {reactions: req.params.reactionId}}
            )
            .then((thought) => {
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            })
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
        }
};