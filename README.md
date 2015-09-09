What Is It
----------

Lets you set up a Slack both that's connected to Magic (getmagicnow.com). Basically, a personal consiegier right inside Slack.

At [ReadMe.io](http://readme.io), our mascot Owlbert now takes care of all our needs! (Hence the name `owlbot`!)

Installation
------------

Clone it and install it:

    git clone git@github.com:readmeio/owlbot.git
    npm install

Copy config.example.js to config.js

    cp config.example.js config.js

Follow the instructions in config.js

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

