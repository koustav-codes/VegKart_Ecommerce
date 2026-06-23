const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [4, 'User name must be more than 3 characters'],
      maxlength: [31, 'User name must be less than 32 characters'],
    },

    email: {
      type: String,
      required: [true, 'User email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email',
      },
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },

    image: {
      type: String,
      default: defaultImagePath,
    },

    address: {
      type: String,
      required: [true, 'User Address Required'],
    },

    phone: {
      type: String,
      required: [true, 'Phone Number Required'],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;