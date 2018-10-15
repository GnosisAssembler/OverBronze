// Require dependencies
const Commando = require('discord.js-commando');
const path = require('path');

// Init commando client - instance of client
const client = new Commando.Client({
    commandPrefix: '~',
    owner: '377149978902134794',
    disableEveryone: true
});

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['basic', 'Basic commands']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

// Set ready event
client.on('ready', () => {
    console.log('OverBronze bot logged in!');
    client.user.setActivity('game');
});


const sqlite = require('sqlite');

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

// Login with bot token
client.login(require('./config/keys.js').botToken);