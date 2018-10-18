// Require dependencies
const { Command } = require('discord.js-commando');
const request = require('request');
const { RichEmbed } = require('discord.js');

module.exports = class HeroesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'heroes',
            group: 'overwatch-stats',
            memberName: 'heroes',
            description: 'Replies with hero specific stats.',
            examples: ['heroes eu-MrSamy-21308-reaper'], 
            // User's arguments
            args: [
                {
                    key: 'profile',
                    prompt: 'Enter your region(eu or us)-name-id-hero with "-" in between.',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, {profile}) {

        // Split the argument to region - name - id - hero
        const userProfile = profile.split("-");
        const region = userProfile[0];
        const name = userProfile[1];
        const id = userProfile[2];
        const hero = userProfile[3];

        // Url of Ow-API
        const url = `https://ow-api.com/v1/stats/pc/${region}/${name}-${id}/heroes/${hero}`;

        // Request date from Ow-API
        request(url, { json: true }, function (error, response, body) {
            console.log('error:', error); 
            console.log('statusCode:', response && response.statusCode); 

            // Create embed
            const embed = new RichEmbed()
                .setTitle('✅ ' + body.name + ` Overwatch ${hero} Stats`)
                .setImage(body.icon) // Set user's overwatch icon
                .setThumbnail(body.prestigeIcon) // Set prestige as a thumbnail
                .setColor(0x00AE86)
                .setFooter("From ow-api")
                .setTimestamp()
                // Set fields with player's hero stats
                .addField("Total ranked games played", body.competitiveStats.games.played)
                .addField("Total ranked games won", body.competitiveStats.games.won)
                .addField("Total ranked gold medals earned", body.competitiveStats.awards.medalsGold);

            return msg.embed(embed);
            
        });
    }
}
