const usersRouter = require('express').Router()
const {checkAuth} = require("../middlewares/auth")
const {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    checkIsUserExists,
    hashPassword
} = require('../middlewares/users')
const {
    sendAllUsers,
    sendCreatedUser,
    sendUserById,
    sendUserUpdated,
    sendUserDeleted,
    sendMe
} = require('../controllers/users')

usersRouter.get("/me", checkAuth, sendMe);
usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.post('/users', findAllUsers, checkIsUserExists, checkEmptyNameAndEmailAndPassword,checkAuth, hashPassword, createUser, sendCreatedUser);
usersRouter.put('/users/:id', checkEmptyNameAndEmail, checkAuth, updateUser, sendUserUpdated);
usersRouter.delete('/users/:id', checkAuth, deleteUser, sendUserDeleted );
module.exports = usersRouter