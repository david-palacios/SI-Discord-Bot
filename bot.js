const fs = require('fs');
const { prefix, bot_token } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ["MESSAGE"]
});

// Command handler section

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// Event handler section

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}


client.on('message', msg => {
    if (msg.content === 'I love SI') {
        msg.react("❤️");
    }
})

client.login(bot_token);