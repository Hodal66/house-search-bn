require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🌞💥💥💥🔥🔥🔥Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }

  server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
};

startServer();


// require("dotenv").config();
// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const multer = require("multer");
// const typeDefs = require("./schema/typeDefs");
// const resolvers = require("./schema/resolvers");

// const app = express();

// const startServer = async () => {
//   const server = new ApolloServer({ typeDefs, resolvers });

//   let gfs;

//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("🌞💥💥💥🔥🔥🔥Connected to MongoDB");

//     gfs = Grid(conn.connection.db, mongoose.mongo);
//     gfs.collection('uploads');
//   } catch (error) {
//     console.error("Error connecting to MongoDB", error);
//     process.exit(1);
//   }

//   // Create storage engine
//   const storage = new GridFsStorage({
//     url: process.env.MONGODB_URI,
//     file: (req, file) => {
//       return {
//         filename: file.originalname,
//         bucketName: 'uploads',
//       };
//     },
//   });

//   const upload = multer({ storage });

//   // Upload file endpoint
//   app.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ file: req.file });
//   });

//   // Get files
//   app.get('/files', (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//       if (!files || files.length === 0) {
//         return res.status(404).json({ err: 'No files exist' });
//       }
//       return res.json(files);
//     });
//   });

//   // Get file by filename
//   app.get('/files/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//       if (!file || file.length === 0) {
//         return res.status(404).json({ err: 'No file exists' });
//       }
//       return res.json(file);
//     });
//   });

//   // Get image by filename
//   app.get('/image/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//       if (!file || file.length === 0) {
//         return res.status(404).json({ err: 'No file exists' });
//       }

//       // Check if image
//       if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//         const readstream = gfs.createReadStream(file.filename);
//         readstream.pipe(res);
//       } else {
//         res.status(404).json({ err: 'Not an image' });
//       }
//     });
//   });

//   await server.start();  // Wait for the server to start
//   server.applyMiddleware({ app });

//   app.listen({ port: 4000 }, () => {
//     console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
//   });
// };

// startServer();
