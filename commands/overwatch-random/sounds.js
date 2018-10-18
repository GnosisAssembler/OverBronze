// Require dependencies
const { Command } = require('discord.js-commando');

module.exports = class SoundCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sound',
            group: 'overwatch-random',
            memberName: 'sound',
            description: 'Replies with a random overwatch sound.',
            examples: ['sound'], 
        });
    }

    run(msg) {

        // Create a random number generator
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        
        // Random ow-sound
        const randomSound = getRandomInt(14);

        var voiceChannel = msg.member.voiceChannel;

        voiceChannel.join().then(connection => {
            const dispatcher = connection.playFile(`./assets/ow-sounds/sound${randomSound}.ogg`);
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
            
    }
}