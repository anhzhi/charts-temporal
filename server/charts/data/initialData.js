const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


const hoursOfADay = ['0 h', '1 h', '2 h', '3 h', '4 h', '5 h', '6 h', '7 h', '8 h', '9 h',
	'10 h', '11 h', '12 h', '13 h', '14 h', '15 h', '16 h', '17 h', '18 h', '19 h',
	'20 h', '21 h', '22 h', '23 h']


const dayOfTheWeek = () => weekDays.reduce( (prev, user) => {
	return {
		...prev,
		[user]: 0
	}
}, {})

const momentOfTheDay = () => hoursOfADay.reduce( (prev, user) => {
	return {
		...prev,
		[user]: 0
	}
}, {})

export default () => {
	return {
		totalActivationCodes: 0,
		activationDateValues: {},
		activationCodesByServiceValues: {},
		activationCodesByDashboardValues: {},
		versionValues: {},
		mainProblemValues: {},
		mainProblemOnlyDrugsValues: {},
		genderValues: {},
		ethnicityValues: {},
		ageValues: {},
		workingHours: {
			"Within service operating hours": 0,
			"Outside service hours": 0
		},
		dayOfTheWeek: dayOfTheWeek(),
		momentOfTheDay: momentOfTheDay(),
		signUpWithValues: {},
		EBIValues: {
			"EBI completed": 0,
			"EBI not completed": 0
		},
		retentionValues: {
			"Retention rate": 0,
			"Attrition rate": 0
		},
		successYN: {
			"Successful treatment": 0,
			"Non-successful treatment": 0
		},
		mantainedAbstinence: {
			"Abstinence maintained": 0,
			"Abstinence not maintained": 0
		},
		successValues: {},
		successCounter: {},
		completionValues: {
			"Treatment completed": 0,
			"Treatment ongoing": 0
		},
		signUpWorkingHours: {
			"Within service operating hours": 0,
			"Outside service hours": 0
		},
		signUpDayOfTheWeek: dayOfTheWeek(),
		signUpMomentOfTheDay: momentOfTheDay(),
		recoveryProgression: {}
	}
}