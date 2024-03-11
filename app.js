const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

const mongourl =
  "mongodb+srv://login:login@cluster0.xlrs6ke.mongodb.net/Mern?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => console.log(e));

app.use(express.json());

app.listen(3000, () => {
  console.log("server started");
});

// app.post("/post", async (req, res) => {
//   console.log(req.body);
//   const { data } = req.body; //destructure the data
//   try {

//     if (data1 == "radha") {
//       res.send({ status: "ok" });
//     } else {
//       res.send({ status: "user not found" });
//     }
//   } catch (err) {
//     res.send({ status: "something went wrong try again !!!" });
//   }
// });

// require("./userDetails");

// const User = mongoose.model("userInfo");

// app.post("/register", async (req, res) => {
//   const { name, email, mobileNo } = req.body;
//   try {
//     await User.create({
//       uname: name,
//       email,
//       phoneno: mobileNo,
//     });
//     res.send({ status: "ok" });
//   } catch {
//     res.send({ status: "error" });
//   }
// });

require("./userDetails");

const User = mongoose.model("userInfo");

app.post("/register", async (req, res) => {
  //taking data- name,email,pwds from req.body
  const { fname, lname, email, password } = req.body;
  try {
    const olduser = User.findOne({ email });
    if (olduser) {
      res.send({ error: "User already exists" });
    }

    await User.create({
      fname,
      lname,
      email,
      password,
    });
    res.send({ status: "ok" });
  } catch (e) {
    res.send({
      status: "error",
    });
  }
});
