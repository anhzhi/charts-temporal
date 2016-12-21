import AdminUser from '../db/mongo/models/adminUser'
import UmbracoDB from '../db/mongo/models/umbracodb'
import LatestUpdate from '../db/mongo/models/latestUpdate'
import Assessment from '../db/mongo/models/assessment'
import Service from '../db/mongo/models/service'
import Allocation from '../db/mongo/models/allocation'
import Dashboard from '../db/mongo/models/dashboard'

export default {
  adminUsers: AdminUser,
  umbracodb: UmbracoDB,
  latestUpdate: LatestUpdate,
  assessments: Assessment,
  services: Service,
  allocations: Allocation,
  dashboards: Dashboard
}