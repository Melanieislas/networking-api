const { User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({ path: 'friends', select: '-__v' })
            .populate({ path: 'thoughts', select: '-__v' })
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    createUser (req,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser (req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
            .then((user) => {
                    !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            })
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
        },
        newFriend (req, res) {
            User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: {friends: req.params.friendsId}}
            )
            .then((user) => {
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            })
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
        }, 
        deleteFriend (req, res) {
            User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: {friends: req.params.friendsId}}
            )
            .then((user) => {
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            })
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
        }
};