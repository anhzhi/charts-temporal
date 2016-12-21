import v3Query from './query'
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
	const query = await v3Query({selectedServiceName, selectedDashboardId, isGrouped, startDate, endDate})

	const users = await db.umbracodb.find(query)

	// console.log("V3 PARAMS", selectedServiceName, selectedDashboardId, isGrouped, startDate, endDate)
	// console.log("V3 QUERY", query)
	users.map((user) => {
		modifyChartData.totalActivationsOfCards({chartData, user})
		modifyChartData.v3.treatmentPathway({chartData, user})
		modifyChartData.v3.focusOfTreatment({chartData, user})
		modifyChartData.v3.demographicProfile({chartData, user})
		modifyChartData.v3.activationOfAccessCards({chartData, user})
		modifyChartData.v3.treatmentRetention({chartData, user, dataToExport})
		modifyChartData.v3.treatmentCompletion({chartData, user})
		modifyChartData.v3.treatmentImpact({chartData, user, dataToExport})
		modifyChartData.v3.treatmentAccess({chartData, user})
	})

	return {
		version: "v3",
		exportData: {}
	}
}
