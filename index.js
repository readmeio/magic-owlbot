var owlbot = require('./lib');
owlbot.configure({
  channel: process.env.OWLBOT_CHANNEL,
  slack: {
    token: process.env.OWLBOT_SLACK,
  },
  twilio: {
    phoneNumber: process.env.OWLBOT_TWILIO_NUMBER,
    accountSid: process.env.OWLBOT_TWILIO_ACCOUNTSID,
    authToken: process.env.OWLBOT_TWILIO_AUTHTOKEN,
  },
  bypassTwilioValidate: false,
  magic: process.env.OWLBOT_MAGIC,
  port: process.env.PORT || 3012,
});

owlbot.start();
