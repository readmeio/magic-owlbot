# What Is It

Lets you set up a Slack both that's connected to Magic (getmagicnow.com). Basically, a personal consiegier right inside Slack.

At [ReadMe.io](http://readme.io), our mascot Owlbert now takes care of all our needs! (Hence the name `owlbot`!)

# Installation

## Deploy to Heroku

[ Insert link here ]

*Note: You'll probably want to switch to the Hobby plan so it doesn't sleep*

## Configure

Set up the following variables:

### Slack Setup

Owlbot can only work in one channel. Set the channel:

    heroku config:set OWLBOT_CHANNEL=#channelname

Next, we have to get Owlbot into your Slack channel. On your Integrations page in the Slack settings, do the following:

    1. Click the "Bots" integration (Not "Slackbot"; that's different)
    2. Fill out its username, and use the API Token ("xoxb-###############-###########") below:

    heroku config:set OWLBOT_SLACK="xoxb-###############-###########"

### Twilio Setup

    1. Buy a number here: https://www.twilio.com/user/account/phone-numbers/search
    2. Copy the phone number and paste it below (format is "+1##########")
    3. Set your SMS & MMS "Request URL" to the server this will be hosted on
    4. Get your accountSid and authToken from here: https://www.twilio.com/user/account/settings

Set up the following:

    heroku config:set OWLBOT_TWILIO_NUMBER="+1##########"
    heroku config:set OWLBOT_TWILIO_ACCOUNTSID="ABCDEFG"
    heroku config:set OWLBOT_TWILIO_AUTHTOKEN="1234567"


By default, we check if the Twilio request is real (and not someone messing with you). If things aren't working for some reason, though, turn this to true.

    [coming soon]

### Set Up Magic

The last setp is seting up the number for Magic. **NOTE:** We recommend you use your own phone number first to test everything out. Switch it to Magic's number when you're confident it's working!

    heroku config:set OWLBOT_MAGIC="+1##########"

When you're ready, the Magic number is `"+14082171721"`.

### Message Magic

That's it! Once you have your bot configured, send a message in the chat and Magic will get you set up!

# How It Works

When you pick a channel, anything said in the channel will be directed to Magic. Don't say anything in the channel that you don't want to go to Magic!

You may want to use your own personal phone number for the "magic" option in the config until everything's configured.

When you have it all set up, just say "Hello" in the channel, and you'll get a welcome message from Magic.

# Other Notes

This can both send and recieve images, so no need to worry about that!

It currently limits messages to 160 characters; I'm honestly not sure what would happen on Magic's side without the limit. If it turns out they can indeed get longer messages, I'll remove it.

