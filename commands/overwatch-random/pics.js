// Require dependencies
const { Command } = require('discord.js-commando');
const request = require('request');
const { RichEmbed } = require('discord.js');

module.exports = class PicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pic',
            group: 'overwatch-random',
            memberName: 'pic',
            description: 'Replies with a random overwatch pic.',
            examples: ['pic'], 
        });
    }

    run(msg, {profile}) {

        console.log("test");
            
    }
}