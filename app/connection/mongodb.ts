import mongoose from "mongoose";
export default async function connectMongoDB(){
  try {
    const DATABASE_URL:string = process.env.DATABASE_URL ?? "";
    await mongoose.connect(DATABASE_URL)
    console.log(`Mongodb Connect Successfully!`);
  } catch (error) {
    console.error('MongodbConnection Fails',error);
    
  } 
}