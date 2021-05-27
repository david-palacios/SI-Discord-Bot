const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome to the Supplemental Instruction Discord Server!')
            .attachFiles(['assets/SI_logo.png'])
            .setThumbnail('attachment://SI_logo.png')
            .addFields(
                { name: 'Join your course channel!', value: 'Your course specific channels are private, *(aka not visible)* until you use the emoji-reaction buttons to join the conversation with your SI leader and your peers.' },
                { name: '\u200B', value: '\u200B' },
                { name: '1. Join your Subject(s)', value: 'In the *# welcome-and-rules channel* emoji-react all that apply' },
                { name: '2. Join your Course(s)', value: 'In the *# class-picker channel* emoji-react all that apply' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Reach out to your SI-leader if you need help accessing your channels', value: 'We are happy to help :)' }
            )
            .setTimestamp()
            .setFooter('one-time automated message', 'attachment://SI_logo.png');

        member.send(exampleEmbed)
            .then(() => { return })
            .catch(console.error);
    },
};