//password : 4WyYuQs3wearC7Rx
// user : DBfoysal_01
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// mongoDB Conect start
const uri =
  "mongodb+srv://DBfoysal_01:4WyYuQs3wearC7Rx@cluster0.uvaek7y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// CRUD start
async function run() {
  try {
    const UserInfo = client.db("userinfo").collection("user");
    // load api start
    app.get("/user/add", async (req, res) => {
      const query = {};
      const cursor = UserInfo.find(query);
      const user = await cursor.toArray();
      res.send(user);
    }); //load api end

    // load only one data useing (id) start
    app.get("/user/add/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await UserInfo.findOne(query);
      res.send(user);
    });
    // load only one data useing (id) start

    // updated user start
    app.put("/user/add/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = req.body;
      console.log(user);
    });
    // updated user end

    app.delete("/user/add/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const regult = await UserInfo.deleteOne(query);
      res.send(regult);
      // console.log(regult);
    });

    app.post("/user/add", async (req, res) => {
      const user = req.body;
      const result = await UserInfo.insertOne(user);
      console.log(result);

      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir); // CRUD end

// mongoDB Conect end

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log(`server runningon port ${port}`);
});
