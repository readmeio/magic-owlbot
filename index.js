var owlbot = require('./lib');
owlbot.configure({
  
  // The channel you want your bot to respond to requests in
  // (Your bot will pass everything said in the channel to Magic)
  channel: process.env.OWLBOT_CHANNEL,

  // SLACK
  //
  // On your Integrations page in the Slack settings, do the following:
  // 1. Click the "Bots" integration (Not "Slackbot"; that's different)
  // 2. Fill out its username, and paste the API Token below
  // "xoxb-###############-###########"
  slack: {
    token: process.env.OWLBOT_SLACK,
  },

  // TWILIO
  //
  // 1. Buy a number here: https://www.twilio.com/user/account/phone-numbers/search
  // 2. Copy the phone number and paste it below (format is "+1##########")
  // 3. Set your SMS & MMS "Request URL" to the server this will be hosted on
  // 4. Get your accountSid and authToken from here: https://www.twilio.com/user/account/settings
  twilio: {
    phoneNumber: process.env.OWLBOT_TWILIO_NUMBER,
    accountSid: process.env.OWLBOT_TWILIO_ACCOUNTSID,
    authToken: process.env.OWLBOT_TWILIO_AUTHTOKEN,
  },

  // By default, we check if the Twilio request is real (and not someone messing with you)
  // If things aren't working for some reason, though, turn this to true.
  bypassTwilioValidate: false,

  // The phone number for Magic (format: "+1##########"), Magic is "+14082171721".
  magic: process.env.OWLBOT_MAGIC,

  // The port you want to run this on (the process.env.PORT stuff makes it work on Heroku)
  port: process.env.PORT || 3012,
});

owlbot.start();
