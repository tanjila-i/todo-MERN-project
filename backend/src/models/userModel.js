import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: [3, "user name min length 3"],
      maxlength: [20, "user name max length 20"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
