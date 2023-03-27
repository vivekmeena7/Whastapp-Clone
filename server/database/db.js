import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("strictQuery", true);

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async () => {
  const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-w4ubola-shard-00-00.dnabifl.mongodb.net:27017,ac-w4ubola-shard-00-01.dnabifl.mongodb.net:27017,ac-w4ubola-shard-00-02.dnabifl.mongodb.net:27017/?ssl=true&replicaSet=atlas-13nrhj-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true }); //mongoose.connect is a asyncronous function so that's why we are using await and async
    console.log("Server is successfully connected to mongodb");
  } catch (error) {
    console.log("server is not connected because of the error", error.message);
  }
};
export default Connection;
