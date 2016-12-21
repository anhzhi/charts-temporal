/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, redisClient } from '../db';
import chartsQuery from '../charts/query'

const adminUsersController = controllers && controllers.adminUsers;
const dashboardsController = controllers && controllers.dashboards;


const getDateFrom = (date) => {
  if(date === 'undefined' || !date || !new Date(date)) return
  const newDate = new Date(date)
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0)
  return newDate
}
export default (app) => {
  // user routes
  if (adminUsersController) {
    app.post('/login', adminUsersController.login);
    app.post('/signup', adminUsersController.signUp);
    app.post('/logout', adminUsersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  // charts routes
  app.get('/dashboard/:dashboardId', (req, res) => {
    console.log(req.params)
    return res.json({hello: "dashboardId"})
  });
  app.get('/dashboards', dashboardsController.getDashboards);
  app.get('/services/:selectedParentDashboardId/:selectedDashboardId/:startDate/:endDate', (req, res) => {
    console.log(req.params)
    return res.json([{hello: "Services"}])
  });
  app.get('/charts-data/:serviceName/:dashboard/:isGrouped/:startDate/:endDate', (req, res) => {
    const {startDate, endDate, serviceName, dashboard, isGrouped} = req.params

    const startDate00 = getDateFrom(startDate)
    const endDate00 = getDateFrom(endDate)

    let dashboardId = dashboard
    let isGroupedUpdated = isGrouped
    if (
      ~req.user.roles.indexOf('clientAdmin') &&
      (dashboard === 'undefined' || !dashboard)
    ) {
      dashboardId = req.user.profile.admin.dashboardId
      isGroupedUpdated = req.user.profile.admin.isGrouped
    }
    const identifier = serviceName + '___' + dashboardId + '___' + isGroupedUpdated + '___' +
      (startDate00 && startDate00.getTime()) + '___' + (endDate00 && endDate00.getTime())
    console.log(identifier)

    chartsQuery(identifier).then(results => {
      // console.log("RESULTS", results)
      res.json(results)
    })
    // redisClient.get(identifier, (err, results) => {
    //   // reply is null when the key is missing
    //   if (err) {
    //     console.log("ERROR", err)
    //     return res.json([{hello: "charts-data"}])
    //   }
    //   return res.json(results)
    // });
  })
}

