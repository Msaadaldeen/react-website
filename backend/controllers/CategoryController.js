import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCategory = await Category.findOneAndUpdate({ _id: id }, req.body, { returnOriginal: false });

    if (updatedCategory) {
      res.status(200).json({
        success: true,
        msg: 'Category has been updated...',
        updatedCategory,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);

    try {
      await category.delete();
      res.status(200).json('Category has been deleted...');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const readCategories = async (req, res) => {
  const { categoryIds } = req.query;
  if (categoryIds) {
    const ids = categoryIds.split(',') || [];
    if (ids.length > 0) {
      try {
        const categories = await Category.find({ _id: { $in: ids } });
        return res.status(200).json(categories);
      } catch (err) {
        return res.status(400).json({ msg: 'Error retrieving categories' });
      }
    }
  }

  try {
    let categories;

    categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { createCategory, updateCategory, deleteCategory, readCategory, readCategories };
