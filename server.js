var express = require('express')
  , Slack = require('slack-client')
  , Twilio = require('twilio')

// Load the settings from config.js
try {
  var opts = require('./config')
} catch(e) {
  console.log("[ERROR] You need to copy config.example.js to config.js");
  process.exit();
}

// If the channel doesn't start with a #, add it.
if(opts.channel.indexOf('#') != 0) {
  opts.channel = "#" + opts.channel;
}

// These are our "global" variables
var info = {
  'channel': undefined,
};

// Set up Slack
var slack = new Slack(opts.slack.token, true, true);

// Set up Twilio
var twilio = Twilio(opts.twilio.accountSid, opts.twilio.authToken);

// Listen for slack connection
slack.on('open', function() {
  var channel, id, messages;
  var channels = (function() {
    var ref, results;
    ref = slack.channels;
    results = [];
    for (id in ref) {
      channel = ref[id];
      if (channel.is_member) {
        results.push("#" + channel.name);
      }

      if(channel.name == opts.channel.replace(/#/, '')) {
        info.channel = channel;
      }
    }
    return results;
  })();

  if(!info.channel) {
    console.log("ERROR: Your bot isn't in the specified channel (" + opts.channel + ")!");
    return;
  }

  console.log("Welcome to Slack. You are @" + slack.self.name + " of " + slack.team.name);
  console.log('  - You are in: ' + channels.join(', '));
});

// Slack listen for messages
slack.on('message', function(message) {
  var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
  channel = slack.getChannelGroupOrDMByID(message.channel);
  user = slack.getUserByID(message.user);
  response = '';
  type = message.type, ts = message.ts, text = message.text;
  channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
  channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
  userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";

  if ((type === 'message') && (text != null) && (channel != null)) {

    var userString = '<@' + slack.self.id + '>';

    // We only want to send something if it's in the right channel.
    // (`message.subtype` indicates it's something like "John joined the channel", etc)

    if(channelName != opts.channel || message.subtype) {
      var isDirectMessage = channelName.indexOf('#') != 0;
      var isRecipientOfMessage = text.indexOf('<@'+slack.self.id+'>') == 0;

      if(isDirectMessage || isRecipientOfMessage) {
        channel.send("Sorry, I can only respond in <#" + info.channel.id + ">!" );
      }
      return;
    }

    handleSlackQuery(text.replace(new RegExp("^" + userString + ":?\\s"), ''), channel);
  } else {
    typeError = type !== 'message' ? "unexpected type " + type + "." : null;
    textError = text == null ? 'text was undefined.' : null;
    channelError = channel == null ? 'channel was undefined.' : null;
    errors = [typeError, textError, channelError].filter(function(element) {
      return element !== null;
    }).join(' ');
    return console.log("@" + slack.self.name + " could not respond. " + errors);
  }
});

// Slack error
slack.on('error', function(error) {
  return console.error("Error: " + error);
});

// If we have a valid slack message to pass along
function handleSlackQuery(query, channel) {
  console.log('[SENT]', query);
  twilio.messages.create({
    body: query,
    to: opts.magic,
    from: opts.twilio.phoneNumber,
  }, function(err, message) {
    console.log(err);
    process.stdout.write(message.sid);
  });
}

// Set up our express server
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Wait for a post from Twilio
app.post('/', function (req, res) {
  if (opts.bypassTwilioValidate || Twilio.validateExpressRequest(req, opts.twilio.authToken)) {
    if(req.body.Body) {
      console.log('[RECEIVED]', req.body.Body);
      info.channel.send(req.body.Body);
    }
    res.send("");
  } else {
    var msg = 'Not verified as being from Twilio! (You may want to turn on bypassTwilioValidate if you keep getting this.)';
    console.log('Error: ' + msg);
    res.send(msg);
  }
});

// Run the express server
var server = app.listen(opts.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Slack bot is listening at http://%s:%s', host, port);
});

// Start the Slack connection
slack.login();
