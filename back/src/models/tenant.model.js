import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    familySize: {
      type: Number,
      required: true,
    },
    preferredArea: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
    },
    babies: {
      type: Number,
      required: true,
    },
    pet: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;
