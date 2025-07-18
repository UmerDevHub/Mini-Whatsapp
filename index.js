require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(process.env.ATLASDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

main();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("working");
  res.send("Hello World");
});

app.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.render("index.ejs", { chats });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/chat/:id/edit", async (req, res) => {
  try {
    const userid = req.params.id;
    const chat = await Chat.findById(userid);
    if (!chat) {
      return res.status(404).send("Chat not found");
    }
    res.render("edit.ejs", { chat });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/chats", async (req, res) => {
  try {
    const { from, msg, to } = req.body;
    const newChat = new Chat({
      from,
      msg,
      to,
      created_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/chat/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newmsg = req.body.msg;
    await Chat.findByIdAndUpdate(id, { msg: newmsg }, { new: true });
    res.redirect("/chats");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/chat/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
