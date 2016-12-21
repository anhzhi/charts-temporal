/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const { Schema } = mongoose

// Other oauthtypes to be added

/*
 User Admin Schema
 */


const AdminUserSchema = new mongoose.Schema({
  _id: String,
  emails: [{
    address: { type: String, lowercase: true },
    verified: Boolean
  }],
  username: { type: String, unique: true },
  services: {
    password: {
      bcrypt: String
    }
  },
  roles: [ String ],
  profile: {
    admin: {
      name : String,
      dashboardId : Schema.Types.Mixed, // Be careful here - try to allow Numbers, too
      isGrouped : Boolean,
      parentDashboardId : Schema.Types.Mixed, // Be careful here - try to allow Numbers, too
      createdAt : Number,
      umbracoSource : Boolean,
    },
    loginTokens: {
      type: [{
        browser: {
          name: String,
          version: String,
          major: String
        },
        cpu: {
          architecture: String
        },
        device: Object,
        engine: {
          version: String,
          name: String
        },
        os: {
          name: String,
          version: String
        }
      }]
    },
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}, {timestamps: true});

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('services.password.bcrypt')) return next();
  return bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.services.password.bcrypt, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      console.log("HASH PASSWORD")
      user.services.password.bcrypt = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
AdminUserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
AdminUserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.services.password.bcrypt, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

AdminUserSchema.statics = {};

export default mongoose.model('AdminUser', AdminUserSchema);
