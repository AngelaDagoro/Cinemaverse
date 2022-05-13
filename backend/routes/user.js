const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUserDetail,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    googleAuth
} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middlewares/auth');

// router.route('/users').get(isAuthenticatedUser,getAllUsers);
router.route('/users').get(getAllUsers);
router.route('/users/:id').get(getUserDetail);
router.route('/users/:id').put(updateUser);
router.route('/users/:id').delete(deleteUser);
router.route('/users').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser)
router.route('/google/register').post(googleAuth);

module.exports = router;