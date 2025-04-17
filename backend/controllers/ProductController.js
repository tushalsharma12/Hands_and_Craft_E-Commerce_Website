import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, rating, price, prev_price, discount, page, section } =
      req.body;

    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const img = `http://localhost:5000/uploads/${req.file.filename}`; // ✅ Correct way to store image path

    const newProduct = new Product({
      title,
      img,
      rating,
      price,
      prev_price,
      discount,
      page,
      section,
    });

    await newProduct.save();
    res.json({ message: "Product Added", product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (req.file) {
      if (existingProduct.img) {
        const oldImagePath = path.join(
          process.cwd(),
          "uploads",
          path.basename(existingProduct.img)
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.img = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ message: "Product Updated", product: updatedProduct });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // // Image ko delete karein (agar exist karti ho)
    if (product.img) {
      const imagePath = path.join(process.cwd(), product.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested Product ID:", id);

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      const allProducts = await Product.find();
      return res.json(allProducts);
    }

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search in title
        { page: { $regex: query, $options: "i" } },
        { section: { $regex: query, $options: "i" } }, // Case-insensitive search in page
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllSections = async (req, res) => {
  try {
    const sections = await Product.distinct("page");
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { page, section, title, minPrice, maxPrice, minRating, maxRating } =
      req.query;
    let filter = {};

    if (page) filter.page = page;
    if (section) filter.section = section;
    if (title) filter.title = { $regex: title, $options: "i" }; // Case-insensitive search

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
