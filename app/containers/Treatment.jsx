import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchDashboardById, fetchDashboards, fetchServices, fetchChartsData } from '../fetch-data/fetchChartData'
// import treatmentPDF from '../js/PDFs/treatmentPDF.js'
import * as actions from '../actions/charts'

import ContentBox from '../components/core/ContentBox'
import Container from '../components/core/Container'
import TreatmentCharts from './TreatmentCharts'
import MainFilterMenu from './MainFilterMenu'
import DatesFilterMenu from './DatesFilterMenu'
import DashboardsFilter from './DashboardsFilter'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import * as Colors from 'material-ui/styles/colors'

const filterParentDashboards = (dashboards, filter) => {
	return new Promise((resolve, reject) => {
		let uniqueParentDashboards = []
		const parents = dashboards.filter(f => {
			const dId = f.umbracoSource ? f.dashboardId : f._id
			if ((f.parentDashboardId === 219 || !f.parentDashboardId) && uniqueParentDashboards.indexOf(dId) === -1) {
				uniqueParentDashboards.push(dId)
				return true
			}
		})
		if(filter) {
			resolve(parents.filter(f => {
					return (
						typeof(f.name) === "string" &&
						f.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
					)
				})
			)
		}
		resolve(parents)
	})
}

const filterDashboards = (dashboards, selectedParentDashboardId) => {
	return new Promise((resolve, reject) => {
		let uniqueDashboards = []
		resolve(dashboards.filter(f => {
				const dId = f.umbracoSource ? f.dashboardId : f._id
				if (!selectedParentDashboardId && f.parentDashboardId !== 219 && uniqueDashboards.indexOf(dId) === -1) {
					uniqueDashboards.push(dId)
					return true
				}
				if (f.parentDashboardId === selectedParentDashboardId && uniqueDashboards.indexOf(dId) === -1) {
					uniqueDashboards.push(dId)
					return true
				}
			})
		)
	})
}

class TreatmentLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadingData: false,
			dashboardFilter: undefined,
			showConfirmationPDF: false,
			mainFilterSelected: "reach",
			dashboard: {},
			services: [],
			filteredParents: [],
			filteredDashboards: []
		}
	}


	componentDidMount() {
		Promise.all([
			this.updateParentDashboards(),
			this.updateDashboards(),
			this.updateDashboard(),
			this.updateServices()
		]).then(() => {
			this.reRenderGraphs()
		})
	}

	/*
	 ---------------------
	 UPDATE CONFIDENTIAL DATA
	 ---------------------
	 */

	updateParentDashboards = () => {
		return fetchDashboards()
			.then(dashboards => {
				return filterParentDashboards(dashboards, this.state.dashboardFilter)
			})
			.then(dashboards => {
				this.setState({
					filteredParents: dashboards
				})
				return dashboards
			})
			.catch(e => {
				console.log("updateParentDashboards err", e)
			})
	}

	updateDashboard = () => {
		return fetchDashboardById(this.props.selectedDashboardId)
			.then((dashboard) => {
				this.setState({
					dashboard: dashboard || {}
				})
				return dashboard
			})
			.catch(e => {
				console.log("updateDashboard err", e)
			})
	}

	updateDashboards = () => {
		return fetchDashboards()
			.then(dashboards => {
				filterDashboards(dashboards, this.props.selectedParentDashboardId)
			})
			.then((dashboards) => {
				this.setState({
					filteredDashboards: dashboards
				})
				return dashboards
			})
			.catch(e => {
				console.log("updateDashboards err", e)
			})
	}

	updateServices = () => {
		return fetchServices({
			selectedParentDashboardId: this.props.selectedParentDashboardId,
			selectedDashboardId: this.props.selectedDashboardId,
			startDate: this.props.startDate,
			endDate: this.props.endDate
		})
			.then((services) => {
				this.setState({
					services: services
				})
			})
			.catch(e => {
				console.log("updateServices err", e)
			})
	}


	/*
	 ----------------
	 RENDERING GRAPHS
	 ----------------
	 */

	reRenderGraphs = () => {
		fetchDashboardById(this.props.selectedDashboardId)
			.then((dashboard) => {
				if (this.props.selectedService) {
					this.selectDashboard(dashboard)
					this.selectService(this.props.selectedService)
				} else if (this.props.selectedDashboardId) {
					this.selectDashboard(dashboard)
				} else if (this.props.selectedParentDashboardId) {
					fetchDashboardById(this.props.selectedParentDashboardId)
						.then((parentDashboard) => {
							this.selectParentDashboard(parentDashboard)
						})
				} else {
					// TODO: CHECK IF METEOR USER IS ADMIN
					this.updateParentDashboards()
						.then(parents => {
							this.selectParentDashboard(parents[0])
						})
						.catch(e => {
							console.log("reRenderGraphs err", e)
						})
				}
			})
			.catch(e => {
				console.log("updateDashboard err", e)
			})
	}

	getChartsData = ({serviceName, selectedDashboardId, isGrouped}) => {
		this.setState({
			loadingData: true
		})
		this.props.resetChartData()
		return fetchChartsData({
			serviceName: serviceName,
			dashboard: selectedDashboardId,
			isGrouped,
			startDate: this.props.startDate,
			endDate: this.props.endDate
		})
			.then(results => {
				console.log("getChartsData", results)
				this.props.setChartData({...results.chartData})
				results.v3Data && this.props.setExportData({version: "v3", exportData: results.v3Data.exportData})
				results.v4Data && this.props.setExportData({version: "v4", exportData: results.v4Data.exportData})

				this.setState({loadingData: false})
			})
			.catch(e => {
				console.log("getChartsData", e)
			})
	}


	/*
	 -----------------
	 FILTERS ON CHANGE
	 -----------------
	 */

	selectService = (serviceName) => {
		getChartsData = ({
			serviceName,
			selectedDashboardId: this.props.selectedDashboardId || this.props.selectedParentDashboardId,
			isGrouped: this.props.selectedDashboardId ? false : true
		}).then(() => {
			this.props.plotGraph({
				mainFilterSelected: this.state.mainFilterSelected,
				selectedParentDashboardId: this.props.selectedParentDashboardId,
				selectedParentDashboardIsGrouped: this.props.selectedParentDashboardIsGrouped
			})
			this.props.selectService(serviceName)
		})
	}


	selectParentDashboard = (dashboard) => {
		let selectedDashboardId
		if (dashboard) {
			selectedDashboardId = dashboard.umbracoSource ? dashboard.dashboardId : dashboard._id
		}

		this.getChartsData({
				selectedDashboardId,
				isGrouped: dashboard && dashboard.isGrouped,
				umbracoSource: dashboard && dashboard.umbracoSource
			})
			.then(() => {
				this.props.plotGraph({
					mainFilterSelected: this.state.mainFilterSelected,
					selectedParentDashboardId: selectedDashboardId,
					selectedParentDashboardIsGrouped: dashboard && dashboard.isGrouped
				})
				this.props.selectService(undefined)
			})

		this.props.selectDashboard(undefined)
		this.props.selectParentDashboard(selectedDashboardId)
		this.props.selectParentDashboardIsGrouped(dashboard && dashboard.isGrouped)

		setTimeout(() => {
			this.updateParentDashboards()
			this.updateDashboards()
			this.updateServices()
		}, 0)
	}

	selectDashboard = (dashboard) => {
		if (!dashboard) return
		const selectedDashboardId = dashboard.umbracoSource ? dashboard.dashboardId : dashboard._id
		if (selectedDashboardId) {
			this.getChartsData({
					selectedDashboardId,
					isGrouped: dashboard.isGrouped,
					umbracoSource: dashboard.umbracoSource
				})
				.then(() => {
					this.props.plotGraph({
						mainFilterSelected: this.state.mainFilterSelected,
						selectedParentDashboardId: selectedDashboardId,
						selectedParentDashboardIsGrouped: dashboard && dashboard.isGrouped
					})
					this.props.selectService(undefined)
				})
		}
		this.props.selectDashboard(selectedDashboardId)

		setTimeout(() => {
			this.updateDashboards()
			this.updateServices()
		}, 0)
	}

	changeMainFilter = (filterSelected) => {
		this.setState({mainFilterSelected: filterSelected})
		this.props.selectMainFilter(filterSelected)
	}

	filterDashboards = (dashboard) => {
		this.setState({dashboardFilter: dashboard})
	}

	render() {
		const {mainFilterSelected} = this.state

		const isAdmin = false

		const containerProps = {
			title: this.state.dashboard ? this.state.dashboard.name : "Dashboards",
			superTitle: "Breaking Free Outcomes Dashboard"
		}

		console.log("RENDER")
		
		return (
			<Container {...containerProps}>
				<MainFilterMenu
					changeMainFilter={this.changeMainFilter}
					mainFilterSelected={mainFilterSelected}
					generatePDF={this.onPrint}
					loadingData={this.state.loadingData}
				/>
				<ContentBox title="Filter graphs" rootDivStyle={{backgroundColor: 'rgba(255,255,255, 0.9)'}}>
					<DashboardsFilter
						isAdmin={isAdmin}
						selectedParentDashboardId={this.props.selectedParentDashboardId}
						filteredParents={this.state.filteredParents}
						selectParentDashboard={this.selectParentDashboard}
						selectDashboard={this.selectDashboard}
						filteredDashboards={this.state.filteredDashboards}
						selectedParentDashboardIsGrouped={this.props.selectedParentDashboardIsGrouped}
						selectedDashboardId={this.props.selectedDashboardId}
						filterDashboards={this.filterDashboards}
					/>
					<div className="flex">
						<div className="cell">
							<h4 style={{marginTop: 15}}>Service: </h4>
						</div>
						<div style={{flex: 3}}>
							<SelectField fullWidth={true}
										 value={ this.props.selectedService }
										 onChange={(e, i, v) => {return this.selectService(v)}}>
								<MenuItem value={undefined} primaryText="All"/>
								{
									/* this.state.services.map((v, i) => {
										return <MenuItem key={`service${i}`} value={v} primaryText={v}/>
									})
									*/
								}
							</SelectField>
						</div>
					</div>
					<DatesFilterMenu
						setFilterDate={this.props.setFilterDate}
						reRenderGraphs={this.reRenderGraphs}
						startDate={this.props.startDate}
						endDate={this.props.endDate}
						range={this.props.range}/>
				</ContentBox>
				<TreatmentCharts
					loadingData={this.state.loadingData}
					totalActivationCodes={this.props.chartData.totalActivationCodes}
					isAdmin={isAdmin}
					graphHeights={this.props.graphHeights}
					mainFilterSelected={mainFilterSelected}
					exportCsv={(version, name) => downloadCSV({
					data: this.props.exportData[version][name],
					fileName: name})}
				/>
				<Snackbar
					className="snackbar"
					open={this.state.showConfirmationPDF}
					message="Report have been saved in the resources section"
					autoHideDuration={6000}
					onRequestClose={this.hideConfirmationPDF}/>
				<div className="flex justify-center">
					<RaisedButton
						className={`topButton gradient-button orange-button`}
						label="Return To Top"
						labelStyle={{color: Colors.fullWhite, textTransform: "none"}}
						onTouchTap={() => console.log("TODO: GO TO TOP")}>
					</RaisedButton>
				</div>
			</Container>
		)
	}

	hideConfirmationPDF = () => {
		this.setState({showConfirmationPDF: false})
	}

	onPrint = () => {
		// const service = this.props.selectedService ? this.props.selectedService : ''
		// const dashboardId = this.props.selectedDashboardId || this.props.selectedParentDashboardId
		// const dashboard = DashboardsCollection.findOne({
		// 	$or: [
		// 		{_id: dashboardId},
		// 		{dashboardId: dashboardId}
		// 	]
		// }).name
		//
		// treatmentPDF({dashboard, service}).then((res) => {
		// 	console.log(res)
		// 	if(res) {
		// 		res.success && this.setState({showConfirmationPDF: true})
		// 	}
		// 	this.props.plotGraph({
		// 		mainFilterSelected: this.state.mainFilterSelected,
		// 		selectedParentDashboardId: this.props.selectedDashboardId,
		// 		selectedParentDashboardIsGrouped: this.props.selectedParentDashboardIsGrouped
		// 	})
		// })
	}
}

