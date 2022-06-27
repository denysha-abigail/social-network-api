const { User } = require('../models');

const userController = {
    // READ all users; will serve as the callback function for the GET /api/users route
    getAllUsers(req, res) {
        User.find({})
            .populate([{
                path: 'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            }])
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // READ one user by id; will serve as the callback function for the GET /api/users/:id route
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([{
                path: 'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            }])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // CREATE a user; will serve as the callback function for the POST /api/users route
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // UPDATE a user by id; will serve as the callback function for the PUT /api/users/:id route
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE a user by id; will serve as the callback function for the DELETE /api/users/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json({ message: 'User successfully deleted!' });
            })
            .catch(err => res.status(400).json(err));
    },

    // add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // remove a friend from a user's friend list
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;