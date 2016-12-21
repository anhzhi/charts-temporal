import mongoose from 'mongoose';
const { Schema } = mongoose

const DashboardSchema = new mongoose.Schema({
	"name" : String,
	"dashboardId" : Number,
	"isGrouped" : Boolean,
	"parentDashboardId" : Schema.Types.Mixed,
	"createdAt" : Number,
	"umbracoSource" : Boolean,
	"updatedAt" : Number
});

export default mongoose.model('Dashboard', DashboardSchema, 'dashboards');