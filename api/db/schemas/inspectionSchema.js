module.exports = {
    new: (mongoose)=>{
      const Schema = mongoose.Schema;
      return new Schema({
        status: String,
        client_id: String,
        overview: {
          inspection_date: Date,
          office_notes: String,
          prelisting: String,
          online: String,
          cc_attached: String,
          client: String,
          property_address: String
        },
        location: {
          occupancy: String,
          outbuilding: String,
          outbuilding_has_plumbing: String,
          outbuilding_has_cleanout: String,
          outbuilding_pipe_diameter: String,
          outbuilding_pipe_diameter_other: String,
          cccusd: String,
          cccusd_unpermitted_work: String,
          opening_observations: String,
          check_num: String,
          usb_num: String,
        },
        access: {},
        created: Date,
        last_modified: Date
      })
    }
  }