import {addOne} from '../utils'

const ethnicities = ["White: British", "White: Other", "Mixed: White & Black Carribean", "White: Irish", "Mixed: White & Black African", "Mixed: White & Asian", "Mixed: Other", "Asian or Asian British: Indian", "Asian or Asian British: Pakistani", "Asian or Asian British: Bangladeshi", "Asian or Asian British: Other", "Black or Black British: Caribbean", "Black or Black British: African", "Black or Black British: Other", "Other Ethnic Group"]

const groupAges = (age) => {
	if (age !== "0" && (typeof age !== "string" || typeof age !== "number")) {
		const intAge = parseInt(age, 10)
		if (intAge < 15) { return "<15"	}
		if (intAge >= 15 && intAge <= 19) {	return "15-19" }
		if (intAge >= 20 && intAge <= 24) {	return "20-24" }
		if (intAge >= 25 && intAge <= 29) {	return "25-29" }
		if (intAge >= 30 && intAge <= 34) {	return "30-34" }
		if (intAge >= 35 && intAge <= 39) {	return "35-39" }
		if (intAge >= 40 && intAge <= 44) {	return "40-44" }
		if (intAge >= 45 && intAge <= 49) {	return "45-49" }
		if (intAge >= 50 && intAge <= 54) {	return "50-54" }
		if (intAge >= 55 && intAge <= 59) {	return "55-59" }
		if (intAge >= 60 && intAge <= 64) {	return "60-64" }
		if (intAge >= 65 && intAge <= 69) {	return "65-69" }
		if (intAge >= 70) {	return "70+"	}
	}
}
// AGE
const v3Age = ({chartData, user}) => {
	const age = groupAges(user.Age)
	if (typeof age === "string") {
		chartData.ageValues[age] = chartData.ageValues[age] ? chartData.ageValues[age] + 1 : 1
	}
}

const v4Age = ({chartData, age}) => {
	const ageVerbose = groupAges(age)
	chartData.ageValues[ageVerbose] = addOne(chartData.ageValues[ageVerbose])
}

// ETHNICITY
const v3Ethnicity = ({chartData, user}) => {
	const ethnicity = user.Ethnicity
	if (typeof ethnicity === "string") {
		chartData.ethnicityValues[ethnicity] = chartData.ethnicityValues[ethnicity] ? chartData.ethnicityValues[ethnicity] + 1 : 1
	}
}

const v4Ethnicity = ({chartData, ethnicity}) => {
	const ethnicityVerbose = ethnicities[ethnicity]
	chartData.ethnicityValues[ethnicityVerbose] = addOne(chartData.ethnicityValues[ethnicityVerbose])
}

// GENDER
const v3Gender = ({chartData, user}) => {
	const gender = user.Gender == 10 ? "Male" : user.Gender == 20 ? "Female" : undefined
	if (gender) {
		chartData.genderValues[gender] = chartData.genderValues[gender] ? chartData.genderValues[gender] + 1 : 1
	}
}

const v4Gender = ({chartData, gender}) => {
	const genderVerbose = gender === 0 ? "Male" : "Female"
	chartData.genderValues[genderVerbose] = addOne(chartData.genderValues[genderVerbose])
}


export default {
	v3({chartData, user}) {
		v3Age({chartData, user})
		v3Ethnicity({chartData, user})
		v3Gender({chartData, user})
	},
	v4({chartData, user, assessment}) {
		// Check if they haven't completed any step in the assessment
		if (!assessment || !assessment.recoveryProgram) return
		const {age, gender, ethnicity} = assessment.recoveryProgram

		v4Age({chartData, age})
		v4Ethnicity({chartData, ethnicity})
		v4Gender({chartData, gender})
	}
}