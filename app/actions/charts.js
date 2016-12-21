import * as types from 'types'
import { sortDate, sortObject, calculateRecoveryProgression} from '../js/utils'
import { highchartsBar, highchartsPie, highchartsVerticalBar } from '../js/BFHighcharts'

export const selectMainFilter = (mainFilter) =>  ({
    type: types.SELECT_MAIN_FILTER,
    mainFilter
})

export const selectService = (serviceName) =>  ({
    type: types.SELECT_SERVICE,
    serviceName
})

export const selectDashboard = (dashboardId) =>  ({
    type: types.SELECT_DASHBOARD,
    dashboardId
})

export const selectDashboardTagSubdivision = (dashboardTagSubdivision) =>  ({
    type: types.SELECT_DASHBOARD_TAG_SUBDIVISION,
    dashboardTagSubdivision
})

export const selectParentDashboard = (dashboardId, dashboardTagId) =>  ({
    type: types.SELECT_PARENT_DASHBOARD,
    dashboardId,
    dashboardTagId
})

export const selectParentDashboardIsGrouped = (isGrouped) =>  ({
    type: types.SELECTED_PARENT_DASHBOARD_IS_GROUPED,
    isGrouped
})

export const setChartData = (chartData) =>  ({
    type: types.SET_CHART_DATA,
    chartData
})

export const resetChartData = () =>  ({
    type: types.RESET_CHART_DATA
})

export const setFilterDate = ({startDate, endDate, range}) =>  ({
    type: types.SET_FILTER_DATE,
    startDate,
    endDate,
    range
})

export const setExportData = ({version, exportData}) => ({
    type: types.SET_EXPORT_DATA,
    version,
    exportData
})

export const setGraphHeight = ({chart, heightOfChart}) => ({
    type: types.SET_GRAPH_HEIGHT,
    chart,
    heightOfChart
})

