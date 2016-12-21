import {addOne} from '../utils'

export const groupByMonthYear = (dt) => {
	const month = dt.getMonth() + 1
	const year = dt.getFullYear()
	return `${month}/${year}`
}

const v3AOACByMonth = ({chartData, user}) => {
	// ACTIVATION OF ACCESS CARDS BY MONTH
	const activationDate = groupByMonthYear(user['Access Code activation date'])
	chartData.activationDateValues[activationDate] = addOne(chartData.activationDateValues[activationDate])
}

const v4AOACByMonth = ({chartData, user}) => {
	// ACTIVATION OF ACCESS CARDS BY MONTH
	const activationDate = groupByMonthYear(user.createdAt)
	chartData.activationDateValues[activationDate] = addOne(chartData.activationDateValues[activationDate])
}

const v3AOACByDashboard = ({chartData, user}) => {
	// ACTIVATION OF ACCESS CARDS BY DASHBOARD
	const userDashboardId = user.DashboardId
	chartData.activationCodesByDashboardValues[userDashboardId] = addOne(chartData.activationCodesByDashboardValues[userDashboardId])
}

const v4AOACByDashboard = ({chartData, user}) => {
	// ACTIVATION OF ACCESS CARDS BY DASHBOARD
	user.dashboardIds.forEach(userDashboardId => {
		chartData.activationCodesByDashboardValues[userDashboardId] = addOne(chartData.activationCodesByDashboardValues[userDashboardId])
	})
}

const v3AOACByService = ({chartData, user}) => {
	// ACTIVATION OF ACCESS CARDS BY SERVICE
	const userServiceName = user.ServiceName
	chartData.activationCodesByServiceValues[userServiceName] = addOne(chartData.activationCodesByServiceValues[userServiceName])
}

const v4AOACByService = ({chartData, user}) => {
	// ACTIVATION OF ACCESS CARDS BY SERVICE
	const userServiceName = user.serviceName
	chartData.activationCodesByServiceValues[userServiceName] =  addOne(chartData.activationCodesByServiceValues[userServiceName])
}

export default {
	v3({chartData, user}) {
		v3AOACByMonth({chartData, user})
		v3AOACByDashboard({chartData, user})
		v3AOACByService({chartData, user})
	},
	v4({chartData, user}) {
		v4AOACByMonth({chartData, user})
		v4AOACByDashboard({chartData, user})
		v4AOACByService({chartData, user})
	}
}
