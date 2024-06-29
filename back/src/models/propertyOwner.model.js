import mongoose from "mongoose";

const propertyOwnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Id: {
      type: Number,
      required: true,
      default: () => Math.floor(100000 + Math.random() * 900000), // Generate a random ID between 100000 and 999999
    },
    title: {
      type: String,
      required: true,
      maxlength: 100, // You can set a maximum length if desired
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000, // You can set a maximum length if desired
    },
    Area: {
      type: String,
      required: true,
    },
    HouseType: {
      type: String,
      required: true,
      enum: ["House", "Apartment", "Studio"],
    },
    City: {
      type: String,
      required: true,
    },
    Street: {
      type: String,
      required: true,
    },
    HouseNumber: {
      type: Number,
      required: true,
    },
    NumberOfRooms: {
      type: Number,
      required: true,
    },
    NumberOfBeds: {
      type: Number,
      required: true,
    },
    Balcony: {
      type: Boolean,
      required: true,
    },
    Disability: {
      type: Boolean,
      required: true,
    },
    Elevator: {
      type: Boolean,
      required: true,
    },
    Furnished: {
      type: Boolean,
      required: true,
    },
    Parking: {
      type: Boolean,
      required: true,
    },
    AirCondition: {
      type: Boolean,
      required: true,
    },
    SecureSpace: {
      type: Boolean,
      required: true,
    },
    interiorImages: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "interiorImages must be a non-empty array",
      },
    },
    exteriorImage: {
      type: String,
      required: true,
    },
    Popularity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PropertyOwner = mongoose.model("PropertyOwner", propertyOwnerSchema);
export default PropertyOwner;