TreatmentLayout.propTypes = {
	dashboards: PropTypes.array,
	dispatch: PropTypes.func,
	startDate: PropTypes.number,
	endDate: PropTypes.number,
	range: PropTypes.string,
	selectedService: PropTypes.string,
	// selectedDashboardId: PropTypes.string,
	// selectedParentDashboardId: PropTypes.string,
	selectDashboard: PropTypes.func,
	selectParentDashboard: PropTypes.func,
	selectParentDashboardIsGrouped: PropTypes.func,
	selectService: PropTypes.func,
	setFilterDate: PropTypes.func,
	setChartData: PropTypes.func,
	resetChartData: PropTypes.func,
	prepareV3Data: PropTypes.func,
	prepareV4Data: PropTypes.func,
	plotGraph: PropTypes.func,
	chartData: PropTypes.object,
	exportData: PropTypes.object,
	setExportData: PropTypes.func,
	graphHeights: PropTypes.object,
	selectMainFilter: PropTypes.func
}

const mapStateToProps = (state) => { // eslint-disable-line no-unused-vars
  return {
		selectedService: state.charts.selectedService,
		selectedDashboardId: state.charts.selectedDashboardId,
		selectedParentDashboardId: state.charts.selectedParentDashboardId,
		selectedParentDashboardIsGrouped: state.charts.selectedParentDashboardIsGrouped,
		startDate: state.charts.startDate,
		endDate: state.charts.endDate,
		range: state.charts.range,
		chartData: state.charts.chartData,
		exportData: state.charts.exportData,
		graphHeights: state.charts.graphHeights
	}
}

const mapDispatchToProps = (dispatch) => { // eslint-disable-line no-unused-vars
  return {
		dispatch,
		...bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentLayout)

// export default () => {
// 	return <div>Hello</div>
// }