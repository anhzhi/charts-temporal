import axios from 'axios';

// FETCH MAIN DASHBOARD OF THE CLIENT
export const fetchDashboardById = (dashboardId) => {
    return axios.get(`/dashboard/${dashboardId}`).then((res) => { console.log("RES fetchDashboardById", res); return res.data})
}

// FETCH DASHBOARDS
export const fetchDashboards = () => {
    return axios.get('/dashboards').then((dashboards, err) => {
        console.log("fetchDashboards", dashboards);
        if(err) {
            console.log(err)
            return []
        }
        return dashboards.data || []
    })
}

// FETCH SERVICES
export const fetchServices = ({
    selectedParentDashboardId,
    selectedDashboardId,
    startDate,
    endDate
}) => {
    console.log(selectedParentDashboardId)
    return axios.get(`/services/${selectedParentDashboardId}/${selectedDashboardId}/${startDate}/${endDate}`).then((services, err) => {
        console.log("fetchServices", services);
        if(err) {
            console.log(err)
            return []
        }
        return services.data || []
    })
}

// FETCH CHARTS DATA
export const fetchChartsData = ({
    serviceName,
    dashboard,
    isGrouped,
    startDate,
    endDate
}) => {
    return axios.get(`/charts-data/${serviceName}/${dashboard}/${isGrouped}/${startDate}/${endDate}`).then((results, err) => {
        console.log("fetchChartsData", results);
        if(err) {
            console.log(err)
            return {}
        }
        return results.data || {}
    })
}




