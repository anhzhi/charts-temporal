import Service from '../models/service';

export const getService = async (req, res) => {
  if (~req.user.indexOf('clientAdmin')) return

  const {
    selectedParentDashboardId,
    selectedDashboardId,
    startDate = 1262304000000,
    endDate = Date.now()
  } = req.params

}


export default {
  getService
};
