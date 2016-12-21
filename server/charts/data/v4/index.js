import User from '../../../db/mongo/models/user'
import v4Query from './query'
import modifyChartData from '../modifyChartData'
import db from '../../db'

export default async ({
	chartData,
	selectedServiceName,
	selectedDashboardId,
	isGrouped,
	startDate = 1262304000000,
	endDate = Date.now(),
	dataToExport
}) => {
	const query = await v4Query({selectedServiceName, selectedDashboardId, isGrouped, startDate, endDate})

	console.log("V4 PARAMS", selectedServiceName, selectedDashboardId, isGrouped, startDate, endDate)
	console.log("V4 QUERY", query)

	// LOOP THROUGH ALL THE USERS THAT MATCH THE QUERY
	const users = await User.find(query)

	await Promise.all(users.map(async user => {
		if (!user.profile) return

		let allocation
		if(!!Number(user.profile.allocationId)) {
			allocation = await db.allocations.findOne({allocationId: user.profile.allocationId})
		} else if(user.profile.allocationId) {
			allocation = await db.allocations.findOne({_id: user.profile.allocationId})
		}
		if (!allocation) return

		let serviceFound
		if(!!Number(user.profile.serviceId)) {
			serviceFound = await db.services.findOne({serviceId: user.profile.serviceId})
		} else if(user.profile.serviceId) {
			serviceFound = await db.services.findOne({_id: user.profile.serviceId})
		}
		
		if (!serviceFound) return

		// MUTATE USER OBJECT
		user.serviceName = serviceFound.name
		user.dashboardIds = serviceFound.dashboardId

		const assessment = await db.assessments.findOne({userId: user._id})
		const latestUpdate = await db.latestUpdate.findOne({userId: user._id})

		modifyChartData.v4.treatmentAccess({chartData, user})
		modifyChartData.totalActivationsOfCards({chartData, user})
		modifyChartData.v4.activationOfAccessCards({chartData, user})
		modifyChartData.v4.demographicProfile({chartData, user, assessment})
		modifyChartData.v4.treatmentPathway({chartData, user, assessment})
		modifyChartData.v4.focusOfTreatment({chartData, user, assessment})
		modifyChartData.v4.treatmentImpact({chartData, user, assessment, latestUpdate, dataToExport})
		modifyChartData.v4.treatmentRetention({chartData, user, assessment, dataToExport})
		modifyChartData.v4.treatmentCompletion({chartData, user, assessment})
	}))

	return {
		version: "v4",
		exportData: dataToExport
	}
}
