var {mongoose} = require('../mongodbConnect')
const inspectionSchema = require('../schemas/inspectionSchema')
const InspectionSchema = inspectionSchema.new(mongoose)
const InspectionModel = mongoose.model('inspections', InspectionSchema);  

module.exports = {
    model: InspectionModel, 
    schema: InspectionSchema
}