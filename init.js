const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main().then(res =>{
    console.log("connected");
}).catch(err =>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


Chat.insertMany([
    {
        from: "Umer",
        to: "Talha",
        msg: "Hello Talha, how are you?",
        created_at: new Date()
    },
    {
        from: "Hassan",
        to: "Ali",
        msg: "Ali, are you free tomorrow?",
        created_at: new Date()
    },
    {
        from: "Zainab",
        to: "Fatima",
        msg: "Let's meet for coffee this weekend.",
        created_at: new Date()
    },
    {
        from: "Bilal",
        to: "Ahmed",
        msg: "Don't forget the football match today!",
        created_at: new Date()
    },
    {
        from: "Ayesha",
        to: "Sara",
        msg: "Send me the notes for yesterday's lecture.",
        created_at: new Date()
    },
    {
        from: "Hamza",
        to: "Usman",
        msg: "I emailed you the project files.",
        created_at: new Date()
    },
    {
        from: "Noor",
        to: "Hiba",
        msg: "Let's start the group study at 5 PM.",
        created_at: new Date()
    },
    {
        from: "Kashif",
        to: "Sameer",
        msg: "Congrats on your new job!",
        created_at: new Date()
    }
])










