import mongoose from 'mongoose';
const { Schema } = mongoose

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
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
    allocationId : Schema.Types.Mixed,
    serviceId : Schema.Types.Mixed,
    loginTokens: [{
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
        },
        time: Number
    }],
    actionStrategies: [String],
    nameOnCertificate: String,
    achievedGoal: Boolean,
    improvedDomain: Boolean,
    timeSpent: Boolean
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}, {timestamps: true});

export default mongoose.model('User', UserSchema);
