const categoriesRouter = require('express').Router();
const {checkAuth} = require("../middlewares/auth")
const {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName
} = require('../middlewares/categories');
const {

    sendCreatedCategory,
    sendCategoryById,
    sendCategoryUpdated,
    sendCategoryDeleted,
    sendAllCategories
} = require('../controllers/categories');

categoriesRouter.get('/categories', findAllCategories, sendAllCategories)
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);
categoriesRouter.post('/categories', findAllCategories, checkIsCategoryExists, checkEmptyName, checkAuth, createCategory, sendCreatedCategory)
categoriesRouter.put("/categories/:id", checkEmptyName, checkAuth, updateCategory, sendCategoryUpdated )
categoriesRouter.delete("/categories/:id", checkAuth, deleteCategory, sendCategoryDeleted)
module.exports = categoriesRouter;