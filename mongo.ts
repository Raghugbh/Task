import mongoose from 'mongoose';

async function setMongo(): Promise<any> {
  const mongodbURI = "mongodb://localhost:27017/company"
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useUnifiedTopology', true);
  // Connect to MongoDB using Mongoose
  await mongoose.connect(mongodbURI);
  console.log('Connected to MongoDB');
}
export default setMongo;
