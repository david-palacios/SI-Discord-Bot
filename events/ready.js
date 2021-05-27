module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        // Administrative:
        // client.user.setAvatar('../assets/SI_bot_logo.png');
        client.user.setUsername('Supplemental Instruction');
        client.user.setActivity('SI/help', { type: 'LISTENING' });
    },
};