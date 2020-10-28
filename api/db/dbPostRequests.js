const {mongoose} = require('../db/mongodbConnect')
const Client = require('../db/models/clientModel')
const Inspection = require('../db/models/InspectionModel')

/* MODELS */
// Client.model
// Inspection.model

/* SCHEMAS */
// Client.schema
// Inspection.schema

const newClient = async (data) => {
    let newClientModel = new Client.model(data)
    await newClientModel.save((error)=>{
        if(error){
            console.log("failed to write to 'clients' collection")
        } else {
            console.log("data saved to 'clients' collection")
        }       
    })
}

const newInspection = async (data) => {
    let newInspectionModel = new Inspection.model(data)
    await newInspectionModel.save((error)=>{
        if(error){
            console.log("failed to write to 'inspections' collection")
        } else {
            console.log("data saved to 'inspections' collection")
        }       
    })
}

module.exports = {
    client: {
        new: newClient
    },
    inspection: {
        new: newInspection
    }
}