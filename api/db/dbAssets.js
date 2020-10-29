const {mongoose} = require('./mongodbConnect')
const Client = require('./models/clientModel')
const Inspection = require('./models/InspectionModel')

/* CLIENTS */
const createNewClient = async (data) => {
    let newClientModel = new Client.model(data)
    await newClientModel.save((error)=>{
        if(error){
            console.log("failed to write to 'clients' collection")
        } else {
            console.log("data saved to 'clients' collection")
        }       
    })
}

const updateClientById = async (id, body) => {
    // update
    return "done"
}

const deleteClientById = async (id) => {
    // delete
    return "done"
}

const archiveClientById = async (id) => {
    
}

const unarchiveClientById = async (id) => {

}


/* INSPECTIONS */
const createNewInspection = async (data) => {
    let newInspectionModel = new Inspection.model(data)
    await newInspectionModel.save((error)=>{
        if(error){
            console.log("failed to write to 'inspections' collection")
        } else {
            console.log("data saved to 'inspections' collection")
        }       
    })
}

const updateInspectionById = async (id, body) => {
    // update
    return "done"
}

const deleteInspectionById = async (id) => {
    // delete
    return "done"
}

module.exports = {
    client: {
        new: createNewClient,
        update: updateClientById,
        model: Client.model,
        schema: Client.schema
    },
    inspection: {
        new: createNewInspection,
        update: updateInspectionById,
        model: Inspection.model,
        schema: Inspection.schema
    }
}