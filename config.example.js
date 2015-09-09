module.exports = {
  
  // The channel you want your bot to respond to requests in
  // (Your bot will pass everything said in the channel to Magic)
  channel: "#test-bot-channel",

  // SLACK
  //
  // On your Integrations page in the Slack settings, do the following:
  // 1. Click the "Bots" integration (Not "Slackbot"; that's different)
  // 2. Fill out its username, and paste the API Token below
  slack: {
    token: "xoxb-###############-###########",
  },

  // TWILIO
  //
  // 1. Buy a number here: https://www.twilio.com/user/account/phone-numbers/search
  // 2. Copy the phone number and paste it below (format is "+1##########")
  // 3. Set your SMS & MMS "Request URL" to the server this will be hosted on
  // 4. Get your accountSid and authToken from here: https://www.twilio.com/user/account/settings
  twilio: {
    phoneNumber: "+1##########",
    accountSid: "ABCDEFG",
    authToken: "1234567",
  },

  // By default, we check if the Twilio request is real (and not someone messing with you)
  // If things aren't working for some reason, though, turn this to true.
  bypassTwilioValidate: false,

  // The phone number for Magic (format: "+1##########")
  magic: "+14082171721",

  // The port you want to run this on (the process.env.PORT stuff makes it work on Heroku)
  port: process.env.PORT || 3012,
};
