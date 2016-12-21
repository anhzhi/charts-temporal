import mongoose from 'mongoose';
const { Schema } = mongoose

const ServiceSchema = new mongoose.Schema({
	"name" : String,
	"serviceId" : Number,
	"dashboardId" : [
		Schema.Types.Mixed
	],
	"umbracoSource" : Boolean,
	"history" : [
		{
			"timestamp" : Number,
			"dashboardId" : [
				Schema.Types.Mixed
			],
			"finished": Number
		}
	]
});

export default mongoose.model('Service', ServiceSchema, 'services');