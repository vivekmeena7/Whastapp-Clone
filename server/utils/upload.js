import multer from "multer"; //Multer is a middleware for handling HTTP requests that contain "multipart/form-data", which is used for uploading files. It adds the "files" object to the request, which contains information about the uploaded files.
import { GridFsStorage } from "multer-gridfs-storage"; //Multer GridFS Storage is a plugin for Multer that allows you to store uploaded files directly in MongoDB using the GridFS specification.
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb://${USERNAME}:${PASSWORD}@ac-w4ubola-shard-00-00.dnabifl.mongodb.net:27017,ac-w4ubola-shard-00-01.dnabifl.mongodb.net:27017,ac-w4ubola-shard-00-02.dnabifl.mongodb.net:27017/?ssl=true&replicaSet=atlas-13nrhj-shard-0&authSource=admin&retryWrites=true&w=majority`,

  options: { useUnifiedTopology: true, useNewUrlParser: true },

  file: (request, file) => {
    const match = ["image/jpg", "image/png", "image/jpeg"];

    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      fileName: `${Date.now()}-file-${file.originalname}`,
    };
  },
});

export default multer({ storage });
// This code creates a new instance of the GridFsStorage object using the Multer GridFS Storage library. The GridFsStorage constructor takes an options object as its argument.

// The options object contains several properties:

// url: a string that contains the URL of the MongoDB server to connect to. It includes the username, password, server address, port number, and options for connecting to a replica set and using SSL.
// options: an object that contains additional options for connecting to MongoDB using the Mongoose library. In this case, it is specified that the unified topology and new url parser should be used.
// file: a function that determines how the uploaded files should be named and where they should be stored in the MongoDB server.
// It takes the request object and the file object as arguments.
// It checks the file's mime type and only accepts jpg, png, and jpeg file.
// If the file type is not accepted, it returns a string that concatenates the current timestamp with the original file name.
// If the file type is accepted, it returns an object that contains the following properties:
// bucketName: a string that specifies the "bucket" or collection in MongoDB where the file should be stored. In this case, it is set to "photos".
// fileName: a string that specifies the name of the file in the MongoDB server. It concatenates the current timestamp with the original file name.
// Once this storage object is created, you can use it as the storage engine for Multer by passing it to the storage option when initializing Multer middleware.
