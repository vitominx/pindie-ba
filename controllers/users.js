const sendAllUsers = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.usersArray));
};

const sendCreatedUser = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
}

const sendUserById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const sendUserUpdated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ message: "Пользователь обновлен" }))
};
const sendUserDeleted = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user))
}

const sendMe = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
}
module.exports = {
    sendAllUsers,
    sendCreatedUser,
    sendUserById,
    sendUserUpdated,
    sendUserDeleted,
    sendMe
};