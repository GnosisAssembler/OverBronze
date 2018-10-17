// Require dependencies
const { Command } = require('discord.js-commando');

const request = require('request');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'overwatch-stats',
            memberName: 'stats',
            description: 'Replies with general stats.',
            examples: ['stats'], 
            args: [
                {
                    key: 'profile',
                    prompt: 'Enter your region-name-id',
                    type: 'string'
                }
            ]
        });
    }


    run(msg, {profile}) {

        const userProfile = profile.split("-");
        const region = userProfile[0];
        const name = userProfile[1];
        const id = userProfile[2];

        const url = `https://ow-api.com/v1/stats/pc/${region}/${name}-${id}/profile`;

        request(url, { json: true }, function (error, response, body) {
            console.log('error:', error); 
            console.log('statusCode:', response && response.statusCode); 
            console.log("---------");

            return msg.say('name ---> ' + body.name + '\ncurrent level ---> ' + body.level
            + '\ntotal games won ---> ' + body.gamesWon + '\ncurrent rating ---> ' + body.rating 
            + '\ntotal comp games played ---> ' + body.competitiveStats.games.played
            + '\ntotal comp games won ---> ' + body.competitiveStats.games.won
            + '\ntotal comp gold medals earned ---> ' + body.competitiveStats.awards.medalsGold);

        });

    }


}

