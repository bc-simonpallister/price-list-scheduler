import mongoose from 'mongoose';
const schema = mongoose.Schema;

const store = new mongoose.Schema ({
  store_id: { type: String, required: true },
  access_token:{ type:String, required: true },
  user_id: { type:Number, required: true },
  user_name: { type:String, required: true },
  user_email: { type:String, required: true }
})

module.exports = mongoose.models.Store || mongoose.model('Store', store)
