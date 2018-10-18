// Require dependencies
const Commando = require('discord.js-commando');
const path = require('path');

// Init commando client - instance of client
const client = new Commando.Client({
    commandPrefix: '~', // prefix
    owner: '377149978902134794', // owner's id
    disableEveryone: true // Dissable the everyone mention
});

client.registry
    // Registers your command groups
    .registerGroups([
        ['basic', 'Basic commands'],
        ['overwatch-stats', 'Overwatch statistics commands'],
        ['overwatch-random', 'Random overwatch pics and sounds commands']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

// Set ready event
client.on('ready', () => {
    console.log('OverBronze bot logged in!');
    client.user.setActivity('Overwatch');
});

// Swear detector
const swearWords = ["stfu", "kys", "Kys", "fuck", "fak", "shit", "ass", "Fuck", "STFU"];
client.on('message', msg => {
    if( swearWords.some(word => msg.content.includes(word)) ) {
        msg.reply("Oh no, why so salty 😡 ???");
        // Or just do message.delete();
    }
});

// Zombe detector
const zombeWords = ["zombe"];
client.on('message', msg1 => {
    if( zombeWords.some(word => msg1.content.includes(word)) ) {
        msg1.reply("Hyelloooo zombieeeees");
    }
});

// Aha detector
const ahaWords = ["tell me more"];
client.on('message', msg2 => {
    if( ahaWords.some(word => msg2.content.includes(word)) ) {
        msg2.reply("aha aha...");
    }
});

// Init sqlite
const sqlite = require('sqlite');

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

// Login with bot token
client.login(require('./config/keys.js').botToken);