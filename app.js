// JavaScript source code
const express = require("express"),
  admin = require("firebase-admin"),
  bodyParser = require("body-parser"),
  app = express();

//seting up firebase sdk. it will be called first of all as this app.js will sun first of all.
var serviceAccount = require("./firebase_key/peer-connect-16fe4-e036def79cc0.json");
var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://peer-connect-16fe4.firebaseio.com",
});
var database = firebaseAdmin.database();

// setting ejs as view engine, static as public folder, bodyparser for encoding
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//==================================================================================================

// route for landing page
app.get("/", (req, res) => {
  res.render("index");
});

// route for signUp page
app.get("/signup", (req, res) => {
  res.render("partials/signup");
});

//post route for signUp
app.post("/user/signup", (req, res) => {
  let data = req.body.user;
  let userRef = database.ref("/users");
  let key = userRef.push(data).key;
  let url = "/user/" + key;
  res.redirect(url);
});

app.get("/users", (req, res) => {
  let userRef = database.ref("/users");
  userRef.once(
    "value",
    (snapshot) => {
      let data = snapshot.val();
      res.render("users", { data: data });
    },
    (err) => {
      console.log(
        "some err occured while fatching the data of all users from database"
      );
      console.log(err);
    }
  );
});
//route to user profile page
app.get("/user/:userId", (req, res) => {
  let userId = req.params.userId;
  let userRef = database.ref("/users/" + userId);
  userRef.once(
    "value",
    (snapshot) => {
      let data = snapshot.val();
      res.render("profile", { data: data });
    },
    (err) => {
      console.log(err);
    }
  );
  //to be extracted user data from the database using userName or userId
});

app.listen("3000", () => {
  console.log("app is started...");
});
