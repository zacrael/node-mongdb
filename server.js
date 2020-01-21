import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import Issue from "./models/issue";
let Issue = require("./models/issue");
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/issue");
const connection = mongoose.connection;

connection.once("open", () =>
  console.log("MongoDB database connection established successfully")
);
router.route("/issues").get((req, res) => {
  Issue.find((err, issues) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issues);
    }
  });
});
router.route("/issues/:id").get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});
router.route("/issues/add").post((req, res) => {
  let issue = new Issue(req.body);
  issue
    .save()
    .then(issue => {
      res.status(200).json({ issue: "Added successfully" });
    })
    .catch(err => {
      res.status(400).send("Faild to create new record");
    });
});

router.route("/issue/update/:id").post((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      console.log("Could not load  document");
    } else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue
        .save()
        .then(issue => {
          res.json("Successfully updated");
        })
        .catch(err => {
          res.status(400).send("Updated faild");
        });
    }
  });
});

router.route("/issues/delete/:id").get((req, res) => {
  Issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Remove successfully");
    }
  });
});
app.use("/", router);

app.listen(4000, () => console.log("express is running on port 4000"));
