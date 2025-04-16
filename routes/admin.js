import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import Project from "../models/project.js";
import CustomProjectRequest from "../models/custom-project-request.js";

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.redirect('/user/login');
};

// Admin dashboard
router.get('/', isAdmin, async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      products: await Product.countDocuments(),
      orders: await Order.countDocuments(),
      projects: await Project.countDocuments(),
      requests: await CustomProjectRequest.countDocuments()
    };
    res.render('admin/dashboard', { stats });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error });
  }
});

// Users management
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.render('admin/users', { users });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error });
  }
});

// Products management
router.get('/products', isAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort('-createdAt');
    res.render('admin/products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error });
  }
});

// Orders management
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt');
    res.render('admin/orders', { orders });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error });
  }
});

// Projects management
router.get('/projects', isAdmin, async (req, res) => {
  try {
    const projects = await Project.find().sort('-createdAt');
    res.render('admin/projects', { projects });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error });
  }
});

// Custom project requests management
router.get('/requests', isAdmin, async (req, res) => {
  try {
    const requests = await CustomProjectRequest.find().sort('-createdAt');
    res.render('admin/requests', { requests });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error });
  }
});

export default router;