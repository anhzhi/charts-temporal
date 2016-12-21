import {addOne} from '../utils'

/*
 SECTION: Treatment impact

 GRAPH 1: Completion of Extended Brief Intervention for alcohol
 Pool = all users who have selected either the ‘Alcohol’ or ‘Alcohol and drugs’ pathway on screen 1 of the assessment
 EBI completed = % of users who have either completed the assessment (v3 users) OR seen the ‘traffic light’ feedback on their alcohol consumption against government guidelines (v4 users)
 EBI not completed = % of users who have started the assessment but not done either of the above

 GRAPH 2: Change in substance use
 Pool = all users who have completed the initial assessment and at least one progress check
 Notes:
 Only each user’s main problem substance is used to calculate this graph.
 The bars of the histogram should be vertical and shown in a downwards direction (i.e. below the 0% line) where there are mean reductions in substance use, and upwards (i.e. above the 0% line) were there are mean increases in substance use. Reductions should be represented by green bars and any increases by maroon bars (i.e. not bright red).
 Where there are less than 5 users for any particular substance/class of substances, that bar will not be shown on the histogram.
 The bars should always be in alphabetical order (as below).

 GRAPH 3: Maintained abstinence
 Pool = all users who have completed the assessment (v3 users) OR seen their diagram (v4 users) AND were not abstinent on their main problem substance
 Abstinence maintained = % of users who were abstinent on their main problem substance (i.e. 0 units and 0 days) at their most recent progress check
 Abstinence not maintained = % of users who are not abstinent on their main problem substance at their most recent progress check

 */

const checkIfValueInRecoveryProgression = (data, user, val) => {
	if(user[val] && !isNaN(user[val])) {
		data[val] = data[val] ? data[val] + user[val] : user[val]
	}
}

const treatmentSuccess = (user, problem) => {
	if(problem === "Alcohol") {
		const initialGoal = user['Initial-GoalAmountOfAlcohol'] * user['Initial-GoalNumberOfAlcoholUsingDays']
		const initialAmount = user['Initial-AlcoholUnitsPerDay'] * user['Initial-AlcoholUsingDays']
		const currentAmount = user['Current-AlcoholUnitsPerDay'] * user['Current-AlcoholUsingDays']

		if(!isNaN(initialGoal) && isNaN(currentAmount)) return {
			success: initialGoal >= initialAmount,
			initialGoal,
			initialAmount,
			currentAmount,
			abstinence: (initialAmount === 0 && currentAmount === 0) || (initialAmount === 0 && isNaN(currentAmount))
		}
		if (!isNaN(initialGoal) && !isNaN(initialAmount) && !isNaN(currentAmount)) {
			return {
				success: initialGoal >= currentAmount,
				reduction: initialAmount > currentAmount,
				value: ((initialAmount - currentAmount) / initialAmount) * 100,
				initialGoal,
				initialAmount,
				currentAmount,
				abstinence: (initialAmount === 0 && currentAmount === 0) || (initialAmount === 0 && isNaN(currentAmount))
			}
		}
	} else {
		const initialGoal = user['Initial-GoalAmountOfPrimarySubstance'] * user['Initial-GoalNumberOfPrimarySubstanceUsingDays']
		const initialAmount = user['Initial-PrimaryProblemSubstanceAmount'] * user['Initial-PrimaryProblemSubstanceDaysUsage']
		const currentAmount = user['Current-PrimaryProblemSubstanceAmount'] * user['Current-PrimaryProblemSubstanceDaysUsage']

		if (!isNaN(initialGoal) && isNaN(currentAmount)) return {
			success: initialGoal >= initialAmount,
			initialGoal,
			initialAmount,
			currentAmount,
			abstinence: (initialAmount === 0 && currentAmount === 0) || (initialAmount === 0 && isNaN(currentAmount))
		}
		if (!isNaN(initialGoal) && !isNaN(initialAmount) && !isNaN(currentAmount)) return {
			success: initialGoal >= currentAmount,
			reduction: initialAmount > currentAmount,
			value: ((initialAmount - currentAmount) / initialAmount) * 100,
			initialGoal,
			initialAmount,
			currentAmount,
			abstinence: (initialAmount === 0 && currentAmount === 0) || (initialAmount === 0 && isNaN(currentAmount))
		}
	}
}

