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
    const classCollection = database.collection("classes");
    const paymentsCollection = database.collection("payments");

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

    app.post("/allclasses", verifyToken, async (req, res) => {
      const eduClass = req.body;
      const result = await classCollection.insertOne(eduClass);
      res.send(result);
    });

    // get all classes from db
    app.get("/allclasses", async (req, res) => {
      const result = await classCollection.find().toArray();
      res.send(result);
    });

    // teacher add Classes get from database
    app.get("/my-classes", async (req, res) => {
      try {
        const { email } = req.query;
        if (!email) {
          return res
            .status(400)
            .send({ error: "Email query parameter is required" });
        }
        const result = await classCollection
          .find({ "teacher.email": email })
          .toArray();

        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch classes" });
      }
    });

    // Get The Classe Detail with  id

    app.get("/classes/:id", async (req, res) => {
      const { id } = req.params;

      // Validate ID
      if (!ObjectId.isValid(id)) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid class ID" });
      }

      try {
        const classData = await classCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!classData) {
          return res
            .status(404)
            .send({ success: false, message: "Class not found" });
        }

        res.send(classData);
      } catch (error) {
        console.error("Error fetching class data:", error);
        res
          .status(500)
          .send({ success: false, message: "Failed to fetch class" });
      }
    });

    // Delete My  Class

    app.delete("/classes/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const result = await classCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to delete class" });
      }
    });

    // Update Class For teacher

    // const { ObjectId } = require("mongodb");

    // Class Status Updated with ID
    app.put("/classes/:id", async (req, res) => {
      const id = req.params.id;
      const updatedClass = req.body;

      try {
        const result = await classCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedClass }
        );
        if (result.modifiedCount > 0) {
          res.send({ success: true, message: "Class updated successfully" });
        } else {
          res.status(404).send({ success: false, message: "Class not found" });
        }
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ success: false, message: "Failed to update class" });
      }
    });

    // Create User to Database
    // app.post("/users", async (req, res) => {
    //   const newUser = req.body;
    //   console.log("creating new user", newUser);
    //   const result = await userCollection.insertOne(newUser);
    //   res.send(result);
    // });

    // update Class Status with PATCH Method
    app.patch("/allclasses/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;

      try {
        const result = await classCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );

        if (result.modifiedCount > 0) {
          res
            .status(200)
            .send({ message: "Class status updated successfully" });
        } else {
          res
            .status(404)
            .send({ message: "Class not found or already updated" });
        }
      } catch (error) {
        console.error("Error updating class status:", error);
        res.status(500).json({ message: "Failed to update class status" });
      }
    });

    // Get All Class Progrss Status
    app.get("/allclasses/:id/progress", async (req, res) => {
      const { id } = req.params;

      try {
        const progress = await classesCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!progress) {
          return res.status(404).json({ message: "Class not found" });
        }

        // Simulate class progress details for demo
        const progressDetails = {
          studentsEnrolled: 25,
          completedModules: 5,
          totalModules: 10,
        };

        res.status(200).json({ ...progress, progressDetails });
      } catch (error) {
        console.error("Error fetching class progress:", error);
        res.status(500).json({ message: "Failed to fetch class progress" });
      }
    });

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

    // All Approved Class Get Logic
    app.get("/approved-classes", async (req, res) => {
      try {
        const approvedClasses = await classCollection
          .find({ status: "approved" })
          .toArray();
        res.status(200).send(approvedClasses);
      } catch (error) {
        console.error("Error fetching approved classes:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    // Get user From Database
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // ** Get All Users with Search Functionality **
    app.get("/users", async (req, res) => {
      const { search = "" } = req.query;

      try {
        const query = {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        };
        const users = await usersCollection.find(query).toArray();
        res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
      }
    });
    // GET Class Details By ID
    app.get("/class/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const classDetails = await classCollection.findOne({
          _id: new ObjectId(id),
        });
        res.status(200).send(classDetails);
      } catch (error) {
        console.error("Error fetching class details:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    // get user role
    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send({ role: result?.role });
    });

    // ** Make a User Admin **
    app.patch("/users/admin/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: "admin" } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User role updated to admin" });
      } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ message: "Failed to update user role" });
      }
    });

    // Make POST For The Payment Procedure

    // app.post("/payments", async (req, res) => {
    //   try {
    //     const { transactionId, classId, userId, amount, enrolledAt } = req.body;
    //     const paymentDetails = {
    //       transactionId,
    //       classId,
    //       userId,
    //       amount,
    //       enrolledAt,
    //     };

    //     // Store payment and enrollment information
    //     await paymentsCollection.insertOne(paymentDetails);

    //     // Update enrollment count in the class
    //     await classCollection.updateOne(
    //       { _id: new ObjectId(classId) },
    //       { $inc: { totalEnrolment: 1 } }
    //     );

    //     res
    //       .status(200)
    //       .send({ success: true, message: "Payment recorded successfully!" });
    //   } catch (error) {
    //     console.error("Error processing payment:", error);
    //     res.status(500).send({ error: "Internal Server Error" });
    //   }
    // });

    // // get all classes from db
    app.get("/payments", async (req, res) => {
      const result = await paymentsCollection.find().toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const { transactionId, classId, userEmail, teacherEmail, amount } =
        req.body;

      if (!transactionId || !classId || !userEmail || !teacherEmail) {
        return res.status(400).send({ error: "Missing required fields." });
      }

      try {
        // Save payment info in the payments collection
        const paymentData = {
          transactionId,
          classId,
          userEmail, // Enrolled user's email
          teacherEmail, // Teacher's email
          amount,
          enrolledAt: new Date(),
        };

        await paymentsCollection.insertOne(paymentData);

        // Update the total enrollment count in the class document
        await classCollection.updateOne(
          { _id: new ObjectId(classId) },
          { $inc: { totalEnrolled: 1 } }
        );

        res.status(200).send({ success: true, message: "Payment recorded." });
      } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    // Get Enrolled Classes for the User

    app.get("/enrolled-classes", async (req, res) => {
      const { email } = req.query;

      if (!email) {
        return res.status(400).send({ error: "Missing user email in query." });
      }

      try {
        const enrolledClasses = await paymentsCollection
          .find({ userEmail: email })
          .toArray();

        if (enrolledClasses.length === 0) {
          return res
            .status(404)
            .send({ error: "No enrolled classes found for this user." });
        }

        // Fetch full class details for each enrolled class
        const classDetailsPromises = enrolledClasses.map(async (enrollment) => {
          const classData = await classCollection.findOne({
            _id: new ObjectId(enrollment.classId),
          });
          return {
            ...enrollment,
            classDetails: classData,
          };
        });

        const result = await Promise.all(classDetailsPromises);
        res.status(200).send(result);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
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
