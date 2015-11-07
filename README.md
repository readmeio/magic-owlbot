# What Is It

Lets you set up a Slack both that's connected to Magic (getmagicnow.com). Basically, a personal consiegier right inside Slack.

At [ReadMe.io](http://readme.io), our mascot Owlbert now takes care of all our needs! (Hence the name `owlbot`!)

# Installation

  * **Time to install** 2 minutes
  * **Difficulty** Easy! No tech or programming needed.
  * **Cost** Twilio is $1/mo + $0.0075/text. Heroku is free or $7/mo. Slack is free. Magic is free but they charge for certain requests; they'll warn you first. We pay under $3/mo.

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

*Note: You'll probably want to switch to the Hobby plan so it doesn't sleep*

## Troubleshooting

To see errors, run `heroku logs --app [yoursubdomain]`.

Some common issues:

  * Make sure you set your Messaging "Request URL" in Twilio to http://[yoursubdomain].herokuapp.com
  * Make sure you have created the channel you used for `OWLBOT_CHANNEL`, and `/invite NAME_OF_YOUR_BOT` to it.
    * You may have to restart (`heroku restart --app [yoursubdomain]`) after you do this
  * You cannot use the same name for your #channel and your @bot. They must be different.
  * Twilio doesn't support shortcodes for texting. So, you'll need to use Magic's full number (`+14082171721`).

You can update your configs by going into **Settings** and clicking **Reveal Config Vars**.

## Message Magic

That's it! Once you have your bot configured, send a message in the chat and Magic will get you set up!

# How It Works

When you pick a channel, anything said in the channel will be directed to Magic. Don't say anything in the channel that you don't want to go to Magic!

You may want to use your own personal phone number for the "magic" option in the config until everything's configured.

When you have it all set up, just say "Hello" in the channel, and you'll get a welcome message from Magic.

# Other Notes

This can both send and recieve images, so no need to worry about that!

You can use Owlbot with any service that works via text message! No need to just use Magic. However, shortcodes won't work. You need a full phone number.
