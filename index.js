// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const port = process.env.PORT || 5000;
// const app = express();
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

// app.use(cors());
// app.use(express.json());

// // middleware
// const corsOptions = {
//   origin: ["http://localhost:5173", "http://localhost:5174"],
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(cookieParser());

// const verifyToken = async (req, res, next) => {
//   const token = req.cookies?.token;

//   if (!token) {
//     return res.status(401).send({ message: "unauthorized access" });
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       console.log(err);
//       return res.status(401).send({ message: "unauthorized access" });
//     }
//     req.user = decoded;
//     next();
//   });
// };

// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const { config } = require("dotenv");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hwao6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     const database = client.db("EduManage");
//     const userCollection = database.collection("users");

//     // Generate jwt token
//     app.post("/jwt", async (req, res) => {
//       const email = req.body;
//       const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "365d",
//       });
//       res
//         .cookie("token", token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//           sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//         })
//         .send({ success: true });
//     });
//     // Logout
//     app.get("/logout", async (req, res) => {
//       try {
//         res
//           .clearCookie("token", {
//             maxAge: 0,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//           })
//           .send({ success: true });
//       } catch (err) {
//         res.status(500).send(err);
//       }
//     });
//     // Create User to Database

//     app.post("/users", async (req, res) => {
//       const newUser = req.body;
//       console.log("creating new user", newUser);
//       const result = await userCollection.insertOne(newUser);
//       res.send(result);
//     });

//     // Get user From Database
//     app.get("/users", async (req, res) => {
//       const cursor = userCollection.find();
//       const result = await cursor.toArray();
//       res.send(result);
//     });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", async (req, res) => {
//   res.send("Edumanage Server is running");
// });

// app.listen(port, () => {
//   console.log(`EduManage Crud Server is Running on Port: ${port}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true, // Allows credentials like cookies to be sent
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(express.json());
app.use(cookieParser());

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hwao6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("EduManage");
    const usersCollection = database.collection("users");
    const classCollection = db.collection("classes");

    // Generate jwt token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Add Class in Database

    // save a plant data in db
    app.post("/allclasses", verifyToken, async (req, res) => {
      const eduClass = req.body;
      const result = await classCollection.insertOne(eduClass);
      res.send(result);
    });

    // Create User to Database
    // app.post("/users", async (req, res) => {
    //   const newUser = req.body;
    //   console.log("creating new user", newUser);
    //   const result = await userCollection.insertOne(newUser);
    //   res.send(result);
    // });

    // save or update a user in db
    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;
      // check if user exists in db
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send(isExist);
      }
      const result = await usersCollection.insertOne({
        ...user,
        role: "student",
        timestamp: Date.now(),
      });
      res.send(result);
    });

    // Get user From Database
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Edumanage Server is running");
});

app.listen(port, () => {
  console.log(`EduManage Crud Server is Running on Port: ${port}`);
});
