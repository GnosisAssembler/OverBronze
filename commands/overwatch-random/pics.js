// Require dependencies
const { Command } = require('discord.js-commando');
const { Attachment } = require('discord.js');

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

    run(msg) {

        // Create a random number generator
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        
        // Random ow-pic
        const randomPic = getRandomInt(11);

        // Create the pic attachment using Attachment
        const attachment = new Attachment(`./assets/ow-pics/pic${randomPic}.jpg`);
        // Send the attachment in the message channel
        msg.channel.send(attachment);
            
    }
}