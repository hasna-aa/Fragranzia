const express = require("express");
const { getCategories, createCategory, updateCategory, deleteCategory ,toggleCategoryBlock,getCategoryById} = require("../../controllers/category/categoryController");
const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.put("/toggle-block/:id", toggleCategoryBlock);
router.get("/:id", getCategoryById);

module.exports = router;