const groupedSubstances = {
	"Alcohol": ["Alcohol"],
	"Amphetamines": ["Amphetamines", "Methamphetamine"],
	"Barbiturates": ["Mephobarbital", "Phenobarbital", "Pholcodine", "Quaaludes"],
	"Cannabis": ["Marijuana"],
	"Club drugs": ["Ecstasy", "GBL", "GHB", "Ketamine"],
	"Cocaine": ["Cocaine"],
	"Crack": ["Crack"],
	"Heroin": ["Heroin"],
	"New psychoactive substances": ["Etizolam", "Khat", "MDPV", "Mephedrone", "Methoxetamine", "MSJ", "Nitrous oxide", "Synthetic cannabis"],
	"Phencyclidine (PCP)": ["Phencyclidine (PCP)"],
	"Prescribed medications": ["Amitryptyline", "Codeine", "Diazepam", "Dihyrdocodeine", "Gabapentin", "Lorazepam", "Nitrazepam", "Pregabalin", "Temazepam", "Tramadol", "Zopiclone"],
	"Substitute medications": ["Buprenorphine", "Methadone", "Suboxone"],
	"Tobacco": ["Tobacco"]
}

const getMainProblem = (user) => {
	if(typeof user['main problem'] === "number" && isNaN(user['main problem'])) return
	if(user['main problem'].capitalizeFirstLetter() === "Alcohol") return "Alcohol"
	if(typeof user['drug type'] === "number" && isNaN(user['drug type'])) return
	const drug = user['drug type'].capitalizeFirstLetter()
	let groupedDrug = undefined
	Object.keys(groupedSubstances).some( m => {
		if(groupedSubstances[m].indexOf(drug) !== -1) {
			groupedDrug = m
		}
	})
	return groupedDrug || drug
}

const sumValueToData = (data, key, val) => {
	data[key] = data[key] ? data[key] + val : val
}

const v3MeasurableReductionsInSubstance = ({chartData, user, mainProblem, success, dataToExport}) => {
	if (mainProblem) {
		// MEASURABLE REDUCTIONS IN SUBSTANCE USE
		if ( success && success.initialAmount > 0 && success.reduction) {
			chartData.successCounter[mainProblem] = chartData.successCounter[mainProblem] || 0
			chartData.successValues[mainProblem] = chartData.successValues[mainProblem] ?
			(chartData.successValues[mainProblem] * chartData.successCounter[mainProblem] + success.value) / (chartData.successCounter[mainProblem] + 1 )
				: success.value
			chartData.successCounter[mainProblem] = addOne(chartData.successCounter[mainProblem])
			dataToExport.changeInSubstanceLabel.push({
				username: user.Username,
				mainProblem,
				success: success.value,
				initialAmount: success.initialAmount,
				currentAmount: success.currentAmount
			})
		}
	}
}


const v4MeasurableReductionsInSubstance = ({chartData, user, currentAmount, initialAmount, substance, dataToExport}) => {
	if (initialAmount > currentAmount) {
		const success = (( initialAmount - currentAmount ) / initialAmount ) * 100
		const counter = chartData.successCounter[substance] || 0
		chartData.successValues[substance] = (chartData.successValues[substance] * counter + success) / (counter + 1)
		chartData.successCounter[substance] = addOne(chartData.successCounter[substance])
		dataToExport.changeInSubstanceLabel.push({
			username: user.username,
			mainProblem: substance,
			initialAmount,
			currentAmount,
			success
		})
	}
}

const v3MantainedAbstinence = ({chartData, mainProblem, success}) => {
	if (mainProblem) {
		// MANTAINED ABSTINENCE
		if (success && success.initialAmount === 0) {
			const abstinence = success.abstinence ? "Abstinence maintained" : "Abstinence not maintained"
			chartData.mantainedAbstinence[abstinence] = chartData.mantainedAbstinence[abstinence] ? chartData.mantainedAbstinence[abstinence] + 1 : 1
		}
	}
}