export const plotGraph = ({mainFilterSelected, selectedParentDashboardId, selectedParentDashboardIsGrouped, toPrintPDF}) => (dispatch, getState) => {
    // TODO: TAKE ADMIN USER
    const isAdmin = false
    const {chartData} = getState().charts
    const pointWidth = 20,
        marginTop = 70,
        marginBottom = 50,
        groupPadding = 0,
        pointPadding = 0

    console.log("getState", getState())
    console.log("CHART DATA", chartData)

    if(chartData.activationDateValues) {
        const activationDateArr = sortDate(chartData.activationDateValues).map(m => ([m.key, m.value]))
        const barCountActivationDate = activationDateArr.length,
            chartHeightActivationDate = marginTop + marginBottom + ((pointWidth * barCountActivationDate) * (1 + groupPadding + pointPadding));
        dispatch(setGraphHeight({chart: 'activationDate', heightOfChart: chartHeightActivationDate}))
        highchartsBar({name: 'Access cards', graphId: 'activationDateGraph', data: activationDateArr, isAdmin, chartHeight: chartHeightActivationDate})
    }

    if(chartData.ageValues) {
        let totalAgesValues = 0
        const agesArr = sortObject(chartData.ageValues).map(m => {
            totalAgesValues += m.value
            return { name: m.key, y: m.value}
        })
        highchartsVerticalBar({name: 'Age', graphId: 'ageGraph', data: agesArr, isAdmin,
            multipleColors: true, showPercentage: true, totalValues: totalAgesValues})
    }

    if(chartData.ethnicityValues) {
        let totalEthnicityValues = 0
        const ethnicityArr = sortObject(chartData.ethnicityValues).map(m => {
            totalEthnicityValues += m.value
            return {
                name: m.key,
                y: m.value,
                color: m.key === "White: British" ? "#8F96B2" : undefined
            }
        })
        highchartsBar({name: 'Ethnicity', graphId: 'ethnicityGraphPie', data: ethnicityArr, isAdmin,
            startAngle: 285, showPercentage: true, totalValues: totalEthnicityValues})
    }

    if(chartData.genderValues) {
        const genderArr = sortObject(chartData.genderValues).map(m => {
            return {
                name: m.key,
                y: m.value,
                color: m.key === "Male" ? "#8F96B2" : "#95719D"
            }
        })
        highchartsPie({name: 'Gender', graphId: 'genderGraphPie', data: genderArr, isAdmin})
    }

    if(chartData.mainProblemValues) {
        const mainProblemArr = sortObject(chartData.mainProblemValues).filter(m => m.key !== "undefined").map(m => (
        {
            name: m.key, y: m.value,
            color: m.key === "Drugs" ? "#719D8F" :
                m.key === "Alcohol" ? "#8FB2A7" :
                    m.key === "Both" ? "#598275" :
                        undefined
        }
        ))
        highchartsPie({name: 'Main Problem', graphId: 'mainProblemGraphPie', data: mainProblemArr, isAdmin})
    }

    if(chartData.mainProblemOnlyDrugsValues){
        const mainProblemOnlyDrugsArr = sortObject(chartData.mainProblemOnlyDrugsValues).filter(m => m.key !== "undefined").map(m => ({
            name: m.key, y: m.value,
            color: m.key === "Drugs" ? "#719D8F" :
                m.key === "Alcohol" ? "#8FB2A7" :
                    m.key === "Both" ? "#598275" :
                        undefined
        }
        ))
        highchartsPie({name: 'Main Problem only drugs', graphId: 'mainProblemOnlyDrugsGraphPie', data: mainProblemOnlyDrugsArr, isAdmin})
    }

    if(chartData.versionValues) {
        const versionArr = sortObject(chartData.versionValues).map(m => {
            return { name: m.key, y: m.value,
                color: m.key === "Drugs" ? "#719D8F" :
                    m.key === "Alcohol" ? "#8FB2A7" :
                        m.key === "Both" ? "#598275" :
                            undefined }
        })
        highchartsPie({name: 'Treatment pathway', graphId: 'versionGraphPie', data: versionArr, isAdmin})
    }

    if(chartData.activationCodesByServiceValues) {
        const activationCodesArr = Object.keys(chartData.activationCodesByServiceValues).map(m => ({name: m, y: chartData.activationCodesByServiceValues[m]}))
        const barCountByService = activationCodesArr && activationCodesArr.length
        const chartHeightByService = marginTop + marginBottom + ((pointWidth * barCountByService) * (1 + groupPadding + pointPadding));
        dispatch(setGraphHeight({chart: 'activationByService', heightOfChart: chartHeightByService}))
        highchartsBar({name: 'Access cards', graphId: 'activationCodesByServiceGraph', data: activationCodesArr, isAdmin, chartHeight: chartHeightByService})
    }
    // }

    if (chartData.EBIValues) {
        const EBIArr = Object.keys(chartData.EBIValues).map(m => {
            return {
                name: m,
                y: chartData.EBIValues[m],
                color: m === "EBI not completed" ? "#B8877A" : "#768259"
            }
        })
        highchartsPie({name: 'EBI', graphId: 'EBIGraphPie', data: EBIArr, isAdmin, binary: true})
    }
    if(chartData.retentionValues) {
        const RetentionArr =  Object.keys(chartData.retentionValues).map(m => {
            return {
                name: m,
                y: chartData.retentionValues[m],
                color: m === "Attrition rate" ? "#B8877A" : "#768259"
            }
        })
        highchartsPie({name: 'Treatment retention', graphId: 'RetentionGraphPie', data: RetentionArr, isAdmin, binary: true})
    }

    if(chartData.successValues) {
        const successArr = sortObject(chartData.successValues).filter( m => {
            return (
                m.value > 0
                // && chartData.successCounter[m.key] > 5
            )
        }).map(m => ([m.key, Math.round(m.value * 100) / 100]))
        highchartsVerticalBar({name: 'Treatment reduction by substance', graphId: 'successGraph', data: successArr, isAdmin, min: 0, max: 100, units: "%"})
    }

    if(chartData.mantainedAbstinence) {
        const mantainedAbstinenceArr =  Object.keys(chartData.mantainedAbstinence).map(m => {
            return {
                name: m,
                y: chartData.mantainedAbstinence[m],
                color: m === "Abstinence not maintained" ? "#B8877A" : "#768259"
            }
        })
        highchartsPie({name: 'Mantained abstinence', graphId: 'abstinenceGraph', data: mantainedAbstinenceArr, isAdmin, binary: true})
    }

    if(chartData.completionValues) {
        const goalArr =  Object.keys(chartData.completionValues).map(m => {
            return {
                name: m,
                y: chartData.completionValues[m],
                color: m === "Treatment ongoing" ? "#9FA659" : "#768259"
            }
        })
        highchartsPie({name: 'Treatment completion', graphId: 'goalGraphPie', data: goalArr, isAdmin, binary: true})
    }

    if(chartData.recoveryProgression) {
        const recoveryProgressionArr = Object.keys(chartData.recoveryProgression).map(m => {
            if (["Initial-Behav0", "Initial-Diffsits0", "Initial-Emot0", "Initial-Lifestyle0", "Initial-Negth0", "Initial-Phys0"].indexOf(m) !== -1) {
                return calculateRecoveryProgression(chartData.recoveryProgression, m)
            }
        }).filter(f => f && f.y > 0)

        // Difficult situations > Negative thoughts > Emotional impact > Physical sensations > Unhelpful behaviours > Lifestyle
        const rightOrder = ['Difficult situations', 'Negative thoughts', 'Emotional impact',
            'Physical sensations', 'Unhelpful behaviours', 'Lifestyle']

        highchartsVerticalBar({
            name: 'Recovery progression', graphId: 'recoveryProgressionGraph',
            data: recoveryProgressionArr.sort(function (a, b) {
                return rightOrder.indexOf(a.name) - rightOrder.indexOf(b.name);
            }),
            isAdmin, binary: true, min: 0, max: 100, units: "%"
        })
    }

    if(chartData.dayOfTheWeek) {
        let totalDayOfWeekValues = 0
        const dayOfTheWeekArr = Object.keys(chartData.dayOfTheWeek).map(m => {
            totalDayOfWeekValues += chartData.dayOfTheWeek[m]
            return {
                name: m,
                y: chartData.dayOfTheWeek[m]
            }
        })
        highchartsVerticalBar({name: 'Day of the week', graphId: 'DayOfTheWeekGraph', data: dayOfTheWeekArr,
            isAdmin, multipleColors: true, showPercentage: true, totalValues: totalDayOfWeekValues})
    }

    if(chartData.workingHours) {
        const workingHoursArr = Object.keys(chartData.workingHours).map(m => ([m, chartData.workingHours[m]]))
        highchartsPie({
            name: 'Working hours - From 9 to 5',
            graphId: 'WorkingHoursGraphPie',
            data: workingHoursArr,
            isAdmin
        })
    }

    if(isAdmin) {
        const signUpWorkingHoursArr = Object.keys(chartData.signUpWorkingHours).map(m => {
            return {
                name: m,
                y: chartData.signUpWorkingHours[m],
                color: m === "Outside service hours" ? "#7A5982" : "#AB8FB2"
            }
        })
        highchartsPie({name: 'Working hours - From 9 to 5', graphId: 'offWorkGraph',
            data: signUpWorkingHoursArr, isAdmin, colors: ['rgb(102, 102, 255)', 'rgb(153, 153, 255)']})

        const signUpWithArr = Object.keys(chartData.signUpWithValues).map(m => ([m, chartData.signUpWithValues[m]]))
        highchartsBar({name: 'Sign up with', graphId: 'accountsCreatedByDeviceGraph', data: signUpWithArr, isAdmin})

        const momentOfTheDayArr = Object.keys(chartData.momentOfTheDay).map(m => ([m, chartData.momentOfTheDay[m]]))
        highchartsVerticalBar({name: 'Moment of the day', graphId: 'MomentOfTheDayGraph', data: momentOfTheDayArr, isAdmin})
    }
    // }
}
