const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
    req.categoriesArray = await categories.find({});
    next();
};

const checkIsCategoryExists = async (req, res, next) => {
    const isInArray = req.categoriesArray.find((category) => {
        return req.body.name === category.name;
    });
    if (isInArray) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: 'Категория с таким названием уже существует'}));
    } else {
        next();
    }
};
    
const findCategoryById = async (req, res, next) => {
    console.log("GET /categories/:id")
    try {
        req.category = await categories.findById(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(404).send(JSON.stringify({ message: "Cateпory not found" }))
    }
}
const checkEmptyName = async (req, res, next) => {
    if (!req.body.name) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
    } else {
        next();
    }
};
const createCategory = async (req, res, next) => {
    console.log("POST /categories")
    try {
        console.log(req.body);
        req.category = await categories.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(400).send(JSON.stringify({message: "Error creating category"}))
    }
};
const updateCategory = async (req, res, next) => {
    try {
        req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Не удалось обновить категорию " }));
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        req.category = await categories.findByIdAndDelete(req.params.id, req.categories)
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json")
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления категории" }))
    }
};

module.exports = {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName,
}