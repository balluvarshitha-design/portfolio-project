const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* CONTACT MODEL */

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", ContactSchema);

/* PROJECT MODEL */

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Project = mongoose.model("Project", ProjectSchema);

/* CONTACT API */

app.post("/contact", async (req, res) => {

    const newContact = new Contact(req.body);

    await newContact.save();

    res.json({
        message: "Message Saved Successfully"
    });

});

/* GET PROJECTS */

app.get("/projects", async (req, res) => {

    const projects = await Project.find();

    res.json(projects);

});

/* ADD SAMPLE PROJECTS */

app.get("/add-project", async (req, res) => {

    await Project.create({
        title: "Portfolio Website",
        description: "Full stack portfolio using HTML CSS JavaScript Node.js and MongoDB"
    });

    await Project.create({
        title: "Weather App",
        description: "Weather app using JavaScript API"
    });

    await Project.create({
        title: "Todo App",
        description: "Task management application"
    });

    res.send("Projects Added");

});

/* START SERVER */

app.listen(5000, "0.0.0.0", () => {

    console.log("Server Running on port 5000");

});