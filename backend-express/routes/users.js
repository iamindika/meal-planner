// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
    getPostsByUsers
} = require('../db/helpers/dbHelpers');
const auth = require('../middleware/auth');

module.exports = ({
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.send(err));
    });

    router.get('/posts', (req, res) => {
        getUsersPosts()
            .then((usersPosts) => {
                const formattedPosts = getPostsByUsers(usersPosts);
                res.json(formattedPosts);
            })
            .catch((err) => res.send(err))
    });

    router.post('/', auth, (req, res) => {

        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;

        getUserByEmail(email)
            .then(user => {

                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    addUser(first_name, last_name, email, password)
                      .then(user => res.json(user));
                }

            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                msg: "something went wrong"
            }));

    })

    return router;
};
