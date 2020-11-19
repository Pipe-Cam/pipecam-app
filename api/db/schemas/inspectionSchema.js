module.exports = {
    new: (mongoose)=>{
      const Schema = mongoose.Schema;
      return new Schema({
        status: String,
        client_id: String,
        overview: {
          inspection_date: Date,
          client: String,
          property_address: String,
          property_address_street: String,
          property_address_unit: String,
          property_address_city: String,
          property_address_state: String,
          property_address_zip: String,
          prelisting: Boolean,
          root_cut: Boolean,
          client_located_access: Boolean,
          length_of_lateral: String,
          payment_status: String,
          payment_status_amount: Number,
          office_notes: String
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
          usb_num: String
        },
        access: {},
        created: Date,
        last_modified: Date
      })
    }
  }






