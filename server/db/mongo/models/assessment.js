import mongoose from 'mongoose';
const { Schema } = mongoose
const AssessmentSchema = new mongoose.Schema({
  "drinking" : {
    "drinkingUnits" : Number,
    "drinkingDays" : Number,
    "drinkingRate" : Number
  },
  "drinkingGoal" : {
    "drinkingGoalUnits" : Number,
    "drinkingGoalFreeDays" : Number
  },
  "recoveryProgram" : {
    "addictionCase" : Number,
    "gender" : Number,
    "age" : Number,
    "ethnicity" : Number
  },
  "life" : {
    "lifeQualityRate" : Number,
    "healthRate" : Number,
    "activityRate" : Number,
    "relationshipsRate" : Number,
    "capacityRate" : Number,
    "difficultiesRate" : Number,
    "lifeRate" : Number
  },
  "physicalSensations" : {
    "cravingDrugs" : Number,
    "shakes" : Number,
    "cramps" : Number,
    "nausea" : Number,
    "tiredness" : Number,
    "physicalSensationsRate" : Number
  },
  "drinkingFeeling" : {
    "drinkingOutOfControl" : Number,
    "drinkingAnxiety" : Number,
    "drinkingWillToStop" : Number,
    "drinkingDifficultyToStop" : Number,
    "drinkingWorry" : Number
  },
  "assessmentComplete" : Boolean,
  "difficultSituations" : {
    "relationshipConflict" : Number,
    "workProblems" : Number,
    "moneyConcerns" : Number,
    "excessiveRisks" : Number,
    "externalPressure" : Number,
    "difficultSituationsRate" : Number
  },
  "negativeThoughts" : {
    "negativeThoughtsParanoid" : Number,
    "negativeThoughtsOutOfControl" : Number,
    "negativeThoughtsRate" : Number,
    "negativeThoughtsCannotCope" : Number,
    "negativeThoughtsGoodEnough" : Number,
    "negativeThoughtsHealthSocial" : Number
  },
  "userId" : String,
  "completed" : [
    String
  ],
  "time" : Number,
  "unhelpfulBehaviours" : {
    "becomeAgressive" : Number,
    "stoppedGoingOut" : Number,
    "selfInjured" : Number,
    "policeTrouble" : Number,
    "unhelpfulBehavioursRate" : Number,
    "behaviourNotBeingActive" : Number
  },
  "lifestyle" : {
    "lifestyleRate" : Number,
    "healthProblems" : Number,
    "workEducationProblems" : Number,
    "leisureProblems" : Number,
    "relationshipsProblems" : Number,
    "housingProblems" : Number
  },
  "emotionalImpact" : {
    "emotionalImpactRate" : Number,
    "emotionalImpactNervious" : Number,
    "emotionalImpactWorried" : Number,
    "emotionalImpactDepressed" : Number,
    "emotionalImpactBad" : Number,
    "emotionalImpactLittleInterest" : Number
  }
});

export default mongoose.model('Assessment', AssessmentSchema, 'assessments');
