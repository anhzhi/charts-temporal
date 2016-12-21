import data from './data'
import {stringPrototype} from '../utils';
stringPrototype()
export default async (query) => {
    const fields = query.split('___').map(m =>
        m === 'undefined' ? undefined
            : Number(m) ? Number(m)
            : m === 'false' ? false
            : m === 'true' ? true
            : m
    )

    const identifier = ~query.indexOf('___') ? query.replace(/___/g, '') : query

    console.log('Fields', fields)

    let chartData = data.getInitialChartData()
    const v3DataToExport = data.getInitialChartDataToExport()
    const v4DataToExport = data.getInitialChartDataToExport()

    try {
        await data.updateV3data({
            chartData,
            selectedServiceName: fields[0],
            selectedDashboardId: fields[1],
            isGrouped: fields[2],
            startDate: fields[3],
            endDate: fields[4],
            dataToExport: v3DataToExport
        })
    } catch(e) {
        console.log("ERROR V3", e)
    }

    try {
        await data.updateV4data({
            chartData,
            selectedServiceName: fields[0],
            selectedDashboardId: fields[1],
            isGrouped: fields[2],
            startDate: fields[3],
            endDate: fields[4],
            dataToExport: v4DataToExport
        })
    } catch(e) {
        console.log("ERROR V4", e)
    }

    return {
        identifier,
        chartData,
        v3Data: {
            version: "v3",
            exportData: v3DataToExport
        },
        v4Data: {
            version: "v4",
            exportData: v4DataToExport
        }
    }
}
