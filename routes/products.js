import passport from "passport";
import express from "express";
import Product from "../models/product.js";
import Category from "../models/category.js";
import User from "../models/user.js";
import moment from "moment";

const router = express.Router();

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// GET: display all products
router.get("/", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  try {
    const products = await Product.find({})
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category");

    const count = await Product.countDocuments();
    const categories = await Category.find({}).sort('title');

    res.render("shop/index", {
      pageName: "All Products",
      products,
      categories,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: "/products/?",
      pages: Math.ceil(count / perPage),
      searchTerm: '',
      currentCategory: null,
      login: req.isAuthenticated(),
      session: req.session
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET: search box
router.get("/search", async (req, res) => {
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const searchTerm = req.query.search || '';

  try {
    const searchQuery = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { productCode: { $regex: searchTerm, $options: "i" } }
      ]
    };

    const products = await Product.find(searchQuery)
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category");

    const count = await Product.countDocuments(searchQuery);
    const categories = await Category.find({}).sort('title');

    // Check if the search term matches any category
    const matchingCategory = categories.find(cat => 
      cat.title.toLowerCase() === searchTerm.toLowerCase()
    );

    res.render("shop/index", {
      pageName: searchTerm ? `Search: ${searchTerm}` : "All Products",
      products,
      categories,
      successMsg: products.length > 0 ? `Found ${products.length} products ${searchTerm ? `matching "${searchTerm}"` : ''}` : null,
      errorMsg: products.length === 0 ? `No products found ${searchTerm ? `matching "${searchTerm}"` : ''}` : null,
      current: page,
      breadcrumbs: null,
      home: "/products/search?search=" + searchTerm + "&",
      pages: Math.ceil(count / perPage),
      searchTerm: searchTerm,
      currentCategory: matchingCategory || null,
      login: req.isAuthenticated(),
      session: req.session
    });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Error searching products');
    res.redirect("/");
  }
});

// GET: AJAX route for filtered products - with a clear 'api' prefix
router.get("/api/filter/:category", async (req, res) => {
  try {
    console.log('Filter request received for category:', req.params.category);
    
    let query = {};
    if (req.params.category !== 'all') {
      const foundCategory = await Category.findOne({ slug: req.params.category });
      console.log('Found category:', foundCategory);
      
      if (foundCategory) {
        query.category = foundCategory.id;
      } else {
        return res.status(404).json({
          success: false,
          message: `Category ${req.params.category} not found`
        });
      }
    }

    console.log('Query to execute:', query);
    const products = await Product.find(query)
      .sort("-createdAt")
      .populate("category");
    
    console.log(`Found ${products.length} products`);

    res.json({
      success: true,
      products: products,
      category: req.params.category
    });
  } catch (error) {
    console.error('Error in filter route:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
});

//GET: get a certain category by its slug
router.get("/:slug", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  try {
    const foundCategory = await Category.findOne({ slug: req.params.slug });
    if (!foundCategory) {
      req.flash('error', 'Category not found');
      return res.redirect("/products");
    }

    const allProducts = await Product.find({ category: foundCategory.id })
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category");

    const count = await Product.countDocuments({ category: foundCategory.id });
    const categories = await Category.find({}).sort('title');

    res.render("shop/index", {
      pageName: foundCategory.title,
      currentCategory: foundCategory,
      products: allProducts,
      categories,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: req.breadcrumbs,
      home: "/products/" + req.params.slug.toString() + "/?",
      pages: Math.ceil(count / perPage),
      searchTerm: '',
      login: req.isAuthenticated(),
      session: req.session
    });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Error loading category');
    return res.redirect("/products");
  }
});

// GET: display a certain product by its id
router.get("/:slug/:id", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  try {
    const product = await Product.findById(req.params.id).populate("category");
    res.render("shop/product", {
      pageName: product.title,
      product,
      successMsg,
      errorMsg,
      moment: moment,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

export default router;
