import mongoose, { Schema, Types } from "mongoose";
import randomstring from "randomstring";
import { systemRoles } from "../../src/utils/system-roles.js";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 3, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 3, maxlength: 20 },
    userName: { type: String },

    email: {
      type: String,
      required: true,
      unique: true,
      tirm: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
    },

    Bio: { type: String, default: null },
    contactInfo: [{ type: String, default: null }],
    education: {
      type: String,
      default: null,
    },

    experience: {
      type: String,
      default: null,
    },
    profile_pic: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dsx35oatb/image/upload/v1716410446/Code-Craft/user/profilepics/defaults/Windows_10_Default_Profile_Picture.svg_ry6suu.png",
      },
      id: {
        type: String,
        default:
          "Code-Craft/user/profilepics/defaults/Windows_10_Default_Profile_Picture.svg_ry6suu",
      },
    },

    gender: { type: String, enum: ["male", "female"] },
    role: {
      type: String,
      enum: Object.values(systemRoles),
      default: systemRoles.USER,
    },

    age: {
      type: Number,
      min: 8,
      max: 100,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    forgetCode: {
      type: String,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isDeleted: { type: Boolean, default: false },

    accessToken: {
      token: { type: String },
      isValid: { type: Boolean, default: true },
    },

    isBanned: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    recentlyViewedCourses: [{ type: Types.ObjectId, ref: "Course" }],

    coursesUploaded: [{ type: Types.ObjectId, ref: "Course" }],
    coursesUploadedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const code = randomstring.generate({
  length: 3,
  charset: "numeric",
});
userSchema.pre("save", function (next) {
  this.userName = this.firstName.toLowerCase() + code;

  next();
});
userSchema.pre("save", function (next) {
  this.coursesUploadedCount = this.coursesUploaded.length;
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
