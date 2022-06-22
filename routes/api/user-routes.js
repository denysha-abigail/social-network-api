const router = require('express').Router();

// destructure method names out of the imported object and use them directly
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');
const { create } = require('../../models/User');

// set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// set up GET, PUT, and DELETE for user at /api/users/:id
router
    .route('/')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;