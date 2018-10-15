// Require dependencies
const { Command } = require('discord.js-commando');

const request = require('request');

module.exports = class RatingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rating',
            group: 'overwatch-stats',
            memberName: 'rating',
            description: 'Replies with the rating in competitive mode',
            examples: ['rating']
        });
    }


    run(msg) {

        const url = 'https://ow-api.com/v1/stats/pc/eu/MrPringles-21609/profile';

        request(url, { json: true }, function (error, response, body) {
            console.log('error:', error); 
            console.log('statusCode:', response && response.statusCode); 
            console.log(body.rating);
        });

    }


}

