module.exports = {
    name: 'dm',
    description: 'Admin command to DM all students who have not emoji-reacted for their Subject and/or Course channels',
    execute(message, args) {
        var unassignedList = [];
        var subjectOnlyList = [];

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

        for (const member of unassignedList) {
            member.send('You have not selected any emoji roles')
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
            // console.log(`Unassigned member: ${member.displayName}`);
        }

        for (const member of subjectOnlyList) {
            member.send('Subject role Only, please use class picker')
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
            // console.log(`Subject Only member: ${member.displayName}`);
        }

    },
};