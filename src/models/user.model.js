import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 80,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    bio: {
      type: String,
      maxLength: 500,
    },
    location: {
      type: String,
      maxLength: 120,
    },
    phone: {
      type: String,
      maxLength: 20,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    isVerified: { type: Boolean, default: false },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

//Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//compare plain password with hash

UserSchema.methods.matchPassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
