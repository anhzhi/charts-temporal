export const sortDate = (obj) => {
	let arr = []
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			arr.push({
				'key': prop,
				'value': obj[prop]
			})
		}
	}
	// arr.sort(function(a, b) { return a.value - b.value; });
	arr.sort(function(a, b) {
		const aA = a.key.split("/")
		const bB = b.key.split("/")

		const aYear = parseInt(aA[1], 10)
		const bYear = parseInt(bB[1], 10)
		const aMonth = parseInt(aA[0], 10)
		const bMonth = parseInt(bB[0], 10)

		if(aYear === bYear) {
			if(aMonth > bMonth) return 1
			if(aMonth < bMonth) return -1
			return 0
		}
		if(aYear > bYear) return 1
		if(aYear < bYear) return -1
		return 0
	})
	return arr // returns array
}

export const sortObject = (obj) => {
	let arr = []
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			arr.push({
				'key': prop,
				'value': obj[prop]
			})
		}
	}
	// arr.sort(function(a, b) { return a.value - b.value; });
	arr.sort(function(a, b) {
		if (a.key > b.key) return 1
		if (a.key < b.key) return -1
		return 0
	})
	return arr // returns array
}

const progressionDict = {
	Behav0: "Unhelpful behaviours",
	Diffsits0: "Difficult situations",
	Emot0: "Emotional impact",
	Phys0: "Physical sensations",
	Negth0: "Negative thoughts",
	Lifestyle0: "Lifestyle"
}

export const calculateRecoveryProgression = (data, initialKey) => {
	const currentKey = `Current-${initialKey.split("-")[1]}`
	return {
		name: progressionDict[initialKey.split("-")[1]],
		y: Math.round((100 * (data[initialKey] - data[currentKey]) / data[initialKey]) * 100) / 100
	}
}

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const hoursOfADay = ['0 h', '1 h', '2 h', '3 h', '4 h', '5 h', '6 h', '7 h', '8 h', '9 h',
	'10 h', '11 h', '12 h', '13 h', '14 h', '15 h', '16 h', '17 h', '18 h', '19 h',
	'20 h', '21 h', '22 h', '23 h']



