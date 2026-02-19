const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://manasiyaahmad345_db_user:sTare144faFDB0bV@cluster0.ioo5mmk.mongodb.net/universityDB")
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));


// Schema
const studentSchema = new mongoose.Schema({

firstName:String,
lastName:String,
dob:String,
email:String,
phone:String,
gender:String,
address:String,
course:String,
interest:[String],
password:String,
securityQuestion:String,
securityAnswer:String
});


const Student = mongoose.model("Student", studentSchema);

// POST API
app.post("/register", async(req,res)=>{

const student = new Student({

firstName:req.body.firstName,
lastName:req.body.lastName,
dob:req.body.dob,
email:req.body.email,
phone:req.body.phone,
gender:req.body.gender,
address:req.body.address,
course:req.body.course,
interest:req.body.interest,
password:req.body.password,
securityQuestion:req.body.securityQuestion,
securityAnswer:req.body.securityAnswer

});

await student.save();

res.send("Saved");

    res.json({ message: "Student Registered Successfully" });
});

// GET API (Check data)
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
