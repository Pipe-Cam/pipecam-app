var {mongoose} = require('../mongodbConnect')
const clientSchema = require('../schemas/clientSchema')
const ClientSchema = clientSchema.new(mongoose)
const ClientModel = mongoose.model('clients', ClientSchema);  

module.exports = {
    model: ClientModel, 
    schema: ClientSchema
}
