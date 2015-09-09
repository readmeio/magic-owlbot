var opts = require('./config')

if(opts.channel.indexOf('#') != 0) {
  opts.channel = "#" + opts.channel;
}

var info = {
  'channel': undefined,
};

var Slack = require('slack-client')

var express = require('express')

var twilio = require('twilio');
var twilioClient = twilio(opts.twilio.accountSid, opts.twilio.authToken);
 
var slack = new Slack(opts.slack.token, true, true);

slack.on('open', function() {
  var channel, group, groups, id, messages;
  var unreads = slack.getUnreadCount();
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

  var groups = (function() {
    var ref, results;
    ref = slack.groups;
    results = [];
    for (id in ref) {
      group = ref[id];
      if (group.is_open && !group.is_archived) {
        results.push(group.name);
      }
    }
    return results;
  })();

  console.log("Welcome to Slack. You are @" + slack.self.name + " of " + slack.team.name);
  console.log('You are in: ' + channels.join(', '));
  console.log('As well as: ' + groups.join(', '));
  messages = unreads === 1 ? 'message' : 'messages';
  return console.log("You have " + unreads + " unread " + messages);
});

slack.on('message', function(message) {
  var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
  console.log(message.channel);
  channel = slack.getChannelGroupOrDMByID(message.channel);
  user = slack.getUserByID(message.user);
  response = '';
  type = message.type, ts = message.ts, text = message.text;
  channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
  channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
  userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";
  if ((type === 'message') && (text != null) && (channel != null)) {

    var userString = '<@' + slack.self.id + '>';
    if(channelName != opts.channel) {
      channel.send("Sorry, I can only respond in <#" + info.channel.id + ">!" );
      return;
    }

    handleQuery(text.replace(new RegExp("^" + userString + ":?\\s"), ''), channel);

    //var isDirectMessage = channelName.indexOf('#') !== 0;

    //console.log("Received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");
    //if(text.indexOf(userString) === 0 || isDirectMessage) {
    //}
    //return console.log("@" + slack.self.name + " responded with \"" + response + "\"");
    return;
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

function handleQuery(query, channel) {
  twilioClient.messages.create({
    body: query,
    to: opts.magic,
    from: opts.twilio.phoneNumber,
  }, function(err, message) {
    console.log(err);
    process.stdout.write(message.sid);
  });
}

slack.on('error', function(error) {
  return console.error("Error: " + error);
});

slack.login();

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/sms', function (req, res) {
  if (opts.bypassTwilioValidate || twilio.validateExpressRequest(req, opts.twilio.authToken)) {
    if(req.body.Body) {
      info.channel.send(req.body.Body);
    }
    res.send("");
  } else {
    var msg = 'Not verified as being from Twilio! (You may want to turn on bypassTwilioValidate if you keep getting this.)';
    console.log('Error: ' + msg);
    res.send(msg);
  }
});

var server = app.listen(3012, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

