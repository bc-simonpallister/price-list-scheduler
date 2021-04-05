import mongoose from 'mongoose'

async function dbConnect() {

  console.log('dbconnect')
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    console.log(mongoose.connection.readyState)
    return
  }

  const db = await mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  console.log(db)
  return db
}

export default dbConnect