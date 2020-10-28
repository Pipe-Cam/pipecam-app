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
          check_num: String,
          usb_num: String,
          client: String,
          property_address: String
        },
        location: {},
        access: {},
        created: Date,
        last_modified: Date
      })
    }
  }


