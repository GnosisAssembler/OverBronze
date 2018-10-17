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

            // Create embed
            const embed = new RichEmbed()
                .setTitle('✅ ' + body.name + " Overwatch Stats")
                .setImage(body.icon) // Set user's overwatch icon
                .setThumbnail(body.prestigeIcon) // Set prestige as a thumbnail
                .setColor(0x00AE86)
                .setFooter("From ow-api")
                .setTimestamp()
                // Set fields with player's stats
                .addField("Current level", body.level)
                .addField("Total games won", body.gamesWon)
                .addField("Current rating", body.rating)
                .addField("Current ranked games played", body.competitiveStats.games.played)
                .addField("Current ranked games won", body.competitiveStats.games.won)
                .addField("Current ranked gold medals earned", body.competitiveStats.awards.medalsGold);

            return msg.embed(embed);
            
        });
    }
}

