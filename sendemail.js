var aws = require('aws-sdk');
var ses = new aws.SES({ region: process.env.AccountRegion });

exports.handler = function(event, context) {
    console.log('Incoming event info: ', event);
    var eParams = {        
        Destination: { ToAddresses: [process.env.EmailToAddress]},    
        Message: {
            Body: { Text: { Data: event.suggestion }},
            Subject: {Data: 'AWS User Group - Topic Suggestion'}
        },
        Source: process.env.EmailFromAddress
    };
    var email = ses.sendEmail(eParams, function(err, data) {
            if(err) {
                console.log(err);            
                throw err;
            }
            else {
                console.log('Email Sent', data);
                context.succeed(event);        
            }
        }
    );
};