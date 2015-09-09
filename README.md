What Is It
----------

Lets you set up a Slack both that's connected to Magic (getmagicnow.com). Basically, a personal consiegier right inside Slack.

At [ReadMe.io](http://readme.io), our mascot Owlbert now takes care of all our needs! (Hence the name `owlbot`!)

Installation
------------

**EASY SETUP**: Use [readmeio/owlbot-example](https://github.com/readmeio/owlbot-example)

Set up a new folder + git repo:

    mkdir mybot && cd mybot
    npm init
    npm install owlbot --save

Create an index.js file, and edit it:

    var owlbot = require('owlbot');
    owlbot.configure({
      
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
    });

    owlbot.start();

That's it! Once you have your bot configured, you can just say stuff in the channel and it will be forwarded to Magic.

How It Works
------------

When you pick a channel, anything said in the channel will be directed to Magic. Don't say anything in the channel that you don't want to go to Magic!

You may want to use your own personal phone number for the "magic" option in config.js until everything's configured.

When you have it all set up, just say "Hello" in the channel, and you'll get a welcome message from Magic.

Deploying to Heroku
-------------------

Unfortunately, you'll need to deploy it publicly so Twilio can contact it.

You should be able to deploy to Heroku easily. You'll need to remove `config.js` from `.gitignore`, and check it in for things to work.

