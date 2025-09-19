const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(listingController.index) //index route
  .post(
    //create route
    isLoggedIn,

    upload.single("listing[image]"),
    validateListing, //this is a middleware
    wrapAsync(listingController.createListing)
  );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) ///show route
  .put(
    //Update route
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,

    wrapAsync(listingController.updateListing)
  )
  .delete(
    //Destroy route
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
