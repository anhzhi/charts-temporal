import mongoose from 'mongoose';
const { Schema } = mongoose
const AllocationSchema = new mongoose.Schema({
	"dashboardId" : Schema.Types.Mixed,
	"createdAt" : Number,
	"expires" : Number,
	"name" : String,
	"batchId" : Schema.Types.Mixed,
	"serviceId" : Schema.Types.Mixed,
	"umbracoSource" : Boolean,
	"allocationId" : Number
});

export default mongoose.model('Allocation', AllocationSchema, 'allocations');