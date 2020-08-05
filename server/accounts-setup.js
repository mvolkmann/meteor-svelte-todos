import {Accounts} from 'meteor/accounts-base';
//import {AccountsTemplates} from 'meteor/useraccounts:core';
import secrets from '../secrets.json';

const siteName = 'Todos by Mark';
Accounts.emailTemplates.siteName = siteName;

const from = `${secrets.MAIL_NAME}<${secrets.MAIL_USER}@${secrets.MAIL_USER_DOMAIN}>`;
Accounts.emailTemplates.from = from;

/*
AccountsTemplates.removeField('password');
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  placeholder: {
    signUp: 'Minimum 8 characters length.'
  },
  required: true,
  minLength: 8,
  re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  errStr: 'Minimum 1 digit, 1 lowercase, and uppercase'
});
console.log('accounts-setup.js x: replaced password field');
*/

Accounts.onLogin(({user}) => {
  const [email] = user.emails;
  if (!email.verified) {
    Accounts.sendVerificationEmail(user._id, email.address);
  }
});

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return `Activate your ${siteName} account.`;
  },
  text(user, url) {
    return (
      `Hey ${user.username}, click the following link ` +
      `to verify your email address: ${url}.`
    );
  }
};
