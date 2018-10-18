<<<<<<< HEAD
// Require dependencies
const { Command } = require('discord.js-commando');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            group: 'basic',
            memberName: 'about',
            description: 'Replies with a short description about the bot.',
            examples: ['about']
        });
    }

    run(msg) {
        return msg.say("🎃 Overwatch stats - Overwatch news - Overwatch pics - Hero Sounds - Points System - Music and more 🎃");
    }
=======
// Require dependencies
const { Command } = require('discord.js-commando');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            group: 'basic',
            memberName: 'about',
            description: 'Replies with a short description about the bot.',
            examples: ['about']
        });
    }

    run(msg) {
        return msg.say("🎃 Overwatch stats - Overwatch news - Overwatch pics - Hero Sounds - Points System - Music and more 🎃");
    }
>>>>>>> ef2233dbfc588678ac2fd9f25774170a4982b0f6
}