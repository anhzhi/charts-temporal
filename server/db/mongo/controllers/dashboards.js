import Dashboard from '../models/dashboard';

export const getDashboard = (req, res) => {
  if (~req.user.roles.indexOf('clientAdmin')) return

  const {dashboardId} = req.params
  if (!dashboardId || dashboardId === 'undefined') {
    if(Number(user.profile.admin.dashboardId)) {
      return Dashboard
        .findOne({dashboardId: user.profile.admin.dashboardId})
    }
    return Dashboard
      .findOne({_id: user.profile.admin.dashboardId})
  }

  let dashboard
  if(Number(user.profile.admin.dashboardId)) {
    dashboard = Dashboard
      .findOne({dashboardId})
  } else {
    dashboard = Dashboard
      .findOne({_id: dashboardId})
  }

  if (
    user.profile.admin && dashboard &&
    (
      dashboardId === user.profile.admin.dashboardId ||
      dashboard.parentDashboardId === user.profile.admin.dashboardId
    )
  ) {
    return dashboard
  }

  if(Number(user.profile.admin.dashboardId)) {
    return Dashboard
      .findOne({dashboardId: user.profile.admin.dashboardId})
  }
  return Dashboard
    .findOne({_id: user.profile.admin.dashboardId})
}

export const getDashboards = (req, res) => {
  console.log(req.user)
  if (!~req.user.roles.indexOf('clientAdmin')) {
    console.log("USER NOT FOUND")
    return
  }

  try {
    if(Number(req.user.profile.admin.dashboardId)) {
      const dashboards = Dashboard
        .find({dashboardId: req.user.profile.admin.dashboardId})
        .sort({ name: -1 })
        .exec((err, results) => {
          if(err) {
            console.log(err)
            return
          }
          console.log("RESULTS DASHBOARDS", results)
          res.json(results)
        })
    }
    const dashboards = Dashboard
      .find({_id: req.user.profile.admin.dashboardId})
      .sort({ name: -1 })
      .exec((err, results) => {
        if(err) {
          console.log(err)
          return
        }
        console.log("RESULTS DASHBOARDS", results)
        res.json(results)
      })
  } catch(e) {
    console.log("get dashboards error", e)
  }
}


export default {
  getDashboard,
  getDashboards
};
