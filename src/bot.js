require('dotenv').config();

// console.log(process.env.DISCORD_TOKEN);

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "$";

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
})

client.on('message', (message) => {
    if (message.author.bot) return;
    
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)
        
        // console.log(CMD_NAME);
        // console.log(args);

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You dont have permission to use that command')
            if (args.length === 0) 
                return message.reply('please provide an ID')
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                .kick()
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch((err) => message.channel.send('I cant kick that user'))
            } else {
                message.channel.send('that user is not found')
            }
        } else if (CMD_NAME === 'ban') {
            message.channel.send('banned')
        }
    }
    
    /* console.log(`${message.author.username}: ${message.content}`);
    if(message.content === 'hello') {
        // message.reply('hello there')
        message.channel.send('hello')
    } */
})

client.on('messageReactionAdd', (reaction, user) => {

})

client.login(process.env.DISCORD_TOKEN);