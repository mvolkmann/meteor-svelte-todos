import {Meteor} from 'meteor/meteor';
import App from './App.svelte';
import '../imports/accounts-config.js';

Meteor.startup(() => {
  new App({target: document.getElementById('app')});
});
