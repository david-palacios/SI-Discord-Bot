require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ["MESSAGE"]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on('message', msg => {
    if (msg.content === 'I love SI') {
        msg.react("❤️");
    }
})

client.login(process.env.BOT_TOKEN);