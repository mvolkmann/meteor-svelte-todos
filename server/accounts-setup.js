import {Accounts} from 'meteor/accounts-base';
import secrets from '../secrets.json';

Accounts.emailTemplates.siteName = 'Todos by Mark V.';
const from = `${secrets.MAIL_NAME}<${secrets.MAIL_USER}@${secrets.MAIL_USER_DOMAIN}>`;
Accounts.emailTemplates.from = from;
