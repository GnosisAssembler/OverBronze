// Require dependencies
const { Command } = require('discord.js-commando');
const request = require('request');
const { RichEmbed } = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'overwatch-stats',
            memberName: 'stats',
            description: 'Replies with general stats.',
            examples: ['stats'], 
            // User's arguments
            args: [
                {
                    key: 'profile',
                    prompt: 'Enter your region(eu or us)-name-id with "-" in between.',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, {profile}) {

        // Split the argument to region - name - id
        const userProfile = profile.split("-");
        const region = userProfile[0];
        const name = userProfile[1];
        const id = userProfile[2];

        // Url of Ow-API
        const url = `https://ow-api.com/v1/stats/pc/${region}/${name}-${id}/profile`;

        // Request date from Ow-API
        request(url, { json: true }, function (error, response, body) {
            console.log('error:', error); 
            console.log('statusCode:', response && response.statusCode); 

            // Output message
            const message = 'Battlenet Name: ' + body.name + '\nCurrent level: ' + body.level
            + '\nTotal games won: ' + body.gamesWon + '\nCurrent rating: ' + body.rating 
            + '\nTotal comp games played: ' + body.competitiveStats.games.played
            + '\nTotal comp games won:  ' + body.competitiveStats.games.won
            + '\nTotal comp gold medals earned: ' + body.competitiveStats.awards.medalsGold;

            // Create embed
            const embed = new RichEmbed()
                .setDescription(message)
                .setAuthor(msg.author.username, msg.author.displayAvatarURL)
                .setColor(0x00AE86)
                .setTimestamp();

            return msg.embed(embed);
        });
    }
}

