import dotenv from "dotenv";
dotenv.config();

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import csrf from "csurf";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import Category from "./models/category.js";

import adminRoutes from "./routes/admin.js";
import indexRouter from "./routes/index.js";
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/user.js";
import pagesRouter from "./routes/pages.js";

const app = express();
connectDB();

// View engine setup
app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "ejs");

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost/bags-ecommerce",
      ttl: 24 * 60 * 60 // = 1 day
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === 'production'
    },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Make CSRF token available in all views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Error handling for CSRF
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    req.flash("error", "Invalid form submission. Please try again.");
    return res.redirect("back");
  }
  next(err);
});

// Admin routes
app.use("/admin", adminRoutes);

// Global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    const categories = await Category.find({}).sort({ title: 1 }).exec();
    res.locals.categories = categories;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Add breadcrumbs
const get_breadcrumbs = (url) => {
  const rtn = [{ name: "Home", url: "/" }];
  let acc = ""; // accumulative url
  const arr = url.substring(1).split("/");

  for (let i = 0; i < arr.length; i++) {
    acc = i !== arr.length - 1 ? acc + "/" + arr[i] : null;
    rtn[i + 1] = {
      name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
      url: acc,
    };
  }
  return rtn;
};
app.use((req, res, next) => {
  req.breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
});

// Routes configuration
app.use("/products", productsRouter);
app.use("/user", usersRouter);
app.use("/pages", pagesRouter);
app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;
app.set("port", PORT);
app.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;