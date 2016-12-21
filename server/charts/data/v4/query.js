import db from '../../db'

export default async ({selectedServiceName, selectedDashboardId, isGrouped, startDate, endDate}) => {
	// PREPARE QUERY
	if(!(selectedServiceName || selectedDashboardId)) {
		return {}
	} else if(!selectedServiceName) {
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

		const allocations = await db.allocations
			.find({
				$or: [
					{dashboardId: { $in: [selectedDashboardId, ...dashboardIds] }},
					{serviceId: 	{ $in: serviceIds }}
				]
			})

		const allocationIds = allocations.map(m => m.umbracoSource ? m.allocationId : m._id).filter( m => m )

		return {
			"profile.allocationId": {$in: allocationIds},
			createdAt: {$gt: new Date(startDate), $lt: new Date(endDate)}
		}
	} else {
		const serviceDoc = await db.services.findOne({
			name: selectedServiceName,
			history: {$elemMatch: { $or: [{
				timestamp: {$lt: endDate},
				finished: {$gt: startDate}
			}, {
				timestamp: {$lt: endDate},
				finished: null
			}]}}
		})

		if (!serviceDoc) {
			return {
				"profile.allocationId": {$in: []}
			}
		}

		const allocations = await db.allocations
			.find({
				$or: [
					{serviceId: serviceDoc._id },
					{serviceId: serviceDoc.serviceId }
				]
			})

		const allocationIds = allocations.map(m => m.umbracoSource ? m.allocationId : m._id).filter( m => m )

		return {
			"profile.allocationId": {$in: allocationIds},
			createdAt: {$gt: new Date(startDate), $lt: new Date(endDate)}
		}
	}
}
