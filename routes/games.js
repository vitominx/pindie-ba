const gamesRouter = require('express').Router();
const {
    findAllGames,
    createGame,
    findGameById,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIfCategoriesAvalible,
    checkIfUsersAreSafe,
    checkIsGameExists,
    checkIsVoteRequest
} = require('../middlewares/games');

const {checkAuth} = require('../middlewares/auth')

const {
    sendAllGames,
    sendCreatedGame,
    sendGameById,
    sendGameUpdated,
    sendGameDeleted
} = require('../controllers/games');

gamesRouter.get('/games', findAllGames, sendAllGames)
gamesRouter.get('/games/:id', findGameById, sendGameById);
gamesRouter.post("/games", findAllGames, checkIsGameExists, checkIfCategoriesAvalible, checkEmptyFields, checkAuth, createGame, sendCreatedGame);
gamesRouter.put("/games/:id", findGameById, checkIsVoteRequest, checkIfUsersAreSafe, checkIfCategoriesAvalible,checkEmptyFields, checkAuth, updateGame, sendGameUpdated);
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);
module.exports = gamesRouter;