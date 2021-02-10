const Discord = require('discord.js');
const client = new Discord.Client();
const {
    prefix,
    token
} = require('./config.json');

// Creates a new client once to initiate the bot
client.once('ready', async () => {
    console.log(`Successfully logged in as ${client.user.tag}!`)
});

client.on('message', async (message) => {

    // Check if message is from a bot or a dm and if so, return
    if(message.author.bot || message.channel.type === "dm") return;

    // If there is an @everyone or @here, return
    if(message.content.includes('@everyone') || message.content.includes('@here')) return;

    // If message does not start with the prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Command Handler
    if (command === 'ping') {
        message.channel.send('Pong! ' + client.ws.ping + ' ms')
    } else if (command == 'pong') {
        message.channel.send('Ping! ' + client.ws.ping + ' ms')
    } else if (command == 'coinflip') {
        
        function coinFlip() {
                var rand = ['Heads', 'Tails'];
                
                return rand[Math.floor(Math.random()*rand.length)];
            }
        
        message.reply(coinFlip());

    } else if (command == 'uptime') {

        var seconds = Math.floor(message.client.uptime / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        return message.channel.send(`Bot Uptime: ${days} day(s), ${hours} hour(s), ${minutes} minutes(s), ${seconds} second(s)`)
        .catch(console.error);

    } else if (command == '8ball') {

        function magic8Ball() {

            // You can add more answers to this, all you have to do, is add a comma after the answer. EX: var rand = ['Yes', 'No', etc, etc]
            var rand = ['Yes', 'No', 'Maybe', 'Never', 'Of course', 'Most defenitly', 'In your dreams', 'Probably'];
        
            return rand[Math.floor(Math.random()*rand.length)];
        }

        if (!args.length){
            message.channel.send('Please enter your question!');
        } else {
            message.channel.send(magic8Ball());
        }

    }

});

// Logs in to the bot token
client.login(token);