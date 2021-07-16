require("dotenv").config()
const process = require("process")
const discord = require("discord.js")
const detector = require("./detector")

const client = new discord.Client()

client.on("ready", () => {
    console.log("The bot is ready")
})

client.on("message", (msg) => {
    detector.analyzeMessage(msg.content)
    .then((isPhishing) => {
        if(!isPhishing) return;

        msg.delete();
    })
})

client.login(process.env.TOKEN)
