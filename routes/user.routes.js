const express = require("express");
const userControllers = require("../controllers/user.controllers");
const multerErrorHndler = require("../middleware/multer.error");
const upload = require("../middleware/upload.multer");
const router = express.Router();

router.post(
  "/register",
  upload.single("photo"),
  multerErrorHndler,
  userControllers.signup
);
router.post("/login", userControllers.login);
router.post(
  "/add-fav",
  userControllers.protectRoutes,
  userControllers.addMovieToFav
);
module.exports = router;
