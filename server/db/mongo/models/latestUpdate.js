import mongoose from 'mongoose';
const { Schema } = mongoose
const LatestUpdateSchema = new mongoose.Schema({
  "qualityOfLife" : {
    "relationships" : Number,
    "work" : Number,
    "difficulties" : Number,
    "lifeRate" : Number,
    "rate" : Number,
    "health" : Number,
    "activity" : Number
  },
  "currentDrinking" : {
    "days" : Number,
    "outOfControl" : Number,
    "anxiety" : Number,
    "worry" : Number,
    "willToStop" : Number,
    "difficultyToStop" : Number,
    "units" : Number
  },
  "emotionalImpact" : {
    "littleInterest" : Number,
    "depressed" : Number,
    "nervous" : Number,
    "worried" : Number
  },
  "drugs" : {},
  "userId" : String,
  "time" : Number,
  "rate" : {
    "lifestyle" : Number,
    "emotionalImpact" : Number,
    "difficultSituations" : Number,
    "negativeThoughts" : Number,
    "unhelpfulBehaviours" : Number,
    "physicalSensations" : Number
  }
});

export default mongoose.model('LatestUpdate', LatestUpdateSchema, 'latestUpdate');
