require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
    name: 'message',
    execute(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        //regex to avoid spaces as args
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!message.client.commands.has(commandName)) {
            message.reply('command not found!');
            return;
        }

        const command = message.client.commands.get(commandName);
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        }
        catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    },
};

//todo
// client.on('message', message => {
//     if (message.content === 'I love SI') {
//         message.react("❤️");
//     }
// })

// // react to SI leaders SI session announcements
// client.on('message', message => {
//     const thisMember = message.member;
//     if (thisMember.roles.cache.some(role => role.name === 'admin')) {
//         const emojis = ["🎉", "💯", "☝", "🙌", "👍", "🤩", "😸"];
//         const random = Math.floor(Math.random() * emojis.length);
//         if (message.content.toLowerCase() === 'si session') {
//             message.react(emojis[random]);
//         }
//     }
// })