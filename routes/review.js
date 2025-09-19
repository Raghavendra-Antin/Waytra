const express = require("express");
const router = express.Router({ mergeParams: true }); //to access :id from app.js
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlewares.js");

const reviewController = require("../controllers/reviews.js");

router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.createReview)
);

//Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;

//Reviews
//post review route

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New villa",
//     description: "By the Beach",
//     price: 1200,
//     location: "calangut, goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successfull");
// });
