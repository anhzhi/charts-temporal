import {addOne} from '../utils'

/*
 SECTION: Treatment retention

 GRAPH: Actively engaged in treatment
 Pool = all users who have activated an account AND completed screen 1 of the assessment
 Retention rate = % of users who have set their first treatment goal.
 Attrition rate = % of users who have not set their first treatment goal.
 */


// ACTIVELY ENGAGED IN TREATMENT
const v3ActivelyEngagedInTreatment = ({chartData, user, dataToExport}) => {
	if (Number(user.Age)) { // Pool = The user has entered his age
		const treatmentRetention = (
			(!isNaN(user['Initial-GoalAmountOfAlcohol']) && !isNaN(user['Initial-GoalNumberOfAlcoholUsingDays'])) ||
			(!isNaN(user['Initial-GoalAmountOfPrimarySubstance'] && !isNaN(user['Initial-GoalNumberOfPrimarySubstanceUsingDays'])))
		) ?
			"Retention rate" : 	// Retention rate = % of users who have set their first treatment goal.
			"Attrition rate"		// Attrition rate = % of users who have not set their first treatment goal.
		chartData.retentionValues[treatmentRetention] = addOne(chartData.retentionValues[treatmentRetention])
		dataToExport.retentionLabel.push({
			username: user.Username,
			age: user.Age,
			"Initial-GoalAmountOfAlcohol": user['Initial-GoalAmountOfAlcohol'],
			'Initial-GoalNumberOfAlcoholUsingDays': user['Initial-GoalNumberOfAlcoholUsingDays'],
			'Initial-GoalAmountOfPrimarySubstance': user['Initial-GoalAmountOfPrimarySubstance'],
			'Initial-GoalNumberOfPrimarySubstanceUsingDays': user['Initial-GoalNumberOfPrimarySubstanceUsingDays'],
			retentionLabel: treatmentRetention
		})
	}
}

const v4ActivelyEngagedInTreatment = ({chartData, user, assessment, dataToExport}) => {
	if (!assessment || !assessment.recoveryProgram) return  // Pool = The user has entered his age
	const {completed} = assessment

	const treatmentRetention =
		(completed.indexOf("drinking-goal") !== -1 || completed.indexOf("drugs-goal") !== -1) ?
			"Retention rate" : // Retention rate = % of users who have set their first treatment goal.
			"Attrition rate"   // Attrition rate = % of users who have not set their first treatment goal.
	chartData.retentionValues[treatmentRetention] = addOne(chartData.retentionValues[treatmentRetention])
	dataToExport.retentionLabel.push({
		username: user.username,
		age: assessment.recoveryProgram.age,
		completedAssessmentScreens: completed.join("+"),
		retentionLabel: treatmentRetention
	})
}

// TREATMENT RETENTION
export default {
	v3(data) {
		v3ActivelyEngagedInTreatment(data)
	},
	v4(data) {
		v4ActivelyEngagedInTreatment(data)
	}
}
