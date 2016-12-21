import {addOne} from '../utils'

/*
 SECTION: Treatment access

 GRAPH: Treatment accessed outside service operating hours
 Pool = all users who have activated an account AND completed screen 1 of the assessment
 Outside service hours = % of total number of logins that have occurred outside normal office hours (i.e. 09.00-17.00 Monday to Friday)
 Within service operating hours = % of total number of logins that have occurred outside normal office hours
 */

const ONE_HOUR = 3600000
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const from9to5 = (time) => {
	const date = typeof time === "number" ? new Date(time) : time
	const startOf = new Date(new Date(time).setHours(0, 0, 0, 0) + ONE_HOUR * 9)
	const endOf = new Date(new Date(time).setHours(0, 0, 0, 0) + ONE_HOUR * 17)
	return date > startOf && date < endOf
}

const isWeekend = (time) => {
	const date = typeof time === "number" ? new Date(time) : time
	return date && ~[0, 6].indexOf(date.getDay())
}

const getDayOfTheWeek = (time) => {
	const date = typeof time === "number" ? new Date(time) : time
	return date && weekDays[date.getDay()]
}

const getMomentOfTheDay = (time) => {
	const date = typeof time === "number" ? new Date(time) : time
	return date.getHours() + " h"
}

// TREATMENT ACCESSED OUTSIDE SERVICE OPERATION HOURS
const v3TreatmentAccessOutsideOperationHours = ({chartData, user}) => {
	const signUpWorkingHours = from9to5(user['Access Code activation date']) && !isWeekend(user['Access Code activation date']) ?
		"Within service operating hours" : "Outside service hours"
	chartData.signUpWorkingHours[signUpWorkingHours] = addOne(chartData.signUpWorkingHours[signUpWorkingHours])
}

const v4TreatmentAccessOutsideOperationHours = ({chartData, user}) => {
	const signUpWorkingHours = from9to5(user.createdAt) && !isWeekend(user.createdAt) ?
		"Within service operating hours" : "Outside service hours"
	chartData.signUpWorkingHours[signUpWorkingHours] = addOne(chartData.signUpWorkingHours[signUpWorkingHours])
}

// PERCENTAGE OF LOGINS AT WORKING HOURS
const v4LoginsAtWorkingHours = ({chartData, login}) => {
	const workingHours = from9to5(login.time) && !isWeekend(login.time) ? "Within service operating hours" : "Outside service hours"
	chartData.workingHours[workingHours] = addOne(chartData.workingHours[workingHours])
}

// PERCENTAGE OF LOGINS ON EACH DAY OF THE WEEK
const v4LoginsWeekDay = ({chartData, login}) => {
	chartData.dayOfTheWeek[getDayOfTheWeek(login.time)] = addOne(chartData.dayOfTheWeek[getDayOfTheWeek(login.time)])
}

// MOMENT OF THE DAY USERS LOGIN
const v4LoginsMomentOfDay = ({chartData, login}) => {
	chartData.momentOfTheDay[getMomentOfTheDay(login.time)] = addOne(chartData.momentOfTheDay[getMomentOfTheDay(login.time)])
}

// WEB BROWSER ACCOUNT CREATION
const v4WebBrowser = ({chartData, loginTokens}) => {
	const signUpWith = loginTokens.length && loginTokens[0].browser.name
	chartData.signUpWithValues[signUpWith] = addOne(chartData.signUpWithValues[signUpWith])
}

// TREATMENT ACCESS
export default {
	v3({chartData, user}) {
		v3TreatmentAccessOutsideOperationHours({chartData, user})
	},
	v4({chartData, user}) {
		v4TreatmentAccessOutsideOperationHours({chartData, user})

		const {loginTokens} = user.profile
		if (!loginTokens) return

		loginTokens.map(login => {
			v4LoginsAtWorkingHours({chartData, login})
			v4LoginsWeekDay({chartData, login})
			v4LoginsMomentOfDay({chartData, login})
		})

		v4WebBrowser({chartData, loginTokens})

	}
}