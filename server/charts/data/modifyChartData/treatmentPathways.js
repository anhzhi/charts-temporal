import {addOne} from '../utils'

// BREAKING FREE TREATMENT PATHWAYS
export const v3TreatmentPathway = ({chartData, user}) => {
	const version = user.version === "AlcoholDrugs" ? "Both" : user.version
	if (version !== "None") {
		chartData.versionValues[version] = chartData.versionValues[version] ? chartData.versionValues[version] + 1 : 1
	}
}

export const v4TreatmentPathway = ({chartData, addictionCase}) => {
	const version = addictionCase === 0 ? "Alcohol" : addictionCase === 1 ? "Drugs" : "Both"
	chartData.versionValues[version] = addOne(chartData.versionValues[version])
}

// TREATMENT PATHWAYS
export default {
	v3({chartData, user}) {
		v3TreatmentPathway({chartData, user})
	},
	v4({chartData, assessment}) {
		if (!assessment || !assessment.recoveryProgram) return
		const {addictionCase} = assessment.recoveryProgram
		v4TreatmentPathway({chartData, addictionCase})
	}
}
