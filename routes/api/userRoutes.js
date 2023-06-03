const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers)
    .post(createUser);

router.route('/:userId').get(getSingleUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId').post(newFriend)
    .delete(deleteFriend);

module.exports = router;