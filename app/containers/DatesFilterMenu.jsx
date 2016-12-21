import React, { PropTypes } from 'react'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const DatesFilterMenu = ({setFilterDate, reRenderGraphs, startDate, endDate, range}) => {
	const selectPeriod = (period) => {
		switch (period) {
			case "year": {
				const startDateOneYearAgo = new Date(); startDateOneYearAgo.setFullYear((new Date()).getFullYear() - 1)

				setFilterDate({startDate: startDateOneYearAgo, endDate: Date.now(), range: period})
				setTimeout(() => {
					reRenderGraphs()
				}, 1)
				break
			}
			default: {
				setFilterDate({startDate: undefined, endDate: undefined, range: undefined})
				setTimeout(() => {
					reRenderGraphs()
				}, 1)
			}
		}
	}

	return (
		<div>
			<div className="flex justify-end wrap" style={{marginBottom: 15}}>
				<div style={{flex: 1}}>
					<h4
						style={{marginTop: 15}}>{ "Select time:" }</h4>
				</div>
				<div style={{flex: 3}} className="flex">
					<SelectField value={range} onChange={(e, i, v) => selectPeriod(v)} fullWidth>
						<MenuItem value={undefined} primaryText="Full licence period" />
						<MenuItem value={`year`} primaryText="Last 12 months" />
					</SelectField>
				</div>
			</div>
			<div className="flex justify-end wrap" style={{marginBottom: 15}}>
				<div style={{flex: 1}}>
					<h4
						style={{marginTop: 15}}>{ "Custom time:" }</h4>
				</div>
				<div style={{flex: 3}} className="flex">
					<div style={{flex: 1}}>
						<DatePicker hintText="Start date" container="inline"
												className="date-picker"
												style={{paddingRight: 5}}
												fullWidth
												value={startDate ? new Date(startDate) : undefined}
												onChange={(e, date) => {
														setFilterDate({startDate: date.getTime(), endDate, range: undefined})
														setTimeout(() => {
															reRenderGraphs()
														}, 0)
													}}/>
					</div>
					<div style={{flex: 1}}>
						<DatePicker hintText="End date"
												container="inline"
												className="date-picker"
												fullWidth
												style={{paddingLeft: 5}}
												value={endDate ? new Date(endDate) : new Date()} onChange={(e, date) => {
														setFilterDate({startDate, endDate: date.getTime(), range: undefined})
														setTimeout(() => {
															reRenderGraphs()
														}, 0)
													}}/>
					</div>
				</div>
			</div>
		</div>
	)
}

DatesFilterMenu.propTypes = {
	setFilterDate: PropTypes.func,
	reRenderGraphs: PropTypes.func,
	startDate: PropTypes.number,
	endDate: PropTypes.number,
	range: PropTypes.string
}

export default DatesFilterMenu