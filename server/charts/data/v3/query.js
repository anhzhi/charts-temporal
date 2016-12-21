import db from '../../db'

export default async ({selectedServiceName, selectedDashboardId, isGrouped, startDate, endDate}) => {
	if(!(selectedServiceName || selectedDashboardId)) {
		// SELECT ALL
		return {}
	} else if(!selectedServiceName) {
		// ONLY SELECTED DASHBOARD
		let dashboardIds = []

		if(isGrouped) {
			const dashboardChildren = await db.dashboards
				.find({$or: [{ parentDashboardId: selectedDashboardId }]})

			dashboardIds = dashboardChildren.map(m => m.umbracoSource ? m.dashboardId : m._id).filter( m => m )
		}

		const servicesInDashboard = await db.services
			.find({history: {$elemMatch: { $or: [{
					dashboardId: {$in: [selectedDashboardId, ...dashboardIds]},
					timestamp: {$lt: endDate},
					finished: {$gt: startDate}
				}, {
					dashboardId: {$in: [selectedDashboardId, ...dashboardIds]},
					timestamp: {$lt: endDate},
					finished: null
				}]}
			}})
		
		const serviceIds = servicesInDashboard.map(m => m.umbracoSource ? m.serviceId : m._id).filter( m => m )

		return {
			ServiceId: {$in: serviceIds},
			'Access Code activation date': {$gt: new Date(startDate), $lt: new Date(endDate)}
		}
	} else {
		// SELECTED SERVICE
		return {
			ServiceName: selectedServiceName,
			'Access Code activation date': {$gt: new Date(startDate), $lt: new Date(endDate)}
		}
	}
}
