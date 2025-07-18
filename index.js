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
  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("Connected to MongoDB Atlas");
}

main().catch(err => {
  console.error("DB connection error:", err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("working");
  res.send("Hello World");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/chat/:id/edit", async (req, res) => {
  let userid = req.params.id;
  let chat = await Chat.findById(userid);
  res.render("edit.ejs", { chat });
});

app.post("/chats", (req, res) => {
  const { from, msg, to } = req.body;
  let newChat = new Chat({
    from,
    msg,
    to,
    created_at: new Date(),
  });

  newChat.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

  res.redirect("/chats");
});

app.put("/chat/:id", (req, res) => {
  let id = req.params.id;
  const newmsg = req.body.msg;

  Chat.findByIdAndUpdate(id, { msg: newmsg }, { new: true })
    .then(result => console.log(result))
    .catch(err => console.error(err));

  res.redirect("/chats");
});

app.delete("/chat/:id", (req, res) => {
  let id = req.params.id;

  Chat.findByIdAndDelete(id)
    .then(result => console.log(result))
    .catch(err => console.error(err));

  res.redirect("/chats");
});
