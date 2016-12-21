import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const DashboardsFilterMenu = ({isAdmin, selectedParentDashboardId,
	filteredParents, selectParentDashboard, filteredDashboards, selectedParentDashboardIsGrouped,
	selectedDashboardId, filterDashboards, selectDashboard}) => {
	// TODO: WINDOW.innerwitdth
	const isMobile = false
	return (
		<div>
			{ isAdmin && <div className="flex">
				<TextField
					hintStyle={{fontSize: '16px', color: 'rgba(0,0,0,0.6)'}}
					hintText="Filter dashboards"
					onChange={(e) => filterDashboards(e.target.value)}
					fullWidth
				/>
			</div> }
			{
				isAdmin &&
				<div className="flex">
					{
						!isMobile &&
						<div className="cell">
							<h4
								style={{marginTop: 15}}>{ selectedParentDashboardId && !!selectedParentDashboardIsGrouped ?
								"Select parent dashboard:" : "Select dashboard:" }</h4>
						</div>
					}

					<div style={{flex: 3}}>
						<SelectField fullWidth={true}
												 value={ selectedParentDashboardId ? selectedParentDashboardId : undefined }
												 onChange={(e, i, v) => {
														if (v === "all") return selectParentDashboard((v))
														if(!v) {return selectParentDashboard()}
														const parentSelected = filteredParents.filter( f => {
															if (f.umbracoSource) {
																return f.dashboardId === v
															} else {
																return f._id === v
															}
														})
														return selectParentDashboard(parentSelected[0])
													}}>
							{ isAdmin ?
								[<MenuItem value={undefined} primaryText="All"/>,
									filteredParents.map((v, i) => {
										return <MenuItem key={`filteredParents-all-${i}`} value={v.umbracoSource ? v.dashboardId : v._id} primaryText={v.name}/>
									})
								] :
								filteredParents.map((v, i) => {
									return <MenuItem key={`filteredParents-${i}`} value={v.umbracoSource ? v.dashboardId : v._id} primaryText={v.name}/>
								})
							}
						</SelectField>
					</div>
				</div>
			}

			{ selectedParentDashboardId && !!selectedParentDashboardIsGrouped &&
			<div className="flex">
				<div className="cell">
					<h4
						style={{marginTop: 15}}>{ "Select dashboard:" }</h4>
				</div>
				<div style={{flex: 3}}>
					<div className="flex">
						<div className="cell">
							<SelectField fullWidth={true}
													 value={selectedDashboardId ? selectedDashboardId : undefined }
													 onChange={(e, i, v) => {
														 		if(!v) {
																	const parentSelected = filteredParents.filter( f => {
																		if(f.umbracoSource) {
																			return f.dashboardId === selectedParentDashboardId
																		} else {
																			return f._id === selectedParentDashboardId
																		}
																	})
																	return selectParentDashboard(parentSelected[0])
																}
														 		const dashboardSelected = filteredDashboards.filter( f => {
																	if(f.umbracoSource) {
																		return f.dashboardId === v
																	} else {
																		return f._id === v
																	}
																})
														 		return selectDashboard(dashboardSelected[0])
															}}>
								<MenuItem key={`0-0`} value={undefined} primaryText="All"/>
								{filteredDashboards.sort(compareByName).map((v, i) => {
									return <MenuItem key={`filteredDashboards-${i}`} value={v.umbracoSource ? v.dashboardId : v._id} primaryText={v.name}/>
								})
								}
							</SelectField>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	)
}

DashboardsFilterMenu.propTypes = {
	isAdmin: PropTypes.bool,
	filteredParents: PropTypes.array,
	selectParentDashboard: PropTypes.func,
	filteredDashboards: PropTypes.array,
	selectedParentDashboardIsGrouped: PropTypes.bool,
	filterDashboards: PropTypes.func,
	changeMainFilter: PropTypes.func,
	dispatch: PropTypes.func,
	mainFilterSelected: PropTypes.string
}

export default DashboardsFilterMenu
