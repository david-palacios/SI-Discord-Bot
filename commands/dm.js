const Discord = require('discord.js');
// ADMIN Only command

module.exports = {
    name: 'dm',
    description: 'Admin command to DM all students who have not emoji-reacted for their Subject and/or Course channels',
    execute(message, args) {

        // check if user is not an admin:
        const thisMember = message.member;
        if (!(thisMember.roles.cache.some(role => role.name === 'admin'))) {
            message.channel.send('You are not an admin - permission denied');
            return;
        }

        var unassignedList = [];
        var subjectOnlyList = [];
        var DMsDelivered = 0;
        var DMsNotDelivered = [];

        message.guild.members.cache.array().forEach(mem => {
            if (mem.user.bot) return;
            // means no roles
            if (mem.roles.cache.size == 1) {
                unassignedList.push(mem);
            }
            // means only subject selected
            else if (mem.roles.cache.size == 2) {
                subjectOnlyList.push(mem);
            }
        })

        // Command confirmation prompt:
        const totalDMs = unassignedList.length + subjectOnlyList.length;

        message.channel.send(`You are about to send ${totalDMs} DMs, are you sure you want to continue? type: yes or no`).then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, { time: 15000, max: 1, errors: ['time'] })
                .then(messages => {
                    const response = messages.first().content;
                    if (response === 'yes') {
                        sendDMs(unassignedList, subjectOnlyList)
                            .then(() => {
                                respondToAdmin(message);
                            })
                            .catch(console.error);
                    }
                    else {
                        message.channel.send('Command canceled : No DMs sent');
                    }
                })
                .catch(() => {
                    message.channel.send('You did not enter any input! No DMs sent');
                });
        });

        async function sendDMs(unassignedList, subjectOnlyList) {

            const unassignedEmbededMSG = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Supplemental Instruction Discord Server Notice!')
                .attachFiles(['assets/SI_logo.png'])
                .setThumbnail('attachment://SI_logo.png')
                .addFields(
                    { name: 'Don\'t miss out! It appears you have not joined your subject or course specific channels.', value: 'Your course specific channels are private, *(aka not visible)* until you use the emoji-reaction buttons to join the conversation with your SI leader and your peers.' },
                    { name: '\u200B', value: '\u200B' },
                    { name: '1. Join your Subject(s)', value: 'In the *# welcome-and-rules channel* emoji-react all that apply' },
                    { name: '2. Join your Course(s)', value: 'In the *# class-picker channel* emoji-react all that apply' },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Reach out to your SI-leader if you need help accessing your channels', value: 'We are happy to help :)' }
                )
                .setTimestamp()
                .setFooter('one-time automated message', 'attachment://SI_logo.png');

            const subjectOnlyEmbededMSG = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Supplemental Instruction Discord Server Notice!')
                .attachFiles(['assets/SI_logo.png'])
                .setThumbnail('attachment://SI_logo.png')
                .addFields(
                    { name: 'Don\'t miss out! It appears you have not joined your course specific channels.', value: 'Your course specific channels are private, *(aka not visible)* until you use the emoji-reaction buttons to join the conversation with your SI leader and your peers.' },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Join your Course(s)', value: 'In the *# class-picker channel* emoji-react all that apply' },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Reach out to your SI-leader if you need help accessing your channels', value: 'We are happy to help :)' }
                )
                .setTimestamp()
                .setFooter('one-time automated message', 'attachment://SI_logo.png');


            for (const member of unassignedList) {
                const promise1 = member.send(unassignedEmbededMSG)
                    .then(() => {
                        DMsDelivered++;
                    })
                    .catch(() => {
                        console.error;
                        DMsNotDelivered.push(member);
                    });
                await promise1;
            }

            for (const member of subjectOnlyList) {
                const promise2 = member.send(subjectOnlyEmbededMSG)
                    .then(() => {
                        DMsDelivered++;
                    })
                    .catch(() => {
                        console.error;
                        DMsNotDelivered.push(member);
                    });
                await promise2;
            }

            return;
        }

        function respondToAdmin(message) {
            // Response back to admin user:
            message.channel.send(`Sent ${DMsDelivered} DMs!`)
                .then(() => { return })
                .catch(console.error);
            if (DMsNotDelivered.length == 0) return;
            var adminResponse = 'Could not deliver DM to the following members:\n';
            for (const member of DMsNotDelivered) {
                adminResponse += `Name: ${member.displayName}\n`;
            }
            message.channel.send(adminResponse);
        }
    },
};