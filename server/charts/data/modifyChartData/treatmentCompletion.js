import {addOne} from '../utils'

/*
 Treatment completion graph

 Pool = all users who have completed the assessment (v3 users) OR seen their diagram (v4 users)
 Treatment completed = % of users who have fulfilled at least ONE of these five conditions:
 1. At initial assessment they were not abstinent on their main problem substance and have subsequently achieved their treatment goal on that substance at any follow up
 2. They have improved on at least 3 domains of their diagram – i.e. gone from red to amber, from red to green, or from amber to green
 3. At initial assessment they had an SDS score of 7 or more and have subsequently recorded a score of 6 or less at any follow up
 4. 	They have logged into Breaking Free at least 6 times
 5.  	They have logged into Breaking Free for at least 10,800 seconds (i.e. 3 hours)
 6.    They have completed any three strategies (information strategies or action strategies)
 Treatment ongoing = % of users who have not yet fulfilled any of these conditions
 Please note: let’s exclude the users who start abstinent and stay abstinent from this graph because it’s not adding a lot anyway and we’re dealing with them in a separate graph now.
 */

export const getMainProblem = (user) => {
	if(typeof user['main problem'] === "number" && isNaN(user['main problem'])) return
	if(user['main problem'].capitalizeFirstLetter() === "Alcohol") return "Alcohol"
	if(typeof user['drug type'] === "number" && isNaN(user['drug type'])) return
	return user['drug type'].capitalizeFirstLetter()
}

const getCategoryOfDomain = (domain) => {
	if([0, 1, 2].indexOf(domain) > -1) return 0
	if([3, 4, 5, 6].indexOf(domain) > -1) return 1
	if([7, 8, 9, 10].indexOf(domain) > -1) return 2
}

const hasImprovedDomains = (user, initialDomain, currentDomain) => {
	if(isNaN(user[initialDomain]) && isNaN(user[currentDomain])) return false
	if(user[currentDomain] !== -1) return false
	if(user[initialDomain] > user[currentDomain]) return false
	return getCategoryOfDomain(user[initialDomain]) > getCategoryOfDomain(user[currentDomain])
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

		if (!isNaN(initialGoal) && !isNaN(currentAmount) && !isNaN(initialAmount)) {
			return {
				success: initialGoal >= currentAmount,
				reduction: initialAmount > currentAmount || initialAmount < currentAmount,
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

		if(!isNaN(initialGoal) && isNaN(currentAmount)) return {
			success: initialGoal >= initialAmount,
			initialGoal,
			initialAmount,
			currentAmount,
			abstinence: (initialAmount === 0 && currentAmount === 0) || (initialAmount === 0 && isNaN(currentAmount))
		}
		if (!isNaN(initialGoal) && !isNaN(currentAmount) && !isNaN(initialAmount)) {
			return {
				success: initialGoal >= currentAmount,
				reduction: initialAmount > currentAmount || initialAmount < currentAmount,
				value: ((initialAmount - currentAmount) / initialAmount) * 100,
				initialGoal,
				initialAmount,
				currentAmount,
				abstinence: (initialAmount === 0 && currentAmount === 0) || (initialAmount === 0 && isNaN(currentAmount))
			}
		}
	}
}

export const treatmentCompletedV3 = (user) => {
	// They have logged into Breaking Free for at least 10,800 seconds
	if(user.TotalTimeOnline > 10800) return true

	// They have logged into Breaking Free at least 6 times
	if(user.NumberOfLogins >= 6) return true

	// At initial assessment they were not abstinent on their main problem substance and have subsequently achieved their treatment goal on that substance at any follow up
	const problem = getMainProblem(user)
	const success = treatmentSuccess(user, problem)
	if(success && (success.initialAmount === 0 || success.currentAmount === 0)) return true
	if(success && success.success && !success.abstinence) return true

	// They have completed any three strategies
	let completedCounter = 0
	user.CompleteDestructiveBehaviours1 && completedCounter++
	user.CompleteDestructiveBehaviours2 && completedCounter++
	user.CompleteDifficultSituations1 && completedCounter++
	user.CompleteDifficultSituations2 && completedCounter++
	user.CompleteLifestyle1 && completedCounter++
	user.CompleteLifestyle2 && completedCounter++
	user.CompleteNegativeThoughts1 && completedCounter++
	user.CompleteNegativeThoughts2 && completedCounter++
	user.CompletePhysicalSensations1 && completedCounter++
	user.CompletePhysicalSensations2 && completedCounter++
	user.CompleteEmotions1 && completedCounter++
	user.CompleteEmotions2 && completedCounter++

	// They have improved on at least 3 domains of their diagram – i.e. gone from red to amber, from red to green, or from amber to green
	let domainsCounter = 0
	hasImprovedDomains(user, 'Initial-Emot0', 'Current-Emot0') && domainsCounter++
	hasImprovedDomains(user, 'Initial-Negth0', 'Current-Negth0') && domainsCounter++
	hasImprovedDomains(user, 'Initial-Diffsits0', 'Current-Diffsits0') && domainsCounter++
	hasImprovedDomains(user, 'Initial-Lifestyle0', 'Current-Lifestyle0') && domainsCounter++
	hasImprovedDomains(user, 'Initial-Phys0', 'Current-Phys0') && domainsCounter++
	hasImprovedDomains(user, 'Initial-Behav0', 'Current-Behav0') && domainsCounter++
	if (domainsCounter >= 3 || completedCounter >= 3) return true

	return false
}

const treatmentCompletedV4 = (user) => {
	const {loginTokens, timeSpent, improvedDomain, achievedGoal, actionStrategies} = user.profile
	if(loginTokens.length >= 6) return true
	if(timeSpent > 10800) return true

	return (improvedDomain || achievedGoal || actionStrategies >= 3)
}

// STATUS OF TREATMENT
export const v3StatusOfTreatment = ({chartData, user}) => {
	if(user.CompletedLBM === 1) { // Pool = all users who have completed the assessment (v3 users) OR seen their diagram (v4 users)
		const userTreatmentCompleted = treatmentCompletedV3(user) ? "Treatment completed" : "Treatment ongoing"
		chartData.completionValues[userTreatmentCompleted] = addOne(chartData.completionValues[userTreatmentCompleted])
	}
}

export const v4StatusOfTreatment = ({chartData, user, assessmentComplete}) => {
	if(assessmentComplete) {
		const userTreatmentCompleted = treatmentCompletedV4(user) ? "Treatment completed" : "Treatment ongoing"
		chartData.completionValues[userTreatmentCompleted] = addOne(chartData.completionValues[userTreatmentCompleted])
	}
}

// TREATMENT COMPLETION
export default {
	v3({chartData, user}) {
		v3StatusOfTreatment({chartData, user})
	},
	v4({chartData, user, assessment}) {
		if (!user.profile.loginTokens || !assessment) return
		const {assessmentComplete} = assessment

		v4StatusOfTreatment({chartData, user, assessmentComplete})
	}
}