import * as types from 'types';
import { weekDays, hoursOfADay } from '../js/utils'

const dayOfTheWeek = () => weekDays.reduce( (prev, curr) => {
    return {
        ...prev,
        [curr]: 0
    }
}, {})

const momentOfTheDay = () => hoursOfADay.reduce( (prev, curr) => {
    return {
        ...prev,
        [curr]: 0
    }
}, {})

const initialChartData = {
    totalActivationCodes: 0,
    activationDateValues: {},
    activationCodesByServiceValues: {},
    versionValues: {},
    mainProblemValues: {},
    genderValues: {},
    ethnicityValues: {},
    ageValues: {},
    workingHours: {
        "Within service operating hours": 0,
        "Outside service hours": 0
    },
    dayOfTheWeek: dayOfTheWeek(),
    momentOfTheDay: momentOfTheDay(),
    signUpWithValues: {},
    EBIValues: {
        "EBI completed": 0,
        "EBI not completed": 0
    },
    retentionValues: {
        "Retention rate": 0,
        "Attrition rate": 0
    },
    successYN: {
        "Successful treatment": 0,
        "Non-successful treatment": 0
    },
    mantainedAbstinence: {
        "Abstinence maintained": 0,
        "Abstinence not maintained": 0
    },
    successValues: {},
    successCounter: {},
    completionValues: {
        "Treatment completed": 0,
        "Treatment ongoing": 0
    },
    signUpWorkingHours: {
        "Within service operating hours": 0,
        "Outside service hours": 0
    },
    signUpDayOfTheWeek: dayOfTheWeek(),
    signUpMomentOfTheDay: momentOfTheDay()
}

const initialState = {
    chartData: { ...initialChartData },
    exportData: {
        v3: {},
        v4: {}
    },
    graphHeights: {}
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.SELECT_SERVICE:
            return {
                ...state,
                selectedService: action.serviceName
            }
        case types.SELECT_MAIN_FILTER:
            return {
                ...state,
                mainFilter: action.mainFilter
            }
        case types.SELECT_DASHBOARD:
            return {
                ...state,
                selectedDashboardId: action.dashboardId
            }
        case types.SELECT_PARENT_DASHBOARD:
            return {
                ...state,
                selectedParentDashboardId: action.dashboardId,
                dashboardTagId: action.dashboardTagId,
                dashboardTagSubdivision: undefined
            }
        case types.SELECTED_PARENT_DASHBOARD_IS_GROUPED:
            return {
                ...state,
                selectedParentDashboardIsGrouped: action.isGrouped
            }
        case types.SET_FILTER_DATE:
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate,
                range: action.range
            }
        case types.SET_CHART_DATA:
            return {
                ...state,
                chartData: action.chartData
            }
        case types.SET_GRAPH_HEIGHT:
            return {
                ...state,
                graphHeights: {
                    ...state.graphHeights,
                    [action.chart]: action.heightOfChart
                }
            }
        case types.SELECT_DASHBOARD_TAG_SUBDIVISION:
            return {
                ...state,
                dashboardTagSubdivision: action.dashboardTagSubdivision
            }
        case types.SET_EXPORT_DATA:
            console.log(state)
            console.log("action.version, action.exportData", action.version, action.exportData)
            console.log("state.chartData.exportData.v4", state.exportData.v4)
            console.log("state.chartData.exportData.v3", state.exportData.v3)
            return {
                ...state,
                exportData: {
                    v3: action.version === "v3" ? action.exportData : state.exportData.v3,
                    v4: action.version === "v4" ? action.exportData : state.exportData.v4
                }
            }
        case types.RESET_CHART_DATA:
            return {
                ...state,
                chartData: {
                    totalActivationCodes: 0,
                    activationDateValues: {},
                    activationCodesByServiceValues: {},
                    versionValues: {},
                    mainProblemValues: {},
                    genderValues: {},
                    ethnicityValues: {},
                    ageValues: {},
                    workingHours: {
                        "Within service operating hours": 0,
                        "Outside service hours": 0
                    },
                    dayOfTheWeek: dayOfTheWeek(),
                    momentOfTheDay: momentOfTheDay(),
                    signUpWithValues: {},
                    EBIValues: {
                        "EBI completed": 0,
                        "EBI not completed": 0
                    },
                    retentionValues: {
                        "Retention rate": 0,
                        "Attrition rate": 0
                    },
                    successYN: {
                        "Successful treatment": 0,
                        "Non-successful treatment": 0
                    },
                    mantainedAbstinence: {
                        "Abstinence maintained": 0,
                        "Abstinence not maintained": 0
                    },
                    successValues: {},
                    successCounter: {},
                    completionValues: {
                        "Treatment completed": 0,
                        "Treatment ongoing": 0
                    },
                    signUpWorkingHours: {
                        "Within service operating hours": 0,
                        "Outside service hours": 0
                    },
                    signUpDayOfTheWeek: dayOfTheWeek(),
                    signUpMomentOfTheDay: momentOfTheDay()
                },
                exportData: {
                    v3: {},
                    v4: {}
                }
            }

        default:
            return state
    }
}