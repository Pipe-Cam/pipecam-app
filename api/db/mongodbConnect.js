var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

let dbUser = process.env.DBUSER
let dbPass = process.env.DBPASS

const MONGODB_URI=`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@reportgeneratorcluster.jf90d.mongodb.net/ReportGeneratorDB?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

mongoose.connection.on('connected', ()=>{
    console.log('DATABASE: Connection Established', `on >>> ${new Date()} <<<`)
  })
  
  module.exports = {
      mongoose
  }