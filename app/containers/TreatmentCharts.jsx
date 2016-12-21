import React from 'react'
import ContentBox from '../components/core/ContentBox'
import TitleBF from '../components/core/Title'
import { ChasingDots } from 'better-react-spinkit'
import TreatmentTexts from './TreatmentTexts'
import RaisedButton from 'material-ui/RaisedButton'

const Loader = ({loadingData}) => {
	if(!loadingData) return <span />
	return (
		<div className="flex justify-center">
			<ChasingDots size={50} color="#9C27B0"/>
		</div>
	)
}

export default ({totalActivationCodes, isAdmin, loadingData, graphHeights, mainFilterSelected, exportCsv}) => {
	// TODO: WINDOW.innerwitdth
	const isMobile = false
	// const chartsContainer = document.getElementById("chartsContainer")
	// const chartsWidth = chartsContainer ? chartsContainer.clientWidth - 60 : 660
	const chartsWidth = 660
	return (
		<div id="chartsContainer">
			<ContentBox rootDivStyle={{display: mainFilterSelected === "reach" ? "block" : "none", position: "relative"}}>
				<TitleBF title="Activation of access cards by month" questionIcon={false} style={{justifyContent: "center"}}
								 info="This graph shows how many Breaking Free access codes have been activated each month, and the total number of account activations." />
				<Loader loadingData={loadingData}/>
				{ !loadingData && <h5 className="text-center">Total {totalActivationCodes}</h5> }
				<div id="activationDateContainer">
					<div id="activationDateGraph" style={{width: chartsWidth, height: !loadingData && graphHeights.activationDate }}></div>
				</div>
			</ContentBox>

			<ContentBox rootDivStyle={{display: mainFilterSelected === "reach" ? "block" : "none"}}>
				<TitleBF title="Activation of access cards by service" questionIcon={false} style={{justifyContent: "center"}}
								 info="This graph shows how many Breaking Free access codes have been activated within each service, and the total number of account activations." />
				<Loader loadingData={loadingData}/>
				{ !loadingData && <h5 className="text-center">Total {totalActivationCodes}</h5> }
				<div id="activationCodesByServiceContainer">
					<div id="activationCodesByServiceGraph" style={{width: chartsWidth, height: !loadingData && graphHeights.activationByService}}></div>
				</div>
			</ContentBox>

			<ContentBox title="Treatment pathways" rootDivStyle={{display: mainFilterSelected === "reach" ? "block" : "none"}}>
				<TitleBF title="Breaking Free treatment pathways" questionIcon={false} style={{justifyContent: "center"}}
								 info="This graph shows the percentage of Breaking Free users who have selected each treatment pathway within the programme: Alcohol, Drugs or Alcohol and Drugs." />
				<Loader loadingData={loadingData}/>
				<div id="versionGraphPie" style={{width: chartsWidth, height: !loadingData && ( isMobile ? "200px" : "400px" )}}></div>
			</ContentBox>

			<ContentBox title="Focus of treatment" rootDivStyle={{display: mainFilterSelected === "reach" ? "block" : "none"}}>
				<TitleBF title="Main problem substance: alcohol or drugs" questionIcon={false} style={{justifyContent: "center"}}
								 info="This graph shoes the percentages of Breaking Free users who have identified alcohol or any drug as their main problem substance." />
				<Loader loadingData={loadingData}/>
				<div id="mainProblemGraphPie" style={{width: chartsWidth, height: !loadingData && ( isMobile ? "200px" : "550px" )}}></div>
				<TitleBF title="Main problem substance: drug profile" questionIcon={false} style={{justifyContent: "center"}}
								 info="This graph shows the percentage of Breaking Free users addressing drug-related issues with the programme who have identified each drug as their main problem substance." />
				<Loader loadingData={loadingData}/>
				<div id="mainProblemOnlyDrugsGraphPie" style={{width: chartsWidth, height: !loadingData && ( isMobile ? "200px" : "550px" )}}></div>
			</ContentBox>

			<ContentBox title="Demographic profile" rootDivStyle={{display: mainFilterSelected === "reach" ? "block" : "none"}}>
				<TitleBF title="Age" questionIcon={false} style={{justifyContent: "center", marginBottom: 30}}
								 info="This graph shows the age of the Breaking Free users." />
				<Loader loadingData={loadingData}/>
				<div id="ageGraph" style={{width: chartsWidth, height: !loadingData && ( isMobile ? "200px" : "350px" )}}></div>

				<TitleBF title="Gender" questionIcon={false} style={{justifyContent: "center"}}
								 info="This graph shows the gender of the Breaking Free users." />
				<Loader loadingData={loadingData}/>
				<div id="genderGraphPie" style={{width: chartsWidth, height: !loadingData && ( isMobile ? "200px" : "400px" )}}></div>

				<TitleBF title="Ethnicity" questionIcon={false} style={{justifyContent: "center", marginBottom: 30}}
								 info="This graph shows the ethnicity of the Breaking Free users." />
				<Loader loadingData={loadingData}/>
				<div id="ethnicityGraphPie" style={{width: chartsWidth, height: !loadingData && ( isMobile ? "200px" : "550px" )}}></div>
			</ContentBox>

			<ContentBox title="Treatment retention" rootDivStyle={{display: mainFilterSelected === "outcomes" ? "block" : "none"}}>
				<TitleBF title="Actively engaged in treatment" questionIcon={false} style={{justifyContent: "center"}}
								 info="This graph shows the percentage of those users starting Breaking Free who have progressed beyond the clinical assessment and entered the treatment phase of the programme."/>
				<Loader loadingData={loadingData}/>
				<div id="RetentionGraphPie"
						 style={{width: chartsWidth, height: !loadingData && (isMobile ? "200px" : "400px")}}></div>
				{
					isAdmin && [
						<RaisedButton
							label="Export V3 data"
							onTouchTap={() => exportCsv('v3', `retentionLabel`)}>
						</RaisedButton>,
						<RaisedButton
							label="Export V4 data"
							onTouchTap={() => exportCsv('v4', `retentionLabel`)}>
						</RaisedButton>
					]
				}
			</ContentBox>

			<ContentBox title="Treatment completion" rootDivStyle={{display: mainFilterSelected === "outcomes" ? "block" : "none"}}>
				<TitleBF title="Status of treatment" questionIcon={false} style={{justifyContent: "center"}}
								 info={TreatmentTexts.statusOfTreatmentInfo()}/>
				<Loader loadingData={loadingData}/>
				<div id="goalGraphPie" style={{width: chartsWidth, height: !loadingData && (isMobile ? "200px" : "400px")}}></div>
			</ContentBox>

			<ContentBox title="Treatment impact" rootDivStyle={{display: mainFilterSelected === "outcomes" ? "block" : "none"}}>
				<TitleBF title="Completion of Extended Brief Intervention for alcohol" questionIcon={false}
								 style={{justifyContent: "center"}}
								 info={TreatmentTexts.EBIInfo()}/>
				<Loader loadingData={loadingData}/>
				<div id="EBIGraphPie" style={{width: chartsWidth, height: !loadingData && (isMobile ? "200px" : "400px")}}></div>
				{
					isAdmin && [
						<RaisedButton
							label="Export V3 data"
							onTouchTap={() => exportCsv('v3', `EBILabel`)}>
						</RaisedButton>,
						<RaisedButton
							label="Export V4 data"
							onTouchTap={() => exportCsv('v4', `EBILabel`)}>
						</RaisedButton>
					]
				}
				<TitleBF title="Measurable reductions in substance use" questionIcon={false}
								 style={{justifyContent: "center", marginBottom: 30}}
								 info={TreatmentTexts.changeInUseInfo()}/>
				<Loader loadingData={loadingData}/>
				<div id="successContainer">
					<div id="successGraph" style={{width: chartsWidth, height: !loadingData && "400px"}}></div>
				</div>
				{
					isAdmin && [
						<RaisedButton
							label="Export V3 data"
							onTouchTap={() => exportCsv('v3', `changeInSubstanceLabel`)}>
						</RaisedButton>,
						<RaisedButton
							label="Export V4 data"
							onTouchTap={() => exportCsv('v4', `changeInSubstanceLabel`)}>
						</RaisedButton>
					]
				}

				<TitleBF title="Mantained abstinence" questionIcon={false} style={{justifyContent: "center"}}
								 info={TreatmentTexts.abstinenceInfo()}/>
				<Loader loadingData={loadingData}/>

				<div id="abstinenceContainer">
					<div id="abstinenceGraph" style={{width: chartsWidth, height: !loadingData && "400px"}}></div>
				</div>

				<TitleBF title="Recovery progression" questionIcon={false} style={{justifyContent: "center", marginBottom: 30}}
								 info={TreatmentTexts.recoveryProgression()}/>
				<Loader loadingData={loadingData}/>
				<div id="recoveryProgressionContainer">
					<div id="recoveryProgressionGraph" style={{width: chartsWidth, height: !loadingData && "400px"}}></div>
				</div>
			</ContentBox>

			<ContentBox title="Treatment access" rootDivStyle={{display: mainFilterSelected === "outcomes" ? "block" : "none"}}>

				<TitleBF title="Treatment accessed outside service operating hours" questionIcon={false}
								 style={{justifyContent: "center"}} info={TreatmentTexts.offWorkInfo()}/>
				<Loader loadingData={loadingData}/>

				<div id="WorkingHoursGraphPie"
						 style={{width: chartsWidth, height: !loadingData && (isMobile ? "200px" : "450px")}}></div>

				<TitleBF title="Days on which treatment is accessed" questionIcon={false}
								 style={{justifyContent: "center", marginBottom: 30}}
								 info={TreatmentTexts.daysOfTheWeekInfo()}/>

				<div id="DayOfTheWeekGraph"
						 style={{width: chartsWidth, height: !loadingData && (isMobile ? "350px" : "450px")}}></div>

				{ isAdmin && (<div>
					<TitleBF title="Treatment started outside service operating hours"
									 questionIcon={false}
									 style={{justifyContent: "center"}}/>
					<Loader loadingData={loadingData}/>

					<div id="offWorkContainer">
						<div id="offWorkGraph" style={{width: chartsWidth, height: !loadingData && "400px"}}></div>
					</div>
				</div>)
				}

			</ContentBox>

			{
				isAdmin &&
				[
					<ContentBox title="Web browser account creation (v4 users)">
						<div id="accountsCreatedByDevice">
							<div id="accountsCreatedByDeviceGraph"
									 style={{width: chartsWidth, height: !loadingData && (isMobile ? "250px" : "350px")}}></div>
						</div>

					</ContentBox>,
					<ContentBox title="Moment of the day users log in (v4 users)">
						<div id="MomentOfTheDayGraph"
								 style={{width: chartsWidth, height: !loadingData && (isMobile ? "350px" : "450px")}}></div>
					</ContentBox>
				]
			}

		</div>
	)
}