const v4MantainedAbstinence = ({chartData, currentAmount, initialAmount}) => {
	const abstinence = currentAmount > initialAmount ? "Abstinence not maintained" : "Abstinence maintained"
	chartData.mantainedAbstinence[abstinence] = addOne(chartData.mantainedAbstinence[abstinence])
}

const v3RecoveryProgression = ({chartData, user, mainProblem}) => {
	if (mainProblem) {
		// RECOVERY PROGRESSION
		['Initial-Emot0', 'Current-Emot0', 'Initial-Negth0', 'Current-Negth0',
			'Initial-Diffsits0', 'Current-Diffsits0', 'Initial-Lifestyle0', 'Current-Lifestyle0',
			'Initial-Phys0', 'Current-Phys0', 'Initial-Behav0', 'Current-Behav0'].forEach(m => {
			checkIfValueInRecoveryProgression(chartData.recoveryProgression, user, m)
		})
	}
}

const v4RecoveryProgression = ({chartData, assessment, latestUpdate}) => {
	if(assessment.difficultSituations) {
		sumValueToData(chartData.recoveryProgression, 'Initial-Diffsits0', assessment.difficultSituations.difficultSituationsRate)
	}
	if(assessment.negativeThoughts) {
		sumValueToData(chartData.recoveryProgression, 'Initial-Negth0', assessment.negativeThoughts.negativeThoughtsRate)
	}
	if(assessment.physicalSensations) {
		sumValueToData(chartData.recoveryProgression, 'Initial-Phys0', assessment.physicalSensations.physicalSensationsRate)
	}
	if(assessment.unhelpfulBehaviours) {
		sumValueToData(chartData.recoveryProgression, 'Initial-Behav0', assessment.unhelpfulBehaviours.unhelpfulBehavioursRate)
	}
	if(assessment.lifestyle) {
		sumValueToData(chartData.recoveryProgression, 'Initial-Lifestyle0', assessment.lifestyle.lifestyleRate)
	}
	if(assessment.emotionalImpact) {
		sumValueToData(chartData.recoveryProgression, 'Initial-Emot0', assessment.emotionalImpact.emotionalImpactRate)
	}

	sumValueToData(chartData.recoveryProgression, 'Current-Diffsits0', latestUpdate.rate.difficultSituations)
	sumValueToData(chartData.recoveryProgression, 'Current-Negth0', latestUpdate.rate.negativeThoughts)
	sumValueToData(chartData.recoveryProgression, 'Current-Phys0', latestUpdate.rate.physicalSensations)
	sumValueToData(chartData.recoveryProgression, 'Current-Behav0', latestUpdate.rate.unhelpfulBehaviours)
	sumValueToData(chartData.recoveryProgression, 'Current-Lifestyle0', latestUpdate.rate.lifestyle)
	sumValueToData(chartData.recoveryProgression, 'Current-Emot0', latestUpdate.rate.emotionalImpact)
}

