/**
 * Created by Softmasters on 5/20/2016.
 */
var Botkit = require('botkit');
var accessToken = '';
var verifyToken = '';
var port = '';


var controller = Botkit.facebookbot(
    {
        access_token: accessToken,
        verify_token: verifyToken
    }
);

var bot = controller.spawn();

controller.setupWebserver(port, function (err, webserver) {
    if (err) return console.log(err);
    controller.createWebhookEndpoint(webserver, bot, function () {
        console.log('Bot is Up lets get going');
    });

})

controller.hears(['hello', 'hi'], 'message_recieved', function (bot, message) {
    bot.reply(message, 'Hello');
    bot.reply(message, 'Are you redy to play the game');;
    bot.reply(message, {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'button',
                text: 'which do you prefer',
                buttons: [
                    {
                        type: 'postback',
                        title: 'Cats',
                        payload: 'shoe_cat'
                    },
                    {
                        type: 'postback',
                        title: 'Dogs',
                        payload: 'show_dog'
                    }
                ]
            }
        }
    })
})
controller.on('facebook_postback', function (bot, message) {
    switch (message.payload) {
        case 'show_cat':
            bot.reply(message, {
                attachment: {
                    type: 'template',
                    payload: {
                        type: 'image',
                        payload: {
                            url: ''
                        }
                    }
                }
            })
            break
        case 'show_dog':
            bot.reply(message, {
                    attachment: {

                        payload: {

                            type: 'image',
                            payload: {
                                url: ''
                            }
                        }
                    }
                }
            )
            break
    }
})