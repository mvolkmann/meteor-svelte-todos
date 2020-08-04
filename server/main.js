import {Meteor} from 'meteor/meteor';
import '../imports/tasks.js';
import './accounts-setup.js';
import secrets from '../secrets.json';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL =
    'smtp://' +
    secrets.MAIL_USER +
    '%40' +
    secrets.MAIL_USER_DOMAIN +
    ':' +
    secrets.MAIL_PASSWORD +
    '@' +
    secrets.MAIL_SERVER_DOMAIN +
    ':' +
    secrets.MAIL_SERVER_PORT;
});
