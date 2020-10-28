module.exports = {
    new: (mongoose)=>{
      const Schema = mongoose.Schema;
      return new Schema({
          created: Date,
          last_modified: Date,
          client_type: String,
          client_type_other: String,
          client_status: String,
          client_source: String,
          client_source_other: String,
          preferred_payment_type: String,
          business_name: String,
          business_phone: String,
          business_address_street: String,
          business_address_unit: String,
          business_address_city: String,
          business_address_state: String,
          business_address_zip: String,
          contact_name: String,
          contact_phone: String,
          contact_email_primary: String,
          contact_email_secondary: String,
          client_address_street: String,
          client_address_unit: String,
          client_address_city: String,
          client_address_state: String,
          client_address_zip: String,
          notes: []
        })
    }
}