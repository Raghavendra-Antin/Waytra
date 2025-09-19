const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

//**********ANOTHER WAY OF DEFINING***********/

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Define a separate schema for the image field
// const imageSchema = new Schema({
//   filename: { type: String },
//   url: {
//     type: String,
//     default:
//       "https://cdn.vectorstock.com/i/500p/17/30/financial-crisis-isometric-concept-vector-36621730.jpg",
//     set: (v) =>
//       v === ""
//         ? "https://cdn.vectorstock.com/i/500p/17/30/financial-crisis-isometric-concept-vector-36621730.jpg"
//         : v,
//   },
// });

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: imageSchema, // use the subdocument schema here
//   price: Number,
//   location: String,
//   country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

//*************BELOW CODE HAVE SOME ERRORS****************/

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     default:
//       "https://cdn.vectorstock.com/i/500p/17/30/financial-crisis-isometric-concept-vector-36621730.jpg",
//     set: (v) =>
//       v === ""
//         ? "https://cdn.vectorstock.com/i/500p/17/30/financial-crisis-isometric-concept-vector-36621730.jpg"
//         : v,
//   },

//   price: Number,
//   location: String,
//   country: String,
// });
// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
