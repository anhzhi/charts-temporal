import {addOne} from '../utils'

const getMainProblem = (curr) => {
	if(typeof curr['main problem'] === "number" && isNaN(curr['main problem'])) return
	if(curr['main problem'].capitalizeFirstLetter() === "Alcohol") return "Alcohol"
	if(typeof curr['drug type'] === "number" && isNaN(curr['drug type'])) return
	return curr['drug type'].capitalizeFirstLetter()
}
// MAIN PROBLEM SUBSTANCE: ALCOHOL OR DRUGS
const v3MainProblemSubstanceAlcoholOrDrugs = ({chartData, mainProblem}) => {
	if (mainProblem) {
		const AlcoholOrDrugs = mainProblem === "Alcohol" ? "Alcohol" : "Drugs"
		chartData.mainProblemValues[AlcoholOrDrugs] = addOne(chartData.mainProblemValues[AlcoholOrDrugs])
	}
}

const v4MainProblemSubstanceAlcoholOrDrugs = ({chartData, mainProblem}) => {
	if (mainProblem) {
		const AlcoholOrDrugs = mainProblem === "Alcohol" ? "Alcohol" : "Drugs"
		chartData.mainProblemValues[AlcoholOrDrugs] = addOne(chartData.mainProblemValues[AlcoholOrDrugs])
	}
}

// MAIN PROBLEM SUBSTANCE: DRUG PROFILE
const v3MainProblemSubstanceDrugProfile = ({chartData, mainProblem}) => {
	if(mainProblem && mainProblem !== "Alcohol") {
		chartData.mainProblemOnlyDrugsValues[mainProblem] = addOne(chartData.mainProblemOnlyDrugsValues[mainProblem])
	}
}

const v4MainProblemSubstanceDrugProfile = ({chartData, mainProblem}) => {
	if(mainProblem && mainProblem !== "Alcohol") {
		// v4 uses Synthetic-cannabis, v3 uses Synthetic cannabis
		let newMainProblem

		if (mainProblem == "Synthetic-cannabis") {
			newMainProblem = mainProblem.replace(/-/g, " ")
		} else {
			newMainProblem = mainProblem
		}

		chartData.mainProblemOnlyDrugsValues[newMainProblem] = addOne(chartData.mainProblemOnlyDrugsValues[newMainProblem])
	}
}

export default {
	v3({chartData, user}) {
		const mainProblem = getMainProblem(user)
		v3MainProblemSubstanceAlcoholOrDrugs({chartData, mainProblem})
		v3MainProblemSubstanceDrugProfile({chartData, mainProblem})
	},
	v4({chartData, assessment}) {
		if (!assessment || !assessment.recoveryProgram) return
		const { addictionCase, specialAddiction } = assessment.recoveryProgram
		const drugs = assessment.drugs && assessment.drugs.drugs
		const mainProblem = addictionCase === 0 || (addictionCase === 2 && specialAddiction === 0) ?
			"Alcohol" : drugs && Object.keys(drugs)[0].capitalizeFirstLetter()
		v4MainProblemSubstanceAlcoholOrDrugs({chartData, mainProblem})
		v4MainProblemSubstanceDrugProfile({chartData, mainProblem})

	}
}