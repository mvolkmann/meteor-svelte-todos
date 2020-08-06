import {Accounts} from 'meteor/accounts-base';
//import {AccountsTemplates} from 'meteor/useraccounts:core';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

/*
AccountsTemplates.removeField('password');
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  required: true,
  minLength: 6,
  re: /(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
  errStr: 'At least 1 digit, 1 lower-case and 1 upper-case'
});
*/
