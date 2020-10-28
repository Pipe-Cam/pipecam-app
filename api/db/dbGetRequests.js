// const {mongoose} = require('../db/mongodbConnect')
const Client = require('../db/models/clientModel')
const Inspection = require('../db/models/InspectionModel')

/* MODELS */
// Client.model
// Inspection.model

/* SCHEMAS */
// Client.schema
// Inspection.schema

const findRecentClients = (res) => {
    const callback = (err, res, response) => {
        console.log(response)
        res.send(JSON.stringify(response));
    }

    Client.model.find({last_modified: { $lte : Date.now() }}, callback(res))
}



module.exports = {
    client: {
        recent: findRecentClients
    },
    inspection: {}
}