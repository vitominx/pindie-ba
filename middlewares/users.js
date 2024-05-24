const users = require('../models/user');
const bcrypt = require("bcrypt");
const findAllUsers = async (req, res, next) => {
    req.usersArray = await users.find({}, { password: 0 });
    next();
};

const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        next()
    } catch (error) {
        res.status(400).send({ message: "Ошибка хеширования пароля" });
    }
};
const findUserById = async (req, res, next) => {
    console.log("GET /users/:id");
    try {
        req.user = await users.findById(req.params.id, { password: 0 });
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(404).send(JSON.stringify({ message: "User not found" }))
    }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
    } else {
      next();
    }
  }; 

const checkEmptyNameAndEmail = async (req, res, next) => {
    if (
        !req.body.username ||
        !req.body.email
    ) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
    } else {
        next();
    }
};

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find((user) => {
        return (
            req.body.username === user.username ||
            req.body.email === user.email
        );
    });
    if (isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: 'Пользователь с таким именем или почтой уже существует' }));
    } else {
        next();
    }
};
const createUser = async (req, res, next) => {
    console.log("POST /users")
    try {
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(400).send(JSON.stringify({ message: "Error creating user" }))
    }
};

const updateUser = async (req, res, next) => {
    try {
        req.user = await users.findByIdAndUpdate(req.params.id, req.body)
        next();
    } catch {
        res.setHeader("Content-Type", "application/json")
        res.status(400).send(JSON.stringify({ message: "Не удалось обновить пользователя" }))
    }
};
const deleteUser = async (req, res, next) => {
    try {
        req.user = await users.findByIdAndDelete(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }))
    }
};
module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    hashPassword
};