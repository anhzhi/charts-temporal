import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import * as Colors from 'material-ui/styles/colors'

const MainFilterMenu = ({changeMainFilter, mainFilterSelected, generatePDF, loadingData}) => {
	// TODO: WINDOW.innerwitdth
	const isMobile = false
	return (
		<div className={`flex cell wrap ${isMobile ? "justify-center" : "justify-between"}`} style={{marginBottom: 30}}>
			<RaisedButton
				className={`topButton gradient-button ${mainFilterSelected === "reach" ? 'purple-disable-button' : 'purple-button'}`}
				style={{minWidth: 200}}
				onTouchTap={() => changeMainFilter("reach")}
				label="Treatment Reach"
				labelStyle={{color: Colors.fullWhite, textTransform: "none"}}
				disabled={mainFilterSelected === "reach"}
			/>
			<RaisedButton
				className={`topButton gradient-button ${mainFilterSelected === "outcomes" ? 'blue-disable-button' : 'light-blue-button'}`}
				style={{minWidth: 200}}
				disabled={mainFilterSelected === "outcomes"}
				label="Treatment Outcomes"
				onTouchTap={() => changeMainFilter("outcomes")}
				labelStyle={{color: Colors.fullWhite, textTransform: "none"}}
			/>
			<RaisedButton
				className={`topButton gradient-button ${loadingData ? 'green-disable-button' : 'green-button'}`}
				style={{minWidth: 200}}
				disabled={loadingData}
				onTouchTap={() => {
						!loadingData && generatePDF()
					}
				}
				label="Generate PDF Report"
				labelStyle={{color: Colors.fullWhite, textTransform: "none"}}
			/>
		</div>
	)
}

MainFilterMenu.propTypes = {
	changeMainFilter: PropTypes.func,
	dispatch: PropTypes.func,
	mainFilterSelected: PropTypes.string
}

export default MainFilterMenu
