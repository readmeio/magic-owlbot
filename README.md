# What Is It

Lets you set up a Slack both that's connected to Magic (getmagicnow.com). Basically, a personal consiegier right inside Slack.

At [ReadMe.io](http://readme.io), our mascot Owlbert now takes care of all our needs! (Hence the name `owlbot`!)

# Installation

  * **Time to install** 2 minutes
  * **Difficulty** Easy! No tech or programming needed.
  * **Cost** Twilio is $1/mo + $0.0075/text. Heroku is free or $7/mo. Slack is free. Magic is free but they charge for certain requests; they'll warn you first. We pay under $10/mo, total.

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

*Note: You'll probably want to switch to the Hobby plan so it doesn't sleep*

## Configure

In Heroku, go into **Settings** and click **Reveal Config Vars**.

Change the following variables:

### OWLBOT_CHANNEL

Owlbot can only work in one channel. By default it's #owlbot, but you can change it.

### OWLBOT_SLACK

Next, we have to get Owlbot into your Slack channel. On your Integrations page in the Slack settings, do the following:

1. Click the "Bots" integration (Not "Slackbot"; that's different)
2. Fill out its username, and use the API Token ("xoxb-###############-###########") for `OWLBOT_SLACK`.

### OWLBOT_TWILIO_*

1. Buy a number here: https://www.twilio.com/user/account/phone-numbers/search
2. Copy the phone number and paste it below (format is "+1##########")
3. Set your SMS & MMS "Request URL" to the server this will be hosted on. If it's on Heroku, it's `http://[yoursubdomain].herokuapp.com`
4. Get your accountSid and authToken from here: https://www.twilio.com/user/account/settings

Then use this information for `OWLBOT_TWILIO_NUMBER`, `OWLBOT_TWILIO_ACCOUNTSID`, and `OWLBOT_TWILIO_AUTHTOKEN`.

### OWLBOT_MAGIC

The last setp is seting up the number for Magic.

Start by using **your own number** to test everything out.

When everything is working, set this variable to `+14082171721`.

*Note: You can use Owlbot with any service that works via text message! No need to just use Magic. However, shortcodes won't work. You need a full email address.*

### Message Magic

That's it! Once you have your bot configured, send a message in the chat and Magic will get you set up!

# How It Works

When you pick a channel, anything said in the channel will be directed to Magic. Don't say anything in the channel that you don't want to go to Magic!

You may want to use your own personal phone number for the "magic" option in the config until everything's configured.

When you have it all set up, just say "Hello" in the channel, and you'll get a welcome message from Magic.

# Other Notes

This can both send and recieve images, so no need to worry about that!

It currently limits messages to 160 characters; I'm honestly not sure what would happen on Magic's side without the limit. If it turns out they can indeed get longer messages, I'll remove it.