// COMPLETION OF EXTENDED BRIEF INTERVENTION FOR ALCOHOL
export const v3CompletionOfAlcohol = ({chartData, user, dataToExport}) => {
	if (Number(user.Age) && ["Alcohol", "AlcoholDrugs"].indexOf(user.version) > -1) { // Pool = The user has entered his age and entered have alcohol
		const EBI = (
			(!isNaN(user['Initial-GoalAmountOfAlcohol']) && !isNaN(user['Initial-GoalNumberOfAlcoholUsingDays'])) ||
			(!isNaN(user['Initial-GoalAmountOfPrimarySubstance'] && !isNaN(user['Initial-GoalNumberOfPrimarySubstanceUsingDays'])))
		) ? "EBI completed" : "EBI not completed"
		chartData.EBIValues[EBI] = addOne(chartData.EBIValues[EBI])
		dataToExport.EBILabel.push({
			username: user.Username,
			age: user.Age,
			addictionCase: user.version,
			"Initial-GoalAmountOfAlcohol": user['Initial-GoalAmountOfAlcohol'],
			'Initial-GoalNumberOfAlcoholUsingDays': user['Initial-GoalNumberOfAlcoholUsingDays'],
			'Initial-GoalAmountOfPrimarySubstance': user['Initial-GoalAmountOfPrimarySubstance'],
			'Initial-GoalNumberOfPrimarySubstanceUsingDays': user['Initial-GoalNumberOfPrimarySubstanceUsingDays'],
			EBILabel: EBI
		})
	}
}
export const v4CompletionOfAlcohol = ({chartData, user, age, addictionCase, completed, dataToExport}) => {
	const alcoholCase = addictionCase === 0 || addictionCase === 2
	if(age && alcoholCase) {
		const EBI =  completed.indexOf("drinking") !== -1 ? "EBI completed" : "EBI not completed"
		chartData.EBIValues[EBI] = addOne(chartData.EBIValues[EBI])
		dataToExport.EBILabel.push({
			username: user.username,
			age,
			addictionCase,
			completedAssessmentScreens: completed.join("+"),
			EBILabel: EBI
		})
	}
}

// TREATMENT IMPACT
export default {
	v3({chartData, user, dataToExport}) {
		const mainProblem = getMainProblem(user)
		const success = treatmentSuccess(user, mainProblem) // Success is an object - keys: reduction, value, success, initialGoal, initialAmount, abstinence
		v3CompletionOfAlcohol({chartData, user, dataToExport})
		v3MeasurableReductionsInSubstance({chartData, user, mainProblem, success, dataToExport})
		v3RecoveryProgression({chartData, user, mainProblem})
		v3MantainedAbstinence({chartData, mainProblem, success})
	},
	v4({chartData, user, assessment, latestUpdate, dataToExport}) {
		if (!assessment || !assessment.recoveryProgram) return

		const {completed} = assessment
		const {age, addictionCase, specialAddiction} = assessment.recoveryProgram

		v4CompletionOfAlcohol({chartData, user, age, addictionCase, completed, dataToExport})

		if (!latestUpdate) return

		v4RecoveryProgression({chartData, assessment, latestUpdate})

		// MAIN PROBLEM: ALCOHOL
		if (addictionCase === 0 || ( specialAddiction === 0 && addictionCase === 2 )) {
			const {drinking} = assessment
			const {currentDrinking} = latestUpdate
			const initialAmount = drinking.drinkingUnits * drinking.drinkingDays
			const currentAmount = currentDrinking.units * currentDrinking.days

			if (initialAmount === 0) {
				// MANTAINED ABSTINENCE
				v4MantainedAbstinence({chartData, currentAmount, initialAmount})
			}
			if (initialAmount !== 0) {
				// MEASURABLE REDUCTIONS IN SUBSTANCE USE
				const substance = "Alcohol"
				v4MeasurableReductionsInSubstance({chartData, user, currentAmount, initialAmount, substance, dataToExport})
			}
		}

		// MAIN PROBLEM: DRUGS
		if (addictionCase === 1 || ( specialAddiction === 1 && addictionCase === 2 )) {
			const {drugs} = assessment.drugs
			const {drugs: latestDrugs} = latestUpdate
			const drugName = Object.keys(drugs)[0]

			const initialAmount = drugs[drugName].amount * drugs[drugName].frequency
			const currentAmount = latestDrugs[drugName].dailyUse * latestDrugs[drugName].weeklyUse

			if (initialAmount === 0) {
				// MANTAINED ABSTINENCE
				v4MantainedAbstinence({chartData, currentAmount, initialAmount})
			}
			if (initialAmount !== 0) {
				// MEASURABLE REDUCTIONS IN SUBSTANCE USE
				const substance = drugName.capitalizeFirstLetter()
				v4MeasurableReductionsInSubstance({chartData, user, currentAmount, initialAmount, substance, dataToExport})
			}
		}
	}
}
